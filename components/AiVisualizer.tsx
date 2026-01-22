import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import gsap from 'gsap';
import { Upload, Loader2, Sparkles, RefreshCw, ArrowRight, Image as ImageIcon } from 'lucide-react';

interface PaletteColor {
  name: string;
  hex: string;
}

const AiVisualizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<PaletteColor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP animations
  useEffect(() => {
    if (generatedImage && resultsRef.current) {
        gsap.fromTo(resultsRef.current, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
        
        gsap.fromTo(".color-swatch", 
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, delay: 0.5, ease: "back.out(1.7)" }
        );
    }
  }, [generatedImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setGeneratedImage(null);
        setPalette([]);
        setError(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const generateMakeover = async () => {
    if (!preview || !process.env.API_KEY) return;

    setLoading(true);
    setError(null);

    try {
      // Remove data URL prefix for API
      const base64Data = preview.split(',')[1];
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        Redecorate this room interior to look stunning, modern, and high-end. 
        Keep the structural layout the same but change the wall colors, finishes, and decor style.
        Make it look like a professional magazine photo.
        
        Also, strict requirement: In your text response, list exactly 3 dominant colors used in your new design.
        Format the text response strictly as a JSON array of objects, like this:
        [{"name": "Color Name", "hex": "#HEXCODE"}, {"name": "Color Name", "hex": "#HEXCODE"}]
        Do not add any markdown formatting or explanation, just the JSON string.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Data,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      let imgData = null;
      let textData = "";

      // Parse response parts
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                imgData = part.inlineData.data;
            } else if (part.text) {
                textData += part.text;
            }
        }
      }

      if (imgData) {
        setGeneratedImage(`data:image/jpeg;base64,${imgData}`);
        
        // Attempt to parse JSON palette from text
        try {
            // Clean up text data to find JSON array
            const jsonMatch = textData.match(/\[.*\]/s);
            if (jsonMatch) {
                const parsedPalette = JSON.parse(jsonMatch[0]);
                setPalette(parsedPalette.slice(0, 3));
            } else {
                // Fallback palette if parsing fails
                setPalette([
                    { name: "Luxe Gold", hex: "#D4AF37" },
                    { name: "Charcoal", hex: "#1F1F1F" },
                    { name: "Pearl White", hex: "#F5F5F7" }
                ]);
            }
        } catch (e) {
            console.warn("Could not parse palette", e);
             setPalette([
                { name: "Modern Grey", hex: "#808080" },
                { name: "Accent Blue", hex: "#4A90E2" },
                { name: "Cream", hex: "#FFFDD0" }
            ]);
        }
      } else {
        throw new Error("No image generated.");
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try a different image.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
      setFile(null);
      setPreview(null);
      setGeneratedImage(null);
      setPalette([]);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-luxe-white border-t border-gray-200 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxe-yellow/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
            <span className="text-luxe-yellow font-bold tracking-widest uppercase text-xs mb-2 block">AI Powered Design</span>
            <h2 className="font-serif text-4xl md:text-5xl text-luxe-black mb-4">Instant Room Makeover</h2>
            <p className="font-sans text-gray-500 max-w-2xl mx-auto">
                Upload a photo of your room. Our AI will analyze the lighting and structure, reimagine the space, and suggest a bespoke color palette instantly.
            </p>
        </div>

        {!preview ? (
            <div className="max-w-xl mx-auto">
                <label 
                    htmlFor="room-upload" 
                    className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-luxe-yellow/50 rounded-xl cursor-pointer bg-white hover:bg-luxe-yellow/5 transition-colors group"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                        <div className="w-16 h-16 bg-luxe-yellow/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-8 h-8 text-luxe-yellow" />
                        </div>
                        <p className="mb-2 text-xl font-serif text-luxe-black font-medium">Click to upload your room</p>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">JPG, PNG up to 10MB</p>
                    </div>
                    <input id="room-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
            </div>
        ) : (
            <div className="flex flex-col items-center">
                {!generatedImage ? (
                    <div className="w-full max-w-2xl relative rounded-xl overflow-hidden shadow-2xl mb-8">
                         <img src={preview} alt="Original Room" className="w-full h-auto object-cover" />
                         {loading && (
                             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                 <Loader2 className="w-12 h-12 animate-spin text-luxe-yellow mb-4" />
                                 <p className="font-serif text-xl animate-pulse">Designing your new space...</p>
                                 <p className="text-xs text-gray-300 mt-2 uppercase tracking-widest">Analyzing Lighting & Structure</p>
                             </div>
                         )}
                         {!loading && !error && (
                             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-center">
                                 <button 
                                    onClick={() => generateMakeover()}
                                    className="bg-luxe-yellow text-luxe-black px-8 py-3 font-bold rounded-full hover:bg-white hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    <Sparkles size={18} />
                                    Generate Makeover
                                 </button>
                             </div>
                         )}
                         {error && (
                             <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white p-6 text-center">
                                 <p className="text-red-400 mb-4">{error}</p>
                                 <button onClick={handleReset} className="underline hover:text-luxe-yellow">Try Again</button>
                             </div>
                         )}
                    </div>
                ) : (
                    <div ref={resultsRef} className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {/* Original */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-serif text-2xl text-luxe-black">Original</h3>
                                    <span className="text-xs uppercase tracking-widest text-gray-400">Your Canvas</span>
                                </div>
                                <div className="relative rounded-xl overflow-hidden shadow-lg h-64 md:h-80">
                                    <img src={preview} alt="Original" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Generated */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-serif text-2xl text-luxe-black flex items-center gap-2">
                                        <Sparkles size={20} className="text-luxe-yellow" />
                                        Concept
                                    </h3>
                                    <span className="text-xs uppercase tracking-widest text-luxe-yellow">AI Generated</span>
                                </div>
                                <div className="relative rounded-xl overflow-hidden shadow-lg h-64 md:h-80 ring-2 ring-luxe-yellow/50">
                                    <img src={generatedImage} alt="Makeover" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>

                        {/* Palette & CTA */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                            
                            <div className="flex-1 w-full">
                                <h4 className="font-serif text-xl mb-4 text-luxe-black">Suggested Palette</h4>
                                <div className="flex flex-wrap gap-4">
                                    {palette.map((color, idx) => (
                                        <div key={idx} className="color-swatch flex items-center gap-3 bg-gray-50 p-2 pr-4 rounded-full border border-gray-200">
                                            <div 
                                                className="w-10 h-10 rounded-full shadow-inner border border-black/5" 
                                                style={{ backgroundColor: color.hex }}
                                            ></div>
                                            <div className="text-left">
                                                <p className="font-bold text-sm text-luxe-black leading-tight">{color.name}</p>
                                                <p className="text-xs text-gray-500 uppercase">{color.hex}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-full w-px bg-gray-200 hidden md:block"></div>

                            <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
                                <div>
                                    <p className="font-serif text-lg text-luxe-black mb-1">Love this look?</p>
                                    <p className="text-sm text-gray-500">Our team can match these exact shades.</p>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={handleReset}
                                        className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 hover:text-black transition-colors flex items-center gap-2 text-sm"
                                    >
                                        <RefreshCw size={16} />
                                        Start Over
                                    </button>
                                    <a 
                                        href="#contact"
                                        className="px-6 py-3 rounded-full bg-luxe-black text-white font-bold hover:bg-luxe-yellow hover:text-luxe-black transition-colors flex items-center gap-2 text-sm shadow-lg"
                                    >
                                        Book Consultation
                                        <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </section>
  );
};

export default AiVisualizer;