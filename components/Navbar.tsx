import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    
    // GSAP Animation for Mobile Menu
    if (nextState) {
        // Opening
        gsap.to(".mobile-menu", { height: "100vh", duration: 0.5, ease: "power3.out" });
        gsap.fromTo(".mobile-link", 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.1, delay: 0.2, duration: 0.4 }
        );
    } else {
        // Closing
        gsap.to(".mobile-menu", { height: 0, duration: 0.5, ease: "power3.in" });
    }
  };

  const handleLinkClick = () => {
    if (isOpen) toggleMenu();
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-luxe-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-10 md:px-16 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className={`text-2xl font-serif font-bold tracking-tighter relative z-50 transition-colors duration-300 ${scrolled ? 'text-luxe-black' : 'text-white'}`}>
          LUXE<span className="text-luxe-yellow">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-sans font-semibold tracking-widest uppercase transition-colors hover:text-luxe-yellow ${scrolled ? 'text-luxe-black/70' : 'text-white/90'}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
            onClick={toggleMenu} 
            className={`md:hidden z-50 relative transition-colors duration-300 ${isOpen ? 'text-luxe-white' : (scrolled ? 'text-luxe-black' : 'text-white')}`}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div className="mobile-menu fixed top-0 left-0 w-full h-0 bg-luxe-black z-40 overflow-hidden flex flex-col justify-center items-center">
        {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleLinkClick}
              className="mobile-link text-3xl md:text-4xl font-serif text-luxe-white mb-8 hover:text-luxe-yellow transition-colors"
            >
              {item.label}
            </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;