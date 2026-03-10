import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Calendar, Mail, Building2, Handshake, BookOpen, Edit, CalendarDays, Award, LogOut, ExternalLink, Menu, X } from "lucide-react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const path = location.pathname;
  const pageTitle = pageTitles[path] || (path.includes("/edit/") ? "Edit" : "Admin");

  const sidebarContent = (
    <>
      <div className="px-5 py-5 border-b border-white/10">
        <span className="text-white font-extrabold text-lg">Applyza Admin</span>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
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
    </>
  );

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[250px] bg-[#1B2150] flex-col shrink-0 fixed inset-y-0 left-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[250px] bg-[#1B2150] flex flex-col z-10">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-[250px] flex flex-col">
        <header className="h-14 bg-background border-b flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-primary"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold text-primary truncate">{pageTitle}</h1>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-secondary hover:underline shrink-0">
            View Site <ExternalLink size={14} />
          </a>
        </header>
        <main className="flex-1 p-4 md:p-6 bg-background overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
