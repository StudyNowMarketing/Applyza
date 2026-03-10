import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const Blog = () => (
  <div className="min-h-screen">
    <Navbar solid />
    <section className="bg-card border-b border-border pt-20">
      <div className="container py-4">
        <Breadcrumb><BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Blog</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList></Breadcrumb>
      </div>
    </section>
    <section className="container py-20 text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">Guides, Tips & Insights</h1>
      <p className="text-muted-foreground max-w-lg mx-auto">Our blog is coming soon. We'll be sharing study abroad guides, visa tips, and career insights.</p>
    </section>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Blog;
