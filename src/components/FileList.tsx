import React, { useEffect, useState } from 'react';
import { Trash2, FileText, Eye } from 'lucide-react';
import { listFiles, deleteFile, getFileUrl } from '../lib/supabase/storage';
import toast from 'react-hot-toast';
import type { StorageFile } from '../lib/supabase/types';

export function FileList() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const data = await listFiles();
      setFiles(data);
    } catch (error) {
      console.error('Erro ao carregar arquivos:', error);
      toast.error('Falha ao carregar lista de arquivos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (path: string) => {
    try {
      await deleteFile(path);
      toast.success('Arquivo excluído com sucesso');
      loadFiles();
    } catch (error) {
      console.error('Erro ao excluir arquivo:', error);
      toast.error('Falha ao excluir arquivo');
    }
  };

  const handleView = async (path: string) => {
    try {
      const url = await getFileUrl(path);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Erro ao abrir arquivo:', error);
      toast.error('Falha ao abrir arquivo');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">Seus Arquivos</h2>
      </div>

      {files.map((file) => (
        <div 
          key={file.id}
          className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-400" />
            <span className="text-gray-200">{file.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleView(file.name)}
              className="p-2 text-gray-400 hover:text-blue-500"
              title="Visualizar"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(file.name)}
              className="p-2 text-gray-400 hover:text-red-500"
              title="Excluir"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
      
      {files.length === 0 && (
        <p className="text-center text-gray-400 py-4">
          {loading ? 'Carregando...' : 'Nenhum arquivo enviado ainda'}
        </p>
      )}
    </div>
  );
}