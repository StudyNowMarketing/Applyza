import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AdminScholarshipForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "", university_name: "", country: "", amount: "", study_level: "",
    eligibility: "", deadline: "", description: "", status: "published",
  });

  const { data: existing } = useQuery({
    queryKey: ["admin-scholarship", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("scholarships").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title || "", university_name: existing.university_name || "",
        country: existing.country || "", amount: existing.amount || "",
        study_level: existing.study_level || "", eligibility: existing.eligibility || "",
        deadline: existing.deadline || "", description: existing.description || "",
        status: existing.status || "published",
      });
    }
  }, [existing]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.university_name.trim()) e.university_name = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const payload = {
      title: form.title.trim(), university_name: form.university_name.trim(),
      country: form.country.trim() || null, amount: form.amount.trim() || null,
      study_level: form.study_level.trim() || null, eligibility: form.eligibility.trim() || null,
      deadline: form.deadline.trim() || null, description: form.description.trim() || null,
      status: form.status,
    };
    const { error } = isEdit
      ? await supabase.from("scholarships").update(payload).eq("id", id!)
      : await supabase.from("scholarships").insert(payload);
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: isEdit ? "Scholarship updated" : "Scholarship created" }); navigate("/admin/scholarships"); }
  };

  const set = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-primary mb-6">{isEdit ? "Edit Scholarship" : "Add New Scholarship"}</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div><Label>Title *</Label><Input value={form.title} onChange={(e) => set("title", e.target.value)} />{errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>University Name *</Label><Input value={form.university_name} onChange={(e) => set("university_name", e.target.value)} />{errors.university_name && <p className="text-xs text-destructive mt-1">{errors.university_name}</p>}</div>
          <div><Label>Country</Label><Input value={form.country} onChange={(e) => set("country", e.target.value)} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><Label>Amount</Label><Input value={form.amount} onChange={(e) => set("amount", e.target.value)} placeholder="e.g. Up to £3,000" /></div>
          <div><Label>Study Level</Label><Input value={form.study_level} onChange={(e) => set("study_level", e.target.value)} placeholder="e.g. Undergraduate, Postgraduate" /></div>
          <div><Label>Deadline</Label><Input value={form.deadline} onChange={(e) => set("deadline", e.target.value)} placeholder="e.g. Rolling" /></div>
        </div>
        <div><Label>Eligibility</Label><Textarea rows={3} value={form.eligibility} onChange={(e) => set("eligibility", e.target.value)} /></div>
        <div><Label>Description</Label><Textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
        <div><Label>Status</Label><Select value={form.status} onValueChange={(v) => set("status", v)}><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="published">Published</SelectItem><SelectItem value="draft">Draft</SelectItem></SelectContent></Select></div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="teal" className="rounded-full" disabled={saving}>{saving ? "Saving..." : "Save Scholarship"}</Button>
          <Button type="button" variant="outline" className="rounded-full" onClick={() => navigate("/admin/scholarships")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminScholarshipForm;
