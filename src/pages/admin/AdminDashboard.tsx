import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [consultations, contacts, institutions, partners, courses] = await Promise.all([
        supabase.from("consultation_requests").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }),
        supabase.from("institution_enquiries").select("*", { count: "exact", head: true }),
        supabase.from("partner_enquiries").select("*", { count: "exact", head: true }),
        supabase.from("courses").select("*", { count: "exact", head: true }),
      ]);
      return {
        consultations: consultations.count || 0,
        contacts: contacts.count || 0,
        institutions: institutions.count || 0,
        partners: partners.count || 0,
        courses: courses.count || 0,
      };
    },
  });

  const { data: recentConsultations } = useQuery({
    queryKey: ["admin-recent-consultations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("consultation_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  const statCards = [
    { label: "Consultation Requests", value: stats?.consultations ?? "—" },
    { label: "Contact Messages", value: stats?.contacts ?? "—" },
    { label: "Institution Enquiries", value: stats?.institutions ?? "—" },
    { label: "Partner Enquiries", value: stats?.partners ?? "—" },
    { label: "Total Courses", value: stats?.courses ?? "—" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-card rounded-xl p-5 shadow-sm border">
            <p className="text-3xl font-extrabold text-primary">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-primary mb-4">Recent Consultation Requests</h2>
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Service Interest</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentConsultations?.map((r) => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.service_interest}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.created_at ? format(new Date(r.created_at), "MMM d, yyyy") : "—"}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-secondary/15 text-secondary text-xs font-medium px-2 py-0.5 rounded-full capitalize">{r.status}</span>
                  </td>
                </tr>
              )) || (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No requests yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
