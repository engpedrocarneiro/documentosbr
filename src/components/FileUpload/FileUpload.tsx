import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadFile } from '../../lib/supabase/storage';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '../../lib/supabase/constants';
import { UploadZone } from './UploadZone';
import { UploadInstructions } from './UploadInstructions';

export function FileUpload() {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;

    try {
      await uploadFile(file);
      toast.success('Arquivo enviado com sucesso!');
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
    <UploadZone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive}>
      <UploadInstructions isDragActive={isDragActive} />
    </UploadZone>
  );
}