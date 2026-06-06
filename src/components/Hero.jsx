import React from 'react';

const Hero = () => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Main Background with Food Images */}
      <div className="absolute inset-0">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-orange-900/70 to-red-900/60"></div>
        
        {/* Chicken 65 Background Image - Full width with blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1563379091339-03b21d4e5f2d?w=800)',
          }}
        ></div>
        
        {/* Egg Bonda Background Image - Right side overlay */}
        <div 
          className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center opacity-30 md:opacity-40"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1588166524941-3bf61eb9c6c9?w=600)',
            backgroundPosition: 'right center',
          }}
        ></div>
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
        
        {/* Food particles floating animation - Reduced on mobile */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-xl md:text-2xl opacity-15 md:opacity-20 animate-float hidden xs:block"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            >
              {i % 2 === 0 ? '🍗' : '🥚'}
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto py-8">
        <div className="animate-fadeInUp">
          {/* Hot & Fresh Badge - Mobile optimized */}
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-orange-500/90 backdrop-blur-sm px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-semibold mb-4 md:mb-5 shadow-lg border border-orange-300">
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
            </span>
            🔥 HOT & FRESH 🔥
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
            </span>
          </div>
          
          {/* Main Heading - Mobile responsive */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 drop-shadow-2xl">
            Selvaraj <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Chicken</span> Center
          </h1>
          
          {/* Tagline with food icons - Mobile optimized */}
          <p className="text-xs sm:text-sm md:text-lg mb-4 md:mb-5 text-orange-100 font-medium drop-shadow-lg px-2">
            <span className="inline-block mr-1">🍗</span>
            Authentic Spicy Chicken Pakoda 
            <span className="mx-1">•</span>
            <span className="inline-block mx-0.5">🥚</span>
            Crispy Egg Bonda
            <span className="mx-1">•</span>
            Since 1999
          </p>
          
          {/* Buttons - Mobile responsive */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={scrollToMenu}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <span>🍗</span> Order Now <span>→</span>
            </button>
            <a 
              href="tel:+919786626486"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-600 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>📞</span> Call Now
            </a>
          </div>
          
          {/* Stats Section - Mobile responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-8 md:mt-12 lg:mt-16">
            {[
              { value: '25+', label: 'Years', icon: '🎂', bg: 'from-red-500/20 to-orange-500/20' },
              { value: '50K+', label: 'Happy Foodies', icon: '😋', bg: 'from-orange-500/20 to-yellow-500/20' },
              { value: '100%', label: 'Fresh', icon: '✨', bg: 'from-green-500/20 to-emerald-500/20' },
              { value: '⭐ 4.9', label: 'Love', icon: '❤️', bg: 'from-pink-500/20 to-red-500/20' }
            ].map((stat, idx) => (
              <div key={idx} className={`text-center backdrop-blur-md bg-gradient-to-br ${stat.bg} rounded-lg md:rounded-xl p-2 md:p-3 border border-white/20 hover:scale-105 transition transform shadow-lg`}>
                <div className="text-lg md:text-2xl mb-0.5">{stat.icon}</div>
                <div className="text-base md:text-xl font-bold text-orange-400">{stat.value}</div>
                <div className="text-[8px] md:text-[10px] text-white/80 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Popular Items Tags - Mobile responsive */}
          <div className="mt-6 md:mt-8 lg:mt-10 flex flex-wrap justify-center gap-1.5 sm:gap-2">
            <span className="bg-black/40 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-xs font-medium border border-orange-500/30">
              🌶️ Chicken 65 - 100g ₹35
            </span>
            <span className="bg-black/40 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-xs font-medium border border-orange-500/30">
              🍗 Pakoda - ½ kg ₹160
            </span>
            <span className="bg-black/40 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-xs font-medium border border-orange-500/30">
              🥚 Egg Bonda - 4 pcs ₹10
            </span>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator - Mobile optimized */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-20" onClick={scrollToMenu}>
        <div className="w-5 h-7 md:w-6 md:h-9 border-2 border-white rounded-full flex justify-center">
          <div className="w-0.5 h-2 md:w-1 md:h-2.5 bg-orange-400 rounded-full mt-1.5 md:mt-2 animate-pulse"></div>
        </div>
        <p className="text-[8px] md:text-[10px] text-white/60 mt-0.5 md:mt-1">Scroll</p>
      </div>
    </section>
  );
};

export default Hero;