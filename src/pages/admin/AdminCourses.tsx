import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Search, Plus, Pencil, Trash2, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { generateSlug } from "@/components/admin/DeleteConfirmDialog";

const AdminCourses = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<any[] | null>(null);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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

  // CSV Parsing
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.split("\n").filter((l) => l.trim());
      if (lines.length < 2) { toast({ title: "CSV must have a header and at least one data row", variant: "destructive" }); return; }
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
      const data = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
        const obj: any = {};
        headers.forEach((h, i) => { obj[h] = values[i] || ""; });
        return obj;
      });
      setCsvData(data);
    };
    reader.readAsText(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  const confirmImport = async () => {
    if (!csvData) return;
    setImporting(true);
    const payload = csvData.map((row) => ({
      title: row.title || "Untitled",
      slug: generateSlug(row.title || "untitled"),
      university_name: row.university_name || "Unknown",
      country: row.country || "Unknown",
      city: row.city || "Unknown",
      subject_area: row.subject_area || "General",
      study_level: row.study_level || "Undergraduate",
      duration: row.duration || null,
      tuition_fee: row.tuition_fee ? parseInt(row.tuition_fee) : null,
      intake_dates: row.intake_dates || null,
      entry_requirements: row.entry_requirements || null,
      english_requirements: row.english_requirements || null,
      description: row.description || null,
      scholarship_available: row.scholarship_available === "true" || row.scholarship_available === "yes",
      status: "published",
    }));
    const { error } = await supabase.from("courses").insert(payload);
    setImporting(false);
    if (error) {
      toast({ title: "Import failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `${payload.length} courses imported` });
      setCsvData(null);
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
    }
  };

  const exportCSV = () => {
    if (!rows || rows.length === 0) return;
    const headers = ["title", "university_name", "country", "city", "subject_area", "study_level", "duration", "tuition_fee", "intake_dates", "entry_requirements", "english_requirements", "description", "scholarship_available", "status"];
    const csvContent = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => {
        const val = (r as any)[h];
        return typeof val === "string" && val.includes(",") ? `"${val}"` : (val ?? "");
      }).join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `courses-export-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by title or university..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full" onClick={exportCSV}>
            <Download size={14} className="mr-1" /> Export CSV
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => fileRef.current?.click()}>
            <Upload size={14} className="mr-1" /> Import CSV
          </Button>
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
          <Button variant="teal" className="rounded-full" asChild>
            <Link to="/admin/courses/new"><Plus size={16} className="mr-1" /> Add New Course</Link>
          </Button>
        </div>
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

      {/* CSV Preview Dialog */}
      <Dialog open={!!csvData} onOpenChange={(open) => !open && setCsvData(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Import Preview — {csvData?.length} courses</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-2 py-2 text-left">Title</th>
                  <th className="px-2 py-2 text-left">University</th>
                  <th className="px-2 py-2 text-left">Country</th>
                  <th className="px-2 py-2 text-left">City</th>
                  <th className="px-2 py-2 text-left">Level</th>
                  <th className="px-2 py-2 text-left">Fee</th>
                </tr>
              </thead>
              <tbody>
                {csvData?.slice(0, 20).map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-2 py-1.5">{row.title || "—"}</td>
                    <td className="px-2 py-1.5">{row.university_name || "—"}</td>
                    <td className="px-2 py-1.5">{row.country || "—"}</td>
                    <td className="px-2 py-1.5">{row.city || "—"}</td>
                    <td className="px-2 py-1.5">{row.study_level || "—"}</td>
                    <td className="px-2 py-1.5">{row.tuition_fee || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {csvData && csvData.length > 20 && (
              <p className="text-xs text-muted-foreground text-center py-2">...and {csvData.length - 20} more rows</p>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="teal" className="rounded-full" onClick={confirmImport} disabled={importing}>
              {importing ? "Importing..." : `Confirm Import (${csvData?.length} courses)`}
            </Button>
            <Button variant="outline" className="rounded-full" onClick={() => setCsvData(null)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

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
