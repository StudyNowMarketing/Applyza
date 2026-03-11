import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageTransition from "@/components/PageTransition";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
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
import StudyDestinations from "./pages/StudyDestinations.tsx";
import DestinationDetail from "./pages/DestinationDetail.tsx";
import ForInstitutions from "./pages/ForInstitutions.tsx";
import ForPartners from "./pages/ForPartners.tsx";
import Contact from "./pages/Contact.tsx";
import FAQ from "./pages/FAQ.tsx";
import NotFound from "./pages/NotFound.tsx";

// Admin
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminConsultations from "./pages/admin/AdminConsultations.tsx";
import AdminContactMessages from "./pages/admin/AdminContactMessages.tsx";
import AdminInstitutionEnquiries from "./pages/admin/AdminInstitutionEnquiries.tsx";
import AdminPartnerEnquiries from "./pages/admin/AdminPartnerEnquiries.tsx";
import AdminCourses from "./pages/admin/AdminCourses.tsx";
import AdminCourseForm from "./pages/admin/AdminCourseForm.tsx";
import AdminBlog from "./pages/admin/AdminBlog.tsx";
import AdminBlogForm from "./pages/admin/AdminBlogForm.tsx";
import AdminEvents from "./pages/admin/AdminEvents.tsx";
import AdminEventForm from "./pages/admin/AdminEventForm.tsx";
import AdminScholarships from "./pages/admin/AdminScholarships.tsx";
import AdminScholarshipForm from "./pages/admin/AdminScholarshipForm.tsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.tsx";
import CookieConsent from "./components/CookieConsent.tsx";

const queryClient = new QueryClient();

const P = ({ children }: { children: React.ReactNode }) => (
  <PageTransition>{children}</PageTransition>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<P><Index /></P>} />
        <Route path="/about" element={<P><About /></P>} />
        <Route path="/services" element={<P><Services /></P>} />
        <Route path="/services/university-applications" element={<P><UniversityApplications /></P>} />
        <Route path="/services/visa-immigration" element={<P><VisaImmigration /></P>} />
        <Route path="/services/student-counselling" element={<P><StudentCounselling /></P>} />
        <Route path="/services/accommodation" element={<P><Accommodation /></P>} />
        <Route path="/find-a-course" element={<P><FindACourse /></P>} />
        <Route path="/find-a-course/:slug" element={<P><CourseDetail /></P>} />
        <Route path="/book-a-consultation" element={<P><BookConsultation /></P>} />
        <Route path="/scholarships" element={<P><Scholarships /></P>} />
        <Route path="/events" element={<P><Events /></P>} />
        <Route path="/blog" element={<P><Blog /></P>} />
        <Route path="/blog/:slug" element={<P><BlogPost /></P>} />
        <Route path="/study-destinations" element={<P><StudyDestinations /></P>} />
        <Route path="/study-destinations/:slug" element={<P><DestinationDetail /></P>} />
        <Route path="/privacy-policy" element={<P><PrivacyPolicy /></P>} />
        <Route path="/terms-and-conditions" element={<P><TermsConditions /></P>} />
        <Route path="/anti-slavery-policy" element={<P><AntiSlaveryPolicy /></P>} />
        <Route path="/for-institutions" element={<P><ForInstitutions /></P>} />
        <Route path="/for-partners" element={<P><ForPartners /></P>} />
        <Route path="/contact" element={<P><Contact /></P>} />
        <Route path="/faq" element={<P><FAQ /></P>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="consultations" element={<AdminConsultations />} />
          <Route path="contact-messages" element={<AdminContactMessages />} />
          <Route path="institution-enquiries" element={<AdminInstitutionEnquiries />} />
          <Route path="partner-enquiries" element={<AdminPartnerEnquiries />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/new" element={<AdminCourseForm />} />
          <Route path="courses/edit/:id" element={<AdminCourseForm />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="blog/new" element={<AdminBlogForm />} />
          <Route path="blog/edit/:id" element={<AdminBlogForm />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/new" element={<AdminEventForm />} />
          <Route path="events/edit/:id" element={<AdminEventForm />} />
          <Route path="scholarships" element={<AdminScholarships />} />
          <Route path="scholarships/new" element={<AdminScholarshipForm />} />
          <Route path="scholarships/edit/:id" element={<AdminScholarshipForm />} />
        </Route>

        <Route path="*" element={<P><NotFound /></P>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CookieConsent />
            <AnimatedRoutes />
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
