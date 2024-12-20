import { supabase } from './config';
import type { Document, DocumentContent, DocumentEntity } from './types';
import { getCurrentUser } from './auth';

export async function createDocument(
  fileName: string,
  fileType: string,
  fileSize: number,
  storagePath: string
): Promise<Document> {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('documents')
    .insert({
      user_id: user.id,
      file_name: fileName,
      file_type: fileType,
      file_size: fileSize,
      storage_path: storagePath,
      status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateDocumentStatus(
  documentId: string,
  status: 'processing' | 'completed' | 'error',
  errorMessage?: string
): Promise<void> {
  const { error } = await supabase
    .from('documents')
    .update({
      status,
      error_message: errorMessage,
      processed_at: status === 'completed' ? new Date().toISOString() : null
    })
    .eq('id', documentId);

  if (error) throw error;
}

export async function getDocuments(): Promise<Document[]> {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('documents')
    .select(`
      *,
      document_content (
        content,
        metadata,
        tags
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}