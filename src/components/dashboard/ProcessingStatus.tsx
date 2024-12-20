import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface ProcessingStatusProps {
  status: 'processing' | 'completed' | 'error';
  fileName: string;
}

export function ProcessingStatus({ status, fileName }: ProcessingStatusProps) {
  const statusConfig = {
    processing: {
      icon: Clock,
      text: 'Processando',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    completed: {
      icon: CheckCircle,
      text: 'Concluído',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    error: {
      icon: AlertCircle,
      text: 'Erro',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`flex items-center p-4 rounded-lg ${config.bgColor}`}>
      <Icon className={`w-5 h-5 ${config.color}`} />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-200">{fileName}</p>
        <p className={`text-xs ${config.color}`}>{config.text}</p>
      </div>
    </div>
  );
}