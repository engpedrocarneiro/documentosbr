import { Mail, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/ianovar-ative-o-futuro',
    icon: Facebook
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/ia_novar',
    icon: Instagram
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/ianovar-ative-o-futuro',
    icon: Linkedin
  }
];

export function Contact() {
  return (
    <div id="contato" className="bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Entre em Contato</h2>
          <p className="mt-4 text-lg text-gray-400">
            Estamos aqui para ajudar sua empresa a ativar o futuro
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex items-center justify-center space-x-4 text-gray-300">
            <Phone className="h-6 w-6" />
            <span>+55 34 99283-3213</span>
          </div>
          <div className="flex items-center justify-center space-x-4 text-gray-300">
            <Mail className="h-6 w-6" />
            <a href="mailto:contato@ianovar.com.br" className="hover:text-blue-500">
              contato@ianovar.com.br
            </a>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500"
              >
                <span className="sr-only">{link.name}</span>
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}