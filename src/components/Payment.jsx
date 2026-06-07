import React, { useState } from 'react';
import qrCodeImage from '../assets/images/qrcode.png';

const Payment = ({ total, cartItems = [] }) => {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  
  // Your details
  const mobileNumber = "7868943703";
  const payeeName = "Suriya Selvaraj";
  const payeeNote = "Selvaraj Chicken Center - Food Order";
  
  // Shop owner WhatsApp number
  const ownerWhatsApp = "917868943703";
  
  // Generate order summary text for WhatsApp
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
  
  // Handle payment confirmation after UPI payment
  const handlePaymentConfirmed = () => {
    setPaymentDone(true);
    setShowConfirm(false);
    notifyShopOwner();
    
    // Optional: Ask for customer WhatsApp
    const customerNumber = prompt("Enter your WhatsApp number to get order confirmation (optional):", "91");
    if (customerNumber && customerNumber.length >= 10) {
      const customerMessage = "🍗 *ORDER CONFIRMED!* 🍗\n\nThank you for ordering from Selvaraj Chicken Center!\n\nYour order will be ready in 20-30 minutes.\n\n📍 Pickup: Selvaraj Chicken Center, Karkonam\n\nThank you! 🙏";
      window.open(`https://wa.me/${customerNumber}?text=${encodeURIComponent(customerMessage)}`, '_blank');
    }
  };
  
  // WORKING UPI LINKS - These actually open the apps
  const handleGPay = () => {
    const amount = total.toFixed(2);
    // Working Google Pay link format
    const gpayUrl = `https://gpay.app.goo.gl/upi/pay?pa=${mobileNumber}@oksbi&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(payeeNote)}`;
    window.location.href = gpayUrl;
    
    // Show confirmation popup after 3 seconds (assuming user paid)
    setTimeout(() => {
      setShowConfirm(true);
    }, 3000);
  };
  
  const handlePhonePe = () => {
    const amount = total.toFixed(2);
    // Working PhonePe link format
    const phonepeUrl = `https://phonepe.com/upi/pay?pa=${mobileNumber}@ybl&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
    window.location.href = phonepeUrl;
    
    setTimeout(() => {
      setShowConfirm(true);
    }, 3000);
  };
  
  const handlePaytm = () => {
    const amount = total.toFixed(2);
    // Working Paytm link format
    const paytmUrl = `https://paytm.com/upi/pay?pa=${mobileNumber}@paytm&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
    window.location.href = paytmUrl;
    
    setTimeout(() => {
      setShowConfirm(true);
    }, 3000);
  };
  
  const copyUPILink = () => {
    const amount = total.toFixed(2);
    const upiLink = `upi://pay?pa=${mobileNumber}@oksbi&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(payeeNote)}`;
    navigator.clipboard.writeText(upiLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format cart items for display
  const formatCartItems = () => {
    if (cartItems.length === 0) return <p className="text-xs text-gray-500">No items added</p>;
    return cartItems.map((item, idx) => (
      <div key={idx} className="text-xs text-gray-600 py-1 border-b border-gray-100">
        <span className="font-medium">{item.name}</span> - {item.portion} × {item.quantity} = ₹{item.totalPrice}
      </div>
    ));
  };

  return (
    <section id="payment" className="py-8 sm:py-10 px-3 sm:px-4 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto max-w-md">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-5">
          
          {/* Header Section */}
          <div className="text-center mb-3 sm:mb-4">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="text-xl sm:text-2xl">💳</span>
              <h2 className="text-lg sm:text-xl font-bold text-orange-600">Easy Payment</h2>
            </div>
            {total > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 border border-green-200">
                <p className="text-gray-600 text-[10px] sm:text-xs">Amount to Pay</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">₹{total.toFixed(2)}</p>
              </div>
            )}
          </div>
          
          {/* Order Summary Preview */}
          {total > 0 && !paymentDone && (
            <div className="mb-4 bg-orange-50 rounded-lg p-3 border border-orange-100">
              <p className="text-xs font-semibold text-orange-700 mb-2">📋 Your Order Summary:</p>
              <div className="max-h-32 overflow-y-auto">
                {formatCartItems()}
              </div>
            </div>
          )}
          
          {/* Payment Success Message */}
          {paymentDone && (
            <div className="mb-4 bg-green-50 rounded-lg p-3 border border-green-200 text-center animate-fadeInUp">
              <span className="text-2xl mb-1 block">✅</span>
              <p className="text-green-700 text-sm font-semibold">Payment Confirmed!</p>
              <p className="text-green-600 text-xs mt-1">Order details sent to WhatsApp</p>
            </div>
          )}
          
          {total > 0 && !paymentDone ? (
            <>
              {/* Pay To Section with Circle Avatar */}
              <div className="mb-4 sm:mb-5">
                <p className="text-center text-gray-700 text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                  Pay to:
                </p>
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center mb-3 sm:mb-4 border border-indigo-200">
                  {/* Circle Avatar */}
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl sm:text-2xl font-bold">S</span>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-indigo-700">{payeeName}</p>
                  <p className="text-lg sm:text-xl font-mono font-bold text-indigo-600 mt-0.5 sm:mt-1 break-all">{mobileNumber}</p>
                  <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5 sm:mt-1">UPI Payment</p>
                </div>
                
                {/* Payment App Buttons */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {/* Google Pay Button */}
                  <button onClick={handleGPay} className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl py-2 sm:py-3 hover:bg-blue-100 active:scale-95 transition">
                    <img src="https://cashfreelogo.cashfree.com/assets_images/pg/wallet/32/gpay.png" alt="Google Pay" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"; }} />
                    <span className="text-[9px] sm:text-[11px] font-semibold text-blue-700">Google Pay</span>
                  </button>
                  
                  {/* PhonePe Button */}
                  <button onClick={handlePhonePe} className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 bg-purple-50 border border-purple-200 rounded-lg sm:rounded-xl py-2 sm:py-3 hover:bg-purple-100 active:scale-95 transition">
                    <img src="https://cashfreelogo.cashfree.com/assets_images/pg/wallet/32/phonepe.png" alt="PhonePe" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/commons/8/86/PhonePe_Logo.png"; }} />
                    <span className="text-[9px] sm:text-[11px] font-semibold text-purple-700">PhonePe</span>
                  </button>
                  
                  {/* Paytm Button */}
                  <button onClick={handlePaytm} className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl py-2 sm:py-3 hover:bg-blue-100 active:scale-95 transition">
                    <img src="https://cashfreelogo.cashfree.com/assets_images/pg/wallet/32/paytm.png" alt="Paytm" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/commons/2/23/Paytm_Logo.svg"; }} />
                    <span className="text-[9px] sm:text-[11px] font-semibold text-blue-700">Paytm</span>
                  </button>
                </div>
                
                {/* UPI ID with Copy Button */}
                <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-[9px] text-gray-500 text-center">UPI ID (for manual payment):</p>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="font-mono text-[11px] font-bold text-orange-600 break-all">{mobileNumber}@oksbi</p>
                    <button onClick={copyUPILink} className="bg-orange-500 text-white px-2 py-0.5 rounded text-[9px] hover:bg-orange-600">
                      {copied ? "✓" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Divider */}
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-[10px] sm:text-xs"><span className="px-2 sm:px-3 bg-white text-gray-400">OR Scan QR Code</span></div>
              </div>
              
              {/* QR Code Section */}
              <button onClick={() => setShowQR(!showQR)} className="w-full text-center text-orange-600 text-xs sm:text-sm font-semibold py-1.5 flex items-center justify-center gap-1">
                {showQR ? "⬆️ Hide QR Code" : "📷 Show QR Code to Scan"}
              </button>
              
              {showQR && (
                <div className="flex flex-col items-center gap-2 mt-2 animate-fadeInUp">
                  <div className="bg-white p-2 rounded-lg shadow-md border border-orange-200">
                    <img src={qrCodeImage} alt="UPI QR Code" className="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
                  </div>
                  <p className="text-[10px] text-gray-500 text-center">Scan with any UPI app</p>
                </div>
              )}
            </>
          ) : null}
          
          {/* Payment Confirmation Modal - Shows after user pays */}
          {showConfirm && !paymentDone && total > 0 && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowConfirm(false)}>
              <div className="bg-white rounded-xl max-w-sm w-full p-5 text-center animate-fadeInUp" onClick={(e) => e.stopPropagation()}>
                <div className="text-5xl mb-3">✅</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Have you completed the payment?</h3>
                <p className="text-gray-600 text-sm mb-4">Amount: ₹{total.toFixed(2)} paid to {payeeName}?</p>
                
                <div className="bg-orange-50 rounded-lg p-3 mb-4 text-left">
                  <p className="text-xs font-semibold text-orange-700 mb-2">Order Summary:</p>
                  {cartItems.map((item, idx) => (
                    <p key={idx} className="text-xs text-gray-600">{item.name} - {item.portion} × {item.quantity}</p>
                  ))}
                  <p className="text-xs font-bold text-green-600 mt-2">Total: ₹{total.toFixed(2)}</p>
                </div>
                
                <div className="flex gap-3">
                  <button onClick={handlePaymentConfirmed} className="flex-1 bg-green-500 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-green-600">
                    Yes, Payment Done
                  </button>
                  <button onClick={() => setShowConfirm(false)} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-300">
                    Not Yet
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-3">Clicking confirm will send order to shop owner</p>
              </div>
            </div>
          )}
          
          {/* Empty Cart State */}
          {total === 0 && !paymentDone && (
            <div className="text-center py-8 sm:py-10">
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🛒</div>
              <p className="text-gray-500 text-xs sm:text-sm">Your cart is empty</p>
              <p className="text-gray-400 text-[10px] sm:text-xs mt-1">Add delicious items from our menu</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Payment;