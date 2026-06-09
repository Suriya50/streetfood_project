import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (item) => {
    // Check if same item with same portion already exists
    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem.name === item.name && cartItem.portion === item.portion
    );
    
    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedCart = [...cartItems];
      const existingItem = updatedCart[existingItemIndex];
      const newQuantity = existingItem.quantity + item.quantity;
      updatedCart[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
        totalPrice: newQuantity * existingItem.pricePerUnit
      };
      setCartItems(updatedCart);
    } else {
      // Add new item
      setCartItems([...cartItems, { ...item, id: Date.now() }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { 
        ...item, 
        quantity: newQuantity, 
        totalPrice: newQuantity * item.pricePerUnit 
      } : item
    ));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    setOrderPlaced(true);
    // Reset order placed flag after 3 seconds
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
      <Navbar cartItemCount={cartItems.length} />
      <Hero />
      <MenuSection addToCart={addToCart} />
      
      {/* Cart Section - Only show if cart has items */}
      {cartItems.length > 0 && (
        <Cart 
          cartItems={cartItems} 
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          total={calculateTotal()} 
        />
      )}
      
      {/* Payment Section with ID for auto-scroll from MenuSection */}
      <div id="payment">
        <Payment 
          total={calculateTotal()} 
          cartItems={cartItems}
          clearCart={clearCart}
        />
      </div>
      
      <Contact />
      <Footer />
      <FloatingButtons />
      
      {/* Order Success Toast */}
      {orderPlaced && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
          🎉 Order Placed Successfully! Thank you! 🎉
        </div>
      )}
    </div>
  );
}

export default App;