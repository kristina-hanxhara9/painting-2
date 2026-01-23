import React from 'react';

const BASE_URL = import.meta.env.BASE_URL;

const Contact: React.FC = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const interest = formData.get('interest') as string;
    const message = formData.get('message') as string;

    const subject = `New Inquiry from ${name} - ${interest}`;
    const body = `
Name: ${name}
Phone: ${phone}
Email: ${email}
Interest: ${interest}

Message:
${message}
    `.trim();

    // Construct mailto link
    const mailtoLink = `mailto:info@luxelayers.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-24 text-white relative overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
            <img
                src={`${BASE_URL}images/black-marble.jpeg`}
                alt="Black Marble Background"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-luxe-yellow rounded-full mix-blend-overlay filter blur-[100px] opacity-20"></div>

      <div className="max-w-4xl mx-auto px-10 md:px-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl mb-4">Ask for a Quote</h2>
          <p className="text-luxe-yellow/80 uppercase tracking-widest text-sm font-semibold">Serving London</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-md p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs uppercase tracking-widest text-luxe-yellow">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                required
                className="w-full bg-transparent border-b border-gray-600 py-3 text-white focus:outline-none focus:border-luxe-yellow transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-xs uppercase tracking-widest text-luxe-yellow">Phone Number</label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                required
                className="w-full bg-transparent border-b border-gray-600 py-3 text-white focus:outline-none focus:border-luxe-yellow transition-colors"
                placeholder="+44 20 1234 5678"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs uppercase tracking-widest text-luxe-yellow">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                required
                className="w-full bg-transparent border-b border-gray-600 py-3 text-white focus:outline-none focus:border-luxe-yellow transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
                <label htmlFor="interest" className="text-xs uppercase tracking-widest text-luxe-yellow">I'm interested in</label>
                <select id="interest" name="interest" className="w-full bg-transparent border-b border-gray-600 py-3 text-gray-300 focus:outline-none focus:border-luxe-yellow transition-colors">
                    <option className="bg-luxe-charcoal" value="Residential Painting">Residential Painting</option>
                    <option className="bg-luxe-charcoal" value="Commercial Decorating">Commercial Decorating</option>
                    <option className="bg-luxe-charcoal" value="Interior Design">Interior Design</option>
                    <option className="bg-luxe-charcoal" value="Gold Leafing & Effects">Gold Leafing & Effects</option>
                </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-xs uppercase tracking-widest text-luxe-yellow">Message</label>
            <textarea 
                id="message"
                name="message"
                required
                rows={4}
                className="w-full bg-transparent border-b border-gray-600 py-3 text-white focus:outline-none focus:border-luxe-yellow transition-colors"
                placeholder="Tell us about your space..."
            ></textarea>
          </div>

          <div className="pt-6 text-center">
            <button type="submit" className="group relative overflow-hidden bg-luxe-yellow text-luxe-black px-10 py-4 font-bold tracking-widest transition-all duration-300">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">SEND ENQUIRY</span>
                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;