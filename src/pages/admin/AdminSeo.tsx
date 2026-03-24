import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Search } from "lucide-react";

interface SeoRow {
  id: string;
  page_slug: string;
  page_name: string;
  title: string | null;
  description: string | null;
  og_image: string | null;
  focus_keyword: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

const AdminSeo = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<SeoRow | null>(null);
  const [form, setForm] = useState({ title: "", description: "", og_image: "", focus_keyword: "" });

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin-seo"],
    queryFn: async () => {
      const { data, error } = await supabase.from("page_seo").select("*").order("page_name");
      if (error) throw error;
      return data as SeoRow[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!editing) return;
      const { error } = await supabase
        .from("page_seo")
        .update({
          title: form.title.trim() || null,
          description: form.description.trim() || null,
          og_image: form.og_image.trim() || null,
          focus_keyword: form.focus_keyword.trim() || null,
          updated_at: new Date().toISOString(),
          updated_by: user?.email || null,
        })
        .eq("id", editing.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-seo"] });
      toast({ title: "SEO data saved" });
      setEditing(null);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const openEdit = (row: SeoRow) => {
    setForm({
      title: row.title || "",
      description: row.description || "",
      og_image: row.og_image || "",
      focus_keyword: row.focus_keyword || "",
    });
    setEditing(row);
  };

  const filtered = rows?.filter(
    (r) => !search || r.page_name.toLowerCase().includes(search.toLowerCase()) || r.page_slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Manage SEO metadata for every page on the site. Changes affect page titles, meta descriptions, and social sharing.
      </p>

      <div className="relative max-w-sm mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search pages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Page</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Description</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Keyword</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground w-20">Edit</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : filtered && filtered.length > 0 ? (
                filtered.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <p className="font-medium">{r.page_name}</p>
                      <p className="text-xs text-muted-foreground">{r.page_slug}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{r.title || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[250px] truncate">{r.description || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.focus_keyword || "—"}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(r)}>
                        <Pencil size={14} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No pages found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit SEO — {editing?.page_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex items-center justify-between">
                <Label>Page Title</Label>
                <span className={`text-xs ${form.title.length > 60 ? "text-destructive" : "text-muted-foreground"}`}>
                  {form.title.length}/60
                </span>
              </div>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={80} />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label>Meta Description</Label>
                <span className={`text-xs ${form.description.length > 160 ? "text-destructive" : "text-muted-foreground"}`}>
                  {form.description.length}/160
                </span>
              </div>
              <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} maxLength={200} />
            </div>
            <div>
              <Label>OG Image URL</Label>
              <Input value={form.og_image} onChange={(e) => setForm({ ...form, og_image: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <Label>Focus Keyword</Label>
              <Input value={form.focus_keyword} onChange={(e) => setForm({ ...form, focus_keyword: e.target.value })} placeholder="e.g. study abroad UK" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="teal" className="rounded-full" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" className="rounded-full" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSeo;
