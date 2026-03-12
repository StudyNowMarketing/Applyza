import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const TermsConditions = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar solid />

    <section className="relative overflow-hidden py-10" style={{ background: "#0a0d24" }}>
      <div className="container relative z-10 pt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-white/40 hover:text-white/60 text-sm">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/30" />
            <BreadcrumbItem><BreadcrumbPage className="text-white/60 text-sm">Terms & Conditions</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">Terms & Conditions</h1>
      </div>
    </section>

    <section className="bg-background py-12 flex-1">
      <div className="container max-w-3xl">
        <p className="text-sm text-muted-foreground">This page is being updated. Please contact <a href="mailto:info@applyza.com" className="text-secondary font-semibold hover:underline">info@applyza.com</a> for any enquiries.</p>
      </div>
    </section>

    <Footer />
  </div>
);

export default TermsConditions;
