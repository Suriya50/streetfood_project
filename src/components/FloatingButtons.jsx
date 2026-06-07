import React from 'react';

const FloatingButtons = () => {
  const phoneNumber = "917868943703";
  const whatsappNumber = "917868943703";
  const whatsappMessage = encodeURIComponent(
    "Hi! I want to place an order from Selvaraj Chicken Center 🍗\n\nPlease let me know the total amount."
  );

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-40">
      
      {/* WhatsApp Button with Online Icon */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#20b859] transition transform hover:scale-110 group"
        aria-label="WhatsApp Order"
      >
        {/* WhatsApp Icon from CDN */}
        <img 
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png" 
          alt="WhatsApp" 
          className="w-5 h-5 object-contain"
        />
        <span className="absolute right-full mr-2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          WhatsApp Order
        </span>
      </a>
      
      {/* Call Button with Online Icon */}
      <a
        href={`tel:+${phoneNumber}`}
        className="bg-[#3B82F6] text-white p-3.5 rounded-full shadow-lg hover:bg-[#2563EB] transition transform hover:scale-110 group"
        aria-label="Call Now"
      >
        {/* Phone Icon from CDN */}
        <img 
          src="https://cdn-icons-png.flaticon.com/512/724/724664.png" 
          alt="Call" 
          className="w-5 h-5 object-contain"
        />
        <span className="absolute right-full mr-2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Call Now
        </span>
      </a>
    </div>
  );
};

export default FloatingButtons;