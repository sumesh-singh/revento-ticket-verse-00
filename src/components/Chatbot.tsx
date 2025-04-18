
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "👋 Hi there! How can I help you with Revento today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Get the current page content for context
      const pageContent = document.body.innerText;

      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputMessage,
          context: pageContent
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, {
        content: data.answer,
        isUser: false,
        timestamp: new Date()
      }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Open chat support"
        >
          <MessageCircle size={28} />
          <span className="animate-ping absolute h-5 w-5 rounded-full bg-white opacity-75"></span>
        </button>
      </div>

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
              <p className="text-white/80 text-sm">We typically reply in a few seconds</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="h-80 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${
                message.isUser ? 'flex justify-end' : ''
              } mb-4`}
            >
              <div 
                className={`${
                  message.isUser 
                    ? 'bg-primary/10 text-primary rounded-lg rounded-tr-none'
                    : 'bg-gray-100 rounded-lg rounded-tl-none'
                } p-3 max-w-[80%]`}
              >
                <p className="text-sm">{message.content}</p>
                <span className={`text-xs ${
                  message.isUser ? 'text-primary/70' : 'text-gray-500'
                } mt-1 block`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 justify-center items-center text-gray-400">
              <div className="animate-bounce">●</div>
              <div className="animate-bounce [animation-delay:0.2s]">●</div>
              <div className="animate-bounce [animation-delay:0.4s]">●</div>
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 border-t">
          <div className="relative">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..." 
              className="w-full bg-gray-100 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
            />
            <button 
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-primary transition-opacity ${
                isLoading ? 'opacity-50' : 'hover:opacity-80'
              }`}
              onClick={sendMessage}
              disabled={isLoading}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
