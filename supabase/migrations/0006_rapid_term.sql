/*
  # Fix storage bucket configuration

  1. Storage
    - Clean up existing objects and bucket
    - Recreate bucket with correct settings
    - Set file size limit and allowed MIME types
*/

-- First delete existing objects
DELETE FROM storage.objects WHERE bucket_id = 'documents';

-- Then delete and recreate the bucket
DELETE FROM storage.buckets WHERE id = 'documents';

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  false,
  524288000, -- 500MB in bytes
  ARRAY[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/csv',
    'application/json',
    'text/markdown',
    'text/plain'
  ]
);