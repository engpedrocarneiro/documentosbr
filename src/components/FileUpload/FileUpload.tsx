import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { uploadFile } from '../../lib/supabase/storage';
import { processDocument } from '../../lib/llm/documentProcessor';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '../../lib/supabase/constants';
import { UploadZone } from './UploadZone';
import { UploadInstructions } from './UploadInstructions';

/**
 * Component for uploading a file and processing it with an LLM.
 *
 * This component uses the `useDropzone` hook from `react-dropzone` to
 * create a drop zone for the user to upload a file. When a file is
 * selected, the `onDrop` callback is called with the file as an argument.
 *
 * The component then calls the `uploadFile` function to upload the file
 * to Supabase Storage and get the document ID. If the upload is successful,
 * it then calls the `processDocument` function to process the document with
 * the LLM. If the processing is successful, it shows a success toast.
 *
 * If there is an error during the upload or processing, it shows an error
 * toast.
 *
 * The component renders an `UploadZone` component with the drop zone
 * styles and an `UploadInstructions` component that shows the instructions
 * for the user.
 */
export function FileUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) {
      toast.error('Nenhum arquivo selecionado');
      return;
    }

    if (!ACCEPTED_FILE_TYPES[file.type as keyof typeof ACCEPTED_FILE_TYPES]) {
      toast.error('Tipo de arquivo não suportado');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('Arquivo muito grande (máximo 500MB)');
      return;
    }

    setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDropRejected: () => {
      toast.error('Arquivo não aceito. Verifique o tipo e tamanho do arquivo.');
    }
  });

  return (
    <div className="relative">
      {isProcessing && (
        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>Processando documento...</p>
          </div>
        </div>
      )}
      <UploadZone 
        getRootProps={getRootProps as () => React.HTMLAttributes<HTMLDivElement>}
        getInputProps={getInputProps as () => React.InputHTMLAttributes<HTMLInputElement>}
        isDragActive={isDragActive}
      >
        <UploadInstructions isDragActive={isDragActive} />
      </UploadZone>
    </div>
  );
}
