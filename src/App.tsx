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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
