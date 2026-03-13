import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Applyza's AI assistant — a friendly, knowledgeable guide for international students looking to study abroad. You work for Applyza, an education consultancy that helps students for free.

Your personality: warm, helpful, encouraging, professional but not formal. You speak like a friendly counsellor, not a robot.

Key facts you must know:
- Applyza's service is 100% free for students. We earn commission from partner universities.
- We have 150+ partner universities across the UK, Europe, and beyond.
- We have a 99% visa success rate.
- We have offices in Nicosia (Cyprus HQ), Lagos (Nigeria), Accra (Ghana), Nairobi (Kenya), Doha (Qatar), and Istanbul (Türkiye).
- Email: info@applyza.com
- We help with: university applications, visa & immigration, student counselling, accommodation.

Rules:
- Always be helpful and encouraging about studying abroad.
- If you don't know something specific, say 'I'd recommend booking a free consultation with our expert counsellors who can give you personalised advice' and provide the link: applyza.com/contact
- Never make up specific course fees, visa requirements, or deadlines — direct them to a counsellor for specifics.
- If someone asks about visa refusals, be sensitive and encouraging — mention our 99% success rate.
- Try to collect their name and email naturally during conversation so our team can follow up.
- If they seem ready to take action, suggest booking a consultation.
- Keep responses concise — 2-3 short paragraphs max. Students don't want to read essays.
- You can respond in any language the student writes in.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId, conversationHistory, pageUrl } = await req.json();

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch knowledge base context
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let knowledgeContext = "";
    try {
      const { data: knowledge } = await supabase
        .from("chatbot_knowledge")
        .select("question, answer, category")
        .limit(50);

      if (knowledge && knowledge.length > 0) {
        knowledgeContext =
          "\n\nHere is additional knowledge from our database that may help you answer:\n" +
          knowledge
            .map((k: any) => `Q: ${k.question}\nA: ${k.answer}`)
            .join("\n\n");
      }
    } catch (e) {
      console.error("Error fetching knowledge:", e);
    }

    // Build messages for Claude
    const claudeMessages = (conversationHistory || []).map((m: any) => ({
      role: m.role,
      content: m.content,
    }));
    claudeMessages.push({ role: "user", content: message });

    // Call Anthropic Claude API
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: SYSTEM_PROMPT + knowledgeContext,
        messages: claudeMessages,
      }),
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error("Anthropic API error:", anthropicResponse.status, errorText);

      if (anthropicResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI service error. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await anthropicResponse.json();
    const aiResponse = data.content?.[0]?.text || "I'm sorry, I couldn't generate a response. Please try again.";

    // Detect lead info in the user's message
    const emailMatch = message.match(/[\w.-]+@[\w.-]+\.\w{2,}/);
    const nameMatch = message.match(/(?:my name is|i'm|i am)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);

    // Save/update conversation in database
    const fullHistory = [
      ...(conversationHistory || []),
      { role: "user", content: message },
      { role: "assistant", content: aiResponse },
    ];

    try {
      const { data: existing } = await supabase
        .from("chatbot_conversations")
        .select("id, lead_captured, student_name, student_email")
        .eq("session_id", sessionId)
        .maybeSingle();

      const updateData: any = {
        messages: fullHistory,
        page_url: pageUrl,
        updated_at: new Date().toISOString(),
      };

      if (emailMatch) {
        updateData.student_email = emailMatch[0];
        updateData.lead_captured = true;
      }
      if (nameMatch) {
        updateData.student_name = nameMatch[1];
      }

      if (existing) {
        // Preserve existing lead data
        if (existing.student_email && !updateData.student_email) {
          delete updateData.student_email;
          delete updateData.lead_captured;
        }
        if (existing.student_name && !updateData.student_name) {
          delete updateData.student_name;
        }
        await supabase
          .from("chatbot_conversations")
          .update(updateData)
          .eq("id", existing.id);
      } else {
        await supabase.from("chatbot_conversations").insert({
          session_id: sessionId,
          ...updateData,
        });
      }
    } catch (e) {
      console.error("Error saving conversation:", e);
    }

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Chat function error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
