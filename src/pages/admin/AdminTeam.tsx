import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, UserPlus } from "lucide-react";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface TeamMember {
  id: string;
  email: string;
  name: string | null;
  role: string;
  created_at: string | null;
}

const roles = [
  { value: "admin", label: "Admin", desc: "Full access including team management" },
  { value: "editor", label: "Editor", desc: "Can edit all content, SEO, blog, courses" },
  { value: "viewer", label: "Viewer", desc: "View-only access to dashboard and data" },
];

const AdminTeam = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showInvite, setShowInvite] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", name: "", role: "editor" });

  const { data: members, isLoading } = useQuery({
    queryKey: ["admin-team"],
    queryFn: async () => {
      const { data, error } = await supabase.from("admin_users").select("*").order("created_at");
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const inviteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("admin_users").insert({
        email: form.email.trim().toLowerCase(),
        name: form.name.trim() || null,
        role: form.role,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      toast({ title: "Team member added" });
      setShowInvite(false);
      setForm({ email: "", name: "", role: "editor" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("admin_users").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      toast({ title: "Team member removed" });
      setDeleteId(null);
    },
  });

  const updateRole = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const { error } = await supabase.from("admin_users").update({ role }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-team"] }),
  });

  const roleBadge = (role: string) => {
    const colors: Record<string, string> = {
      admin: "bg-purple-100 text-purple-700",
      editor: "bg-blue-100 text-blue-700",
      viewer: "bg-gray-100 text-gray-600",
    };
    return <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${colors[role] || colors.viewer}`}>{role}</span>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">Manage who has access to the admin dashboard.</p>
        <Button variant="teal" className="rounded-full" onClick={() => setShowInvite(true)}>
          <UserPlus size={16} className="mr-1" /> Add Team Member
        </Button>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : members && members.length > 0 ? (
                members.map((m) => (
                  <tr key={m.id} className="border-b hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{m.name || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{m.email}</td>
                    <td className="px-4 py-3">
                      <Select value={m.role} onValueChange={(v) => updateRole.mutate({ id: m.id, role: v })}>
                        <SelectTrigger className="h-7 text-xs w-24"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {roles.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteId(m.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No team members yet. Add your first team member above.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-card rounded-xl border p-5">
        <h3 className="font-medium text-sm mb-2">Role Permissions</h3>
        <div className="space-y-2">
          {roles.map((r) => (
            <div key={r.value} className="flex items-center gap-3">
              {roleBadge(r.value)}
              <span className="text-sm text-muted-foreground">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showInvite} onOpenChange={setShowInvite}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Email *</Label>
              <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" />
            </div>
            <div>
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {roles.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="teal" className="rounded-full" onClick={() => inviteMutation.mutate()} disabled={!form.email.trim() || inviteMutation.isPending}>
                {inviteMutation.isPending ? "Adding..." : "Add Member"}
              </Button>
              <Button variant="outline" className="rounded-full" onClick={() => setShowInvite(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Remove team member?"
        description="They will no longer have access to the admin dashboard."
      />
    </div>
  );
};

export default AdminTeam;
