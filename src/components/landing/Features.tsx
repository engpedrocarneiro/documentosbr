import { Brain, Sparkles, Shield, Rocket } from 'lucide-react';

const features = [
  {
    name: 'IA Avançada',
    description: 'Tecnologia de ponta em processamento de linguagem natural para extrair insights valiosos dos seus documentos.',
    icon: Brain
  },
  {
    name: 'Inovação Contínua',
    description: 'Atualizações constantes com as mais recentes tecnologias para manter sua empresa sempre à frente.',
    icon: Sparkles
  },
  {
    name: 'Segurança Prioritária',
    description: 'Proteção robusta dos seus dados com criptografia e controles de acesso avançados.',
    icon: Shield
  },
  {
    name: 'Transformação Digital',
    description: 'Acelere a evolução digital da sua empresa com soluções inteligentes e escaláveis.',
    icon: Rocket
  }
];

export function Features() {
  return (
    <div className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">Por que IAnovar</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Tecnologia que Transforma
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-gray-800 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}