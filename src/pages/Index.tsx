import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import HowItWorks from "@/components/HowItWorks";
import ServicesOverview from "@/components/ServicesOverview";
import AICourseMatcher from "@/components/AICourseMatcher";
import StudyDestinations from "@/components/StudyDestinations";

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
    </div>
  );
};

export default Index;
