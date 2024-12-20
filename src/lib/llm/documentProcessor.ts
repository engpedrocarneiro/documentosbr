import { supabase } from '../supabase/config';
import { processWithOpenAI } from './openai';
import { DOCUMENT_ANALYSIS_PROMPT } from './prompts';
import type { ProcessedDocument } from './types';

export async function processDocument(documentId: string): Promise<ProcessedDocument> {
  try {
    // Get document from database
    const { data: document, error: docError } = await supabase
      .from('documents')
      .select('storage_path')
      .eq('id', documentId)
      .single();

    if (docError || !document) {
      throw new Error('Documento não encontrado');
    }

    // Download file content
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('documents')
      .download(document.storage_path);

    if (downloadError) {
      throw downloadError;
    }

    // Extract text from file
    const text = await fileData.text();

    // Update document status to processing
    await supabase
      .from('documents')
      .update({ status: 'processing' })
      .eq('id', documentId);

    // Process with OpenAI
    const result = await processWithOpenAI(text, DOCUMENT_ANALYSIS_PROMPT);

    // Update document status to completed
    await supabase
      .from('documents')
      .update({ 
        status: 'completed',
        processed_at: new Date().toISOString()
      })
      .eq('id', documentId);

    // Save processed content
    await supabase
      .from('document_content')
      .insert({
        document_id: documentId,
        content: result.content,
        metadata: result.metadata,
        relationships: result.relationships,
        tags: result.tags,
        confidence: result.metadata.confidence
      });

    return result;
  } catch (error) {
    // Update document status to error
    await supabase
      .from('documents')
      .update({ 
        status: 'error',
        error_message: error instanceof Error ? error.message : 'Unknown error'
      })
      .eq('id', documentId);

    throw error;
  }
}