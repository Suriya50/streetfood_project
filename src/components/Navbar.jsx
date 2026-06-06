import React, { useState, useEffect } from 'react';
import logoImage from '../assets/images/logo.png';

const Navbar = ({ cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'menu', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-orange-600 shadow-xl py-1.5 backdrop-blur-md bg-opacity-95' 
        : 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 py-2.5'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer group flex-shrink-0"
            onClick={() => scrollToSection('home')}
          >
            <div className="relative flex items-center gap-2">
              <img 
                src={logoImage} 
                alt="Logo"
                className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-all duration-300"
              />
              <div className="text-left">
                <h1 className="text-[10px] md:text-xs font-black text-white tracking-wider leading-tight">
                  SELVARAJ
                </h1>
                <p className="text-[8px] md:text-[10px] text-orange-200 font-semibold">
                  CHICKEN CENTER
                </p>
              </div>
              <span className="absolute -top-2 -right-5 bg-yellow-400 text-orange-800 text-[7px] md:text-[8px] font-black rounded-full px-1 py-0.5 border border-white">
                25 Years
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {['home', 'menu', 'contact'].map((section) => (
              <button 
                key={section}
                onClick={() => scrollToSection(section)} 
                className={`relative px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeSection === section
                    ? 'text-yellow-200 bg-white/10'
                    : 'text-white hover:text-yellow-200 hover:bg-white/5'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {activeSection === section && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-yellow-400 rounded-full"></span>
                )}
              </button>
            ))}
            
            <div className="relative ml-2">
              <button className="relative p-1.5 rounded-lg text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M6 21h.01M18 21h.01" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-orange-800 text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-2 border-t border-orange-400/50">
            <div className="flex flex-col space-y-1">
              {['home', 'menu', 'contact'].map((section) => (
                <button 
                  key={section}
                  onClick={() => scrollToSection(section)} 
                  className={`text-white py-2 px-3 rounded-lg text-sm font-medium text-left ${
                    activeSection === section ? 'bg-white/10 text-yellow-200' : 'hover:bg-white/5'
                  }`}
                >
                  {section === 'home' && '🏠 '}
                  {section === 'menu' && '🍗 '}
                  {section === 'contact' && '📞 '}
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;