import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const TermsConditions = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEO title="Terms of Service | Applyza" description="Terms and conditions governing the use of Applyza's services and website." path="/terms-and-conditions" />
    <Navbar solid />

    <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
      <div className="container relative z-10 pt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/30" />
            <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Terms of Service</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Terms of Service</h1>
        <p className="text-white/40 text-sm">Last updated: March 2026</p>
      </div>
    </section>

    <section className="bg-background py-12 flex-1">
      <div className="container max-w-3xl space-y-8 text-sm text-muted-foreground leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-primary mb-2">1. About Applyza</h2>
          <p>Applyza is a global education consultancy registered in the Republic of Cyprus. We provide free educational guidance, AI-powered course matching, university application support, visa and immigration assistance, student counselling, and accommodation services for international students seeking to study abroad.</p>
          <p className="mt-2">Our services are provided free of charge to students. Applyza earns commission from partner universities upon successful student enrolment. This commission structure does not affect the advice or recommendations we provide to students.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">2. Service Scope & Limitations</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Applyza is <strong>not a university</strong> and does not award degrees, diplomas, or academic qualifications of any kind.</li>
            <li>We do <strong>not guarantee admission</strong> to any university or educational institution. Admission decisions are made solely by the receiving institution.</li>
            <li>We do <strong>not guarantee visa approval</strong>. Visa decisions are made by the relevant immigration authorities. We provide guidance and support but cannot influence outcomes.</li>
            <li>We provide information and guidance to the best of our knowledge, but we are not liable for decisions made by universities, visa authorities, or other third parties.</li>
            <li>Course information, tuition fees, and entry requirements displayed on our website are sourced from partner universities and may change without notice. Always verify directly with the institution.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">3. Genuine Student Intent</h2>
          <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4">
            <p className="font-medium text-primary mb-1">Important — UKVI Compliance</p>
            <p>Applyza exclusively supports students with <strong>genuine educational intent</strong>. We do not facilitate, encourage, or assist with immigration without a genuine educational purpose. All students referred to our partner universities must demonstrate a sincere intention to study and complete their chosen programme.</p>
            <p className="mt-2">We reserve the right to refuse service to any individual whom we believe does not have genuine educational intent. This policy is critical for compliance with UK Visas and Immigration (UKVI) requirements and the integrity of our service.</p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">4. User Responsibilities</h2>
          <p>By using our website and services, you agree to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Provide accurate, truthful, and complete information in all forms and communications</li>
            <li>Have a genuine intention to study at the institution to which you are applying</li>
            <li>Not submit fraudulent, misleading, or fabricated documents</li>
            <li>Not use our services for any unlawful purpose</li>
            <li>Inform us promptly if any information you have provided changes</li>
            <li>Comply with the terms and conditions of any university to which you are accepted</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">5. Intellectual Property</h2>
          <p>All content on the Applyza website — including text, graphics, logos, images, icons, and software — is the property of Applyza or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written permission.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">6. Website Availability</h2>
          <p>We aim to keep our website available at all times but do not guarantee uninterrupted access. We may temporarily suspend the website for maintenance, updates, or for reasons beyond our control. We are not liable for any loss or inconvenience caused by temporary unavailability.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">7. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites (e.g., university websites, social media platforms). We are not responsible for the content, privacy practices, or terms of any third-party sites. Visiting these sites is at your own risk.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">8. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Applyza shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or website.</li>
            <li>Our total liability for any claim arising from or related to these terms shall not exceed the amount paid by you to Applyza for services (which, for students, is £0 as our service is free).</li>
            <li>We are not liable for any loss arising from reliance on information provided on our website or through our services, including course information, fee amounts, or visa requirements.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">9. Indemnification</h2>
          <p>You agree to indemnify and hold harmless Applyza, its directors, employees, and agents from any claims, losses, damages, liabilities, or expenses (including legal fees) arising from your breach of these terms, your misuse of our services, or any fraudulent activity on your part.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">10. Termination</h2>
          <p>We reserve the right to suspend or terminate your access to our services at any time, without notice, if we believe you have violated these terms or are engaging in fraudulent or dishonest behaviour. Termination does not affect any rights or obligations that have already accrued.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">11. Governing Law & Jurisdiction</h2>
          <p>These terms are governed by and construed in accordance with the laws of the Republic of Cyprus. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Cyprus.</p>
          <p className="mt-2">For services specifically related to UK education and immigration: these terms shall additionally be subject to the laws of England and Wales where applicable, and any disputes relating to UK services may be brought before the courts of England and Wales.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">12. Changes to These Terms</h2>
          <p>We may update these terms from time to time. The latest version will always be available on this page, and the "Last updated" date will be revised. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">13. Contact Us</h2>
          <p>For any questions about these terms, please contact us:</p>
          <div className="bg-muted/50 rounded-lg p-4 mt-2">
            <p className="font-medium text-primary">Applyza</p>
            <p>Email: <a href="mailto:info@applyza.com" className="text-secondary hover:underline">info@applyza.com</a></p>
            <p>Address: Nicosia, Cyprus</p>
          </div>
        </section>
      </div>
    </section>

    <Footer />
    <WhatsAppButton />
  </div>
);

export default TermsConditions;
