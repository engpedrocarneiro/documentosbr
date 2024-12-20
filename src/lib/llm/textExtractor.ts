import { supabase } from '../supabase/config';

export async function extractTextFromFile(path: string): Promise<string> {
  const { data: fileData, error: downloadError } = await supabase.storage
    .from('documents')
    .download(path);

  if (downloadError) {
    console.error('Erro ao baixar arquivo:', downloadError);
    throw downloadError;
  }

  try {
    return await fileData.text();
  } catch (error) {
    console.error('Erro ao extrair texto do arquivo:', error);
    throw new Error('Falha ao extrair texto do arquivo');
  }
}