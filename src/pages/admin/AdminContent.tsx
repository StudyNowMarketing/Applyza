import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Check, X } from "lucide-react";

interface ContentRow {
  id: string;
  page_slug: string;
  section_key: string;
  content: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

const contentSections = [
  { page: "Homepage", slug: "/", sections: [
    { key: "hero_heading", label: "Hero Heading" },
    { key: "hero_subtext", label: "Hero Subtext" },
    { key: "stats_students", label: "Stats — Students Helped" },
    { key: "stats_universities", label: "Stats — Partner Universities" },
    { key: "stats_countries", label: "Stats — Countries" },
    { key: "stats_success_rate", label: "Stats — Success Rate" },
    { key: "how_it_works_step1_title", label: "How It Works — Step 1 Title" },
    { key: "how_it_works_step1_desc", label: "How It Works — Step 1 Description" },
    { key: "how_it_works_step2_title", label: "How It Works — Step 2 Title" },
    { key: "how_it_works_step2_desc", label: "How It Works — Step 2 Description" },
    { key: "how_it_works_step3_title", label: "How It Works — Step 3 Title" },
    { key: "how_it_works_step3_desc", label: "How It Works — Step 3 Description" },
    { key: "how_it_works_step4_title", label: "How It Works — Step 4 Title" },
    { key: "how_it_works_step4_desc", label: "How It Works — Step 4 Description" },
    { key: "cta_heading", label: "CTA Section Heading" },
    { key: "cta_subtext", label: "CTA Section Subtext" },
  ]},
  { page: "About", slug: "/about", sections: [
    { key: "company_story", label: "Company Story" },
    { key: "mission_text", label: "Mission Statement" },
    { key: "values_text", label: "Our Values" },
  ]},
  { page: "Services", slug: "/services", sections: [
    { key: "services_intro", label: "Services Page Intro" },
    { key: "university_apps_desc", label: "University Applications Description" },
    { key: "visa_immigration_desc", label: "Visa & Immigration Description" },
    { key: "student_counselling_desc", label: "Student Counselling Description" },
    { key: "accommodation_desc", label: "Accommodation Description" },
  ]},
];

const AdminContent = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const { data: rows } = useQuery({
    queryKey: ["admin-page-content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("page_content").select("*");
      if (error) throw error;
      return data as ContentRow[];
    },
  });

  const contentMap = new Map<string, ContentRow>();
  rows?.forEach((r) => contentMap.set(`${r.page_slug}::${r.section_key}`, r));

  const saveMutation = useMutation({
    mutationFn: async ({ slug, key, value }: { slug: string; key: string; value: string }) => {
      const existing = contentMap.get(`${slug}::${key}`);
      if (existing) {
        const { error } = await supabase
          .from("page_content")
          .update({ content: value, updated_at: new Date().toISOString(), updated_by: user?.email || null })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("page_content")
          .insert({ page_slug: slug, section_key: key, content: value, updated_by: user?.email || null });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-page-content"] });
      toast({ title: "Content saved" });
      setEditingKey(null);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const startEdit = (slug: string, key: string) => {
    const existing = contentMap.get(`${slug}::${key}`);
    setEditValue(existing?.content || "");
    setEditingKey(`${slug}::${key}`);
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">
        Edit text content on key pages. Changes override the default text shown on the site.
      </p>

      {contentSections.map((page) => (
        <div key={page.slug} className="mb-8">
          <h3 className="text-base font-bold text-primary mb-3">{page.page}</h3>
          <div className="bg-card rounded-xl border divide-y">
            {page.sections.map((section) => {
              const compositeKey = `${page.slug}::${section.key}`;
              const isEditing = editingKey === compositeKey;
              const existing = contentMap.get(compositeKey);

              return (
                <div key={section.key} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{section.label}</p>
                    {!isEditing && (
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => startEdit(page.slug, section.key)}>
                        <Pencil size={13} />
                      </Button>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Textarea
                        rows={3}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="text-sm"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="teal"
                          className="rounded-full h-7 text-xs"
                          onClick={() => saveMutation.mutate({ slug: page.slug, key: section.key, value: editValue })}
                          disabled={saveMutation.isPending}
                        >
                          <Check size={12} className="mr-1" /> Save
                        </Button>
                        <Button size="sm" variant="ghost" className="rounded-full h-7 text-xs" onClick={() => setEditingKey(null)}>
                          <X size={12} className="mr-1" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {existing?.content || <span className="italic">Default text (click edit to override)</span>}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminContent;
