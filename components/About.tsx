import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { GripVertical } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(textRef.current, 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
            );

            // Animate words specifically
            const highlightWords = document.querySelectorAll('.text-highlight');
            gsap.to(highlightWords, {
                color: "#E6C229",
                stagger: 0.2,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                }
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Before/After Image Slider */}
        <div 
            ref={containerRef}
            className="relative h-[600px] w-full cursor-col-resize overflow-hidden select-none shadow-2xl"
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
        >
           {/* Layer 1: Color (After) - This is the base */}
           <img 
             src="https://images.unsplash.com/photo-1560185009-dddeb820c7b7?q=80&w=1200&auto=format&fit=crop" 
             alt="After Decoration" 
             className="absolute inset-0 w-full h-full object-cover pointer-events-none"
           />
           <div className="absolute top-4 right-4 bg-luxe-black/70 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-sm z-10">After</div>

           {/* Layer 2: B&W (Before) - Clipped on top */}
           <div 
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
           >
                <img 
                    src="https://images.unsplash.com/photo-1560185009-dddeb820c7b7?q=80&w=1200&auto=format&fit=crop" 
                    alt="Before Decoration" 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-90 pointer-events-none"
                />
                <div className="absolute top-4 left-4 bg-white/70 text-black px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-sm z-10">Before</div>
           </div>

           {/* Slider Handle */}
           <div 
                className="absolute inset-y-0 w-1 bg-luxe-yellow cursor-col-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
           >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-luxe-yellow rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <GripVertical size={20} className="text-luxe-black" />
                </div>
           </div>

           {/* Floating Badge */}
           <div className="absolute bottom-8 right-8 bg-white p-6 z-20 shadow-xl hidden md:block border-l-4 border-luxe-yellow">
              <p className="font-serif text-3xl font-bold text-luxe-black">15+</p>
              <p className="font-sans text-xs uppercase tracking-widest text-luxe-black">Years Experience</p>
           </div>
        </div>

        {/* Text Side */}
        <div ref={textRef} className="flex flex-col justify-center">
            <h4 className="text-luxe-yellow font-bold uppercase tracking-widest mb-4 text-sm">Our Philosophy</h4>
            <h2 className="font-serif text-4xl md:text-5xl text-luxe-black mb-8 leading-tight">
                Not Just Paint. <br/>
                <span className="italic text-gray-400">Pure Atmosphere.</span>
            </h2>
            <p className="font-sans text-luxe-charcoal/80 text-lg mb-6 leading-relaxed">
                We bridge the gap between structural integrity and artistic expression. Our team specializes in <span className="text-highlight transition-colors duration-500 font-medium">Venetian plaster</span>, <span className="text-highlight transition-colors duration-500 font-medium">intricate detailing</span>, and <span className="text-highlight transition-colors duration-500 font-medium">high-gloss finishes</span> that turn ordinary walls into conversation pieces.
            </p>
            <p className="font-sans text-luxe-charcoal/80 text-lg mb-10 leading-relaxed">
                Referencing the masters of the past while utilizing the technology of the future, we ensure every stroke is purposeful and every finish is durable.
            </p>

            <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-8">
                <div>
                    <h3 className="font-serif text-2xl text-luxe-black mb-2">Precision</h3>
                    <p className="text-sm text-gray-500">Laser-guided layouts and masking.</p>
                </div>
                <div>
                    <h3 className="font-serif text-2xl text-luxe-black mb-2">Texture</h3>
                    <p className="text-sm text-gray-500">Custom mixed compounds and plasters.</p>
                </div>
            </div>
        </div>

      </div>
      
      {/* Background Marble Text Watermark */}
      <div className="absolute -left-20 top-20 text-[200px] font-serif font-bold text-gray-50 opacity-[0.03] pointer-events-none select-none z-0">
        LUXE
      </div>
    </section>
  );
};

export default About;