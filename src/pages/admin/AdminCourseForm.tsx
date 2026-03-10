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

const countries = ["United Kingdom", "Germany", "France", "Ireland", "Malta", "Netherlands", "Canada", "USA"];
const subjectAreas = ["Business & Management", "Computer Science & IT", "Engineering", "Health & Medicine", "Arts & Humanities", "Law", "Education", "Science", "Social Sciences", "Media & Communications"];
const studyLevels = ["Foundation", "Undergraduate", "Postgraduate", "Top-Up"];
const statusOptions = ["draft", "published", "archived"];

const AdminCourseForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    title: "", university_name: "", country: "", city: "", subject_area: "", study_level: "",
    duration: "", tuition_fee: "", intake_dates: "", entry_requirements: "", english_requirements: "",
    description: "", modules: "", career_prospects: "", scholarship_available: false,
    scholarship_details: "", application_deadline: "", source_url: "", featured: false, status: "draft",
  });

  const { data: existing } = useQuery({
    queryKey: ["admin-course", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title || "", university_name: existing.university_name || "",
        country: existing.country || "", city: existing.city || "",
        subject_area: existing.subject_area || "", study_level: existing.study_level || "",
        duration: existing.duration || "", tuition_fee: existing.tuition_fee?.toString() || "",
        intake_dates: existing.intake_dates || "", entry_requirements: existing.entry_requirements || "",
        english_requirements: existing.english_requirements || "", description: existing.description || "",
        modules: existing.modules || "", career_prospects: existing.career_prospects || "",
        scholarship_available: existing.scholarship_available || false,
        scholarship_details: existing.scholarship_details || "",
        application_deadline: existing.application_deadline || "", source_url: existing.source_url || "",
        featured: existing.featured || false, status: existing.status || "draft",
      });
    }
  }, [existing]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.university_name.trim()) e.university_name = "Required";
    if (!form.country) e.country = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.subject_area) e.subject_area = "Required";
    if (!form.study_level) e.study_level = "Required";
    if (!form.description.trim()) e.description = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      slug: generateSlug(form.title),
      university_name: form.university_name.trim(),
      country: form.country,
      city: form.city.trim(),
      subject_area: form.subject_area,
      study_level: form.study_level,
      duration: form.duration.trim() || null,
      tuition_fee: form.tuition_fee ? parseInt(form.tuition_fee) : null,
      intake_dates: form.intake_dates.trim() || null,
      entry_requirements: form.entry_requirements.trim() || null,
      english_requirements: form.english_requirements.trim() || null,
      description: form.description.trim(),
      modules: form.modules.trim() || null,
      career_prospects: form.career_prospects.trim() || null,
      scholarship_available: form.scholarship_available,
      scholarship_details: form.scholarship_available ? form.scholarship_details.trim() || null : null,
      application_deadline: form.application_deadline.trim() || null,
      source_url: form.source_url.trim() || null,
      featured: form.featured,
      status: form.status,
      updated_at: new Date().toISOString(),
    };

    const { error } = isEdit
      ? await supabase.from("courses").update(payload).eq("id", id!)
      : await supabase.from("courses").insert(payload);

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isEdit ? "Course updated" : "Course created" });
      navigate("/admin/courses");
    }
  };

  const set = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold text-primary mb-6">{isEdit ? "Edit Course" : "Add New Course"}</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Title *</Label><Input value={form.title} onChange={(e) => set("title", e.target.value)} />{errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}</div>
          <div><Label>University Name *</Label><Input value={form.university_name} onChange={(e) => set("university_name", e.target.value)} />{errors.university_name && <p className="text-xs text-destructive mt-1">{errors.university_name}</p>}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Country *</Label><Select value={form.country} onValueChange={(v) => set("country", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>{errors.country && <p className="text-xs text-destructive mt-1">{errors.country}</p>}</div>
          <div><Label>City *</Label><Input value={form.city} onChange={(e) => set("city", e.target.value)} />{errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><Label>Subject Area *</Label><Select value={form.subject_area} onValueChange={(v) => set("subject_area", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{subjectAreas.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>{errors.subject_area && <p className="text-xs text-destructive mt-1">{errors.subject_area}</p>}</div>
          <div><Label>Study Level *</Label><Select value={form.study_level} onValueChange={(v) => set("study_level", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{studyLevels.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>{errors.study_level && <p className="text-xs text-destructive mt-1">{errors.study_level}</p>}</div>
          <div><Label>Duration</Label><Input value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="e.g. 3 years" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><Label>Tuition Fee (£)</Label><Input type="number" value={form.tuition_fee} onChange={(e) => set("tuition_fee", e.target.value)} /></div>
          <div><Label>Intake Dates</Label><Input value={form.intake_dates} onChange={(e) => set("intake_dates", e.target.value)} placeholder="e.g. September, January" /></div>
          <div><Label>Application Deadline</Label><Input value={form.application_deadline} onChange={(e) => set("application_deadline", e.target.value)} /></div>
        </div>
        <div><Label>Description *</Label><Textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} />{errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}</div>
        <div><Label>Entry Requirements</Label><Textarea rows={3} value={form.entry_requirements} onChange={(e) => set("entry_requirements", e.target.value)} /></div>
        <div><Label>English Requirements</Label><Textarea rows={2} value={form.english_requirements} onChange={(e) => set("english_requirements", e.target.value)} /></div>
        <div><Label>Modules</Label><Textarea rows={3} value={form.modules} onChange={(e) => set("modules", e.target.value)} /></div>
        <div><Label>Career Prospects</Label><Textarea rows={3} value={form.career_prospects} onChange={(e) => set("career_prospects", e.target.value)} /></div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm"><Checkbox checked={form.scholarship_available} onCheckedChange={(v) => set("scholarship_available", !!v)} /> Scholarship Available</label>
          <label className="flex items-center gap-2 text-sm"><Checkbox checked={form.featured} onCheckedChange={(v) => set("featured", !!v)} /> Featured</label>
        </div>
        {form.scholarship_available && <div><Label>Scholarship Details</Label><Textarea rows={2} value={form.scholarship_details} onChange={(e) => set("scholarship_details", e.target.value)} /></div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Source URL</Label><Input value={form.source_url} onChange={(e) => set("source_url", e.target.value)} /></div>
          <div><Label>Status</Label><Select value={form.status} onValueChange={(v) => set("status", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{statusOptions.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}</SelectContent></Select></div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="teal" className="rounded-full" disabled={saving}>{saving ? "Saving..." : "Save Course"}</Button>
          <Button type="button" variant="outline" className="rounded-full" onClick={() => navigate("/admin/courses")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminCourseForm;
