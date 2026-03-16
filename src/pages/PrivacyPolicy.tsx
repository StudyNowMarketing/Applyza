import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const toc = [
  { id: "who-we-are", label: "1. Who We Are" },
  { id: "data-controller", label: "2. Data Controller" },
  { id: "data-we-collect", label: "3. What Data We Collect" },
  { id: "why-we-collect", label: "4. Why We Collect Your Data" },
  { id: "legal-basis", label: "5. Legal Basis for Processing" },
  { id: "data-storage", label: "6. How We Store & Protect Data" },
  { id: "data-retention", label: "7. Data Retention" },
  { id: "third-parties", label: "8. Third Parties" },
  { id: "international-transfers", label: "9. International Data Transfers" },
  { id: "your-rights", label: "10. Your Rights Under GDPR" },
  { id: "exercise-rights", label: "11. Exercise Your Rights" },
  { id: "supervisory-authority", label: "12. Supervisory Authority" },
  { id: "cookies", label: "13. Cookies" },
  { id: "changes", label: "14. Changes to This Policy" },
  { id: "contact", label: "15. Contact Us" },
];

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEO title="Privacy Policy | Applyza" description="How Applyza collects, uses, and protects your personal data. GDPR and UK GDPR compliant." path="/privacy-policy" />
    <Navbar solid />

    {/* Dark Hero */}
    <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
      <SparklesCore className="absolute inset-0 z-[1]" background="transparent" particleColor="#2EC4B6" particleDensity={60} minSize={0.4} maxSize={1.5} speed={1.5} />
      <div className="container relative z-10 pt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/30" />
            <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Privacy Policy</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm">Last updated: March 2026</p>
      </div>
    </section>

    {/* Content */}
    <section className="bg-background py-12 flex-1">
      <div className="container max-w-3xl">
        {/* Table of Contents */}
        <div className="bg-card rounded-xl border border-border p-5 mb-8">
          <h2 className="text-sm font-bold text-primary mb-3">Table of Contents</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-xs text-secondary hover:underline">{item.label}</a>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section id="who-we-are">
            <h2 className="text-base font-bold text-primary mb-2">1. Who We Are</h2>
            <p>Applyza is a global education consultancy headquartered in Nicosia, Cyprus. We provide free educational guidance, course matching, university application support, visa assistance, and student counselling for international students. This privacy policy explains how we collect, use, and protect your personal data when you use our website (applyza.com) and our services.</p>
          </section>

          <section id="data-controller">
            <h2 className="text-base font-bold text-primary mb-2">2. Data Controller</h2>
            <p>The data controller responsible for your personal data is:</p>
            <div className="bg-muted/50 rounded-lg p-4 mt-2">
              <p className="font-medium text-primary">Applyza</p>
              <p>Nicosia, Cyprus</p>
              <p>Email: <a href="mailto:info@applyza.com" className="text-secondary hover:underline">info@applyza.com</a></p>
            </div>
          </section>

          <section id="data-we-collect">
            <h2 className="text-base font-bold text-primary mb-2">3. What Data We Collect</h2>
            <p className="mb-3">We collect personal data that you provide directly through our website forms, as well as data collected automatically when you visit our site:</p>
            
            <h3 className="text-sm font-semibold text-primary mt-4 mb-1">Data you provide:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact form:</strong> name, email address, phone number, user type, message</li>
              <li><strong>Consultation booking:</strong> name, email, phone, service interest, consultation type, preferred date, message</li>
              <li><strong>Institution enquiries:</strong> institution name, contact person, job title, email, phone, country, message</li>
              <li><strong>Partner enquiries:</strong> name, company name, email, phone, country, students per year, message</li>
              <li><strong>Event registration:</strong> email address</li>
            </ul>

            <h3 className="text-sm font-semibold text-primary mt-4 mb-1">Data collected automatically:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Website usage:</strong> pages visited, time on site, referral source</li>
              <li><strong>Technical data:</strong> IP address (anonymised), browser type, device type, operating system</li>
              <li><strong>Cookies:</strong> as described in our <Link to="/cookie-policy" className="text-secondary hover:underline">Cookie Policy</Link></li>
              <li><strong>Course search:</strong> search queries (anonymised, not linked to individual users)</li>
            </ul>
          </section>

          <section id="why-we-collect">
            <h2 className="text-base font-bold text-primary mb-2">4. Why We Collect Your Data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond to your enquiries and provide requested information</li>
              <li>To provide education consultancy services, including course matching and application support</li>
              <li>To process university applications on your behalf</li>
              <li>To arrange and manage consultations</li>
              <li>To facilitate communication with partner universities</li>
              <li>To send event-related communications (only with your consent)</li>
              <li>To improve our website and services through analytics</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section id="legal-basis">
            <h2 className="text-base font-bold text-primary mb-2">5. Legal Basis for Processing</h2>
            <p className="mb-3">We process your personal data based on the following lawful bases under GDPR Article 6:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Consent (Art. 6(1)(a)):</strong> When you submit a form on our website, you provide explicit consent through our consent checkboxes. This applies to contact forms, consultation bookings, and event registrations. You may withdraw consent at any time.</li>
              <li><strong>Legitimate Interest (Art. 6(1)(f)):</strong> We have a legitimate interest in improving our services, maintaining website security, and conducting analytics to understand how our website is used. We ensure this does not override your rights and freedoms.</li>
              <li><strong>Contract (Art. 6(1)(b)):</strong> When you engage our consultancy services, processing your data is necessary to perform the contract — including submitting university applications, arranging visa guidance, and coordinating with institutions on your behalf.</li>
              <li><strong>Legal Obligation (Art. 6(1)(c)):</strong> We may process your data to comply with legal requirements, such as record-keeping obligations.</li>
            </ul>
          </section>

          <section id="data-storage">
            <h2 className="text-base font-bold text-primary mb-2">6. How We Store & Protect Your Data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your data is stored in a secure cloud database with encryption at rest (AES-256)</li>
              <li>All data transmitted between your browser and our servers is encrypted using SSL/TLS (HTTPS)</li>
              <li>Access to personal data is strictly restricted to authorised Applyza staff only</li>
              <li>We conduct regular security reviews and follow industry best practices</li>
              <li>Our database provider maintains SOC 2 Type II compliance</li>
            </ul>
          </section>

          <section id="data-retention">
            <h2 className="text-base font-bold text-primary mb-2">7. Data Retention</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact form submissions:</strong> retained for 2 years from the date of submission</li>
              <li><strong>Consultation requests:</strong> retained for 2 years from the date of submission</li>
              <li><strong>Application data:</strong> retained for 6 years from the end of the academic year in which the application was processed (legal requirement for education sector record-keeping)</li>
              <li><strong>Cookie consent preferences:</strong> retained in your browser's local storage until you clear it or change your preferences</li>
              <li><strong>Analytics data:</strong> aggregated and anonymised data may be retained indefinitely; individual-level analytics data is retained for 14 months</li>
            </ul>
            <p className="mt-2">You can request deletion of your data at any time by contacting us at <a href="mailto:info@applyza.com" className="text-secondary hover:underline">info@applyza.com</a>.</p>
          </section>

          <section id="third-parties">
            <h2 className="text-base font-bold text-primary mb-2">8. Third Parties We Share Data With</h2>
            <p className="mb-3">We may share your personal data with the following categories of third parties:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Partner universities:</strong> With your explicit consent, we share application-related data with universities for the purpose of processing your application. This may include your name, academic qualifications, personal statement, and supporting documents.</li>
              <li><strong>Supabase (database provider):</strong> Our data is stored using Supabase, a cloud database platform based in the United States. Data is encrypted at rest and in transit.</li>
              <li><strong>Vercel (website hosting):</strong> Our website is hosted on Vercel's global infrastructure.</li>
              <li><strong>Cloudflare (CDN & security):</strong> We use Cloudflare for content delivery and website security.</li>
            </ul>
            <p className="mt-3 font-medium text-primary">We will never sell your personal data to third parties.</p>
          </section>

          <section id="international-transfers">
            <h2 className="text-base font-bold text-primary mb-2">9. International Data Transfers</h2>
            <p>Your personal data may be transferred to and processed in countries outside the European Economic Area (EEA), including the United States, for the purposes of data storage and website hosting. Where such transfers occur, we ensure that appropriate safeguards are in place, including:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
              <li>Adequacy decisions where applicable</li>
              <li>Binding Corporate Rules where applicable</li>
            </ul>
          </section>

          <section id="your-rights">
            <h2 className="text-base font-bold text-primary mb-2">10. Your Rights Under GDPR</h2>
            <p className="mb-3">Under the General Data Protection Regulation (GDPR) and UK GDPR, you have the following rights:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Right of access:</strong> You have the right to request a copy of the personal data we hold about you.</li>
              <li><strong>Right to rectification:</strong> You have the right to request correction of inaccurate or incomplete personal data.</li>
              <li><strong>Right to erasure:</strong> You have the right to request deletion of your personal data ("right to be forgotten"), subject to legal retention requirements.</li>
              <li><strong>Right to restrict processing:</strong> You have the right to request that we limit how we use your data.</li>
              <li><strong>Right to data portability:</strong> You have the right to receive your data in a structured, commonly used, machine-readable format.</li>
              <li><strong>Right to object:</strong> You have the right to object to processing based on legitimate interest or for direct marketing purposes.</li>
              <li><strong>Right to withdraw consent:</strong> Where processing is based on consent, you may withdraw consent at any time without affecting the lawfulness of processing carried out before withdrawal.</li>
              <li><strong>Right to lodge a complaint:</strong> You have the right to lodge a complaint with a supervisory authority (see below).</li>
            </ul>
          </section>

          <section id="exercise-rights">
            <h2 className="text-base font-bold text-primary mb-2">11. Exercise Your Rights</h2>
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-5">
              <p className="font-medium text-primary mb-2">How to make a Data Subject Request</p>
              <p>To request access to, correction, or deletion of your personal data, email us at <a href="mailto:info@applyza.com" className="text-secondary font-semibold hover:underline">info@applyza.com</a> with the subject line <strong>"Data Subject Request"</strong>.</p>
              <p className="mt-2">We will acknowledge your request within 48 hours and respond substantively within <strong>30 days</strong>, as required by GDPR. In complex cases, this may be extended by a further 60 days, and we will inform you if this is the case.</p>
              <p className="mt-2">You will not be charged a fee for exercising your rights, except in cases of manifestly unfounded or excessive requests.</p>
            </div>
          </section>

          <section id="supervisory-authority">
            <h2 className="text-base font-bold text-primary mb-2">12. Supervisory Authority</h2>
            <p className="mb-3">If you are unhappy with how we have handled your personal data, you have the right to lodge a complaint with the relevant supervisory authority:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium text-primary text-xs mb-1">For EU users (Cyprus HQ):</p>
                <p className="text-xs">Office of the Commissioner for Personal Data Protection</p>
                <p className="text-xs">Nicosia, Cyprus</p>
                <p className="text-xs"><a href="http://www.dataprotection.gov.cy" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">www.dataprotection.gov.cy</a></p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium text-primary text-xs mb-1">For UK users:</p>
                <p className="text-xs">Information Commissioner's Office (ICO)</p>
                <p className="text-xs">Wycliffe House, Water Lane, Wilmslow, SK9 5AF</p>
                <p className="text-xs"><a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">ico.org.uk</a></p>
              </div>
            </div>
          </section>

          <section id="cookies">
            <h2 className="text-base font-bold text-primary mb-2">13. Cookies</h2>
            <p>Our website uses cookies to improve your experience. We categorise cookies as strictly necessary, analytics, marketing, and functional. You can manage your cookie preferences at any time using our cookie consent banner or by visiting our <Link to="/cookie-policy" className="text-secondary hover:underline">Cookie Policy</Link> page.</p>
            <p className="mt-2">Only strictly necessary cookies are set by default. Analytics, marketing, and functional cookies are only activated if you provide explicit consent.</p>
          </section>

          <section id="changes">
            <h2 className="text-base font-bold text-primary mb-2">14. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. The latest version will always be available on this page, and the "Last updated" date at the top will be revised accordingly. We encourage you to review this policy periodically.</p>
          </section>

          <section id="contact">
            <h2 className="text-base font-bold text-primary mb-2">15. Contact Us</h2>
            <p>For any privacy-related questions, concerns, or data subject requests, please contact us:</p>
            <div className="bg-muted/50 rounded-lg p-4 mt-2">
              <p className="font-medium text-primary">Applyza — Data Protection</p>
              <p>Email: <a href="mailto:info@applyza.com" className="text-secondary hover:underline">info@applyza.com</a></p>
              <p>Address: Nicosia, Cyprus</p>
            </div>
          </section>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default PrivacyPolicy;
