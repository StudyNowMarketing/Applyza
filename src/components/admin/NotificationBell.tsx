import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const typeConfig: Record<string, { label: string; color: string; link: string }> = {
  contact: { label: "Contact", color: "bg-red-100 text-red-700", link: "/admin/contact-messages" },
  consultation: { label: "Consultation", color: "bg-teal-100 text-teal-700", link: "/admin/consultations" },
  institution: { label: "Institution", color: "bg-indigo-100 text-indigo-700", link: "/admin/institution-enquiries" },
  partner: { label: "Partner", color: "bg-amber-100 text-amber-700", link: "/admin/partner-enquiries" },
  event_registration: { label: "Event", color: "bg-blue-100 text-blue-700", link: "/admin/events" },
};

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["admin-notifications"],
    queryFn: async () => {
      const { data } = await supabase
        .from("notifications" as any)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      return (data || []) as any[];
    },
    refetchInterval: 30000,
  });

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("notifications" as any).update({ read: true }).eq("id", id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-notifications"] }),
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      await supabase.from("notifications" as any).update({ read: true }).eq("read", false);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-notifications"] }),
  });

  const handleClick = (n: any) => {
    if (!n.read) markRead.mutate(n.id);
    const config = typeConfig[n.type];
    if (config) navigate(config.link);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Notifications">
          <Bell size={18} className="text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] h-[18px] bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-sm font-bold text-primary">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={() => markAllRead.mutate()}
              className="text-[11px] text-secondary hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground text-xs py-8">No notifications</p>
          ) : (
            notifications.map((n: any) => {
              const config = typeConfig[n.type] || { label: n.type, color: "bg-muted text-muted-foreground", link: "/admin" };
              return (
                <button
                  key={n.id}
                  onClick={() => handleClick(n)}
                  className={`w-full text-left px-4 py-3 border-b last:border-0 hover:bg-muted/50 transition-colors ${!n.read ? "bg-secondary/5" : ""}`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-0.5 shrink-0 ${config.color}`}>
                      {config.label}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs leading-snug ${!n.read ? "font-semibold text-primary" : "text-muted-foreground"}`}>
                        {n.title}
                      </p>
                      {n.message && (
                        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{n.message}</p>
                      )}
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {n.created_at ? formatDistanceToNow(new Date(n.created_at), { addSuffix: true }) : ""}
                      </p>
                    </div>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-1" />}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
