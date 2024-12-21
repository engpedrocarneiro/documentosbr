import { supabase } from '../supabase/config';
import type { ProcessedDocument } from './types';

export async function processWithOpenAI(text: string, prompt: string): Promise<ProcessedDocument> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('Usuário não autenticado');
  }

  try {
    console.log('Chamando função process-document...');
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

    console.log('Resposta da OpenAI:', data);

    // Validar estrutura da resposta
    if (!data || !data.content || !data.metadata) {
      console.error('Resposta da OpenAI inválida:', data);
      throw new Error('Resposta da OpenAI não segue a estrutura esperada');
    }

    return data as ProcessedDocument;
  } catch (error: any) {
    console.error('Erro detalhado no processamento:', {
      message: error?.message || 'Erro desconhecido',
      stack: error?.stack,
      data: error?.data
    });
    throw error;
  }
}
