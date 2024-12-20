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
    <div id="features" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">Recursos</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Tecnologia que Transforma
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute inset-0 bg-blue-500/10 transform skew-y-6 rounded-3xl" />
                <div className="relative p-6 bg-gray-800 rounded-2xl shadow-xl">
                  <div className="p-3 inline-block bg-blue-500/10 rounded-2xl">
                    <feature.icon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-white">{feature.name}</h3>
                  <p className="mt-3 text-base text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}