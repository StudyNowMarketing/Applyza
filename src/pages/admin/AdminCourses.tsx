import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

const AdminCourses = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      toast({ title: "Course deleted" });
      setDeleteId(null);
    },
  });

  const filtered = rows?.filter((r) =>
    !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.university_name.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string | null) => {
    const s = status || "draft";
    const colors: Record<string, string> = { published: "bg-green-100 text-green-700", draft: "bg-gray-100 text-gray-600", archived: "bg-red-100 text-red-700" };
    return <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${colors[s] || colors.draft}`}>{s}</span>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by title or university..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button variant="teal" className="rounded-full" asChild>
          <Link to="/admin/courses/new"><Plus size={16} className="mr-1" /> Add New Course</Link>
        </Button>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">University</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Country</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Level</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Fee</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Updated</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : filtered && filtered.length > 0 ? filtered.map((r) => (
                <tr key={r.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium max-w-[200px] truncate">{r.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.university_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.country}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.study_level}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.tuition_fee ? `£${r.tuition_fee.toLocaleString()}` : "—"}</td>
                  <td className="px-4 py-3">{statusBadge(r.status)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.updated_at ? format(new Date(r.updated_at), "MMM d, yyyy") : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                        <Link to={`/admin/courses/edit/${r.id}`}><Pencil size={14} /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteId(r.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No courses found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Delete this course?"
        description="This will permanently remove the course."
      />
    </div>
  );
};

export default AdminCourses;
