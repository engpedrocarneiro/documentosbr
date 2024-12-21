import { supabase } from './config';
import { STORAGE_BUCKET } from './constants';
import type { StorageFile } from './types';

interface DocumentRow {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

export async function uploadFile(file: File) {
  try {
    // Sanitize filename - replace special chars and spaces with underscores
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}-${sanitizedName}`;
    
    // Include metadata during upload
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type, // Explicitly set content type
        metadata: {
          mimetype: file.type,
          size: file.size.toString(),
          filename: sanitizedName
        }
      });

    if (error) {
      console.error('Erro no upload:', error);
      throw error;
    }

    // Get the document ID after upload
    const { data: document, error: docError } = await supabase
      .from('documents')
      .select('id')
      .eq('storage_path', fileName)
      .single();

    if (docError) {
      console.error('Erro ao obter ID do documento:', docError);
      throw docError;
    }

    return {
      storageData: data,
      documentId: document.id
    };
  } catch (error) {
    console.error('Erro no upload:', error);
    throw error;
  }
}

export async function getFileUrl(path: string) {
  try {
    // Sanitize path before requesting URL
    const sanitizedPath = encodeURIComponent(path);
    
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(sanitizedPath, 3600);

    if (error) {
      console.error('Erro ao gerar URL:', error);
      throw error;
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Erro ao gerar URL:', error);
    throw error;
  }
}

export async function listFiles(): Promise<StorageFile[]> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao listar arquivos:', error);
      throw error;
    }

    return data.map((doc: DocumentRow) => ({
      id: doc.id,
      name: doc.file_name,
      created_at: doc.created_at,
      updated_at: doc.created_at,
      last_accessed_at: doc.created_at,
      metadata: {
        size: doc.file_size,
        mimetype: doc.file_type || 'application/octet-stream' // Fallback MIME type
      }
    }));
  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    throw error;
  }
}

export async function deleteFile(path: string) {
  try {
    // Delete from storage first
    const { error: storageError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path]);

    if (storageError) {
      console.error('Erro ao deletar arquivo do storage:', storageError);
      throw storageError;
    }

    // Document will be automatically deleted due to CASCADE
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error);
    throw error;
  }
}