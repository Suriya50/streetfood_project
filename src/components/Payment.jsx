import React, { useState } from 'react';
import qrCodeImage from '../assets/images/qrcode.png';

const Payment = ({ total }) => {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Your details
  const mobileNumber = "7868943703";
  const payeeName = "Surya Selvaraj";
  const payeeNote = "Selvaraj Chicken Center - Food Order";
  
  // UPI Intent URLs
  const getGPayLink = () => {
    const amount = total.toFixed(2);
    return `upi://pay?pa=${mobileNumber}@oksbi&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(payeeNote)}`;
  };
  
  const getPhonePeLink = () => {
    const amount = total.toFixed(2);
    return `upi://pay?pa=${mobileNumber}@ybl&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(payeeNote)}`;
  };
  
  const getPaytmLink = () => {
    const amount = total.toFixed(2);
    return `upi://pay?pa=${mobileNumber}@paytm&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(payeeNote)}`;
  };
  
  const handleGPay = () => {
    window.location.href = getGPayLink();
  };
  
  const handlePhonePe = () => {
    window.location.href = getPhonePeLink();
  };
  
  const handlePaytm = () => {
    window.location.href = getPaytmLink();
  };
  
  const copyUPILink = () => {
    const amount = total.toFixed(2);
    const upiLink = `upi://pay?pa=${mobileNumber}@oksbi&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(payeeNote)}`;
    navigator.clipboard.writeText(upiLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-8 sm:py-10 px-3 sm:px-4 bg-gradient-to-br from-orange-50 to-orange-100">
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
          
          {total > 0 ? (
            <>
              {/* Pay To Section */}
              <div className="mb-4 sm:mb-5">
                <p className="text-center text-gray-700 text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                  Pay to:
                </p>
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center mb-3 sm:mb-4 border border-indigo-200">
                  <p className="text-base sm:text-lg font-bold text-indigo-700">{payeeName}</p>
                  <p className="text-lg sm:text-xl font-mono font-bold text-indigo-600 mt-0.5 sm:mt-1 break-all">{mobileNumber}</p>
                  <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5 sm:mt-1">UPI Payment</p>
                </div>
                
                {/* Payment App Buttons - Mobile Responsive */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  
                  {/* Google Pay Button */}
                  <button
                    onClick={handleGPay}
                    className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl py-2 sm:py-3 hover:shadow-md transition-all hover:border-blue-200 active:scale-95"
                  >
                    <img 
                      src="https://cashfreelogo.cashfree.com/assets_images/pg/wallet/32/gpay.png"
                      alt="Google Pay"
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                      onError={(e) => {
                        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg";
                      }}
                    />
                    <span className="text-[9px] sm:text-[11px] font-semibold text-gray-700">GPay</span>
                  </button>
                  
                  {/* PhonePe Button */}
                  <button
                    onClick={handlePhonePe}
                    className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl py-2 sm:py-3 hover:shadow-md transition-all hover:border-purple-200 active:scale-95"
                  >
                    <img 
                      src="https://cashfreelogo.cashfree.com/assets_images/pg/wallet/32/phonepe.png"
                      alt="PhonePe"
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                      onError={(e) => {
                        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/8/86/PhonePe_Logo.png";
                      }}
                    />
                    <span className="text-[9px] sm:text-[11px] font-semibold text-gray-700">PhonePe</span>
                  </button>
                  
                  {/* Paytm Button */}
                  <button
                    onClick={handlePaytm}
                    className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl py-2 sm:py-3 hover:shadow-md transition-all hover:border-blue-200 active:scale-95"
                  >
                    <img 
                      src="https://cashfreelogo.cashfree.com/assets_images/pg/wallet/32/paytm.png"
                      alt="Paytm"
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                      onError={(e) => {
                        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/2/23/Paytm_Logo.svg";
                      }}
                    />
                    <span className="text-[9px] sm:text-[11px] font-semibold text-gray-700">Paytm</span>
                  </button>
                </div>
                
                {/* Copy Link Button */}
                <button
                  onClick={copyUPILink}
                  className="w-full mt-2 sm:mt-3 flex items-center justify-center gap-1.5 sm:gap-2 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl py-2 sm:py-2.5 hover:bg-gray-100 transition active:scale-95"
                >
                  <span className="text-base sm:text-lg">🔗</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    {copied ? "✓ Copied!" : "Copy Payment Link"}
                  </span>
                </button>
              </div>
              
              {/* Divider */}
              <div className="relative my-3 sm:my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-[10px] sm:text-xs">
                  <span className="px-2 sm:px-3 bg-white text-gray-400">OR Scan QR Code</span>
                </div>
              </div>
              
              {/* QR Code Section */}
              <button
                onClick={() => setShowQR(!showQR)}
                className="w-full text-center text-orange-600 text-xs sm:text-sm font-semibold py-1.5 sm:py-2 flex items-center justify-center gap-1 active:opacity-70"
              >
                {showQR ? "⬆️ Hide QR Code" : "📷 Show QR Code to Scan"}
              </button>
              
              {showQR && (
                <div className="flex flex-col items-center gap-2 sm:gap-3 mt-2 sm:mt-3 animate-fadeInUp">
                  <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-md border border-orange-200">
                    <img src={qrCodeImage} alt="UPI QR Code" className="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 text-center">
                    Scan with GPay, PhonePe, Paytm or any UPI app
                  </p>
                </div>
              )}
              
              {/* Payment Instructions */}
              <div className="bg-blue-50 rounded-lg p-2 sm:p-3 mt-3 sm:mt-4 border border-blue-100">
                <div className="flex items-center gap-1.5 sm:gap-2 justify-center">
                  <span className="text-green-500 text-xs sm:text-sm">✅</span>
                  <p className="text-blue-700 text-[10px] sm:text-xs text-center">
                    After payment, click WhatsApp button and share screenshot
                  </p>
                </div>
              </div>
              
              {/* Help Text */}
              <p className="text-center text-[8px] sm:text-[10px] text-gray-400 mt-2 sm:mt-3">
                Clicking GPay/PhonePe will open the app with amount pre-filled
              </p>
            </>
          ) : (
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