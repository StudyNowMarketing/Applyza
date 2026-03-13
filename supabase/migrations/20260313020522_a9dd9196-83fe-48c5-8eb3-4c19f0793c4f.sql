
CREATE TABLE public.chatbot_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  lead_captured boolean NOT NULL DEFAULT false,
  student_name text,
  student_email text,
  page_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert chatbot conversations"
  ON public.chatbot_conversations FOR INSERT
  TO public WITH CHECK (true);

CREATE POLICY "Anyone can update their own session"
  ON public.chatbot_conversations FOR UPDATE
  TO public USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read their own session"
  ON public.chatbot_conversations FOR SELECT
  TO public USING (true);

CREATE POLICY "Authenticated full access chatbot conversations"
  ON public.chatbot_conversations FOR ALL
  TO authenticated USING (true) WITH CHECK (true);
