-- RLS = Row Level Security.
-- These policies are used to restric access to database tables.

-- Policies for chemicals table

-- Allow authenticated users to read chemicals table
create policy "Authenticated users can read chemicals"
on "public"."chemicals"
as PERMISSIVE
for SELECT
to authenticated
using (
  (auth.role() = 'authenticated'::text)
);

-- Allow authenticated users to add chemicals to chemicals table
create policy "Enable insert for authenticated users only"
on "public"."chemicals"
as PERMISSIVE
for INSERT
to authenticated
with check (
  true
);


-- Policies for H_phrases table

-- Allow authenticated users to read H_phrases table
create policy "Allow authenticated users to access H_phrases"
on "public"."H_phrases"
as PERMISSIVE
for SELECT
to authenticated
using (
  (auth.role() = 'authenticated'::text)
);


-- Policies for Hazard_pictograms table

-- Allow authenticated users to read Hazard_pictograms table
create policy "Allow authenticated users to access Hazard pictograms"
on "public"."Hazard_pictograms"
as PERMISSIVE
for SELECT
to authenticated
using (
  (auth.role() = 'authenticated'::text)
);


-- Policies for P_phrases

-- Allow authenticated users to read P_phrases table
create policy "Allow authenticated users to access P_phrases"
on "public"."P_phrases"
as PERMISSIVE
for SELECT
to authenticated
using (
  (auth.role() = 'authenticated'::text)
);


-- Policies for profiles table

-- Allow users to view their own profile
create policy "Users can view their own profile"
on "public"."profiles"
for SELECT
to authenticated
using (
  (auth.uid() = id)
);