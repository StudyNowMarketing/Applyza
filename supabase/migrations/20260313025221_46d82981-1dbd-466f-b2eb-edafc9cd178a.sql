CREATE POLICY "Allow public read access to courses"
ON courses
FOR SELECT
USING (true);