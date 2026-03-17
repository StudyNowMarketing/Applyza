import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EmpathyLoop from "@/components/EmpathyLoop";
import EligibilityQuizCTA from "@/components/EligibilityQuizCTA";
import TrustStats from "@/components/TrustStats";
import HowItWorks from "@/components/HowItWorks";

import StudyDestinations from "@/components/StudyDestinations";
import PartnerUniversities from "@/components/PartnerUniversities";
import WhyChooseApplyza from "@/components/WhyChooseApplyza";

import UpcomingEvents from "@/components/UpcomingEvents";
import Testimonials from "@/components/Testimonials";

import ClosingManifesto from "@/components/ClosingManifesto";
import FinalCTA from "@/components/FinalCTA";
import WhatsAppCommunity from "@/components/WhatsAppCommunity";
import Footer from "@/components/Footer";
import SocialProofNotifications from "@/components/SocialProofNotifications";
import FloatingCTA from "@/components/FloatingCTA";
import SectionReveal from "@/components/SectionReveal";

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
      <Hero />
      <SectionReveal><EmpathyLoop /></SectionReveal>
      <SectionReveal><EligibilityQuizCTA /></SectionReveal>
      <TrustStats />
      <SectionReveal><HowItWorks /></SectionReveal>
      
      <SectionReveal><StudyDestinations /></SectionReveal>
      <SectionReveal><PartnerUniversities /></SectionReveal>
      <SectionReveal><WhyChooseApplyza /></SectionReveal>
      
      <SectionReveal><UpcomingEvents /></SectionReveal>
      <SectionReveal><Testimonials /></SectionReveal>
      
      <SectionReveal><ClosingManifesto /></SectionReveal>
      <SectionReveal><WhatsAppCommunity /></SectionReveal>
      <SectionReveal><FinalCTA /></SectionReveal>
      <Footer />
      <SocialProofNotifications />
      <FloatingCTA />
    </div>
  );
};

export default Index;
