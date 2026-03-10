import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const statuses = ["new", "contacted", "in discussion", "partnered", "closed"];

const AdminInstitutionEnquiries = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin-institution-enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("institution_enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("institution_enquiries").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-institution-enquiries"] }),
  });

  const filtered = rows?.filter((r) =>
    !search || r.institution_name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="relative max-w-sm mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search by institution or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground w-8"></th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Institution</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Contact Person</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Country</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : filtered && filtered.length > 0 ? (
                filtered.map((r) => (
                  <>
                    <tr key={r.id} className="border-b hover:bg-muted/30 cursor-pointer" onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
                      <td className="px-4 py-3">{expanded === r.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</td>
                      <td className="px-4 py-3 font-medium">{r.institution_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.contact_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.country || "—"}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <Select value={r.status || "new"} onValueChange={(v) => updateStatus.mutate({ id: r.id, status: v })}>
                          <SelectTrigger className="h-7 text-xs w-28"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {statuses.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{r.created_at ? format(new Date(r.created_at), "MMM d, yyyy") : "—"}</td>
                    </tr>
                    {expanded === r.id && (
                      <tr key={`${r.id}-detail`} className="bg-muted/20">
                        <td colSpan={7} className="px-8 py-4 space-y-1">
                          <p className="text-sm text-muted-foreground"><span className="font-medium text-primary">Job Title:</span> {r.job_title || "—"}</p>
                          <p className="text-sm text-muted-foreground"><span className="font-medium text-primary">Phone:</span> {r.phone || "—"}</p>
                          <p className="text-sm text-muted-foreground"><span className="font-medium text-primary">Message:</span> {r.message || "No message"}</p>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              ) : (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No enquiries found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInstitutionEnquiries;
