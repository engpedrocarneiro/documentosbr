/*
  # Fix storage trigger and metadata handling

  1. Updates
    - Improve metadata handling in trigger
    - Add fallback values for required fields
    - Better error handling
*/

CREATE OR REPLACE FUNCTION public.handle_storage_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure we have valid metadata
  IF NEW.metadata IS NULL THEN
    NEW.metadata := jsonb_build_object(
      'mimetype', 'application/octet-stream',
      'size', '0'
    );
  END IF;

  -- Insert into documents with proper error handling
  INSERT INTO public.documents (
    user_id,
    file_name,
    file_type,
    file_size,
    storage_path,
    status
  ) VALUES (
    NEW.owner,
    NEW.name,
    COALESCE(NEW.metadata->>'mimetype', 'application/octet-stream'),
    COALESCE((NEW.metadata->>'size')::bigint, 0),
    NEW.name,
    'pending'
  );
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log error and continue (prevents upload failure)
  RAISE WARNING 'Error in handle_storage_insert: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_storage_insert ON storage.objects;
CREATE TRIGGER on_storage_insert
  AFTER INSERT ON storage.objects
  FOR EACH ROW
  WHEN (NEW.bucket_id = 'documents')
  EXECUTE FUNCTION public.handle_storage_insert();