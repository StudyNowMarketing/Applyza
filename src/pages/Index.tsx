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
import WaveDivider from "@/components/WaveDivider";

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
      <WaveDivider from="#1B2150" to="#F2F3F7" variant="A" />
      <SectionReveal><EmpathyLoop /></SectionReveal>
      <WaveDivider from="#F2F3F7" to="#0a0d24" variant="B" />
      <SectionReveal><EligibilityQuizCTA /></SectionReveal>
      <WaveDivider from="#0a0d24" to="#0a0d24" variant="C" />
      <TrustStats />
      <WaveDivider from="#0a0d24" to="#f8f9fa" variant="A" />
      <SectionReveal><HowItWorks /></SectionReveal>
      <WaveDivider from="#f8f9fa" to="#0a0d24" variant="B" />
      <SectionReveal><StudyDestinations /></SectionReveal>
      <WaveDivider from="#0a0d24" to="#ffffff" variant="C" />
      <SectionReveal><PartnerUniversities /></SectionReveal>
      <WaveDivider from="#ffffff" to="#ffffff" variant="A" />
      <SectionReveal><WhyChooseApplyza /></SectionReveal>
      <WaveDivider from="#ffffff" to="#ffffff" variant="B" />
      <SectionReveal><UpcomingEvents /></SectionReveal>
      <WaveDivider from="#ffffff" to="#F5F6FA" variant="C" />
      <SectionReveal><Testimonials /></SectionReveal>
      <WaveDivider from="#F5F6FA" to="#1B2150" variant="A" />
      <SectionReveal><ClosingManifesto /></SectionReveal>
      <WaveDivider from="#1B2150" to="#f0fdf4" variant="B" />
      <SectionReveal><WhatsAppCommunity /></SectionReveal>
      <WaveDivider from="#dcfce7" to="#2EC4B6" variant="C" />
      <SectionReveal><FinalCTA /></SectionReveal>
      <WaveDivider from="#1B9E93" to="#0a0d24" variant="A" />
      <Footer />
      <SocialProofNotifications />
      <FloatingCTA />
    </div>
  );
};

export default Index;
