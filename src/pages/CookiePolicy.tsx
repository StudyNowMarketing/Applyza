import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/components/CookieConsent";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CookiePolicy = () => {
  const { openPreferences } = useCookieConsent();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Cookie Policy | Applyza" description="How Applyza uses cookies on its website. Learn about cookie categories and how to manage your preferences." path="/cookie-policy" />
      <Navbar solid />

      <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
        <div className="container relative z-10 pt-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Cookie Policy</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Cookie Policy</h1>
          <p className="text-white/40 text-sm">Last updated: March 2026</p>
        </div>
      </section>

      <section className="bg-background py-12 flex-1">
        <div className="container max-w-3xl space-y-8 text-sm text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-base font-bold text-primary mb-2">What Are Cookies?</h2>
            <p>Cookies are small text files that are placed on your device (computer, tablet, or phone) when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners useful information about how their site is used.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-primary mb-2">Cookies We Use</h2>
            <p className="mb-4">We categorise our cookies into four groups. Only strictly necessary cookies are set by default — all others require your explicit consent.</p>

            <div className="space-y-4">
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="text-sm font-bold text-primary mb-1">🔒 Strictly Necessary</h3>
                <p className="text-xs mb-2">These cookies are essential for the website to function. They cannot be disabled.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="border-b"><th className="text-left py-1 pr-3 font-medium">Cookie</th><th className="text-left py-1 pr-3 font-medium">Purpose</th><th className="text-left py-1 font-medium">Expiry</th></tr></thead>
                    <tbody>
                      <tr className="border-b"><td className="py-1.5 pr-3 font-mono">cookie_preferences</td><td className="py-1.5 pr-3">Stores your cookie consent preferences</td><td className="py-1.5">Persistent (localStorage)</td></tr>
                      <tr><td className="py-1.5 pr-3 font-mono">cookie_consent</td><td className="py-1.5 pr-3">Legacy consent flag</td><td className="py-1.5">Persistent (localStorage)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="text-sm font-bold text-primary mb-1">📊 Analytics</h3>
                <p className="text-xs mb-2">These cookies help us understand how visitors interact with our website so we can improve it. Only set if you consent.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="border-b"><th className="text-left py-1 pr-3 font-medium">Cookie</th><th className="text-left py-1 pr-3 font-medium">Purpose</th><th className="text-left py-1 font-medium">Expiry</th></tr></thead>
                    <tbody>
                      <tr className="border-b"><td className="py-1.5 pr-3 font-mono">_ga</td><td className="py-1.5 pr-3">Google Analytics — distinguishes unique users</td><td className="py-1.5">2 years</td></tr>
                      <tr className="border-b"><td className="py-1.5 pr-3 font-mono">_gid</td><td className="py-1.5 pr-3">Google Analytics — distinguishes unique users</td><td className="py-1.5">24 hours</td></tr>
                      <tr><td className="py-1.5 pr-3 font-mono">_gat</td><td className="py-1.5 pr-3">Google Analytics — throttle request rate</td><td className="py-1.5">1 minute</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="text-sm font-bold text-primary mb-1">⚙️ Functional</h3>
                <p className="text-xs mb-2">These cookies enable enhanced functionality and personalisation. Only set if you consent.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="border-b"><th className="text-left py-1 pr-3 font-medium">Cookie</th><th className="text-left py-1 pr-3 font-medium">Purpose</th><th className="text-left py-1 font-medium">Expiry</th></tr></thead>
                    <tbody>
                      <tr className="border-b"><td className="py-1.5 pr-3 font-mono">lang_pref</td><td className="py-1.5 pr-3">Stores your language preference</td><td className="py-1.5">1 year</td></tr>
                      <tr><td className="py-1.5 pr-3 font-mono">theme</td><td className="py-1.5 pr-3">Stores your theme preference (light/dark)</td><td className="py-1.5">1 year</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="text-sm font-bold text-primary mb-1">📢 Marketing</h3>
                <p className="text-xs mb-2">These cookies are used to deliver relevant advertisements and track campaign performance. Only set if you consent.</p>
                <p className="text-xs text-muted-foreground italic">We do not currently use marketing cookies. If this changes, this policy will be updated and your consent will be requested.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-primary mb-2">How to Manage Your Cookie Preferences</h2>
            <p className="mb-3">You can change your cookie preferences at any time:</p>
            <Button variant="teal" size="sm" className="rounded-full mb-4" onClick={openPreferences}>
              Open Cookie Settings
            </Button>

            <h3 className="text-sm font-semibold text-primary mt-4 mb-2">Managing cookies in your browser</h3>
            <p className="mb-3">You can also manage cookies through your browser settings. Here's how:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
            </ul>
            <p className="mt-2">Please note that blocking all cookies may affect the functionality of our website.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-primary mb-2">Contact Us</h2>
            <p>If you have any questions about our use of cookies, please contact us at <a href="mailto:info@applyza.com" className="text-secondary hover:underline">info@applyza.com</a>.</p>
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
