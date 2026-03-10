import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const AntiSlaveryPolicy = () => (
  <div className="min-h-screen">
    <Navbar solid />
    <section className="bg-card border-b border-border pt-20">
      <div className="container py-4">
        <Breadcrumb><BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Anti-Slavery Policy</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList></Breadcrumb>
      </div>
    </section>
    <section className="container py-20 max-w-2xl">
      <h1 className="text-3xl font-extrabold text-primary mb-4">Anti-Slavery Policy</h1>
      <p className="text-muted-foreground">This page is being updated. Please contact <a href="mailto:info@applyza.com" className="text-secondary font-semibold hover:underline">info@applyza.com</a> for any enquiries.</p>
    </section>
    <Footer />
  </div>
);

export default AntiSlaveryPolicy;
