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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { generateSlug } from "@/components/admin/DeleteConfirmDialog";
import { Eye, Bold, Italic, Heading, List, Link as LinkIcon, Image } from "lucide-react";

const categories = [
  "Study Destinations", "Visa & Immigration", "Application Tips",
  "Student Life", "Scholarships", "Events"
];

const AdminBlogForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("write");
  const [form, setForm] = useState({
    title: "", slug: "", category: "", excerpt: "", content: "",
    author: "Applyza Team", published: false,
    featured_image_url: "", meta_title: "", meta_description: "", focus_keyword: "",
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
        title: existing.title || "", slug: existing.slug || "",
        category: existing.category || "", excerpt: existing.excerpt || "",
        content: existing.content || "", author: existing.author || "Applyza Team",
        published: existing.published || false,
        featured_image_url: existing.featured_image_url || "",
        meta_title: "", meta_description: "", focus_keyword: "",
      });
    }
  }, [existing]);

  // Auto-generate slug from title (only for new posts)
  useEffect(() => {
    if (!isEdit && form.title) {
      setForm((prev) => ({ ...prev, slug: generateSlug(form.title) }));
    }
  }, [form.title, isEdit]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.content.trim()) e.content = "Required";
    if (!form.slug.trim()) e.slug = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const insertFormatting = (prefix: string, suffix: string = prefix) => {
    const textarea = document.querySelector<HTMLTextAreaElement>("#blog-content");
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.content.substring(start, end);
    const before = form.content.substring(0, start);
    const after = form.content.substring(end);
    const newContent = `${before}${prefix}${selected}${suffix}${after}`;
    setForm((prev) => ({ ...prev, content: newContent }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const payload: any = {
      title: form.title.trim(), slug: form.slug.trim(),
      category: form.category || null, excerpt: form.excerpt.trim() || null,
      content: form.content.trim(), author: form.author.trim(),
      published: form.published, updated_at: new Date().toISOString(),
      featured_image_url: form.featured_image_url.trim() || null,
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

  // Simple markdown-to-html preview
  const renderPreview = (md: string) => {
    let html = md
      .replace(/^### (.+)$/gm, "<h3 class='text-lg font-bold mt-4 mb-2'>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2 class='text-xl font-bold mt-5 mb-2'>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1 class='text-2xl font-bold mt-6 mb-3'>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-teal-600 underline">$1</a>')
      .replace(/^- (.+)$/gm, "<li class='ml-4'>• $1</li>")
      .replace(/\n\n/g, "</p><p class='mb-3'>")
      .replace(/\n/g, "<br/>");
    return `<p class='mb-3'>${html}</p>`;
  };

  return (
    <div className="max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Title *</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
          </div>
          <div>
            <Label>URL Slug *</Label>
            <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} />
            {errors.slug && <p className="text-xs text-destructive mt-1">{errors.slug}</p>}
          </div>
        </div>

        {/* Category, Author, Featured Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(v) => set("category", v)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Author</Label>
            <Input value={form.author} onChange={(e) => set("author", e.target.value)} />
          </div>
          <div>
            <Label>Featured Image URL</Label>
            <Input value={form.featured_image_url} onChange={(e) => set("featured_image_url", e.target.value)} placeholder="https://..." />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <Label>Excerpt</Label>
          <Textarea rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short summary for blog listing..." />
        </div>

        {/* Content Editor with Toolbar */}
        <div>
          <Label>Content *</Label>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-1">
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertFormatting("**")} title="Bold">
                  <Bold size={14} />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertFormatting("*")} title="Italic">
                  <Italic size={14} />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertFormatting("## ", "")} title="Heading">
                  <Heading size={14} />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertFormatting("- ", "")} title="List">
                  <List size={14} />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertFormatting("[", "](url)")} title="Link">
                  <LinkIcon size={14} />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertFormatting("![alt](", ")")} title="Image">
                  <Image size={14} />
                </Button>
              </div>
              <TabsList className="h-8">
                <TabsTrigger value="write" className="text-xs h-6">Write</TabsTrigger>
                <TabsTrigger value="preview" className="text-xs h-6">
                  <Eye size={12} className="mr-1" /> Preview
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="write" className="mt-0">
              <Textarea
                id="blog-content"
                rows={18}
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                className="font-mono text-sm"
                placeholder="Write your post content here. Supports **bold**, *italic*, ## headings, - lists, [links](url), and ![images](url)."
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-0">
              <div
                className="min-h-[400px] p-4 border rounded-md bg-background prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: renderPreview(form.content) }}
              />
            </TabsContent>
          </Tabs>
          {errors.content && <p className="text-xs text-destructive mt-1">{errors.content}</p>}
        </div>

        {/* SEO Fields */}
        <div className="bg-muted/50 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-bold text-primary">SEO Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Meta Title</Label>
                <span className={`text-[10px] ${form.meta_title.length > 60 ? "text-destructive" : "text-muted-foreground"}`}>{form.meta_title.length}/60</span>
              </div>
              <Input value={form.meta_title} onChange={(e) => set("meta_title", e.target.value)} className="text-sm" placeholder="Leave blank to use post title" />
            </div>
            <div>
              <Label className="text-xs">Focus Keyword</Label>
              <Input value={form.focus_keyword} onChange={(e) => set("focus_keyword", e.target.value)} className="text-sm" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Meta Description</Label>
              <span className={`text-[10px] ${form.meta_description.length > 160 ? "text-destructive" : "text-muted-foreground"}`}>{form.meta_description.length}/160</span>
            </div>
            <Textarea rows={2} value={form.meta_description} onChange={(e) => set("meta_description", e.target.value)} className="text-sm" placeholder="Leave blank to use excerpt" />
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={form.published} onCheckedChange={(v) => set("published", !!v)} />
            Published
          </label>
        </div>

        {/* Preview link for existing posts */}
        {isEdit && existing?.slug && (
          <a
            href={`/blog/${existing.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-teal-600 hover:underline"
          >
            <Eye size={14} /> Preview on site
          </a>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="teal" className="rounded-full" disabled={saving}>{saving ? "Saving..." : "Save Post"}</Button>
          <Button type="button" variant="outline" className="rounded-full" onClick={() => navigate("/admin/blog")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogForm;
