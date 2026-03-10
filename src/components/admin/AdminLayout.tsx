import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Calendar, Mail, Building2, Handshake, BookOpen, Edit, CalendarDays, Award, LogOut, ExternalLink } from "lucide-react";

const navItems = [
  { to: "/admin", icon: Home, label: "Dashboard", end: true },
  { to: "/admin/consultations", icon: Calendar, label: "Consultation Requests" },
  { to: "/admin/contact-messages", icon: Mail, label: "Contact Messages" },
  { to: "/admin/institution-enquiries", icon: Building2, label: "Institution Enquiries" },
  { to: "/admin/partner-enquiries", icon: Handshake, label: "Partner Enquiries" },
  { to: "/admin/courses", icon: BookOpen, label: "Courses" },
  { to: "/admin/blog", icon: Edit, label: "Blog Posts" },
  { to: "/admin/events", icon: CalendarDays, label: "Events" },
  { to: "/admin/scholarships", icon: Award, label: "Scholarships" },
];

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/consultations": "Consultation Requests",
  "/admin/contact-messages": "Contact Messages",
  "/admin/institution-enquiries": "Institution Enquiries",
  "/admin/partner-enquiries": "Partner Enquiries",
  "/admin/courses": "Courses",
  "/admin/blog": "Blog Posts",
  "/admin/events": "Events",
  "/admin/scholarships": "Scholarships",
  "/admin/courses/new": "Add New Course",
  "/admin/blog/new": "Write New Post",
  "/admin/events/new": "Add New Event",
  "/admin/scholarships/new": "Add New Scholarship",
};

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const path = location.pathname;
  const pageTitle = pageTitles[path] || (path.includes("/edit/") ? "Edit" : "Admin");

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <aside className="w-[250px] bg-[#1B2150] flex flex-col shrink-0 fixed inset-y-0 left-0 z-40">
        <div className="px-5 py-5 border-b border-white/10">
          <span className="text-white font-extrabold text-lg">Applyza Admin</span>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  isActive ? "bg-white/10 text-white font-medium" : "text-white/60 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-white/50 text-xs truncate mb-2">{user?.email}</p>
          <button onClick={signOut} className="flex items-center gap-2 text-white/50 hover:text-white text-xs transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-[250px] flex flex-col">
        <header className="h-14 bg-background border-b flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-bold text-primary">{pageTitle}</h1>
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-secondary hover:underline">
            View Site <ExternalLink size={14} />
          </a>
        </header>
        <main className="flex-1 p-6 bg-background overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
