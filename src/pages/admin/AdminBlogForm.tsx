import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generateSlug } from "@/components/admin/DeleteConfirmDialog";

const categories = ["Study Abroad Guide", "Visa Guide", "Course Guide", "Application Guide", "News"];

const AdminBlogForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "", category: "", excerpt: "", content: "", author: "Applyza Team", published: false,
  });

  const { data: existing } = useQuery({
    queryKey: ["admin-blog-post", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title || "", category: existing.category || "",
        excerpt: existing.excerpt || "", content: existing.content || "",
        author: existing.author || "Applyza Team", published: existing.published || false,
      });
    }
  }, [existing]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.content.trim()) e.content = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const payload: any = {
      title: form.title.trim(), slug: generateSlug(form.title),
      category: form.category || null, excerpt: form.excerpt.trim() || null,
      content: form.content.trim(), author: form.author.trim(),
      published: form.published, updated_at: new Date().toISOString(),
    };
    if (form.published && !existing?.published_at) payload.published_at = new Date().toISOString();
    if (!form.published) payload.published_at = null;

    const { error } = isEdit
      ? await supabase.from("blog_posts").update(payload).eq("id", id!)
      : await supabase.from("blog_posts").insert(payload);

    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: isEdit ? "Post updated" : "Post created" }); navigate("/admin/blog"); }
  };

  const set = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold text-primary mb-6">{isEdit ? "Edit Post" : "Write New Post"}</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div><Label>Title *</Label><Input value={form.title} onChange={(e) => set("title", e.target.value)} />{errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Category</Label><Select value={form.category} onValueChange={(v) => set("category", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
          <div><Label>Author</Label><Input value={form.author} onChange={(e) => set("author", e.target.value)} /></div>
        </div>
        <div><Label>Excerpt</Label><Textarea rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} /></div>
        <div><Label>Content *</Label><Textarea rows={16} value={form.content} onChange={(e) => set("content", e.target.value)} className="font-mono text-sm" />{errors.content && <p className="text-xs text-destructive mt-1">{errors.content}</p>}</div>
        <label className="flex items-center gap-2 text-sm"><Checkbox checked={form.published} onCheckedChange={(v) => set("published", !!v)} /> Published</label>
        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="teal" className="rounded-full" disabled={saving}>{saving ? "Saving..." : "Save Post"}</Button>
          <Button type="button" variant="outline" className="rounded-full" onClick={() => navigate("/admin/blog")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogForm;
