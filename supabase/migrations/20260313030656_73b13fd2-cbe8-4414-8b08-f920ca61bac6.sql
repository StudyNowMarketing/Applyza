CREATE POLICY "Allow insert access to courses"
ON courses
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update access to courses"
ON courses
FOR UPDATE
USING (true)
WITH CHECK (true);