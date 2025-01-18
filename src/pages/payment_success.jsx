import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const pidx = query.get("pidx");
  const orderId = query.get("orderId");

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Dots */}
      <div className="absolute w-4 h-4 bg-blue-500 rounded-full top-1/4 left-8 animate-float-1"></div>
      <div className="absolute w-4 h-4 bg-green-500 rounded-full top-3/4 right-8 animate-float-2"></div>
      <div className="absolute w-4 h-4 bg-yellow-500 rounded-full bottom-1/4 left-1/4 animate-float-3"></div>
      
      {/* Main Card */}
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center relative">
        {/* Success Icon */}
        <div className="mb-8">
          <div 
            id="success-icon"
            className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center transform scale-0 transition-all duration-700 relative"
          >
            <Check className="w-12 h-12 text-green-500 animate-check" />
            <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse-ring"></div>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <div className="space-y-4 py-6 text-gray-600">
          <div className="space-y-2">
            <p className="text-sm">Transaction ID:</p>
            <p className="font-mono text-xs bg-gray-50 p-3 rounded-lg break-all">
              {pidx}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm">Order ID:</p>
            <p className="font-mono text-xs bg-gray-50 p-3 rounded-lg">
              {orderId}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 space-y-4">
          <a 
            href="/"
            className="block w-full px-6 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200"
          >
            Continue Shopping
          </a>
          
          <a 
            href="/orders"
            className="block text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            View Order Details
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes check {
          from { transform: scale(0) rotate(-45deg); }
          to { transform: scale(1) rotate(0); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }

        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -20px) rotate(180deg); }
        }

        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, 20px) rotate(-180deg); }
        }

        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, 15px) rotate(90deg); }
        }

        .animate-check {
          animation: check 0.8s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 8s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;