/*
  # Add missing policies for document tables

  1. Changes
    - Add insert policies for document_content and document_entities
    - Add update and delete policies for all tables
    - Add indexes for better query performance

  2. Security
    - Maintain existing RLS policies
    - Add new policies for complete CRUD operations
*/

-- Add insert policy for document_content
CREATE POLICY "Users can insert their own document content"
  ON document_content FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM documents
    WHERE documents.id = document_content.document_id
    AND documents.user_id = auth.uid()
  ));

-- Add update policy for document_content
CREATE POLICY "Users can update their own document content"
  ON document_content FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM documents
    WHERE documents.id = document_content.document_id
    AND documents.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM documents
    WHERE documents.id = document_content.document_id
    AND documents.user_id = auth.uid()
  ));

-- Add delete policy for document_content
CREATE POLICY "Users can delete their own document content"
  ON document_content FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM documents
    WHERE documents.id = document_content.document_id
    AND documents.user_id = auth.uid()
  ));

-- Add insert policy for document_entities
CREATE POLICY "Users can insert their own document entities"
  ON document_entities FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM documents
    WHERE documents.id = document_entities.document_id
    AND documents.user_id = auth.uid()
  ));

-- Add update policy for document_entities
CREATE POLICY "Users can update their own document entities"
  ON document_entities FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM documents
    WHERE documents.id = document_entities.document_id
    AND documents.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM documents
    WHERE documents.id = document_entities.document_id
    AND documents.user_id = auth.uid()
  ));

-- Add delete policy for document_entities
CREATE POLICY "Users can delete their own document entities"
  ON document_entities FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM documents
    WHERE documents.id = document_entities.document_id
    AND documents.user_id = auth.uid()
  ));

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_document_content_document_id ON document_content(document_id);
CREATE INDEX IF NOT EXISTS idx_document_entities_document_id ON document_entities(document_id);
CREATE INDEX IF NOT EXISTS idx_document_entities_type ON document_entities(entity_type);