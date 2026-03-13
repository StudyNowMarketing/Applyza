import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const avatars = [
  "bg-secondary", "bg-purple-400", "bg-amber-400", "bg-rose-400", "bg-blue-400",
];

const WhatsAppCommunity = () => (
  <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)" }}>
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <MessageCircle size={12} />
            Join Our Community
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight">
            Get Tips, Updates &amp; Support on WhatsApp
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-lg">
            Join thousands of students in our WhatsApp community. Get study abroad tips, deadline reminders, scholarship alerts, and connect with other students.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-6 py-3 text-sm gap-2"
            asChild
          >
            <a href="https://wa.me/message/YOUR_WHATSAPP_LINK" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} />
              Join WhatsApp Community →
            </a>
          </Button>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex -space-x-2">
              {avatars.map((bg, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-white flex items-center justify-center`}>
                  <span className="text-white text-[9px] font-bold">
                    {["M", "A", "P", "D", "F"][i]}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-medium">5,000+ students already joined</span>
          </div>
        </div>

        {/* Right — WhatsApp Chat Mockup (hidden on mobile) */}
        <div className="hidden lg:block">
          <div className="max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            {/* Header */}
            <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Applyza Community</p>
                <p className="text-white/60 text-[10px]">5,247 members</p>
              </div>
            </div>

            {/* Chat body */}
            <div className="bg-[#ECE5DD] p-4 space-y-3 min-h-[200px]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d5cec5' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
              {/* Admin message */}
              <div className="flex justify-start">
                <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[240px] shadow-sm">
                  <p className="text-[11px] text-[#075E54] font-semibold mb-0.5">Applyza Team</p>
                  <p className="text-xs text-gray-800 leading-relaxed">Welcome to the Applyza community! 🎉 Ask questions, share tips, and stay updated.</p>
                  <p className="text-[9px] text-gray-400 text-right mt-1">10:30 AM</p>
                </div>
              </div>

              {/* Alert message */}
              <div className="flex justify-start">
                <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[240px] shadow-sm">
                  <p className="text-[11px] text-[#075E54] font-semibold mb-0.5">Applyza Team</p>
                  <p className="text-xs text-gray-800 leading-relaxed">🎓 New scholarship alert: £3,000 at York St John University — apply before April 30!</p>
                  <p className="text-[9px] text-gray-400 text-right mt-1">11:15 AM</p>
                </div>
              </div>

              {/* Student message */}
              <div className="flex justify-end">
                <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none px-3 py-2 max-w-[200px] shadow-sm">
                  <p className="text-xs text-gray-800">Thanks! How do I apply? 🙏</p>
                  <p className="text-[9px] text-gray-400 text-right mt-1">11:18 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhatsAppCommunity;
