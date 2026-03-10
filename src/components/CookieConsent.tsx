import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("cookie_consent");
    if (!choice) setVisible(true);
  }, []);

  const handleChoice = (choice: "accepted" | "rejected") => {
    localStorage.setItem("cookie_consent", choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-card border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-4 md:py-3">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          We use cookies to improve your experience. Read our{" "}
          <Link to="/privacy-policy" className="text-secondary underline hover:no-underline">
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="teal"
            size="sm"
            className="rounded-full min-w-[120px]"
            onClick={() => handleChoice("accepted")}
          >
            Accept All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full min-w-[120px] border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => handleChoice("rejected")}
          >
            Reject All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
