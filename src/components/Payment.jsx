import React, { useState } from 'react';
import qrCodeImage from '../assets/images/qrcode.png';

const Payment = ({ total, cartItems = [] }) => {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  
  // YOUR UPI DETAILS
  const upiId = "suriyaselvaraj689@okhdfcbank";
  const payeeName = "Suriya Selvaraj";
  const mobileNumber = "7868943703";
  
  // Shop owner WhatsApp number
  const ownerWhatsApp = "917868943703";
  
  // Check if on mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Generate order summary text for WhatsApp notification
  const getOrderSummary = () => {
    let summary = "🍗 *NEW ORDER RECEIVED!* 🍗\n\n";
    summary += "*Selvaraj Chicken Center*\n";
    summary += "━━━━━━━━━━━━━━━━━━━━\n\n";
    summary += "*Order Details:*\n";
    
    cartItems.forEach((item, index) => {
      summary += `${index + 1}. ${item.name}\n`;
      summary += `   📦 ${item.portion} × ${item.quantity} = ₹${item.totalPrice}\n`;
    });
    
    summary += "\n━━━━━━━━━━━━━━━━━━━━\n";
    summary += `💰 *Total Amount:* ₹${total.toFixed(2)}\n`;
    summary += "━━━━━━━━━━━━━━━━━━━━\n\n";
    summary += "✅ Payment received via UPI\n";
    summary += "📞 Please prepare the order soon!\n\n";
    summary += "📍 *Shop Address:*\n";
    summary += "Selvaraj Chicken Center\n";
    summary += "Karkonam, Near Bus Stop\n";
    summary += "Tiruvannamalai Dist - 606701\n\n";
    summary += "Thank you for ordering! 🙏";
    
    return encodeURIComponent(summary);
  };
  
  // Send WhatsApp notification to shop owner
  const notifyShopOwner = () => {
    const message = getOrderSummary();
    window.open(`https://wa.me/${ownerWhatsApp}?text=${message}`, '_blank');
  };
  
  // Handle payment confirmation
  const handlePaymentConfirmed = () => {
    setPaymentDone(true);
    setShowConfirm(false);
    notifyShopOwner();
  };
  
  // Open confirmation modal
  const openConfirmationModal = () => {
    setShowConfirm(true);
  };
  
  // GOOGLE PAY
  const handleGPay = () => {
    const amount = total.toFixed(2);
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=Food%20Order`;
    
    if (isMobile) {
      window.location.href = upiUrl;
    } else {
      alert("Please open this website on your mobile phone to pay with Google Pay");
    }
  };
  
  // PhonePe
  const handlePhonePe = () => {
    const amount = total.toFixed(2);
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
    
    if (isMobile) {
      window.location.href = upiUrl;
    } else {
      alert("Please open this website on your mobile phone to pay with PhonePe");
    }
  };
  
  // Paytm
  const handlePaytm = () => {
    const amount = total.toFixed(2);
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
    
    if (isMobile) {
      window.location.href = upiUrl;
    } else {
      alert("Please open this website on your mobile phone to pay with Paytm");
    }
  };
  
  const copyUPILink = () => {
    const amount = total.toFixed(2);
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
    navigator.clipboard.writeText(upiLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    alert("UPI link copied! You can paste it in any UPI app to pay");
  };

  const formatCartItems = () => {
    if (cartItems.length === 0) return <p className="text-xs text-gray-500">No items added</p>;
    return cartItems.map((item, idx) => (
      <div key={idx} className="text-xs text-gray-600 py-1.5 border-b border-gray-100 last:border-0">
        <span className="font-medium">{item.name}</span>
        <div className="text-[10px] text-gray-400">{item.portion} × {item.quantity} = ₹{item.totalPrice}</div>
      </div>
    ));
  };

  return (
    <section id="payment" className="py-6 sm:py-10 px-3 sm:px-4 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto max-w-md">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-5">
          
          {!isMobile && (
            <div className="mb-4 bg-yellow-50 rounded-lg p-2 border border-yellow-200 text-center">
              <p className="text-yellow-700 text-[10px]">📱 Please open this on your mobile phone to pay with UPI apps</p>
            </div>
          )}
          
          <div className="text-center mb-3 sm:mb-4">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="text-xl sm:text-2xl">💳</span>
              <h2 className="text-base sm:text-xl font-bold text-orange-600">Easy Payment</h2>
            </div>
            {total > 0 && !paymentDone && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-2 sm:p-3 border border-green-200">
                <p className="text-gray-600 text-[10px] sm:text-xs">Amount to Pay</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">₹{total.toFixed(2)}</p>
              </div>
            )}
          </div>
          
          {total > 0 && !paymentDone && (
            <div className="mb-4 bg-orange-50 rounded-lg p-3 border border-orange-100">
              <p className="text-xs font-semibold text-orange-700 mb-2">📋 Your Order Summary:</p>
              <div className="max-h-28 overflow-y-auto">
                {formatCartItems()}
              </div>
            </div>
          )}
          
          {paymentDone && (
            <div className="mb-4 bg-green-50 rounded-lg p-3 border border-green-200 text-center animate-fadeInUp">
              <span className="text-2xl mb-1 block">✅</span>
              <p className="text-green-700 text-sm font-semibold">Payment Successful!</p>
              <p className="text-green-600 text-[10px] mt-0.5">Order details sent to shop owner</p>
            </div>
          )}
          
          {total > 0 && !paymentDone ? (
            <>
              <div className="mb-4">
                <p className="text-center text-gray-700 text-xs font-semibold mb-2">Pay to:</p>
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-3 text-center border border-indigo-200">
                  <div className="flex justify-center mb-1.5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-lg sm:text-xl font-bold">S</span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-indigo-700">{payeeName}</p>
                  <p className="text-[10px] sm:text-xs font-mono font-bold text-indigo-600 mt-0.5 break-all">{upiId}</p>
                </div>
                
                {/* PERFECT PAYMENT APP ICONS */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  
                  {/* Google Pay */}
                  <button 
                    onClick={handleGPay} 
                    className="flex flex-col items-center justify-center gap-1 bg-white border border-gray-200 rounded-lg py-2.5 hover:shadow-md active:scale-95 transition"
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect width="32" height="32" rx="6" fill="#4285F4"/>
                      <path d="M10 14H7V18H10V14Z" fill="white"/>
                      <path d="M16 14H13V18H16V14Z" fill="white"/>
                      <path d="M22 14H19V18H22V14Z" fill="white"/>
                      <circle cx="16" cy="16" r="2" fill="white"/>
                    </svg>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700">Google Pay</span>
                  </button>
                  
                  {/* PhonePe */}
                  <button 
                    onClick={handlePhonePe} 
                    className="flex flex-col items-center justify-center gap-1 bg-white border border-gray-200 rounded-lg py-2.5 hover:shadow-md active:scale-95 transition"
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect width="32" height="32" rx="6" fill="#5F259F"/>
                      <circle cx="16" cy="13" r="4" fill="white"/>
                      <path d="M16 18C11 18 8 20.5 8 23H24C24 20.5 21 18 16 18Z" fill="white"/>
                    </svg>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700">PhonePe</span>
                  </button>
                  
                  {/* Paytm */}
                  <button 
                    onClick={handlePaytm} 
                    className="flex flex-col items-center justify-center gap-1 bg-white border border-gray-200 rounded-lg py-2.5 hover:shadow-md active:scale-95 transition"
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect width="32" height="32" rx="6" fill="#00BAF2"/>
                      <text x="16" y="21" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">P</text>
                    </svg>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700">Paytm</span>
                  </button>
                </div>
                
                <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <p className="text-[8px] text-gray-500">UPI ID (manual payment):</p>
                  <p className="font-mono text-[9px] sm:text-[10px] font-bold text-orange-600 break-all">{upiId}</p>
                  <button onClick={copyUPILink} className="mt-1 bg-orange-500 text-white px-2 py-0.5 rounded text-[8px] hover:bg-orange-600">
                    {copied ? "✓ Copied!" : "Copy UPI ID"}
                  </button>
                </div>
              </div>
              
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-[9px]"><span className="px-2 bg-white text-gray-400">OR Scan QR Code</span></div>
              </div>
              
              <button onClick={() => setShowQR(!showQR)} className="w-full text-center text-orange-600 text-xs font-semibold py-1.5 flex items-center justify-center gap-1">
                {showQR ? "⬆️ Hide QR Code" : "📷 Show QR Code to Scan"}
              </button>
              
              {showQR && (
                <div className="flex flex-col items-center gap-2 mt-2 animate-fadeInUp">
                  <div className="bg-white p-2 rounded-lg shadow-md border border-orange-200">
                    <img src={qrCodeImage} alt="UPI QR Code" className="w-28 h-28 sm:w-32 sm:h-32 object-contain" />
                  </div>
                  <p className="text-[9px] text-gray-500 text-center">Scan with any UPI app</p>
                </div>
              )}
              
              <button onClick={openConfirmationModal} className="w-full mt-4 bg-green-500 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-green-600 transition flex items-center justify-center gap-2">
                <span>✅</span> I have completed the payment
              </button>
              <p className="text-[9px] text-gray-400 text-center mt-1">Click only after you have paid successfully</p>
            </>
          ) : null}
          
          {showConfirm && !paymentDone && total > 0 && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowConfirm(false)}>
              <div className="bg-white rounded-xl max-w-xs w-full p-4 text-center animate-fadeInUp" onClick={(e) => e.stopPropagation()}>
                <div className="text-4xl mb-2">✅</div>
                <h3 className="text-base font-bold text-gray-800 mb-1">Confirm Payment</h3>
                <p className="text-gray-600 text-xs mb-3">Did you successfully pay ₹{total.toFixed(2)} to {payeeName}?</p>
                
                <div className="bg-orange-50 rounded-lg p-2 mb-3 text-left max-h-28 overflow-y-auto">
                  <p className="text-[10px] font-semibold text-orange-700 mb-1">Order Summary:</p>
                  {cartItems.map((item, idx) => (
                    <p key={idx} className="text-[9px] text-gray-600">{item.name} - {item.portion} × {item.quantity}</p>
                  ))}
                  <p className="text-[9px] font-bold text-green-600 mt-1">Total: ₹{total.toFixed(2)}</p>
                </div>
                
                <div className="flex gap-2">
                  <button onClick={handlePaymentConfirmed} className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold text-xs hover:bg-green-600">Yes, Payment Done</button>
                  <button onClick={() => setShowConfirm(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold text-xs hover:bg-gray-300">Cancel</button>
                </div>
                <p className="text-[8px] text-gray-400 mt-2">Confirm to send order details to shop owner</p>
              </div>
            </div>
          )}
          
          {total === 0 && !paymentDone && (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🛒</div>
              <p className="text-gray-500 text-xs">Your cart is empty</p>
              <p className="text-gray-400 text-[9px] mt-0.5">Add delicious items from our menu</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Payment;