import React from 'react';

const Cart = ({ cartItems, onRemove, onUpdateQuantity, total }) => {
  if (cartItems.length === 0) {
    return null;
  }

  return (
    <section className="py-6 sm:py-8 px-3 sm:px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-orange-50 rounded-xl shadow-md p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-orange-600 flex items-center gap-2">
              🛒 Your Cart
              <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItems.length} items
              </span>
            </h2>
            <button 
              onClick={() => onRemove(cartItems[0]?.id)} 
              className="text-red-500 text-xs hover:text-red-700"
            >
              Clear All
            </button>
          </div>
          
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm border border-orange-100">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</h3>
                    <p className="text-gray-500 text-[10px] sm:text-xs">{item.portion}</p>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="bg-orange-500 text-white w-6 h-6 rounded-full text-sm font-bold hover:bg-orange-600"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="bg-orange-500 text-white w-6 h-6 rounded-full text-sm font-bold hover:bg-orange-600"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="font-bold text-green-600 text-sm">₹{item.totalPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-orange-200">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-700">Total Amount:</span>
              <span className="text-xl font-bold text-green-600">₹{total.toFixed(2)}</span>
            </div>
            <a 
              href="#payment"
              className="block w-full bg-orange-600 text-white text-center py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Proceed to Payment 💳
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;