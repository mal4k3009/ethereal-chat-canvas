
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { toast } from '@/components/ui/use-toast';
import { sendChatMessage, ChatMessage as ChatMessageType } from '@/services/chatService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
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
    const newUserMessage: ChatMessageType = {
      id: Date.now().toString(),
      text,
      isUser: true
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Use the chat service to get a response
      const response = await sendChatMessage(text);
      
      const newBotMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false
      };

      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4">
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
