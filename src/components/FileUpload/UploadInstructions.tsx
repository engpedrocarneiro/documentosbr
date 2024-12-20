import React from 'react';
import { Upload } from 'lucide-react';

interface UploadInstructionsProps {
  isDragActive: boolean;
}

export function UploadInstructions({ isDragActive }: UploadInstructionsProps) {
  return (
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
  );
}