
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          placeholder="Ask me anything..."
          className="w-full pl-4 pr-24 py-3 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-gemini-accent/50 transition-all"
        />
        <div className="absolute right-2 flex gap-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            disabled={disabled}
            className="rounded-full w-9 h-9 text-white hover:bg-white/10"
          >
            <Mic size={18} />
          </Button>
          <Button
            type="submit"
            size="icon"
            disabled={disabled || !message.trim()}
            className="rounded-full w-9 h-9 bg-gemini-accent text-white hover:bg-gemini-accent/80 transition-all disabled:opacity-50"
          >
            <SendHorizontal size={18} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
