import React, { useState } from 'react';
import { PROJECTS } from '../constants';

const Gallery: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-luxe-white">
      <div className="max-w-7xl mx-auto px-10 md:px-16 mb-16 text-center">
        <h2 className="font-serif text-4xl md:text-6xl text-luxe-black mb-4">Selected Works</h2>
        <div className="w-20 h-1 bg-luxe-yellow mx-auto"></div>
      </div>

      <div className="max-w-7xl mx-auto px-10 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 shadow-2xl">
            {PROJECTS.map((project) => (
            <div 
                key={project.id}
                className="relative group h-[500px] overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
            >
                <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-luxe-black/60 flex flex-col justify-center items-center transition-opacity duration-300 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`}>
                    <h3 className="font-serif text-3xl text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>
                    <p className="font-sans text-luxe-yellow tracking-widest text-sm uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.category}</p>
                </div>
            </div>
            ))}
        </div>
      </div>
      
      <div className="bg-luxe-yellow py-16 text-center mt-16 mx-10 md:mx-16">
          <h3 className="font-serif text-2xl md:text-3xl text-luxe-black mb-6">Inspired by what you see?</h3>
          <a href="#contact" className="inline-block border-b-2 border-luxe-black text-luxe-black font-bold text-lg hover:text-white hover:border-white transition-colors pb-1">Start Your Project</a>
      </div>
    </section>
  );
};

export default Gallery;