import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import HowItWorks from "@/components/HowItWorks";
import ServicesOverview from "@/components/ServicesOverview";
import AICourseMatcher from "@/components/AICourseMatcher";
import StackingCards from "@/components/StackingCards";
import StudyDestinations from "@/components/StudyDestinations";
import PartnerUniversities from "@/components/PartnerUniversities";
import WhyChooseApplyza from "@/components/WhyChooseApplyza";
import ScholarshipsPreview from "@/components/ScholarshipsPreview";
import UpcomingEvents from "@/components/UpcomingEvents";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import PartnerLogos from "@/components/PartnerLogos";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HomepageLayout from "@/components/homepage/HomepageLayout";

const homepageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Applyza",
    url: "https://applyza.com",
    description: "Applyza helps international students study abroad with AI-powered course matching, expert counselling, and visa support.",
    sameAs: [
      "https://www.instagram.com/applyza",
      "https://www.facebook.com/applyza",
      "https://www.linkedin.com/company/applyza",
      "https://twitter.com/applyza",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Applyza",
    url: "https://applyza.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://applyza.com/find-a-course?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
];

const Index = () => {
  return (
    <HomepageLayout>
      <SEO
        title="Applyza | Study Abroad Made Smarter — Free Course Search & Expert Guidance"
        description="Discover thousands of courses at 150+ universities worldwide. Applyza offers AI-powered course matching, expert counselling, and visa support for genuine students."
        path="/"
        jsonLd={homepageJsonLd}
      />
      <Navbar />
      <div className="scroll-section" data-section="hero">
        <Hero />
      </div>
      <div className="scroll-section" data-section="stats">
        <TrustStats />
      </div>
      <div className="scroll-section" data-section="how-it-works">
        <HowItWorks />
      </div>
      <div className="scroll-section" data-section="services">
        <StackingCards />
      </div>
      <div className="scroll-section" data-section="destinations">
        <StudyDestinations />
      </div>
      <div className="scroll-section" data-section="partners">
        <PartnerUniversities />
      </div>
      <div className="scroll-section" data-section="why-choose">
        <WhyChooseApplyza />
      </div>
      <div className="scroll-section" data-section="scholarships">
        <ScholarshipsPreview />
      </div>
      <div className="scroll-section" data-section="events">
        <UpcomingEvents />
      </div>
      <div className="scroll-section" data-section="testimonials">
        <Testimonials />
      </div>
      <div className="scroll-section" data-section="blog">
        <BlogPreview />
      </div>
      <div className="scroll-section" data-section="logos">
        <PartnerLogos />
      </div>
      <div className="scroll-section" data-section="final-cta">
        <FinalCTA />
      </div>
      <Footer />
      <WhatsAppButton />
    </HomepageLayout>
  );
};

export default Index;
