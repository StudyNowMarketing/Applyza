import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify API key
  const apiKey = req.headers.get("x-api-key");
  const expectedKey = Deno.env.get("INGESTION_API_KEY");

  if (!apiKey || apiKey !== expectedKey) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    const { action, table, data, filters } = await req.json();

    // Validate table name
    const allowedTables = ["chatbot_knowledge", "chatbot_conversations"];
    if (!allowedTables.includes(table)) {
      return new Response(
        JSON.stringify({ error: `Table '${table}' is not allowed. Use: ${allowedTables.join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let result;

    switch (action) {
      case "insert": {
        if (!data || (Array.isArray(data) && data.length === 0)) {
          return new Response(
            JSON.stringify({ error: "Data is required for insert" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        const { data: inserted, error } = await supabase.from(table).insert(data).select();
        if (error) throw error;
        result = inserted;
        break;
      }

      case "upsert": {
        if (!data) {
          return new Response(
            JSON.stringify({ error: "Data is required for upsert" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        const { data: upserted, error } = await supabase.from(table).upsert(data).select();
        if (error) throw error;
        result = upserted;
        break;
      }

      case "update": {
        if (!data || !filters) {
          return new Response(
            JSON.stringify({ error: "Data and filters are required for update" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        let query = supabase.from(table).update(data);
        for (const [key, value] of Object.entries(filters)) {
          query = query.eq(key, value);
        }
        const { data: updated, error } = await query.select();
        if (error) throw error;
        result = updated;
        break;
      }

      case "delete": {
        if (!filters) {
          return new Response(
            JSON.stringify({ error: "Filters are required for delete" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        let delQuery = supabase.from(table).delete();
        for (const [key, value] of Object.entries(filters)) {
          delQuery = delQuery.eq(key, value);
        }
        const { data: deleted, error } = await delQuery.select();
        if (error) throw error;
        result = deleted;
        break;
      }

      case "select": {
        let selQuery = supabase.from(table).select("*");
        if (filters) {
          for (const [key, value] of Object.entries(filters)) {
            selQuery = selQuery.eq(key, value);
          }
        }
        const { data: rows, error } = await selQuery;
        if (error) throw error;
        result = rows;
        break;
      }

      default:
        return new Response(
          JSON.stringify({ error: `Unknown action '${action}'. Use: insert, upsert, update, delete, select` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Ingestion error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
