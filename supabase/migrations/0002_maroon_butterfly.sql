/*
  # Document Processing System Schema

  1. New Tables
    - `documents`
      - Stores document metadata and processing status
    - `document_content`
      - Stores processed document content and structure
    - `document_entities`
      - Stores extracted entities from documents
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Documents table
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  file_name text NOT NULL,
  file_type text NOT NULL,
  file_size bigint NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  storage_path text NOT NULL,
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz,
  error_message text,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'completed', 'error'))
);

-- Document content table (stores processed JSON structure)
CREATE TABLE document_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  content jsonb NOT NULL,
  metadata jsonb NOT NULL,
  relationships jsonb,
  tags text[],
  confidence float NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Document entities table
CREATE TABLE document_entities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  entity_type text NOT NULL,
  entity_value text NOT NULL,
  context text,
  confidence float NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_entities ENABLE ROW LEVEL SECURITY;

-- Policies for documents
CREATE POLICY "Users can insert their own documents"
  ON documents FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own documents"
  ON documents FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
  ON documents FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for document_content
CREATE POLICY "Users can view their own document content"
  ON document_content FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM documents
    WHERE documents.id = document_content.document_id
    AND documents.user_id = auth.uid()
  ));

-- Policies for document_entities
CREATE POLICY "Users can view their own document entities"
  ON document_entities FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM documents
    WHERE documents.id = document_entities.document_id
    AND documents.user_id = auth.uid()
  ));