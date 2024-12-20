/*
  # Storage setup for document processing

  1. Storage Configuration
    - Create documents bucket
    - Set up RLS policies for document access
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users to:
      - Upload documents
      - Read their own documents
      - Delete their own documents
*/

-- Enable storage by creating the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('documents', 'documents')
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow users to upload their own documents
CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND 
  auth.uid() = owner
);

-- Allow users to read their own documents
CREATE POLICY "Users can read their own documents"
ON storage.objects FOR SELECT 
TO authenticated
USING (
  bucket_id = 'documents' AND 
  auth.uid() = owner
);

-- Allow users to delete their own documents
CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE 
TO authenticated
USING (
  bucket_id = 'documents' AND 
  auth.uid() = owner
);