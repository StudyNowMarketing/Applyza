import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const sections = [
  {
    title: "1. Who We Are",
    text: "Applyza is a global education consultancy headquartered in Cyprus. This privacy policy explains how we collect, use, and protect your personal data when you use our website (applyza.com) and our services.",
  },
  {
    title: "2. What Data We Collect",
    text: "We collect personal data that you provide directly through our website forms, including: your name, email address, phone number, country of residence, and any information you include in messages or consultation requests. We also collect basic usage data through cookies (see Cookie Policy below).",
  },
  {
    title: "3. Why We Collect Your Data",
    text: "We use your personal data to: respond to your enquiries, provide education consultancy services, match you with suitable courses and universities, process visa guidance requests, send event updates (only if you opt in), and improve our website and services.",
  },
  {
    title: "4. Legal Basis for Processing",
    text: "We process your data based on: your consent (provided through form checkboxes on our website), legitimate interest (to respond to enquiries and provide requested services), and contractual necessity (to deliver consultancy services you have requested).",
  },
  {
    title: "5. Who We Share Your Data With",
    text: "We may share your personal data with: partner universities (only when you request us to submit an application on your behalf), and service providers who help us operate our website (such as our hosting and database providers). We will never sell your personal data to third parties.",
  },
  {
    title: "6. How Long We Keep Your Data",
    text: "We retain your personal data for as long as necessary to provide our services, and for up to 3 years after your last interaction with us. You can request deletion of your data at any time.",
  },
  {
    title: "7. Your Rights",
    text: "Under GDPR and UK GDPR, you have the right to: access your personal data, correct inaccurate data, request deletion of your data, object to processing, request data portability, and withdraw consent at any time. To exercise any of these rights, contact us at info@applyza.com.",
  },
  {
    title: "8. Cookies",
    text: "Our website uses essential cookies required for the site to function. We also use analytics cookies to understand how visitors use our site — these are only activated if you accept cookies via our consent banner. You can change your cookie preferences at any time.",
  },
  {
    title: "9. Data Security",
    text: "Your personal data is stored securely using industry-standard encryption. Access to personal data is restricted to authorised Applyza staff only.",
  },
  {
    title: "10. Changes to This Policy",
    text: "We may update this policy from time to time. The latest version will always be available on this page.",
  },
  {
    title: "11. Contact Us",
    text: "For any privacy-related questions, contact us at: info@applyza.com",
  },
];

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar solid />

    {/* Dark Hero */}
    <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
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
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-bold text-primary mb-2">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default PrivacyPolicy;
