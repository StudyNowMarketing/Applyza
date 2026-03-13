import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/homepage/HeroSection";
import AnimatedStats from "@/components/homepage/AnimatedStats";
import MissionStatement from "@/components/homepage/MissionStatement";
import ServicesCards from "@/components/homepage/ServicesCards";
import PartnerLogos from "@/components/homepage/PartnerLogos";
import DestinationsSection from "@/components/homepage/DestinationsSection";
import ProofSection from "@/components/homepage/ProofSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import AiChatbotCTA from "@/components/homepage/AiChatbotCTA";
import BlogPreviewSection from "@/components/homepage/BlogPreviewSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";
import Footer from "@/components/Footer";
import SocialProofNotifications from "@/components/SocialProofNotifications";

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
    <div className="min-h-screen">
      <SEO
        title="Applyza | Study Abroad Made Smarter — Free Course Search & Expert Guidance"
        description="Discover thousands of courses at 150+ universities worldwide. Applyza offers AI-powered course matching, expert counselling, and visa support for genuine students."
        path="/"
        jsonLd={homepageJsonLd}
      />
      <Navbar />
      <HeroSection />
      <AnimatedStats />
      <MissionStatement />
      <ServicesCards />
      <PartnerLogos />
      <DestinationsSection />
      <ProofSection />
      <TestimonialsSection />
      <AiChatbotCTA />
      <BlogPreviewSection />
      <FinalCTASection />
      <Footer />
      <SocialProofNotifications />
    </div>
  );
};

export default Index;
