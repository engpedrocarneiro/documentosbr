import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadFile } from '../lib/supabase/storage';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '../lib/supabase/constants';

export function FileUpload() {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const uploadToast = toast.loading('Enviando arquivo...');

    try {
      const uploadResult = await uploadFile(file);
      
      if (!uploadResult) {
        throw new Error('Falha no upload do arquivo');
      }

      toast.success('Arquivo enviado com sucesso!', { id: uploadToast });
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Falha ao enviar arquivo', { id: uploadToast });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false
  });

  return (
    <div 
      {...getRootProps()} 
      className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50/5' : 'border-gray-600 hover:border-blue-500'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-300">
            {isDragActive ? 'Solte o arquivo aqui' : 'Arraste e solte um arquivo aqui'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Formatos aceitos: PDF, DOCX, CSV, JSON, MD, TXT (Máx. 500MB)
          </p>
        </div>
      </div>
    </div>
  );
}