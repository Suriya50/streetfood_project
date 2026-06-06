import React from 'react';

const Contact = () => {
  const mapLocation = "https://maps.app.goo.gl/W1xV5Z3PgzAQ4Ynm8";

  return (
    <section id="contact" className="py-10 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">📍 Visit Us</h2>
          <div className="w-16 h-0.5 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-orange-50 rounded-xl p-4 shadow-md">
            <h3 className="text-base font-bold text-gray-800 mb-2">📍 Address</h3>
            <div className="text-gray-600 text-xs space-y-0.5">
              <p>Selvaraj Chicken Center,</p>
              <p>Karkonam, Near Bus Stop,</p>
              <p>Tiruvannamalai Dist - 606701</p>
            </div>
            
            <h3 className="text-base font-bold text-gray-800 mt-4 mb-2">⏰ Opening Hours</h3>
            <p className="text-gray-600 text-xs">Monday - Sunday</p>
            <p className="text-orange-600 font-bold text-sm">5:00 PM - 9:30 PM</p>
          </div>

          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-4 text-white">
            <h3 className="text-base font-bold mb-3">📞 Contact Us</h3>
            
            <div className="space-y-2 text-sm">
              <div><p className="text-orange-200 text-[10px]">Phone 1:</p><a href="tel:+919786626486" className="font-semibold hover:text-orange-200">📱 +91 97866 26486</a></div>
              <div><p className="text-orange-200 text-[10px]">Phone 2:</p><a href="tel:+917868943703" className="font-semibold hover:text-orange-200">📱 +91 78689 43703</a></div>
              <div><p className="text-orange-200 text-[10px]">WhatsApp:</p><a href="https://wa.me/917868943703" target="_blank" className="font-semibold hover:text-green-200">💬 +91 78689 43703</a></div>
              <div><p className="text-orange-200 text-[10px]">Email:</p><p className="text-xs break-all">📧 selvarajchicken@gmail.com</p></div>
            </div>
            
            <div className="mt-4 pt-2 border-t border-orange-500/50">
              <p className="text-xs font-semibold mb-1">⭐ Follow Us</p>
              <div className="flex gap-2">
                <a href="#" className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">Instagram</a>
                <a href="#" className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">Facebook</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-5 bg-orange-50 rounded-lg p-3 text-center">
          <p className="text-gray-700 text-xs font-medium">📍 Selvaraj Chicken Center - Karkonam</p>
          <a href={mapLocation} target="_blank" className="inline-flex items-center gap-1 bg-orange-600 text-white px-3 py-1 rounded-lg text-[11px] font-semibold mt-2 hover:bg-orange-700">
            🗺️ Open in Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;