import React, { useState } from 'react';
import { FileText, Sparkles, X } from 'lucide-react';
import { processDocument } from '../lib/llm/documentProcessor';
import { DocumentViewer } from './DocumentViewer';
import toast from 'react-hot-toast';
import type { ProcessedDocument } from '../lib/llm/types';

interface Props {
  documentId: string;
  fileName: string;
  fileUrl: string;
  onClose: () => void;
}

export function DocumentPreview({ documentId, fileName, fileUrl, onClose }: Props) {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ProcessedDocument | null>(null);

  const handleProcess = async () => {
    setProcessing(true);
    const toastId = toast.loading('Processando documento com IA...');

    try {
      const processed = await processDocument(documentId);
      setResult(processed);
      toast.success('Documento processado com sucesso!', { id: toastId });
    } catch (error) {
      console.error('Erro ao processar documento:', error);
      toast.error('Falha ao processar documento', { id: toastId });
    } finally {
      setProcessing(false);
    }
  };

  if (result) {
    return (
      <DocumentViewer
        fileName={fileName}
        result={result}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-medium text-gray-200">{fileName}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
        <iframe
          src={fileUrl}
          className="w-full h-full rounded-lg"
          title={fileName}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleProcess}
          disabled={processing}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{processing ? 'Processando...' : 'Processar com IA'}</span>
        </button>
      </div>
    </div>
  );
}