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

  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item, id: Date.now() }]);
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
      item.id === id ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.pricePerUnit } : item
    ));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
      <Navbar cartItemCount={cartItems.length} />
      <Hero />
      <MenuSection addToCart={addToCart} />
      <Cart 
        cartItems={cartItems} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={calculateTotal()} 
      />
      <Payment total={calculateTotal()} />
      <Contact />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;