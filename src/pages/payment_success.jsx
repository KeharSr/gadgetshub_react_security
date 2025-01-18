import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check, ShoppingBag } from "lucide-react";

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const pidx = query.get("pidx");
  const orderId = query.get("orderId");

  // Animation classes that will be added after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById("success-icon");
      if (element) {
        element.classList.remove("scale-0");
        element.classList.add("scale-100");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6 text-center">
        {/* Success Icon with Animation */}
        <div 
          id="success-icon"
          className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center transform scale-0 transition-transform duration-500"
        >
          <Check className="w-10 h-10 text-green-500" />
        </div>

        {/* Success Message with Fade-in Animation */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details with Slide-up Animation */}
        <div className="space-y-2 bg-gray-50 p-4 rounded-md animate-slide-up">
          <p className="text-sm text-gray-600">
            Transaction ID: <span className="font-medium text-gray-800">{pidx}</span>
          </p>
          <p className="text-sm text-gray-600">
            Order ID: <span className="font-medium text-gray-800">{orderId}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 space-y-4">
          <a 
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 space-x-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Continue Shopping</span>
          </a>
          
          <a 
            href="/myorders"
            className="inline-block w-full px-6 py-3 text-base font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            View Order Details
          </a>
        </div>
      </div>

      {/* Optional confetti animation using pure CSS */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-confetti-1"></div>
        <div className="absolute w-2 h-2 bg-green-500 rounded-full animate-confetti-2"></div>
        <div className="absolute w-2 h-2 bg-yellow-500 rounded-full animate-confetti-3"></div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes confetti-1 {
          0% { transform: translateY(-10px) translateX(0) rotate(0deg); }
          100% { transform: translateY(100vh) translateX(20vw) rotate(360deg); }
        }
        
        @keyframes confetti-2 {
          0% { transform: translateY(-10px) translateX(50vw) rotate(0deg); }
          100% { transform: translateY(100vh) translateX(30vw) rotate(-360deg); }
        }
        
        @keyframes confetti-3 {
          0% { transform: translateY(-10px) translateX(100vw) rotate(0deg); }
          100% { transform: translateY(100vh) translateX(80vw) rotate(360deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-confetti-1 {
          animation: confetti-1 2s linear infinite;
        }
        
        .animate-confetti-2 {
          animation: confetti-2 2.3s linear infinite;
        }
        
        .animate-confetti-3 {
          animation: confetti-3 1.7s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;