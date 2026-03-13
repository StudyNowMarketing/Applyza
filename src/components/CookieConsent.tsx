import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield } from "lucide-react";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieConsentContextType {
  preferences: CookiePreferences;
  hasConsented: boolean;
  openPreferences: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  preferences: { necessary: true, analytics: false, marketing: false, functional: false },
  hasConsented: false,
  openPreferences: () => {},
});

export const useCookieConsent = () => useContext(CookieConsentContext);

const defaultPrefs: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

const categories = [
  {
    key: "necessary" as const,
    label: "Strictly Necessary",
    description: "Essential for the website to function. These cannot be disabled.",
    cookies: "cookie_consent, session cookies",
    locked: true,
  },
  {
    key: "analytics" as const,
    label: "Analytics",
    description: "Help us understand how visitors use our site so we can improve it.",
    cookies: "Google Analytics (_ga, _gid, _gat) — if enabled",
    locked: false,
  },
  {
    key: "marketing" as const,
    label: "Marketing",
    description: "Used to deliver relevant advertisements and track campaign performance.",
    cookies: "None currently in use",
    locked: false,
  },
  {
    key: "functional" as const,
    label: "Functional",
    description: "Enable enhanced functionality and personalisation, such as language or theme preferences.",
    cookies: "Language preference, theme preference",
    locked: false,
  },
];

const CookieConsent = () => {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPrefs);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_preferences");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences({ ...defaultPrefs, ...parsed, necessary: true });
        setHasConsented(true);
      } catch {
        setBannerVisible(true);
      }
    } else {
      setBannerVisible(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    const final = { ...prefs, necessary: true };
    localStorage.setItem("cookie_preferences", JSON.stringify(final));
    // Legacy key for backwards compat
    localStorage.setItem("cookie_consent", final.analytics || final.marketing ? "accepted" : "rejected");
    setPreferences(final);
    setHasConsented(true);
    setBannerVisible(false);
    setPrefsOpen(false);
  };

  const handleAcceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true, functional: true });
  };

  const handleRejectAll = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false, functional: false });
  };

  const handleSavePrefs = () => {
    savePreferences(preferences);
  };

  const openPreferences = useCallback(() => {
    setPrefsOpen(true);
  }, []);

  const togglePref = (key: keyof CookiePreferences) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <CookieConsentContext.Provider value={{ preferences, hasConsented, openPreferences }}>
      {/* Banner */}
      {bannerVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-[70] bg-card border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
          <div className="container py-4 md:py-5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Shield size={20} className="text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-primary mb-1">We value your privacy</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We use cookies to improve your browsing experience, analyse site traffic, and personalise content. 
                    You can choose which cookies to accept. Read our{" "}
                    <Link to="/cookie-policy" className="text-secondary underline hover:no-underline">Cookie Policy</Link>{" "}
                    for more details.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs flex-1 md:flex-none min-w-[130px]"
                  onClick={() => { setPrefsOpen(true); }}
                >
                  Manage Preferences
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs flex-1 md:flex-none min-w-[100px] border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={handleRejectAll}
                >
                  Reject All
                </Button>
                <Button
                  variant="teal"
                  size="sm"
                  className="rounded-full text-xs flex-1 md:flex-none min-w-[100px]"
                  onClick={handleAcceptAll}
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      <Dialog open={prefsOpen} onOpenChange={setPrefsOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield size={18} className="text-secondary" />
              Cookie Preferences
            </DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground mb-4">
            Choose which cookie categories you'd like to allow. Strictly necessary cookies are always active 
            as they are essential for the website to function. Learn more in our{" "}
            <Link to="/cookie-policy" className="text-secondary underline hover:no-underline" onClick={() => setPrefsOpen(false)}>
              Cookie Policy
            </Link>.
          </p>

          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.key} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-semibold text-primary">{cat.label}</h4>
                  <Switch
                    checked={preferences[cat.key]}
                    onCheckedChange={() => togglePref(cat.key)}
                    disabled={cat.locked}
                    className={cat.locked ? "opacity-50" : ""}
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-1.5">{cat.description}</p>
                <p className="text-[10px] text-muted-foreground/60">
                  <span className="font-medium">Cookies:</span> {cat.cookies}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-3">
            <Button variant="teal" size="sm" className="rounded-full flex-1" onClick={handleSavePrefs}>
              Save Preferences
            </Button>
            <Button variant="outline" size="sm" className="rounded-full flex-1" onClick={handleAcceptAll}>
              Accept All
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </CookieConsentContext.Provider>
  );
};

export default CookieConsent;
