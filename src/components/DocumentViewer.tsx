import React from 'react';
import { FileText, Download } from 'lucide-react';
import { getFileUrl } from '../lib/supabase/storage';
import type { ProcessedDocument } from '../lib/llm/types';

interface Props {
  fileName: string;
  result: ProcessedDocument;
  onClose: () => void;
}

export function DocumentViewer({ fileName, result, onClose }: Props) {
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
          <div className="space-y-6">
            {/* Metadados */}
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
                {result.metadata.author && (
                  <div>
                    <dt className="text-sm text-gray-400">Autor</dt>
                    <dd className="text-gray-200">{result.metadata.author}</dd>
                  </div>
                )}
                {result.metadata.department && (
                  <div>
                    <dt className="text-sm text-gray-400">Departamento</dt>
                    <dd className="text-gray-200">{result.metadata.department}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Conteúdo */}
            <div>
              <h4 className="text-lg font-medium text-gray-200 mb-2">Conteúdo</h4>
              <div className="space-y-4">
                <div className="bg-gray-700/50 p-4 rounded">
                  <h5 className="font-medium text-gray-200 mb-2">Resumo</h5>
                  <p className="text-gray-300">{result.content.summary}</p>
                </div>
                
                {result.content.sections.map((section, index) => (
                  <div key={index} className="bg-gray-700/50 p-4 rounded">
                    <h5 className="font-medium text-gray-200 mb-2">{section.title}</h5>
                    <p className="text-gray-300">{section.content}</p>
                    
                    {section.entities.length > 0 && (
                      <div className="mt-3">
                        <h6 className="text-sm font-medium text-gray-400 mb-2">Entidades</h6>
                        <div className="flex flex-wrap gap-2">
                          {section.entities.map((entity, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-600/50 text-gray-300 rounded text-sm"
                              title={entity.context}
                            >
                              {entity.type}: {entity.value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Métricas */}
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

            {/* Tags */}
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
        </div>
      </div>
    </div>
  );
}