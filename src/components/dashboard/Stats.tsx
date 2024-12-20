import { FileText, Clock, CheckCircle } from 'lucide-react';

interface StatsProps {
  totalDocuments: number;
  processing: number;
  processed: number;
}

export function Stats({ totalDocuments, processing, processed }: StatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-400">Total de Documentos</p>
            <p className="text-2xl font-semibold text-white">{totalDocuments}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center">
          <Clock className="h-8 w-8 text-yellow-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-400">Em Processamento</p>
            <p className="text-2xl font-semibold text-white">{processing}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-400">Processados</p>
            <p className="text-2xl font-semibold text-white">{processed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}