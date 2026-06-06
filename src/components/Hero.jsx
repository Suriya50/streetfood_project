import React from 'react';

const Hero = () => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1563379091339-03b21d4e5f2d?w=1200)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-orange-900/60"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate__fadeInUp">
          <div className="inline-flex items-center gap-2 bg-orange-500 px-3 py-1 rounded-full text-[11px] font-semibold mb-4 shadow-lg">
            🎉 25 Years of Legacy 🎉
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Selvaraj <span className="text-orange-400">Chicken</span> Center
          </h1>
          
          <p className="text-sm md:text-base mb-4 text-orange-100">
            Authentic Spicy Chicken Pakoda & Crispy Egg Bond • Since 1999
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <button 
              onClick={scrollToMenu}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold transition transform hover:scale-105 shadow-lg"
            >
              🍗 Order Now
            </button>
            <a 
              href="tel:+919786626486"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold transition"
            >
              📞 Call Now
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {[
              { value: '20+', label: 'Years' },
              { value: '50K+', label: 'Customers' },
              { value: '100%', label: 'Fresh' },
              { value: '⭐ 4.9', label: 'Rating' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center backdrop-blur-sm bg-white/10 rounded-xl p-2">
                <div className="text-xl font-bold text-orange-400">{stat.value}</div>
                <div className="text-[10px] text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToMenu}>
        <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-1.5 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;