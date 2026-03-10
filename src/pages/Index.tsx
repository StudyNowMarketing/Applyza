import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import HowItWorks from "@/components/HowItWorks";
import ServicesOverview from "@/components/ServicesOverview";
import AICourseMatcher from "@/components/AICourseMatcher";
import StudyDestinations from "@/components/StudyDestinations";
import PartnerUniversities from "@/components/PartnerUniversities";
import WhyChooseApplyza from "@/components/WhyChooseApplyza";
import ScholarshipsPreview from "@/components/ScholarshipsPreview";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustStats />
      <HowItWorks />
      <ServicesOverview />
      <AICourseMatcher />
      <StudyDestinations />
      <PartnerUniversities />
      <WhyChooseApplyza />
      <ScholarshipsPreview />
    </div>
  );
};

export default Index;
