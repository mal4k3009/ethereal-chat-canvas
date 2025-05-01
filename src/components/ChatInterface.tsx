
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { toast } from '@/components/ui/use-toast';

// Define a type for our messages
interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Gemini, your AI assistant. How can I help you today?",
      isUser: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me think about that...",
        "I'm analyzing the information you provided...",
        "Based on my knowledge, here's what I found...",
        "That's interesting! Here's my perspective on it...",
        "I can help with that. Here's what you should know..."
      ];

      const randomIndex = Math.floor(Math.random() * responses.length);
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[randomIndex],
        isUser: false
      };

      setMessages(prev => [...prev, newBotMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4 pt-16 pb-6">
      <div className="flex-1 overflow-y-auto scrollbar-none mb-4 pr-2">
        <div className="space-y-6 pb-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message.text} 
              isUser={message.isUser}
              animationDelay={index * 100}
            />
          ))}
          {isLoading && (
            <div className="flex gap-2 items-center text-white/60 pl-12">
              <span className="h-2 w-2 bg-gemini-accent rounded-full animate-pulse"></span>
              <span className="h-2 w-2 bg-gemini-accent rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
              <span className="h-2 w-2 bg-gemini-accent rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatInterface;
