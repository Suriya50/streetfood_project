import React from 'react';

const Cart = ({ cartItems, onRemove, onUpdateQuantity, total }) => {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">🛒 Your Order</h2>
          <div className="w-16 h-0.5 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-orange-50 rounded-xl shadow-md p-4">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between py-3 border-b border-orange-200 last:border-0">
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-[11px] text-gray-500">{item.portion} @ ₹{item.pricePerUnit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="bg-orange-500 text-white w-6 h-6 rounded-full text-sm">-</button>
                    <span className="font-bold w-6 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="bg-orange-500 text-white w-6 h-6 rounded-full text-sm">+</button>
                    <span className="font-bold text-green-600 w-16 text-right text-sm">₹{item.totalPrice}</span>
                    <button onClick={() => onRemove(item.id)} className="text-red-500 text-sm ml-1">✕</button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 mt-1">
                <span className="text-base font-bold">Grand Total</span>
                <span className="text-xl font-bold text-orange-600">₹{total.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm">Your cart is empty</p>
              <p className="text-xs text-gray-400 mt-1">Add delicious items from our menu</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;