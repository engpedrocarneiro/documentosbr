/*
  # Trigger para salvar documentos automaticamente

  1. Novo Trigger
    - Cria trigger que monitora inserções na tabela storage.objects
    - Insere automaticamente na tabela documents quando um arquivo é enviado
    
  2. Função
    - Função que processa a inserção do documento
    - Extrai metadados do arquivo
    - Associa com o usuário correto
*/

-- Função que será executada pelo trigger
CREATE OR REPLACE FUNCTION public.handle_storage_insert()
RETURNS TRIGGER AS $$
BEGIN
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
    NEW.metadata->>'mimetype',
    (NEW.metadata->>'size')::bigint,
    NEW.name,
    'pending'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar o trigger
DROP TRIGGER IF EXISTS on_storage_insert ON storage.objects;
CREATE TRIGGER on_storage_insert
  AFTER INSERT ON storage.objects
  FOR EACH ROW
  WHEN (NEW.bucket_id = 'documents')
  EXECUTE FUNCTION public.handle_storage_insert();