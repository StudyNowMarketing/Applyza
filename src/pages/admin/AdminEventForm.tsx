import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { generateSlug } from "@/components/admin/DeleteConfirmDialog";

const AdminEventForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "", date: undefined as Date | undefined, location: "", city: "", country: "",
    description: "", registration_url: "", status: "published",
  });

  const { data: existing } = useQuery({
    queryKey: ["admin-event", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title || "", date: existing.date ? new Date(existing.date) : undefined,
        location: existing.location || "", city: existing.city || "", country: existing.country || "",
        description: existing.description || "", registration_url: existing.registration_url || "",
        status: existing.status || "published",
      });
    }
  }, [existing]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.date) e.date = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const payload = {
      title: form.title.trim(), slug: generateSlug(form.title),
      date: form.date ? format(form.date, "yyyy-MM-dd") : "",
      location: form.location.trim() || null, city: form.city.trim() || null,
      country: form.country.trim() || null, description: form.description.trim() || null,
      registration_url: form.registration_url.trim() || null, status: form.status,
    };
    const { error } = isEdit
      ? await supabase.from("events").update(payload).eq("id", id!)
      : await supabase.from("events").insert(payload);
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: isEdit ? "Event updated" : "Event created" }); navigate("/admin/events"); }
  };

  const set = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-primary mb-6">{isEdit ? "Edit Event" : "Add New Event"}</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div><Label>Title *</Label><Input value={form.title} onChange={(e) => set("title", e.target.value)} />{errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}</div>
        <div>
          <Label>Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !form.date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {form.date ? format(form.date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={form.date} onSelect={(d) => set("date", d)} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><Label>Location</Label><Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Nairobi, Kenya" /></div>
          <div><Label>City</Label><Input value={form.city} onChange={(e) => set("city", e.target.value)} /></div>
          <div><Label>Country</Label><Input value={form.country} onChange={(e) => set("country", e.target.value)} /></div>
        </div>
        <div><Label>Description</Label><Textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Registration URL</Label><Input value={form.registration_url} onChange={(e) => set("registration_url", e.target.value)} /></div>
          <div><Label>Status</Label><Select value={form.status} onValueChange={(v) => set("status", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="published">Published</SelectItem><SelectItem value="draft">Draft</SelectItem></SelectContent></Select></div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="teal" className="rounded-full" disabled={saving}>{saving ? "Saving..." : "Save Event"}</Button>
          <Button type="button" variant="outline" className="rounded-full" onClick={() => navigate("/admin/events")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminEventForm;
