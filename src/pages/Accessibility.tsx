import SEO from "@/components/SEO";
import { SparklesCore } from "@/components/ui/SparklesCore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Accessibility = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEO title="Accessibility Statement | Applyza" description="Applyza's commitment to digital accessibility for all users." path="/accessibility" />
    <Navbar solid />

    <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
      <div className="container relative z-10 pt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/30" />
            <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Accessibility</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Accessibility Statement</h1>
      </div>
    </section>

    <section className="bg-background py-12 flex-1">
      <div className="container max-w-3xl space-y-6 text-sm text-muted-foreground leading-relaxed">
        <p>Applyza is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards.</p>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">Our Commitment</h2>
          <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. We are actively working to increase the accessibility and usability of our website.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">Measures We Take</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Semantic HTML structure throughout the site</li>
            <li>Alt text on all meaningful images</li>
            <li>Keyboard navigable interface</li>
            <li>Sufficient colour contrast ratios</li>
            <li>Responsive design for all device sizes</li>
            <li>Form labels and error messages for screen readers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-primary mb-2">Feedback</h2>
          <p>If you encounter any accessibility barriers on our website, please let us know:</p>
          <div className="bg-muted/50 rounded-lg p-4 mt-2">
            <p>Email: <a href="mailto:info@applyza.com" className="text-secondary hover:underline">info@applyza.com</a></p>
            <p>Subject line: "Accessibility Feedback"</p>
          </div>
          <p className="mt-2">We aim to respond to feedback within 5 business days.</p>
        </section>
      </div>
    </section>

    <Footer />
  </div>
);

export default Accessibility;
