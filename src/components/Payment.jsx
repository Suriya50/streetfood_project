import React, { useState } from 'react';
import qrCodeImage from '../assets/images/qrcode.png';

const Payment = ({ total }) => {
  const [showQR, setShowQR] = useState(false);
  
  // Your UPI details
  const upiId = "7868943703@okbizaxis";
  const payeeName = "Selvaraj Chicken Center";
  const note = "Food Order Payment";
  
  // Create UPI Intent URL
  const createUPILink = (appScheme) => {
    const amount = total.toFixed(2);
    const baseParams = `pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    
    const appLinks = {
      gpay: `tez://upi/pay?${baseParams}`,
      phonepe: `phonepe://pay?${baseParams}`,
      paytm: `paytmmp://pay?${baseParams}`,
      bhim: `bhim://upi/pay?${baseParams}`,
      cred: `credpay://upi/pay?${baseParams}`,
      default: `upi://pay?${baseParams}`
    };
    
    return appLinks[appScheme] || appLinks.default;
  };
  
  const handlePayment = (app) => {
    const paymentLink = createUPILink(app);
    window.location.href = paymentLink;
  };
  
  // Check if on mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <section className="py-10 px-4 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto max-w-md">
        <div className="bg-white rounded-xl shadow-md p-5">
          
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">💳</span>
              <h2 className="text-xl font-bold text-orange-600">Easy Payment</h2>
            </div>
            {total > 0 && (
              <div className="bg-green-50 rounded-lg p-2 mb-3">
                <p className="text-gray-600 text-xs">Amount to Pay</p>
                <p className="text-2xl font-bold text-green-600">₹{total.toFixed(2)}</p>
              </div>
            )}
          </div>
          
          {total > 0 ? (
            <>
              {/* Direct UPI App Buttons - Mobile Only */}
              {isMobile && (
                <div className="mb-4">
                  <p className="text-center text-gray-600 text-xs mb-3">Pay directly with:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Google Pay Button */}
                    <button
                      onClick={() => handlePayment('gpay')}
                      className="flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 rounded-lg py-3 hover:bg-blue-100 transition"
                    >
                      <span className="text-xl">📱</span>
                      <span className="text-sm font-semibold text-blue-700">Google Pay</span>
                    </button>
                    
                    {/* PhonePe Button */}
                    <button
                      onClick={() => handlePayment('phonepe')}
                      className="flex items-center justify-center gap-2 bg-purple-50 border border-purple-200 rounded-lg py-3 hover:bg-purple-100 transition"
                    >
                      <span className="text-xl">📱</span>
                      <span className="text-sm font-semibold text-purple-700">PhonePe</span>
                    </button>
                    
                    {/* Paytm Button */}
                    <button
                      onClick={() => handlePayment('paytm')}
                      className="flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 rounded-lg py-3 hover:bg-blue-100 transition"
                    >
                      <span className="text-xl">📱</span>
                      <span className="text-sm font-semibold text-blue-700">Paytm</span>
                    </button>
                    
                    {/* BHIM Button */}
                    <button
                      onClick={() => handlePayment('bhim')}
                      className="flex items-center justify-center gap-2 bg-orange-50 border border-orange-200 rounded-lg py-3 hover:bg-orange-100 transition"
                    >
                      <span className="text-xl">📱</span>
                      <span className="text-sm font-semibold text-orange-700">BHIM UPI</span>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>
              
              {/* Manual Payment Options - Show QR & UPI ID */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="w-full text-center text-orange-600 text-sm font-semibold py-2"
                >
                  {showQR ? "⬆️ Hide QR Code" : "⬇️ Show QR Code to Scan"}
                </button>
                
                {showQR && (
                  <div className="flex flex-col items-center gap-3 animate__fadeInUp">
                    <div className="bg-white p-3 rounded-xl shadow-md">
                      <img src={qrCodeImage} alt="UPI QR Code" className="w-40 h-40 object-contain" />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">📱 GPay</span>
                      <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">📱 PhonePe</span>
                      <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">📱 Paytm</span>
                    </div>
                  </div>
                )}
                
                {/* UPI ID with Copy Button */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-[10px] text-gray-500 text-center">OR pay to UPI ID:</p>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="font-mono text-xs font-bold text-orange-600 break-all">{upiId}</p>
                    <button 
                      onClick={() => { 
                        navigator.clipboard.writeText(upiId); 
                        alert('UPI ID copied!'); 
                      }}
                      className="bg-orange-500 text-white px-2 py-1 rounded text-[10px]"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 text-center mt-2">
                    👤 Pay to: {payeeName}
                  </p>
                </div>
                
                {/* Instructions for Desktop Users */}
                {!isMobile && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                    <p className="text-yellow-700 text-[10px] text-center">
                      📱 On mobile, you can pay directly with GPay/PhonePe
                    </p>
                  </div>
                )}
                
                {/* Payment Reminder */}
                <div className="bg-blue-50 rounded-lg p-2">
                  <p className="text-blue-700 text-[10px] text-center">
                    ✅ After payment, click WhatsApp button and share screenshot
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🛒</div>
              <p className="text-gray-500 text-sm">Add items to cart first</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Payment;