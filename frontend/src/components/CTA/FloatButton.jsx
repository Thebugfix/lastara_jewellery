import { useState, useEffect } from 'react';
import { MessageCircle, TrendingUp, X, Phone } from 'lucide-react';

const FloatButtons = () => {
  const [showGoldRate, setShowGoldRate] = useState(false);
  const [goldRates, setGoldRates] = useState({
    gold22k: 6245,
    gold24k: 6814,
    lastUpdated: new Date().toLocaleDateString('en-IN')
  });

  const whatsappNumber = import.meta.env.VITE_APP_WHATSAPP_NUMBER;
  const whatsappMessage = 'Hello! I am interested in your jewelry collection.';

  const handleWhatsAppClick = () => { 
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = `tel:${whatsappNumber}`;
  };

  return (
    <>
      {showGoldRate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              onClick={() => setShowGoldRate(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-[#c9a341] to-[#f4e5a1] rounded-full flex items-center justify-center">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0d2844]">Today's Gold Rate</h3>
                <p className="text-sm text-gray-500">Live Market Price</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-linear-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-l-4 border-[#c9a341]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-600">22 Karat Gold</p>
                    <p className="text-xs text-gray-500 mt-1">Per Gram</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#c9a341]">
                      ₹{goldRates.gold22k.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-green-600 flex items-center justify-end gap-1">
                      <TrendingUp size={12} />
                      +0.5%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-l-4 border-[#f4e5a1]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-600">24 Karat Gold</p>
                    <p className="text-xs text-gray-500 mt-1">Per Gram</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#c9a341]">
                      ₹{goldRates.gold24k.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-green-600 flex items-center justify-end gap-1">
                      <TrendingUp size={12} />
                      +0.4%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Last Updated: {goldRates.lastUpdated}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                * Rates are subject to market fluctuations
              </p>
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="w-full mt-6 py-3 bg-[#0d2844] text-white rounded-lg hover:bg-[#c9a341] transition-colors font-medium"
            >
              Enquire About Gold Jewelry
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setShowGoldRate(true)}
          className="group relative w-14 h-14 bg-linear-to-br from-[#c9a341] to-[#f4e5a1] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="View Gold Rates"
        >
          <TrendingUp size={24} className="text-white" />
          
          <span className="absolute right-16 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Today's Gold Rate
          </span>

          <span className="absolute inset-0 rounded-full bg-[#c9a341] animate-ping opacity-75"></span>
        </button>

        <button
          onClick={handleCallClick}
          className="group relative w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Call Us"
        >
          <Phone size={24} className="text-white" />
          
          <span className="absolute right-16 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Call Now
          </span>
        </button>

        <button
          onClick={handleWhatsAppClick}
          className="group relative w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} className="text-white" />
          
          <span className="absolute right-16 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp
          </span>

          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default FloatButtons;