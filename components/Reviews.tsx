import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL;

const REVIEWS = [
    {
        id: 1,
        name: "Eleanor Rigby",
        location: "Kensington, London",
        text: "The attention to detail was simply unparalleled. They transformed our Victorian hallway into a work of art. The marble effect is indistinguishable from the real thing."
    },
    {
        id: 2,
        name: "Marcus Aurelius",
        location: "Mayfair, London",
        text: "Professional, punctual, and precise. LuxeLayers understood the brief immediately and delivered a finish that exceeds all expectations."
    },
    {
        id: 3,
        name: "Sarah Connors",
        location: "Chelsea, London",
        text: "I was hesitant about the gold leafing initially, but the team's advice was spot on. It adds just the right amount of warmth and luxury to the dining room."
    }
];

const Reviews: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const quoteRef = useRef<HTMLDivElement>(null);
    const authorRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<any>(null);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            handleNext();
        }, 6000);
    }, [currentIndex]);

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [startTimer]);

    const animateTransition = (nextIndex: number, direction: 'left' | 'right' = 'right') => {
        const tl = gsap.timeline();
        const exitX = direction === 'right' ? -30 : 30;
        const enterX = direction === 'right' ? 30 : -30;
        
        tl.to([quoteRef.current, authorRef.current], {
            opacity: 0,
            x: exitX,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
            onComplete: () => {
                setCurrentIndex(nextIndex);
            }
        })
        .set([quoteRef.current, authorRef.current], { x: enterX })
        .to([quoteRef.current, authorRef.current], {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        });
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % REVIEWS.length;
        animateTransition(nextIndex, 'right');
    };

    const handlePrev = () => {
        const nextIndex = (currentIndex - 1 + REVIEWS.length) % REVIEWS.length;
        animateTransition(nextIndex, 'left');
    };

    const handleManualNext = () => {
        if(timerRef.current) clearInterval(timerRef.current);
        handleNext();
        startTimer();
    }
    
    const handleManualPrev = () => {
        if(timerRef.current) clearInterval(timerRef.current);
        handlePrev();
        startTimer();
    }

    const currentReview = REVIEWS[currentIndex];

    return (
        <section className="py-24 relative overflow-hidden">
             {/* Background Image Layer - Placeholder */}
             <div className="absolute inset-0 z-0">
                <img
                    src={`${BASE_URL}images/marble-backround.png`}
                    alt="Marble Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/50"></div>
             </div>

            <div className="max-w-6xl mx-auto px-10 md:px-16 relative z-10">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-luxe-black mb-4">Client Reviews</h2>
                    <div className="w-24 h-1 bg-luxe-yellow mx-auto"></div>
                </div>

                <div className="flex items-center justify-between gap-4">
                    {/* Prev Button - Desktop */}
                    <button 
                        onClick={handleManualPrev}
                        className="hidden md:flex p-4 rounded-full border border-gray-300 bg-white/50 backdrop-blur-sm hover:bg-luxe-yellow hover:border-luxe-yellow transition-all duration-300 group shadow-sm hover:shadow-md"
                        aria-label="Previous Review"
                    >
                        <ChevronLeft size={24} className="text-gray-500 group-hover:text-black" />
                    </button>

                    <div className="max-w-4xl mx-auto px-4 text-center w-full">
                        <div className="mb-8 flex justify-center text-luxe-yellow">
                            <Quote size={48} className="rotate-180 fill-current opacity-80 drop-shadow-sm" />
                        </div>
                        
                        <div className="min-h-[200px] flex flex-col justify-center items-center overflow-hidden">
                            <h3 
                                ref={quoteRef} 
                                className="font-serif text-2xl md:text-3xl lg:text-4xl text-luxe-black leading-relaxed mb-8 italic"
                            >
                                "{currentReview.text}"
                            </h3>
                            
                            <div ref={authorRef}>
                                <p className="font-sans font-bold text-luxe-black text-lg tracking-wide uppercase">
                                    {currentReview.name}
                                </p>
                                <p className="font-sans text-luxe-gold text-sm tracking-widest uppercase mt-2 font-semibold">
                                    {currentReview.location}
                                </p>
                            </div>
                        </div>
                    </div>

                     {/* Next Button - Desktop */}
                     <button 
                        onClick={handleManualNext}
                        className="hidden md:flex p-4 rounded-full border border-gray-300 bg-white/50 backdrop-blur-sm hover:bg-luxe-yellow hover:border-luxe-yellow transition-all duration-300 group shadow-sm hover:shadow-md"
                        aria-label="Next Review"
                    >
                        <ChevronRight size={24} className="text-gray-500 group-hover:text-black" />
                    </button>
                </div>
                
                {/* Mobile Navigation & Indicators */}
                <div className="flex flex-col items-center mt-12 gap-6">
                    {/* Mobile Arrows */}
                    <div className="flex md:hidden gap-8">
                         <button 
                            onClick={handleManualPrev} 
                            className="p-3 border rounded-full border-gray-300 bg-white/50 active:bg-luxe-yellow transition-colors"
                            aria-label="Previous"
                         >
                            <ChevronLeft size={24} />
                         </button>
                         <button 
                            onClick={handleManualNext} 
                            className="p-3 border rounded-full border-gray-300 bg-white/50 active:bg-luxe-yellow transition-colors"
                            aria-label="Next"
                         >
                            <ChevronRight size={24} />
                         </button>
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex justify-center gap-3">
                        {REVIEWS.map((_, idx) => (
                            <button 
                                key={idx}
                                onClick={() => {
                                    if (timerRef.current) clearInterval(timerRef.current);
                                    if (idx !== currentIndex) animateTransition(idx, idx > currentIndex ? 'right' : 'left');
                                    startTimer();
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-10 bg-luxe-yellow' : 'w-2 bg-gray-300 hover:bg-luxe-yellow/50'}`}
                                aria-label={`Go to review ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;