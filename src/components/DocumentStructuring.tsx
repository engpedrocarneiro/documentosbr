import React, { useState } from 'react';
import { FileText, Save, Trash2 } from 'lucide-react';
import { processDocument } from '../lib/llm/documentProcessor';
import toast from 'react-hot-toast';
import type { ProcessedDocument } from '../lib/llm/types';

interface Props {
  documentId: string;
  fileName: string;
  onClose: () => void;
}

export function DocumentStructuring({ documentId, fileName, onClose }: Props) {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ProcessedDocument | null>(null);

  const handleProcess = async () => {
    setProcessing(true);
    const toastId = toast.loading('Estruturando documento...');

    try {
      const processed = await processDocument(documentId);
      setResult(processed);
      toast.success('Documento estruturado com sucesso!', { id: toastId });
    } catch (error) {
      console.error('Erro ao estruturar documento:', error);
      toast.error('Falha ao estruturar documento', { id: toastId });
    } finally {
      setProcessing(false);
    }
  };

  const handleSave = async () => {
    // Implement save to database functionality
    toast.success('Estrutura salva com sucesso!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-gray-200">{fileName}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {!processing && !result && (
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                Clique no botão abaixo para iniciar a estruturação do documento usando IA
              </p>
              <button
                onClick={handleProcess}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Estruturar Documento
              </button>
            </div>
          )}

          {processing && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-300">Processando documento...</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="bg-gray-700/50 p-4 rounded">
                <h4 className="text-lg font-medium text-gray-200 mb-2">Metadados</h4>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-400">Tipo</dt>
                    <dd className="text-gray-200">{result.metadata.documentType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-400">Classificação</dt>
                    <dd className="text-gray-200">{result.metadata.classification}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-200 mb-2">Conteúdo</h4>
                <div className="space-y-4">
                  <p className="text-gray-300">{result.content.summary}</p>
                  
                  {result.content.sections.map((section, index) => (
                    <div key={index} className="bg-gray-700/50 p-4 rounded">
                      <h5 className="font-medium text-gray-200 mb-2">{section.title}</h5>
                      <p className="text-gray-300">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {result.content.keyMetrics.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-2">Métricas Chave</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {result.content.keyMetrics.map((metric, index) => (
                      <div key={index} className="bg-gray-700/50 p-3 rounded">
                        <dt className="text-sm text-gray-400">{metric.name}</dt>
                        <dd className="text-gray-200">
                          {metric.value} {metric.unit}
                        </dd>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.tags.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {result && (
          <div className="p-4 border-t border-gray-700 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-gray-200"
            >
              Descartar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Estrutura</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}