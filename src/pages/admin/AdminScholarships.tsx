import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

const AdminScholarships = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin-scholarships"],
    queryFn: async () => {
      const { data, error } = await supabase.from("scholarships").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("scholarships").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-scholarships"] }); toast({ title: "Scholarship deleted" }); setDeleteId(null); },
  });

  const statusBadge = (s: string | null) => {
    const colors: Record<string, string> = { published: "bg-green-100 text-green-700", draft: "bg-gray-100 text-gray-600" };
    return <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${colors[s || "draft"] || colors.draft}`}>{s || "draft"}</span>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div />
        <Button variant="teal" className="rounded-full" asChild><Link to="/admin/scholarships/new"><Plus size={16} className="mr-1" /> Add New Scholarship</Link></Button>
      </div>
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">University</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Amount</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Level</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground w-24">Actions</th>
            </tr></thead>
            <tbody>
              {isLoading ? <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              : rows && rows.length > 0 ? rows.map((r) => (
                <tr key={r.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{r.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.university_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.amount || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.study_level || "—"}</td>
                  <td className="px-4 py-3">{statusBadge(r.status)}</td>
                  <td className="px-4 py-3"><div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" asChild><Link to={`/admin/scholarships/edit/${r.id}`}><Pencil size={14} /></Link></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteId(r.id)}><Trash2 size={14} /></Button>
                  </div></td>
                </tr>
              )) : <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No scholarships found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteConfirmDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} title="Delete this scholarship?" />
    </div>
  );
};

export default AdminScholarships;
