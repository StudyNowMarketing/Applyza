import { supabase } from "@/integrations/supabase/client";

type NotificationType = "contact" | "consultation" | "institution" | "partner" | "event_registration";

interface CreateNotificationParams {
  type: NotificationType;
  title: string;
  message: string;
}

export const createNotification = async ({ type, title, message }: CreateNotificationParams) => {
  try {
    await supabase.from("notifications" as any).insert({ type, title, message });
  } catch {
    // Silently fail — notifications are non-critical
  }
};
