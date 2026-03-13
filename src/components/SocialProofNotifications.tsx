import { useState, useEffect, useCallback } from "react";
import { GraduationCap, X, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const notifications = [
  { name: "Maria from Nigeria", action: "just booked a consultation", detail: "University Applications • 2 minutes ago", icon: "check" },
  { name: "Ahmed from Qatar", action: "was accepted to York St John University", detail: "MSc Business Management • 15 minutes ago", icon: "grad" },
  { name: "Priya from Kenya", action: "started her visa application", detail: "UK Student Visa • 28 minutes ago", icon: "check" },
  { name: "David from Ghana", action: "found his perfect course", detail: "BSc Computer Science • 45 minutes ago", icon: "grad" },
  { name: "Fatima from Türkiye", action: "received a scholarship offer", detail: "£3,000 International Excellence Award • 1 hour ago", icon: "grad" },
  { name: "James from Cyprus", action: "booked a counselling session", detail: "Student Counselling • 2 hours ago", icon: "check" },
  { name: "Amina from Nigeria", action: "got her visa approved", detail: "99% success rate • 3 hours ago", icon: "check" },
  { name: "Chen from China", action: "was matched with 5 courses", detail: "AI-Powered Matching • 4 hours ago", icon: "grad" },
];

const SocialProofNotifications = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("social_proof_dismissed") === "1") {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;

    // Show first notification after 3s
    const initialDelay = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed || !visible) return;

    // Hide after 5s
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [visible, dismissed, index]);

  useEffect(() => {
    if (dismissed || visible) return;
    // If not visible and not first render, queue next after 8s
    const nextTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % notifications.length);
      setVisible(true);
    }, 8000);

    return () => clearTimeout(nextTimer);
  }, [visible, dismissed]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem("social_proof_dismissed", "1");
  }, []);

  if (dismissed) return null;

  const n = notifications[index];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-24 sm:bottom-24 left-4 z-50 max-w-[300px] bg-white rounded-xl shadow-lg border border-gray-100 p-3 border-l-4 border-l-secondary"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
          <div className="flex items-start gap-2.5 pr-4">
            <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center shrink-0 mt-0.5">
              {n.icon === "grad" ? (
                <GraduationCap size={14} className="text-secondary" />
              ) : (
                <Check size={14} className="text-secondary" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-[13px] text-foreground leading-snug">
                <span className="font-bold">{n.name}</span> {n.action}
              </p>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">{n.detail}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofNotifications;
