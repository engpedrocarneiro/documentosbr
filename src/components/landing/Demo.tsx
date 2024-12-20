import { FileText, Brain, Zap } from 'lucide-react';

export function Demo() {
  return (
    <div id="demo" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">Demonstração</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Veja como funciona
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
            Experimente o poder da IA na gestão documental
          </p>
        </div>

        <div className="mt-20">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-800 text-lg font-medium text-gray-400">
                Processo Simplificado
              </span>
            </div>
          </div>

          <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
            <div className="flex flex-col rounded-2xl shadow-lg overflow-hidden bg-gray-900">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500/10 mb-4">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">1. Upload do Documento</h3>
                  <p className="text-gray-400">
                    Faça o upload do seu documento em diversos formatos: PDF, DOCX, TXT e mais
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl shadow-lg overflow-hidden bg-gray-900">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500/10 mb-4">
                    <Brain className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">2. Processamento IA</h3>
                  <p className="text-gray-400">
                    Nossa IA analisa e extrai informações relevantes automaticamente
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl shadow-lg overflow-hidden bg-gray-900">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500/10 mb-4">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">3. Resultados Instantâneos</h3>
                  <p className="text-gray-400">
                    Receba insights, resumos e análises detalhadas em segundos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}