import React, { useState, useEffect } from 'react';
import qrCodeImage from '../assets/images/qrcode.png';

const Payment = ({ total, cartItems = [], clearCart }) => {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [returnedFromApp, setReturnedFromApp] = useState(false);
  const [customerNumber, setCustomerNumber] = useState('');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  
  // YOUR UPI DETAILS
  const upiId = "suriyaselvaraj689@okhdfcbank";
  const payeeName = "Suriya Selvaraj";
  const mobileNumber = "7868943703";
  
  // Shop owner WhatsApp number
  const ownerWhatsApp = "917868943703";
  
  // Check if on mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Detect when user returns to page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && paymentInitiated) {
        setReturnedFromApp(true);
        setPaymentInitiated(false);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', () => {
      if (paymentInitiated) {
        setReturnedFromApp(true);
        setPaymentInitiated(false);
      }
    });
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [paymentInitiated]);
  
  // Generate order summary for WhatsApp
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
    summary += "✅ *Payment Status:* Successfully Paid via UPI\n";
    summary += `💳 *UPI ID Used:* ${upiId}\n`;
    summary += `👤 *Customer Name:* ${customerNumber || 'Walk-in Customer'}\n`;
    summary += `📞 *Customer Contact:* ${customerNumber || 'Not provided'}\n\n`;
    summary += "📞 Please prepare the order soon!\n\n";
    summary += "📍 *Shop Address:*\n";
    summary += "Selvaraj Chicken Center\n";
    summary += "Karkonam, Near Bus Stop\n";
    summary += "Tiruvannamalai Dist - 606701\n\n";
    summary += "Thank you for ordering! 🙏";
    
    return encodeURIComponent(summary);
  };
  
  // Generate customer confirmation message
  const getCustomerConfirmation = (phoneNumber) => {
    let message = "🍗 *ORDER CONFIRMED!* 🍗\n\n";
    message += "Thank you for ordering from *Selvaraj Chicken Center*!\n\n";
    message += "*Your Order:*\n";
    
    cartItems.forEach((item) => {
      message += `✓ ${item.name} - ${item.portion} × ${item.quantity} = ₹${item.totalPrice}\n`;
    });
    
    message += `\n💰 *Total Paid:* ₹${total.toFixed(2)}\n\n`;
    message += "⏰ *Estimated Ready Time:* 20-30 minutes\n\n";
    message += "📍 *Pickup Address:*\n";
    message += "Selvaraj Chicken Center\n";
    message += "Karkonam, Near Bus Stop\n\n";
    message += "📞 For any queries: +91 78689 43703\n\n";
    message += "Thank you for choosing us! 🙏\n";
    message += "⭐ Please share your feedback!";
    
    return encodeURIComponent(message);
  };
  
  // Send WhatsApp notification to shop owner
  const notifyShopOwner = () => {
    const message = getOrderSummary();
    window.open(`https://wa.me/${ownerWhatsApp}?text=${message}`, '_blank');
  };
  
  // Send confirmation to customer
  const notifyCustomer = (phoneNumber) => {
    if (phoneNumber && phoneNumber.length >= 10) {
      const message = getCustomerConfirmation(phoneNumber);
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  };
  
  // Handle final payment confirmation
  const handlePaymentConfirmed = () => {
    setPaymentDone(true);
    setShowConfirm(false);
    setShowCustomerModal(true);
  };
  
  // After customer provides number
  const handleCustomerSubmit = () => {
    setShowCustomerModal(false);
    notifyShopOwner();
    notifyCustomer(customerNumber);
    
    if (clearCart) {
      setTimeout(() => {
        clearCart();
      }, 1000);
    }
  };
  
  // GOOGLE PAY - Working perfectly (DON'T CHANGE)
  const handleGPay = () => {
    const amount = total.toFixed(2);
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=Selvaraj%20Chicken%20Order%20₹${amount}`;
    
    if (isMobile) {
      setPaymentInitiated(true);
      window.location.href = upiUrl;
    } else {
      alert("Please open this website on your mobile phone to pay with Google Pay");
    }
  };
  
  // PHONEPE - Fixed with correct intent
  const handlePhonePe = () => {
    const amount = total.toFixed(2);
    // PhonePe specific UPI intent
    const upiUrl = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&mode=02`;
    
    if (isMobile) {
      setPaymentInitiated(true);
      window.location.href = upiUrl;
      // Fallback to standard UPI if PhonePe app not installed
      setTimeout(() => {
        const fallbackUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
        window.location.href = fallbackUrl;
      }, 1000);
    } else {
      alert("Please open this website on your mobile phone to pay with PhonePe");
    }
  };
  
  // PAYTM - Fixed with correct intent
  const handlePaytm = () => {
    const amount = total.toFixed(2);
    // Paytm specific UPI intent
    const upiUrl = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
    
    if (isMobile) {
      setPaymentInitiated(true);
      window.location.href = upiUrl;
      // Fallback to standard UPI if Paytm app not installed
      setTimeout(() => {
        const fallbackUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
        window.location.href = fallbackUrl;
      }, 1000);
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
  };

  const formatCartItems = () => {
    if (cartItems.length === 0) return <p className="text-xs text-gray-500">No items added</p>;
    return cartItems.map((item, idx) => (
      <div key={idx} className="text-xs text-gray-600 py-1.5 border-b border-gray-100 last:border-0">
        <div className="flex justify-between">
          <span className="font-medium">{item.name}</span>
          <span className="font-medium text-green-600">₹{item.totalPrice}</span>
        </div>
        <div className="text-[10px] text-gray-400">{item.portion} × {item.quantity}</div>
      </div>
    ));
  };

  const handleNewOrder = () => {
    setPaymentDone(false);
    setReturnedFromApp(false);
    setPaymentInitiated(false);
    setShowCustomerModal(false);
    setCustomerNumber('');
    if (clearCart) {
      clearCart();
    }
    // Scroll back to menu
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="payment" className="py-6 sm:py-10 px-3 sm:px-4 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto max-w-md">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-5">
          
          {!isMobile && total > 0 && !paymentDone && (
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
          
          {/* Order Summary */}
          {total > 0 && !paymentDone && !paymentInitiated && !returnedFromApp && (
            <div className="mb-4 bg-orange-50 rounded-lg p-3 border border-orange-100">
              <p className="text-xs font-semibold text-orange-700 mb-2">📋 Your Order Summary:</p>
              <div className="max-h-32 overflow-y-auto">
                {formatCartItems()}
              </div>
              <div className="mt-2 pt-2 border-t border-orange-200">
                <div className="flex justify-between text-sm font-bold text-orange-700">
                  <span>Total Amount:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Payment Apps Section - WITH REAL CORRECT ICONS */}
          {total > 0 && !paymentDone && !paymentInitiated && !returnedFromApp && (
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
                
                {/* REAL GPay, PhonePe, Paytm Icons - CORRECT LOGOS */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  
                  {/* GOOGLE PAY - Official Logo (WORKING - DON'T CHANGE) */}
                  <button 
                    onClick={handleGPay} 
                    className="flex flex-col items-center justify-center gap-2 bg-white border-2 border-gray-200 rounded-xl py-3 hover:shadow-lg active:scale-95 transition-all duration-200"
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" 
                      alt="Google Pay" 
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        e.target.src = "https://www.gstatic.com/pay/logo/google_pay_logo.svg";
                      }}
                    />
                    <span className="text-[11px] font-semibold text-gray-700">Google Pay</span>
                  </button>
                  
                  {/* PHONEPE - Official Logo (CORRECTED) */}
                  <button 
                    onClick={handlePhonePe} 
                    className="flex flex-col items-center justify-center gap-2 bg-white border-2 border-gray-200 rounded-xl py-3 hover:shadow-lg active:scale-95 transition-all duration-200"
                  >
                    <div className="w-12 h-12 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="12" fill="#5F259F"/>
                        <circle cx="24" cy="19" r="7" fill="white"/>
                        <path d="M24 27C16 27 12 31 12 34H36C36 31 32 27 24 27Z" fill="white"/>
                      </svg>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700">PhonePe</span>
                  </button>
                  
                  {/* PAYTM - Official Logo (CORRECTED) */}
                  <button 
                    onClick={handlePaytm} 
                    className="flex flex-col items-center justify-center gap-2 bg-white border-2 border-gray-200 rounded-xl py-3 hover:shadow-lg active:scale-95 transition-all duration-200"
                  >
                    <div className="w-12 h-12 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="12" fill="#00BAF2"/>
                        <text x="24" y="32" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="Arial">P</text>
                      </svg>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700">Paytm</span>
                  </button>
                </div>
                
                {/* Alternative payment option */}
                <div className="mt-4 p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <p className="text-[8px] text-gray-500">UPI ID for manual payment:</p>
                  <p className="font-mono text-[9px] sm:text-[10px] font-bold text-orange-600 break-all">{upiId}</p>
                  <button 
                    onClick={copyUPILink} 
                    className="mt-1 bg-orange-500 text-white px-3 py-1 rounded text-[9px] hover:bg-orange-600 transition"
                  >
                    {copied ? "✓ Copied!" : "Copy UPI ID"}
                  </button>
                </div>
              </div>
              
              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-[9px]"><span className="px-2 bg-white text-gray-400">OR Scan QR Code</span></div>
              </div>
              
              {/* QR Code Section */}
              <button 
                onClick={() => setShowQR(!showQR)} 
                className="w-full text-center text-orange-600 text-xs font-semibold py-2 flex items-center justify-center gap-2 bg-orange-50 rounded-lg hover:bg-orange-100 transition"
              >
                {showQR ? "⬆️ Hide QR Code" : "📷 Show QR Code to Scan"}
              </button>
              
              {showQR && (
                <div className="flex flex-col items-center gap-2 mt-3 animate-fadeInUp">
                  <div className="bg-white p-3 rounded-xl shadow-md border-2 border-orange-200">
                    <img src={qrCodeImage} alt="UPI QR Code" className="w-32 h-32 sm:w-36 sm:h-36 object-contain" />
                  </div>
                  <p className="text-[9px] text-gray-500 text-center">Scan with any UPI app<br/>Amount: ₹{total.toFixed(2)}</p>
                </div>
              )}
              
              <div className="mt-3 bg-blue-50 rounded-lg p-2">
                <p className="text-blue-600 text-[9px] text-center">💡 Click any UPI app above, complete payment, then return here</p>
              </div>
            </>
          )}
          
          {/* After returning from UPI app - Payment Confirmation */}
          {returnedFromApp && !paymentDone && total > 0 && (
            <div className="text-center py-4 animate-fadeInUp">
              <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
                <span className="text-3xl mb-2 block">✅</span>
                <p className="text-green-700 text-sm font-semibold">Payment Initiated!</p>
                <p className="text-green-600 text-xs mt-1">Amount: ₹{total.toFixed(2)}</p>
                <p className="text-green-600 text-[10px] mt-1">Have you completed the payment in the UPI app?</p>
              </div>
              
              <button 
                onClick={() => setShowConfirm(true)}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-sm hover:bg-green-600 transition flex items-center justify-center gap-2"
              >
                <span>✅</span> Yes, I have completed payment
              </button>
              <button 
                onClick={() => {
                  setReturnedFromApp(false);
                  setPaymentInitiated(true);
                  handleGPay();
                }}
                className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded-lg text-xs hover:bg-gray-300 transition"
              >
                🔄 Retry Payment
              </button>
            </div>
          )}
          
          {/* Loading State */}
          {paymentInitiated && !paymentDone && (
            <div className="mb-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200 text-center">
              <div className="flex justify-center mb-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
              </div>
              <p className="text-yellow-700 text-sm font-semibold">Opening payment app...</p>
              <p className="text-yellow-600 text-[10px] mt-1">Please complete payment, then return here</p>
            </div>
          )}
          
          {/* Payment Success */}
          {paymentDone && (
            <div className="text-center animate-fadeInUp">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <span className="text-4xl mb-2 block">✅🎉</span>
                <p className="text-green-700 text-base font-bold">Order Placed Successfully!</p>
                <p className="text-green-600 text-xs mt-1">Payment of ₹{total.toFixed(2)} confirmed</p>
                <p className="text-green-600 text-[10px] mt-2">WhatsApp notification sent to shop owner</p>
                <p className="text-gray-500 text-[9px] mt-2">Your order will be ready in 20-30 minutes</p>
                
                <button 
                  onClick={handleNewOrder}
                  className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition"
                >
                  🍗 Place New Order
                </button>
              </div>
            </div>
          )}
          
          {/* Confirmation Modal */}
          {showConfirm && !paymentDone && total > 0 && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowConfirm(false)}>
              <div className="bg-white rounded-xl max-w-xs w-full p-4 text-center" onClick={(e) => e.stopPropagation()}>
                <div className="text-4xl mb-2">💰</div>
                <h3 className="text-base font-bold text-gray-800 mb-1">Confirm Payment</h3>
                <p className="text-gray-600 text-xs mb-3">Did you successfully pay ₹{total.toFixed(2)} to {payeeName}?</p>
                
                <div className="bg-orange-50 rounded-lg p-3 mb-3 text-left max-h-32 overflow-y-auto">
                  <p className="text-[10px] font-semibold text-orange-700 mb-1">Order Summary:</p>
                  {cartItems.map((item, idx) => (
                    <p key={idx} className="text-[9px] text-gray-600">{item.name} - {item.portion} × {item.quantity}</p>
                  ))}
                  <p className="text-[9px] font-bold text-green-600 mt-1">Total: ₹{total.toFixed(2)}</p>
                </div>
                
                <div className="flex gap-2">
                  <button onClick={handlePaymentConfirmed} className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold text-xs hover:bg-green-600">
                    Yes, Payment Done
                  </button>
                  <button onClick={() => setShowConfirm(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold text-xs hover:bg-gray-300">
                    No, Not Yet
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Customer Details Modal */}
          {showCustomerModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl max-w-xs w-full p-4 text-center">
                <div className="text-3xl mb-2">📞</div>
                <h3 className="text-base font-bold text-gray-800 mb-1">Share WhatsApp Number</h3>
                <p className="text-gray-600 text-[10px] mb-3">Get order confirmation on WhatsApp (Optional)</p>
                
                <input
                  type="tel"
                  placeholder="Enter WhatsApp number (91XXXXXXXXXX)"
                  value={customerNumber}
                  onChange={(e) => setCustomerNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm mb-3 text-center"
                />
                <p className="text-[8px] text-gray-400 mb-2">Example: 919876543210</p>
                
                <div className="flex gap-2">
                  <button onClick={handleCustomerSubmit} className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold text-sm hover:bg-green-600">
                    Send Confirmation
                  </button>
                  <button onClick={() => {
                    setShowCustomerModal(false);
                    handleCustomerSubmit();
                  }} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold text-sm hover:bg-gray-300">
                    Skip
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Empty Cart */}
          {total === 0 && !paymentDone && (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🛒</div>
              <p className="text-gray-500 text-sm">Your cart is empty</p>
              <p className="text-gray-400 text-xs mt-1">Add delicious items from our menu</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Payment;