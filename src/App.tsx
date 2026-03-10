import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CookieConsent />
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
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/study-destinations" element={<StudyDestinations />} />
            <Route path="/study-destinations/:slug" element={<DestinationDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/anti-slavery-policy" element={<AntiSlaveryPolicy />} />
            <Route path="/for-institutions" element={<ForInstitutions />} />
            <Route path="/for-partners" element={<ForPartners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />

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

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
