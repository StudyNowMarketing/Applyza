import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

const Events = () => (
  <div className="min-h-screen">
    <Navbar solid />
    <section className="bg-card border-b border-border pt-20">
      <div className="container py-4">
        <Breadcrumb><BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Events</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList></Breadcrumb>
      </div>
    </section>
    <section className="container py-20 text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">Upcoming Events</h1>
      <p className="text-muted-foreground max-w-lg mx-auto mb-8">Our events page is coming soon. Stay tuned for The Applyza Experience events across Africa, the Middle East, and South Asia.</p>
      <Button variant="teal" asChild><Link to="/book-a-consultation">Book a Free Consultation</Link></Button>
    </section>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Events;
