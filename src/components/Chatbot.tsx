
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show chatbot button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chatbot button */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <button 
          onClick={toggleChatbot}
          className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Open chat support"
        >
          <MessageCircle size={28} />
          <span className="animate-ping absolute h-5 w-5 rounded-full bg-white opacity-75"></span>
        </button>
      </div>

      {/* Chatbot panel */}
      <div 
        className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl z-50 transition-all duration-500 transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-primary rounded-t-2xl px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">Revento Support</h3>
              <p className="text-white/80 text-sm">We typically reply in a few minutes</p>
            </div>
          </div>
          <button 
            onClick={toggleChatbot}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="h-80 p-4 overflow-y-auto">
          <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 mb-4 max-w-[80%]">
            <p className="text-sm">👋 Hi there! How can I help you with Revento today?</p>
            <span className="text-xs text-gray-500 mt-1 block">Just now</span>
          </div>
          
          {/* Sample messages - in a real app, this would be a dynamic chat interface */}
          <div className="flex justify-end mb-4">
            <div className="bg-primary/10 text-primary rounded-lg rounded-tr-none p-3 max-w-[80%]">
              <p className="text-sm">I'm looking for information about upcoming tech events.</p>
              <span className="text-xs text-primary/70 mt-1 block">Just now</span>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 mb-4 max-w-[80%]">
            <p className="text-sm">Great! We have several upcoming tech events. Would you like me to show you the most popular ones?</p>
            <span className="text-xs text-gray-500 mt-1 block">Just now</span>
          </div>
        </div>
        
        <div className="px-4 py-3 border-t">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="w-full bg-gray-100 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
