import React from 'react';
import { SERVICES } from '../constants';
import { Layers, Brush, Briefcase, History } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  layers: <Layers size={32} />,
  brush: <Brush size={32} />,
  briefcase: <Briefcase size={32} />,
  history: <History size={32} />,
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-luxe-black text-luxe-white relative bg-marble-pattern bg-cover bg-center">
      <div className="absolute inset-0 bg-black/90"></div>
      
      <div className="max-w-7xl mx-auto px-10 md:px-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-800 pb-8">
            <div>
                <h2 className="font-serif text-4xl md:text-5xl mb-2">Our Expertise</h2>
                <p className="text-gray-400 max-w-md">Bespoke services tailored for the most demanding environments.</p>
            </div>
            <a href="#contact" className="hidden md:inline-block text-luxe-yellow hover:text-white transition-colors underline underline-offset-4">
                View Full Capabilities
            </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => (
            <div 
                key={service.id} 
                className="group p-10 border border-gray-800 hover:border-luxe-yellow bg-luxe-charcoal/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-luxe-yellow mb-6 group-hover:scale-110 transition-transform duration-300">
                {iconMap[service.icon]}
              </div>
              <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-luxe-yellow transition-colors">{service.title}</h3>
              <p className="font-sans text-base text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;