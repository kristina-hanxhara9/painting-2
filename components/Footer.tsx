import React from 'react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-luxe-yellow text-luxe-black py-16 border-t border-luxe-yellow/20">
      <div className="max-w-7xl mx-auto px-10 md:px-16 flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl font-serif font-bold text-luxe-black mb-2 tracking-tighter">LUXE.</h2>
          <p className="text-luxe-black/70 text-sm font-semibold">© {new Date().getFullYear()} LuxeLayers Decorators.</p>
        </div>

        <div className="flex space-x-6">
            <a href="#" className="p-3 bg-luxe-black/5 rounded-full hover:bg-luxe-black hover:text-luxe-yellow transition-all duration-300 transform hover:scale-110">
                <Instagram size={20} />
            </a>
            <a href="#" className="p-3 bg-luxe-black/5 rounded-full hover:bg-luxe-black hover:text-luxe-yellow transition-all duration-300 transform hover:scale-110">
                <Facebook size={20} />
            </a>
            <a href="#" className="p-3 bg-luxe-black/5 rounded-full hover:bg-luxe-black hover:text-luxe-yellow transition-all duration-300 transform hover:scale-110">
                <Linkedin size={20} />
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;