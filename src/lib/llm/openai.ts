import { supabase } from '../supabase/config';
import type { ProcessedDocument } from './types';

export async function processWithOpenAI(text: string, prompt: string): Promise<ProcessedDocument> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('Usuário não autenticado');
  }

  const { data, error } = await supabase.functions.invoke('process-document', {
    body: { text, prompt },
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  });

  if (error) {
    console.error('Erro ao processar com OpenAI:', error);
    throw error;
  }

  return data as ProcessedDocument;
}