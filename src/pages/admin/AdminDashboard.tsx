import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import {
  BookOpen, Edit, CalendarDays, Award, Calendar, Mail,
  Building2, Handshake, TrendingUp
} from "lucide-react";

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [
        courses, blogAll, blogPublished, eventsAll, eventsFuture,
        scholarships, contactsAll, contactsNew, consultAll, consultNew,
        institutions, partners
      ] = await Promise.all([
        supabase.from("courses").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }).gte("date", new Date().toISOString().split("T")[0]),
        supabase.from("scholarships").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("consultation_requests").select("*", { count: "exact", head: true }),
        supabase.from("consultation_requests").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("institution_enquiries").select("*", { count: "exact", head: true }),
        supabase.from("partner_enquiries").select("*", { count: "exact", head: true }),
      ]);
      return {
        courses: courses.count || 0,
        blogTotal: blogAll.count || 0,
        blogPublished: blogPublished.count || 0,
        eventsTotal: eventsAll.count || 0,
        eventsUpcoming: eventsFuture.count || 0,
        scholarships: scholarships.count || 0,
        contactsTotal: contactsAll.count || 0,
        contactsNew: contactsNew.count || 0,
        consultTotal: consultAll.count || 0,
        consultNew: consultNew.count || 0,
        institutions: institutions.count || 0,
        partners: partners.count || 0,
      };
    },
  });

  const { data: recentContacts } = useQuery({
    queryKey: ["admin-recent-contacts"],
    queryFn: async () => {
      const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5);
      return data || [];
    },
  });

  const { data: recentConsultations } = useQuery({
    queryKey: ["admin-recent-consultations"],
    queryFn: async () => {
      const { data } = await supabase.from("consultation_requests").select("*").order("created_at", { ascending: false }).limit(5);
      return data || [];
    },
  });

  const statCards = [
    { label: "Courses", value: stats?.courses ?? "—", icon: BookOpen, link: "/admin/courses", color: "text-blue-600" },
    { label: "Blog Posts", value: stats ? `${stats.blogPublished}/${stats.blogTotal}` : "—", sub: "published/total", icon: Edit, link: "/admin/blog", color: "text-green-600" },
    { label: "Events", value: stats ? `${stats.eventsUpcoming}/${stats.eventsTotal}` : "—", sub: "upcoming/total", icon: CalendarDays, link: "/admin/events", color: "text-orange-600" },
    { label: "Scholarships", value: stats?.scholarships ?? "—", icon: Award, link: "/admin/scholarships", color: "text-purple-600" },
    { label: "Contact Messages", value: stats ? `${stats.contactsNew} new` : "—", sub: `${stats?.contactsTotal || 0} total`, icon: Mail, link: "/admin/contact-messages", color: "text-red-600" },
    { label: "Consultations", value: stats ? `${stats.consultNew} new` : "—", sub: `${stats?.consultTotal || 0} total`, icon: Calendar, link: "/admin/consultations", color: "text-teal-600" },
    { label: "Institution Enquiries", value: stats?.institutions ?? "—", icon: Building2, link: "/admin/institution-enquiries", color: "text-indigo-600" },
    { label: "Partner Enquiries", value: stats?.partners ?? "—", icon: Handshake, link: "/admin/partner-enquiries", color: "text-amber-600" },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="bg-card rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-2">
              <card.icon size={20} className={card.color} />
              <TrendingUp size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-2xl font-extrabold text-primary">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
            {card.sub && <p className="text-[10px] text-muted-foreground">{card.sub}</p>}
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-base font-bold text-primary mb-3">Recent Contact Messages</h2>
          <div className="bg-card rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentContacts && recentContacts.length > 0 ? recentContacts.map((r) => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-2.5 font-medium">{r.name}</td>
                    <td className="px-4 py-2.5 text-muted-foreground text-xs">{r.email}</td>
                    <td className="px-4 py-2.5 text-muted-foreground text-xs">{r.created_at ? format(new Date(r.created_at), "MMM d") : "—"}</td>
                    <td className="px-4 py-2.5">
                      <span className="inline-block bg-secondary/15 text-secondary text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize">{r.status}</span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-muted-foreground text-xs">No messages yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold text-primary mb-3">Recent Consultation Requests</h2>
          <div className="bg-card rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Service</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentConsultations && recentConsultations.length > 0 ? recentConsultations.map((r) => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-2.5 font-medium">{r.name}</td>
                    <td className="px-4 py-2.5 text-muted-foreground text-xs">{r.service_interest}</td>
                    <td className="px-4 py-2.5 text-muted-foreground text-xs">{r.created_at ? format(new Date(r.created_at), "MMM d") : "—"}</td>
                    <td className="px-4 py-2.5">
                      <span className="inline-block bg-secondary/15 text-secondary text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize">{r.status}</span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-muted-foreground text-xs">No requests yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
