/*
  # Storage bucket and policies setup

  1. Storage
    - Ensure 'documents' bucket exists
    - Set bucket as private
  2. Security
    - Drop existing policies to avoid conflicts
    - Create new policies for authenticated users
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;
    DROP POLICY IF EXISTS "Users can read their own documents" ON storage.objects;
    DROP POLICY IF EXISTS "Users can update their own documents" ON storage.objects;
    DROP POLICY IF EXISTS "Users can delete their own documents" ON storage.objects;
END $$;

-- Create new policies
CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND 
  auth.uid() = owner
);

CREATE POLICY "Users can read their own documents"
ON storage.objects FOR SELECT 
TO authenticated
USING (
  bucket_id = 'documents' AND 
  auth.uid() = owner
);

CREATE POLICY "Users can update their own documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents' AND 
  auth.uid() = owner
)
WITH CHECK (
  bucket_id = 'documents' AND 
  auth.uid() = owner
);

CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE 
TO authenticated
USING (
  bucket_id = 'documents' AND 
  auth.uid() = owner
);