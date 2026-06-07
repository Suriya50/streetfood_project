import React, { useState } from 'react';
import chicken65Image from "../assets/images/food1.png";
import eggbondImage from '../assets/images/food2.png';

const MenuSection = ({ addToCart }) => {
  const [quantities, setQuantities] = useState({
    chicken65: { selectedPortion: null, quantity: 1 },
    eggBond: { selectedPortion: null, quantity: 1 }
  });
  
  const [addedMessage, setAddedMessage] = useState({ show: false, item: '' });

  const menuItems = {
    chicken65: {
      name: "🔥 Chicken Pakoda",
      description: "Spicy, crispy, authentic South Indian style",
      image: chicken65Image,
      portions: [
        { label: "100g", price: 35, display: "100g - ₹35", weight: "100g" },
        { label: "¼ kg", price: 80, display: "¼ kg - ₹80", weight: "250g" },
        { label: "½ kg", price: 160, display: "½ kg - ₹160", weight: "500g" },
        { label: "1 kg", price: 320, display: "1 kg - ₹320", weight: "1kg" }
      ]
    },
    eggBond: {
      name: "🥚 Egg Bond",
      description: "Crispy egg bonda with special masala coating",
      image: eggbondImage,
      portions: [
        { label: "4 pcs", price: 10, display: "4 pcs - ₹10", pieces: 4, pricePerPiece: 2.5 },
        { label: "8 pcs", price: 20, display: "8 pcs - ₹20", pieces: 8, pricePerPiece: 2.5 },
        { label: "12 pcs", price: 30, display: "12 pcs - ₹30", pieces: 12, pricePerPiece: 2.5 },
        { label: "24 pcs", price: 60, display: "24 pcs - ₹60 🎉", pieces: 24, pricePerPiece: 2.5 },
        { label: "30 pcs", price: 75, display: "30 pcs - ₹75 🎉", pieces: 30, pricePerPiece: 2.5 },
        { label: "50 pcs", price: 125, display: "50 pcs - ₹125 🔥", pieces: 50, pricePerPiece: 2.5 }
      ]
    }
  };

  const handlePortionSelect = (itemKey, portion) => {
    setQuantities(prev => ({
      ...prev,
      [itemKey]: { selectedPortion: portion, quantity: 1 }
    }));
  };

  const handleQuantityChange = (itemKey, delta) => {
    setQuantities(prev => ({
      ...prev,
      [itemKey]: { 
        ...prev[itemKey], 
        quantity: Math.max(1, prev[itemKey].quantity + delta) 
      }
    }));
  };

  const handleAddToCart = (itemKey) => {
    const item = menuItems[itemKey];
    const state = quantities[itemKey];
    
    if (!state.selectedPortion) {
      alert(`Please select a portion for ${item.name}`);
      return;
    }
    
    const totalPrice = state.selectedPortion.price * state.quantity;
    
    addToCart({
      name: item.name,
      portion: state.selectedPortion.display,
      pricePerUnit: state.selectedPortion.price,
      quantity: state.quantity,
      totalPrice: totalPrice,
      image: item.image
    });
    
    setAddedMessage({ show: true, item: `${item.name} - ${state.selectedPortion.display}` });
    setTimeout(() => setAddedMessage({ show: false, item: '' }), 2000);
    
    // Auto scroll to payment section after adding to cart
    setTimeout(() => {
      const paymentSection = document.getElementById('payment');
      if (paymentSection) {
        paymentSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const getTotalForItem = (itemKey) => {
    const state = quantities[itemKey];
    if (!state.selectedPortion) return 0;
    return state.selectedPortion.price * state.quantity;
  };

  // Calculate price per piece for Egg Bond
  const getPricePerPiece = (itemKey) => {
    if (itemKey === 'eggBond') {
      return "₹2.50 per piece";
    }
    return null;
  };

  return (
    <section id="menu" className="py-10 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">Our Signature Dishes</h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">Authentic taste passed down through 25 years</p>
          <div className="w-16 h-0.5 bg-orange-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {addedMessage.show && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold animate-bounce-slow shadow-lg">
            ✅ {addedMessage.item} added! Redirecting to payment...
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          {Object.entries(menuItems).map(([key, item]) => {
            const state = quantities[key];
            const total = getTotalForItem(key);
            const pricePerPiece = getPricePerPiece(key);
            
            return (
              <div key={key} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="relative h-44 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">⭐ Bestseller</span>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-xs mb-3">{item.description}</p>
                  
                  {/* Show price per piece for Egg Bond */}
                  {pricePerPiece && (
                    <div className="mb-2 text-center">
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-semibold">
                        💰 {pricePerPiece}
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <label className="text-gray-700 font-semibold text-xs mb-1 block">Select Portion:</label>
                    <div className={`grid ${item.portions.length === 6 ? 'grid-cols-2' : 'grid-cols-2'} gap-1.5`}>
                      {item.portions.map((portion, idx) => (
                        <button key={idx} onClick={() => handlePortionSelect(key, portion)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition ${
                            state.selectedPortion?.label === portion.label 
                              ? 'bg-orange-600 text-white' 
                              : 'bg-orange-50 text-orange-700 border border-orange-200'
                          }`}>
                          {portion.display}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Show quantity selector only if portion selected */}
                  {state.selectedPortion && (
                    <div className="mb-3 p-2 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleQuantityChange(key, -1)} className="bg-orange-500 text-white w-6 h-6 rounded-full text-sm font-bold">-</button>
                          <span className="text-base font-bold w-8 text-center">{state.quantity}</span>
                          <button onClick={() => handleQuantityChange(key, 1)} className="bg-orange-500 text-white w-6 h-6 rounded-full text-sm font-bold">+</button>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-500">
                            {key === 'eggBond' ? `${state.selectedPortion.pieces * state.quantity} pieces` : 'Total'}
                          </p>
                          <p className="text-base font-bold text-green-600">₹{total}</p>
                        </div>
                      </div>
                      {/* Show piece count for Egg Bond */}
                      {key === 'eggBond' && state.selectedPortion && (
                        <p className="text-[9px] text-gray-400 text-center mt-1">
                          📦 Total pieces: {state.selectedPortion.pieces * state.quantity} pieces
                        </p>
                      )}
                    </div>
                  )}

                  <button onClick={() => handleAddToCart(key)}
                    className={`w-full py-2 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-1 ${
                      state.selectedPortion 
                        ? 'bg-orange-600 text-white hover:bg-orange-700' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!state.selectedPortion}>
                    🛒 {state.selectedPortion ? 'Add to Cart & Proceed' : 'Select Portion First'}
                  </button>
                  
                  {/* Quick tip */}
                  {state.selectedPortion && (
                    <p className="text-[9px] text-gray-400 text-center mt-2">
                      ⚡ Clicking will take you to payment
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-orange-100 rounded-lg p-3 text-center">
          <p className="text-orange-800 text-xs font-medium">💡 How to Order: Select portion → Choose quantity → Add to Cart → Auto redirect to payment</p>
          <div className="flex flex-wrap justify-center gap-2 mt-1 text-[10px] text-orange-600">
            <span>🍗 Chicken Pakoda: 100g-₹35 | ¼kg-₹80 | ½kg-₹160 | 1kg-₹320</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-1 text-[10px] text-green-600">
            <span>🥚 Egg Bond: 4pcs-₹10 | 8pcs-₹20 | 12pcs-₹30 | 24pcs-₹60 | 30pcs-₹75 | 50pcs-₹125</span>
          </div>
          <p className="text-[9px] text-gray-500 mt-1">✨ ₹2.50 per piece | Bulk orders welcome!</p>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;