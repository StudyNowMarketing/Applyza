import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { MessageCircle, X, ArrowLeft, Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: `Hi! 👋 I'm Applyza's AI assistant. I can help you with:\n\n🎓 Finding the right course\n🌍 Study destination info\n📋 Visa requirements\n💰 Scholarships\n📞 Booking a consultation\n\nWhat would you like to know?`,
  timestamp: Date.now(),
};

const QUICK_REPLIES = [
  { label: "Find a course", message: "I want to find a course to study abroad" },
  { label: "Visa help", message: "I need help with a student visa" },
  { label: "Book consultation", message: "I want to book a free consultation" },
  { label: "Is it really free?", message: "Is your service really free?" },
];

const LEAD_PROMPT_THRESHOLD = 3;

const getSessionId = () => {
  let id = sessionStorage.getItem("applyza_chat_session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("applyza_chat_session", id);
  }
  return id;
};

const ChatWidget: React.FC = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef(getSessionId());
  const sendLock = useRef(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef(window.speechSynthesis);

  const supportsRecognition =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  // Pulse animation every 30s
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 3000);
    }, 30000);
    // Initial pulse
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading || sendLock.current) return;
      sendLock.current = true;
      setTimeout(() => (sendLock.current = false), 1000);

      const userMsg: Message = { role: "user", content: text.trim(), timestamp: Date.now() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setShowQuickReplies(false);
      setIsLoading(true);

      const newExchangeCount = exchangeCount + 1;
      setExchangeCount(newExchangeCount);

      // Check for email in message
      if (/[\w.-]+@[\w.-]+\.\w{2,}/.test(text)) {
        setLeadCaptured(true);
      }

      try {
        const conversationHistory = messages
          .filter((m) => m !== WELCOME_MESSAGE)
          .map((m) => ({ role: m.role, content: m.content }));

        const resp = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({
              message: text.trim(),
              sessionId: sessionId.current,
              conversationHistory,
              pageUrl: window.location.href,
            }),
          }
        );

        if (!resp.ok) {
          const errData = await resp.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to get response");
        }

        const data = await resp.json();
        let aiContent = data.response;

        // Natural lead capture prompt
        if (
          newExchangeCount >= LEAD_PROMPT_THRESHOLD &&
          !leadCaptured &&
          newExchangeCount === LEAD_PROMPT_THRESHOLD
        ) {
          aiContent +=
            "\n\nBy the way, would you like me to have one of our counsellors follow up with you? Just share your name and email and they'll be in touch within 24 hours. 😊";
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: aiContent, timestamp: Date.now() },
        ]);
      } catch (err: any) {
        console.error("Chat error:", err);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or contact us directly at info@applyza.com.",
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, exchangeCount, leadCaptured]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const speakMessage = (text: string, index: number) => {
    if (speakingMsgIndex === index) {
      synthRef.current.cancel();
      setSpeakingMsgIndex(null);
      return;
    }
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[🎓🌍📋💰📞👋😊]/g, ""));
    utterance.onend = () => setSpeakingMsgIndex(null);
    utterance.onerror = () => setSpeakingMsgIndex(null);
    setSpeakingMsgIndex(index);
    synthRef.current.speak(utterance);
  };

  const shouldShowTimestamp = (index: number) => {
    if (index === 0) return true;
    const prev = messages[index - 1];
    const curr = messages[index];
    return curr.timestamp - prev.timestamp > 5 * 60 * 1000;
  };

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center",
            pulseActive && "animate-pulse"
          )}
          aria-label="Open chat"
          title="Ask Applyza"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={cn(
            "fixed z-[60] flex flex-col bg-background shadow-2xl border border-border overflow-hidden",
            isMobile
              ? "inset-0"
              : "bottom-6 right-6 w-[380px] h-[520px] rounded-2xl animate-in slide-in-from-bottom-4 duration-300"
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(230,60%,10%)] text-primary-foreground shrink-0">
            {isMobile ? (
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                <ArrowLeft size={20} />
              </button>
            ) : null}
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Applyza AI</span>
                <span className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <p className="text-xs text-primary-foreground/70 truncate">
                Ask me anything about studying abroad
              </p>
            </div>
            {!isMobile && (
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X size={18} />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i}>
                {shouldShowTimestamp(i) && (
                  <p className="text-center text-[10px] text-muted-foreground my-2">
                    {formatTime(msg.timestamp)}
                  </p>
                )}
                <div
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] px-3.5 py-2.5 text-sm whitespace-pre-wrap leading-relaxed",
                      msg.role === "user"
                        ? "bg-secondary text-secondary-foreground rounded-2xl rounded-br-sm"
                        : "bg-muted text-foreground rounded-2xl rounded-bl-sm"
                    )}
                  >
                    {msg.content}
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => speakMessage(msg.content, i)}
                        className="ml-2 inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={speakingMsgIndex === i ? "Stop speaking" : "Read aloud"}
                      >
                        {speakingMsgIndex === i ? (
                          <VolumeX size={14} />
                        ) : (
                          <Volume2 size={14} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuickReplies && !isLoading && (
              <div className={cn("flex gap-2 pt-1", isMobile ? "overflow-x-auto pb-2" : "flex-wrap")}>
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr.label}
                    onClick={() => sendMessage(qr.message)}
                    className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border border-secondary text-secondary bg-secondary/5 hover:bg-secondary/10 transition-colors"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className={cn("shrink-0 border-t border-border p-3", isMobile && "pb-safe")}>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1 h-10 px-4 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              />
              {supportsRecognition && (
                <button
                  onClick={toggleListening}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                    isListening
                      ? "bg-destructive text-destructive-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label={isListening ? "Stop recording" : "Start voice input"}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              )}
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/85 disabled:opacity-50 transition-colors"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
