
import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  animationDelay?: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isUser,
  animationDelay = 0
}) => {
  return (
    <div 
      className={cn(
        "flex items-start gap-3 mb-4 opacity-0 animate-fade-in",
        isUser ? "flex-row-reverse" : ""
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0",
        isUser ? "bg-gemini-accent" : "bg-gemini-secondary"
      )}>
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-white" />
        )}
      </div>
      
      <div className={cn(
        "p-4 rounded-2xl max-w-[80%] glass-morphism",
        isUser ? "bg-gemini-accent/10" : "bg-white/5",
        isUser ? "rounded-tr-sm" : "rounded-tl-sm"
      )}>
        <p className="text-white leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
