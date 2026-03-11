import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqData = [
  {
    category: "General",
    items: [
      { q: "Is Applyza really free for students?", a: "Yes, completely. We never charge students for our services — not for consultations, applications, or visa support. Our services are funded by our university partners." },
      { q: "Who is Applyza?", a: "Applyza is a global education platform built by the team behind Study Now, which has placed over 3,000 students at 150+ universities with a 99% visa success rate. We combine expert counselling with AI technology to make studying abroad simpler, smarter, and free." },
      { q: "What countries can I study in through Applyza?", a: "We support students applying to universities in the United Kingdom, Germany, France, Ireland, Malta, the Netherlands, Canada, the USA, and more. Our course database is constantly growing." },
      { q: "Which countries do you support students from?", a: "We work with students from Nigeria, Ghana, Kenya, Türkiye, Qatar, and many other countries. If you're unsure whether we can help, just reach out." },
      { q: "How is Applyza different from other education consultancies?", a: "We combine the personal touch of an experienced consultancy with AI-powered technology. Our course matcher helps you find programmes you're eligible for instantly. Our counsellors provide real, human guidance. And everything is free." },
      { q: "Is Applyza a regulated education agent?", a: "Yes. Applyza operates within the UK Agent Quality Framework (AQF) and adheres to the National Code of Ethical Practice for Education Agents, established by the British Council, BUILA, UKCISA, and Universities UK International. Our counsellors are trained and certified through the British Council's programme." },
    ],
  },
  {
    category: "Courses & Applications",
    items: [
      { q: "How do I find the right course?", a: "Use our course search engine to browse programmes. You can filter by country, subject, study level, fees, and more. Or book a consultation and let our counsellors recommend options based on your profile." },
      { q: "Can I apply to multiple universities?", a: "Yes. We encourage it. Our counsellors can help you build a balanced shortlist and manage all your applications simultaneously." },
      { q: "What documents do I need to apply?", a: "This depends on the university and programme. Typically you'll need academic transcripts, proof of English proficiency, a personal statement, a passport copy, and references. Your counsellor will provide a complete tailored checklist." },
      { q: "How long does the application process take?", a: "From first consultation to receiving an offer, the process typically takes 2 to 6 weeks depending on the university and your readiness." },
    ],
  },
  {
    category: "Visa",
    items: [
      { q: "What is your visa success rate?", a: "99%. Our compliance team has extensive experience and ensures every detail is covered before submission." },
      { q: "Do you help with visa applications?", a: "Yes. We provide full visa support including document preparation, financial evidence guidance, application form assistance, and mock interview preparation where needed." },
      { q: "What happens if my visa is refused?", a: "While rare, we'll review the refusal reasons and advise on next steps — which may include reapplying or considering alternative options." },
    ],
  },
  {
    category: "Consultations",
    items: [
      { q: "How do I book a consultation?", a: "Click 'Book a Free Consultation' anywhere on the site. Fill in your details and preferred time, and one of our counsellors will be in touch within 24 hours." },
      { q: "Can my parents join the consultation?", a: "Absolutely. We welcome family involvement and offer family consultation sessions." },
      { q: "Do you provide support after I've enrolled?", a: "Yes. Our support continues beyond enrolment. We're here to help with any questions or challenges that arise during your studies." },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="FAQ | Frequently Asked Questions | Applyza"
        description="Find answers to common questions about studying abroad, visa applications, course selection, and Applyza's free services."
        path="/faq"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqData.flatMap((group) =>
            group.items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            }))
          ),
        }}
      />
      <Navbar solid />

      {/* Hero */}
      <section className="bg-primary" style={{ minHeight: "35vh", display: "flex", alignItems: "flex-end" }}>
        <div className="container pb-12 pt-28">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground/80">FAQ</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mt-4 mb-3">Frequently Asked Questions</h1>
          <p className="text-primary-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Got questions? We've got answers. And if you can't find what you're looking for, book a free consultation.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-background py-16 md:py-20">
        <div className="container max-w-3xl">
          {faqData.map((group) => (
            <div key={group.category} className="mb-10 last:mb-0">
              <h2 className="text-xl md:text-2xl font-extrabold text-primary mb-5">{group.category}</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {group.items.map((item, i) => (
                  <AccordionItem key={i} value={`${group.category}-${i}`} className="bg-card rounded-xl border shadow-sm px-5">
                    <AccordionTrigger className="text-left text-primary font-semibold text-sm md:text-base hover:no-underline py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-14">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-accent-foreground mb-3">Still have questions?</h2>
          <p className="text-accent-foreground/70 mb-6">Our team is here to help — book a free consultation or get in touch.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="teal" size="lg" className="rounded-full" asChild>
              <Link to="/book-a-consultation">Book a Free Consultation</Link>
            </Button>
            <Button variant="outline-white" size="lg" className="rounded-full" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default FAQ;
