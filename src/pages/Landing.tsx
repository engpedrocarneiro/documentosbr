import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Demo } from '../components/landing/Demo';
import { Testimonials } from '../components/landing/Testimonials';
import { Contact } from '../components/landing/Contact';
import { ChatWidget } from '../components/chat/ChatWidget';

export function Landing() {
  return (
    <div className="relative min-h-screen bg-gray-900">
      <Hero />
      <Features />
      <Demo />
      <Testimonials />
      <Contact />
      <ChatWidget />
    </div>
  );
}