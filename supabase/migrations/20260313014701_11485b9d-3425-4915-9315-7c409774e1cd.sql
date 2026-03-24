-- Create chatbot_knowledge table
CREATE TABLE public.chatbot_knowledge (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT,
    keywords TEXT[],
    source_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.chatbot_knowledge ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (scraper)
CREATE POLICY "Anon can insert knowledge" ON public.chatbot_knowledge FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon can update knowledge" ON public.chatbot_knowledge FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Public can read knowledge
CREATE POLICY "Public can read knowledge" ON public.chatbot_knowledge FOR SELECT TO public USING (true);

-- Authenticated users can manage knowledge
CREATE POLICY "Authenticated can manage knowledge" ON public.chatbot_knowledge FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_chatbot_knowledge_updated_at
BEFORE UPDATE ON public.chatbot_knowledge
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();