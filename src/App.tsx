import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import UniversityApplications from "./pages/UniversityApplications.tsx";
import VisaImmigration from "./pages/VisaImmigration.tsx";
import StudentCounselling from "./pages/StudentCounselling.tsx";
import Accommodation from "./pages/Accommodation.tsx";
import FindACourse from "./pages/FindACourse.tsx";
import CourseDetail from "./pages/CourseDetail.tsx";
import BookConsultation from "./pages/BookConsultation.tsx";
import Scholarships from "./pages/Scholarships.tsx";
import Events from "./pages/Events.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";
import AntiSlaveryPolicy from "./pages/AntiSlaveryPolicy.tsx";
import DestinationDetail from "./pages/DestinationDetail.tsx";
import ForInstitutions from "./pages/ForInstitutions.tsx";
import ForPartners from "./pages/ForPartners.tsx";
import Contact from "./pages/Contact.tsx";
import FAQ from "./pages/FAQ.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/university-applications" element={<UniversityApplications />} />
          <Route path="/services/visa-immigration" element={<VisaImmigration />} />
          <Route path="/services/student-counselling" element={<StudentCounselling />} />
          <Route path="/services/accommodation" element={<Accommodation />} />
          <Route path="/find-a-course" element={<FindACourse />} />
          <Route path="/find-a-course/:slug" element={<CourseDetail />} />
          <Route path="/book-a-consultation" element={<BookConsultation />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/study-destinations/:slug" element={<DestinationDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/anti-slavery-policy" element={<AntiSlaveryPolicy />} />
          <Route path="/for-institutions" element={<ForInstitutions />} />
          <Route path="/for-partners" element={<ForPartners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
