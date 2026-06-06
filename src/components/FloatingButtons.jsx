import React from 'react';

const FloatingButtons = () => {
  const phoneNumber = "917868943703";
  const whatsappNumber = "917868943703";
  const whatsappMessage = encodeURIComponent("Hi! I want to place an order from Selvaraj Chicken Center 🍗");

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-40">
      <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer"
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110 group">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.588 2.034.899 3.115.899h.002c3.18 0 5.767-2.586 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766z"/>
        </svg>
      </a>
      
      <a href={`tel:+${phoneNumber}`} className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-110">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>
    </div>
  );
};

export default FloatingButtons;