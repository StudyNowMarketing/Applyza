import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const AntiSlaveryPolicy = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEO
      title="Modern Slavery Statement | Applyza"
      description="Applyza's Modern Slavery and Human Trafficking Statement pursuant to Section 54 of the Modern Slavery Act 2015."
      path="/anti-slavery-policy"
    />
    <Navbar solid />

    <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
      <div className="container relative z-10 pt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/30" />
            <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Modern Slavery Statement</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Modern Slavery &amp; Human Trafficking Statement</h1>
      </div>
    </section>

    <section className="bg-background py-12 flex-1">
      <div className="container max-w-3xl prose prose-sm prose-neutral">
        <p className="text-muted-foreground leading-relaxed">
          Applyza is committed to preventing modern slavery and human trafficking in all its forms. This statement is made pursuant to Section 54 of the Modern Slavery Act 2015.
        </p>

        <h2 className="text-lg font-bold text-primary mt-8 mb-3">About Applyza</h2>
        <p className="text-muted-foreground leading-relaxed">
          Applyza is an international education consultancy headquartered in Nicosia, Cyprus, with offices in Nigeria, Ghana, Kenya, Qatar, and Türkiye. We help international students access higher education opportunities worldwide.
        </p>

        <h2 className="text-lg font-bold text-primary mt-8 mb-3">Our Commitment</h2>
        <p className="text-muted-foreground leading-relaxed">
          We are committed to ensuring that there is no modern slavery or human trafficking in our supply chains or in any part of our business. We expect the same standards from our partners, suppliers, and contractors.
        </p>

        <h2 className="text-lg font-bold text-primary mt-8 mb-3">Our Policies</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          We operate the following policies to identify and prevent slavery and human trafficking in our operations:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Recruitment policy:</strong> We verify the identity and right to work of all employees.</li>
          <li><strong className="text-foreground">Whistleblowing policy:</strong> We encourage reporting of concerns.</li>
          <li><strong className="text-foreground">Code of conduct:</strong> We expect ethical behaviour from all staff and partners.</li>
          <li><strong className="text-foreground">Due diligence:</strong> We conduct due diligence on new suppliers and partners.</li>
        </ul>

        <h2 className="text-lg font-bold text-primary mt-8 mb-3">Our Due Diligence for Partner Universities</h2>
        <p className="text-muted-foreground leading-relaxed">
          We work only with accredited, recognised educational institutions. We verify that our partner universities comply with local labour laws and ethical standards.
        </p>

        <h2 className="text-lg font-bold text-primary mt-8 mb-3">Training</h2>
        <p className="text-muted-foreground leading-relaxed">
          All staff receive training on identifying signs of modern slavery and understanding our obligations under the Modern Slavery Act.
        </p>

        <h2 className="text-lg font-bold text-primary mt-8 mb-3">Reporting Concerns</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you have any concerns about modern slavery in relation to Applyza or our partners, please contact us at{" "}
          <a href="mailto:info@applyza.com" className="text-secondary font-semibold hover:underline">info@applyza.com</a>.
        </p>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-muted-foreground text-sm">This statement is reviewed annually. Last updated: March 2026.</p>
          <p className="text-muted-foreground text-sm mt-2">Signed: The Board of Directors, Applyza</p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default AntiSlaveryPolicy;
