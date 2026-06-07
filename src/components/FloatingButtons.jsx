import React from 'react';

const FloatingButtons = () => {
  const phoneNumber = "917868943703";
  const whatsappNumber = "917868943703";
  const whatsappMessage = encodeURIComponent(
    "Hi! I want to place an order from Selvaraj Chicken Center 🍗\n\nPlease let me know the total amount."
  );

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 flex flex-col gap-2 sm:gap-3 z-40">
      
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3 sm:p-3.5 rounded-full shadow-lg hover:bg-[#20b859] transition transform hover:scale-110 active:scale-95 group"
        aria-label="WhatsApp Order"
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png" 
          alt="WhatsApp" 
          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
        />
        <span className="absolute right-full mr-2 bg-gray-800 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap hidden sm:inline-block">
          WhatsApp Order
        </span>
      </a>
      
      {/* Call Button */}
      <a
        href={`tel:+${phoneNumber}`}
        className="bg-[#3B82F6] text-white p-3 sm:p-3.5 rounded-full shadow-lg hover:bg-[#2563EB] transition transform hover:scale-110 active:scale-95 group"
        aria-label="Call Now"
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/724/724664.png" 
          alt="Call" 
          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
        />
        <span className="absolute right-full mr-2 bg-gray-800 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap hidden sm:inline-block">
          Call Now
        </span>
      </a>
    </div>
  );
};

export default FloatingButtons;