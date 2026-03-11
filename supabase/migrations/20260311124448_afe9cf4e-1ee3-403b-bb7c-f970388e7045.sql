
-- Add INSERT policy for anon users
CREATE POLICY "Allow anon insert on courses" 
ON public.courses 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Add UPDATE policy for anon users
CREATE POLICY "Allow anon update on courses" 
ON public.courses 
FOR UPDATE 
TO anon 
USING (true) 
WITH CHECK (true);
