import React, { useState } from 'react';
import qrCodeImage from '../assets/images/qrcode.png';

const Payment = ({ total }) => {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Your mobile number (no need for UPI ID)
  const mobileNumber = "7868943703";
  const payeeName = "Surya Selvaraj";
  const note = "Selvaraj Chicken Center Order";
  
  // Create UPI payment links that work with mobile number
  const createPayLink = (app) => {
    const amount = total.toFixed(2);
    const baseParams = `pa=${mobileNumber}@oksbi&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    
    // Try different bank suffixes if @oksbi doesn't work
    const bankSuffixes = ['@oksbi', '@okhdfcbank', '@okicici', '@okaxis', '@ybl', '@ibl', '@apl'];
    
    const appLinks = {
      gpay: `https://gpay.app.goo.gl/${mobileNumber}`,
      phonepe: `phonepe://pay?${baseParams}`,
      paytm: `paytmmp://pay?${baseParams}`,
      default: `upi://pay?${baseParams}`
    };
    
    return appLinks[app] || appLinks.default;
  };
  
  // Simple collect request using mobile number
  const handleGPayCollect = () => {
    // This opens GPay with amount pre-filled
    const amount = total.toFixed(2);
    window.location.href = `https://gpay.app.goo.gl/upi/pay?pa=${mobileNumber}@oksbi&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
  };
  
  const copyUPILink = () => {
    const amount = total.toFixed(2);
    const upiLink = `upi://pay?pa=${mobileNumber}@oksbi&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    navigator.clipboard.writeText(upiLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              <div className="bg-green-50 rounded-lg p-3 mb-3">
                <p className="text-gray-600 text-xs">Amount to Pay</p>
                <p className="text-2xl font-bold text-green-600">₹{total.toFixed(2)}</p>
              </div>
            )}
          </div>
          
          {total > 0 ? (
            <>
              {/* Simple Mobile Number Payment - Most Reliable */}
              <div className="mb-5">
                <p className="text-center text-gray-700 text-sm font-semibold mb-3">
                  Pay to Mobile Number:
                </p>
                <div className="bg-orange-100 rounded-xl p-4 text-center mb-4">
                  <p className="text-2xl font-bold text-orange-700">{mobileNumber}</p>
                  <p className="text-xs text-gray-600 mt-1">Account: {payeeName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Google Pay Button */}
                  <a
                    href={`https://gpay.app.goo.gl/${mobileNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 rounded-lg py-3 hover:bg-blue-100 transition"
                  >
                    <span className="text-lg">📱</span>
                    <span className="text-sm font-semibold text-blue-700">Google Pay</span>
                  </a>
                  
                  {/* PhonePe Button */}
                  <a
                    href={`https://phonepe.com/pay?amount=${total.toFixed(2)}&mobile=${mobileNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-purple-50 border border-purple-200 rounded-lg py-3 hover:bg-purple-100 transition"
                  >
                    <span className="text-lg">📱</span>
                    <span className="text-sm font-semibold text-purple-700">PhonePe</span>
                  </a>
                  
                  {/* Paytm Button */}
                  <a
                    href={`https://paytm.com/pay?amount=${total.toFixed(2)}&mobile=${mobileNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 rounded-lg py-3 hover:bg-blue-100 transition"
                  >
                    <span className="text-lg">📱</span>
                    <span className="text-sm font-semibold text-blue-700">Paytm</span>
                  </a>
                  
                  {/* Copy UPI Link Button */}
                  <button
                    onClick={copyUPILink}
                    className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-lg py-3 hover:bg-green-100 transition"
                  >
                    <span className="text-lg">🔗</span>
                    <span className="text-sm font-semibold text-green-700">
                      {copied ? "Copied!" : "Copy Pay Link"}
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">OR Scan QR Code</span>
                </div>
              </div>
              
              {/* QR Code Section */}
              <button
                onClick={() => setShowQR(!showQR)}
                className="w-full text-center text-orange-600 text-sm font-semibold py-2"
              >
                {showQR ? "⬆️ Hide QR Code" : "⬇️ Show QR Code"}
              </button>
              
              {showQR && (
                <div className="flex flex-col items-center gap-3 mt-3 animate__fadeInUp">
                  <div className="bg-white p-3 rounded-xl shadow-md">
                    <img src={qrCodeImage} alt="UPI QR Code" className="w-40 h-40 object-contain" />
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Scan with any UPI app (GPay, PhonePe, Paytm)
                  </p>
                </div>
              )}
              
              {/* Payment Instructions */}
              <div className="bg-blue-50 rounded-lg p-3 mt-4">
                <p className="text-blue-700 text-xs text-center">
                  ✅ After payment, click WhatsApp button below and share screenshot
                </p>
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