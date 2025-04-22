
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { groqService } from '@/services/GroqService';

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
      content: "👋 Hi there! How can I help you with Revento today? You can ask about events, tickets, or even upload an image of a venue or poster for analysis.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setImageFile(file);
    
    toast({
      title: "Image Added",
      description: "Image ready to send with your next message",
    });
  };
  
  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };
  
  const sendMessage = async () => {
    if (!inputMessage.trim() && !imageFile) return;

    let messageContent = inputMessage;
    
    // If there's an image, add a note about it
    if (imageFile) {
      messageContent += messageContent.trim() ? 
        ` (with image: ${imageFile.name})` : 
        `Analyzing image: ${imageFile.name}`;
    }
    
    const userMessage = {
      content: messageContent,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Get the current page content for context
      const pageContent = document.body.innerText;
      
      // We'll include a note about the image analysis 
      // Since we're currently not actually sending the image to the API
      // In a full implementation, you would convert the image and send it
      const contextWithImage = imageFile 
        ? `${pageContent}\n\n[User has uploaded an image: ${imageFile.name}. Please acknowledge this and suggest how it could be used for event creation or analysis.]` 
        : pageContent;

      const result = await groqService.chatCompletion({
        question: inputMessage || "Please analyze this image and provide feedback",
        context: contextWithImage
      });

      if (result.error) {
        throw new Error(result.error);
      }

      setMessages(prev => [...prev, {
        content: result.answer,
        isUser: false,
        timestamp: new Date()
      }]);
      
      // Clear image after sending
      clearImage();
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
          className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative"
          aria-label="Open chat support"
        >
          <MessageCircle size={28} />
          <span className="animate-ping absolute h-5 w-5 rounded-full bg-white opacity-75"></span>
          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white">
            AI
          </div>
        </button>
        <div className="absolute -top-8 right-0 bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium text-blue-600 animate-bounce">
          Ask me anything!
        </div>
      </div>

      <div 
        className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl z-50 transition-all duration-500 transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-primary rounded-t-2xl px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
              <MessageCircle size={20} className="text-white" />
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                AI
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium flex items-center">
                Revento AI Assistant
                <span className="ml-2 bg-white/20 text-white/90 text-xs py-0.5 px-2 rounded-full">Powered by Groq</span>
              </h3>
              <p className="text-white/80 text-sm">Ask about events or upload images for analysis</p>
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
                    : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg rounded-tl-none shadow-md'
                } p-3 max-w-[80%]`}
              >
                <p className={`text-sm ${!message.isUser ? 'text-white' : ''}`}>{message.content}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs ${
                    message.isUser ? 'text-primary/70' : 'text-white/70'
                  } block`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  {!message.isUser && (
                    <span className="text-xs text-white/70 font-medium">Groq AI</span>
                  )}
                </div>
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
        
        {imagePreview && (
          <div className="px-4 pt-2">
            <div className="relative inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-24 w-auto rounded-md object-cover"
              />
              <button 
                onClick={clearImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
        
        <div className="px-4 py-3 border-t">
          <div className="flex items-center gap-2">
            <label 
              htmlFor="image-upload" 
              className="cursor-pointer text-primary hover:text-primary/80"
              aria-label="Upload image"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isLoading}
              />
            </label>
            
            <div className="relative flex-1">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={imageFile ? "Add a message with your image..." : "Type your message or upload an image..."} 
                className="w-full bg-gray-100 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
              />
              <button 
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-primary transition-opacity ${
                  isLoading || (!inputMessage.trim() && !imageFile) ? 'opacity-50' : 'hover:opacity-80'
                }`}
                onClick={sendMessage}
                disabled={isLoading || (!inputMessage.trim() && !imageFile)}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
