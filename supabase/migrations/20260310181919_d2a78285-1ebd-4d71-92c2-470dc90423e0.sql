
-- Allow authenticated users to update consultation_requests
CREATE POLICY "Authenticated can update consultation requests"
ON public.consultation_requests FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

-- Allow authenticated users to select consultation_requests
CREATE POLICY "Authenticated can read consultation requests"
ON public.consultation_requests FOR SELECT TO authenticated
USING (true);

-- Allow authenticated users to update contact_messages
CREATE POLICY "Authenticated can update contact messages"
ON public.contact_messages FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

-- Allow authenticated users to update institution_enquiries
CREATE POLICY "Authenticated can update institution enquiries"
ON public.institution_enquiries FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

-- Allow authenticated users to update partner_enquiries
CREATE POLICY "Authenticated can update partner enquiries"
ON public.partner_enquiries FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);
