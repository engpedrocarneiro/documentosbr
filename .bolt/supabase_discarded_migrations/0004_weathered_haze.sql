/*
  # Create schema for second application
  
  1. New Schema
    - Creates a separate schema for the second application
    - Adds necessary tables with proper RLS policies
    
  2. Security
    - Enable RLS on all tables
    - Add policies to restrict access by application
*/

-- Create new schema
CREATE SCHEMA IF NOT EXISTS app2;

-- Set up tables in new schema
CREATE TABLE app2.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  -- ... rest of your columns
);

-- Enable RLS
ALTER TABLE app2.documents ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "App2 users can access their documents"
  ON app2.documents
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'app_id' = 'app2' 
    AND auth.uid() = user_id
  );