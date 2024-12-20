import React, { useCallback } from 'react';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadFile } from '../../lib/supabase/storage';
import { processDocument } from '../../lib/llm/documentProcessor';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '../../lib/supabase/constants';
import { UploadZone } from './UploadZone';
import { UploadInstructions } from './UploadInstructions';

interface UploadProps {
  getRootProps: (props?: any) => DropzoneRootProps;
  getInputProps: (props?: any) => DropzoneInputProps;
  isDragActive: boolean;
}

export function FileUpload() {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;

    try {
      // Upload file and get document ID
      const { documentId } = await uploadFile(file);
      toast.success('Arquivo enviado com sucesso!');

      // Process with LLM
      try {
        await processDocument(documentId);
        toast.success('Documento processado com sucesso!');
      } catch (processError) {
        console.error('Erro no processamento:', processError);
        toast.error('Falha ao processar documento');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error('Falha ao enviar arquivo');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  return (
    <UploadZone 
      getRootProps={getRootProps} 
      getInputProps={getInputProps} 
      isDragActive={isDragActive}
    >
      <UploadInstructions isDragActive={isDragActive} />
    </UploadZone>
  );
}