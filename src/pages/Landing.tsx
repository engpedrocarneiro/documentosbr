import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Testimonials } from '../components/landing/Testimonials';
import { Contact } from '../components/landing/Contact';

export function Landing() {
  return (
    <div className="bg-gray-900">
      <Hero />
      <Features />
      <Testimonials />
      <Contact />
    </div>
  );
}