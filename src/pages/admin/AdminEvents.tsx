import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { format, isPast } from "date-fns";
import { Plus, Pencil, Trash2, Copy, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { generateSlug } from "@/components/admin/DeleteConfirmDialog";

const AdminEvents = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const { data: rows, isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: subscriberCounts } = useQuery({
    queryKey: ["admin-event-subscribers-count"],
    queryFn: async () => {
      const { data, error } = await supabase.from("event_subscribers").select("*");
      if (error) return {};
      // Count per event is not directly linked, so show total
      return { total: data?.length || 0 };
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-events"] }); toast({ title: "Event deleted" }); setDeleteId(null); },
  });

  const duplicateEvent = async (event: any) => {
    const payload = {
      title: `${event.title} (Copy)`,
      slug: generateSlug(`${event.title} copy ${Date.now()}`),
      date: event.date,
      location: event.location,
      city: event.city,
      country: event.country,
      description: event.description,
      registration_url: event.registration_url,
      status: "draft",
    };
    const { error } = await supabase.from("events").insert(payload);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Event duplicated as draft" });
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
    }
  };

  const filtered = rows?.filter((r) => {
    if (filter === "upcoming") return !isPast(new Date(r.date));
    if (filter === "past") return isPast(new Date(r.date));
    return true;
  });

  const statusBadge = (s: string | null) => {
    const colors: Record<string, string> = { published: "bg-green-100 text-green-700", draft: "bg-gray-100 text-gray-600" };
    return <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${colors[s || "draft"] || colors.draft}`}>{s || "draft"}</span>;
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex gap-1">
          {(["all", "upcoming", "past"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs capitalize"
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
          {subscriberCounts?.total !== undefined && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground ml-3">
              <Users size={13} /> {subscriberCounts.total} total subscribers
            </span>
          )}
        </div>
        <Button variant="teal" className="rounded-full" asChild>
          <Link to="/admin/events/new"><Plus size={16} className="mr-1" /> Add New Event</Link>
        </Button>
      </div>
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Location</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Timing</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground w-28">Actions</th>
            </tr></thead>
            <tbody>
              {isLoading ? <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              : filtered && filtered.length > 0 ? filtered.map((r) => {
                const past = isPast(new Date(r.date));
                return (
                  <tr key={r.id} className={`border-b hover:bg-muted/30 ${past ? "opacity-60" : ""}`}>
                    <td className="px-4 py-3 font-medium">{r.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{format(new Date(r.date), "MMM d, yyyy")}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.location || "—"}</td>
                    <td className="px-4 py-3">{statusBadge(r.status)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${past ? "bg-gray-100 text-gray-500" : "bg-teal-100 text-teal-700"}`}>
                        {past ? "Past" : "Upcoming"}
                      </span>
                    </td>
                    <td className="px-4 py-3"><div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                        <Link to={`/admin/events/edit/${r.id}`}><Pencil size={14} /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => duplicateEvent(r)} title="Duplicate">
                        <Copy size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteId(r.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div></td>
                  </tr>
                );
              }) : <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No events found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteConfirmDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} title="Delete this event?" />
    </div>
  );
};

export default AdminEvents;
