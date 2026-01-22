import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initial Entrance Animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Gentle zoom effect on the background video
    if (videoRef.current) {
        gsap.fromTo(videoRef.current,
            { scale: 1.1 },
            { scale: 1, duration: 2.5, ease: "power2.out" }
        );
    }

    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0, skewY: 7 }, 
      { y: 0, opacity: 1, skewY: 0, duration: 1.2, delay: 0.5 }
    )
    .fromTo(subtitleRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      "-=0.8"
    )
    .fromTo(ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        "-=0.5"
    );

  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-luxe-black">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
          >
            <source src="/videos/media.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 text-center px-10 md:px-16 max-w-6xl mx-auto">
        <h1 ref={titleRef} className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-none tracking-tight drop-shadow-2xl">
          ARTISTRY <br/> IN <span className="text-luxe-yellow">FINISH</span>
        </h1>
        
        <p ref={subtitleRef} className="font-sans text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-10 font-semibold tracking-wide drop-shadow-md">
          Transforming spaces into masterpieces with premium marble textures, gold leafing, and architectural coatings.
        </p>

        <div ref={ctaRef} className="flex flex-col items-center">
            <a href="#gallery" className="group relative inline-flex items-center justify-center px-10 py-5 bg-luxe-yellow text-luxe-black font-sans text-sm font-bold tracking-widest overflow-hidden transition-all duration-300 hover:bg-white hover:text-luxe-black shadow-xl">
                <span className="relative z-10">EXPLORE WORK</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
            </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ArrowDown className="text-white/80" size={32} />
      </div>
    </section>
  );
};

export default Hero;