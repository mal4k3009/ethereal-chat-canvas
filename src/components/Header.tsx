
import React from 'react';
import { Settings, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 glass-morphism">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gemini-accent to-gemini-secondary mr-2"></div>
          <h1 className="text-xl font-semibold text-white">Gemini <span className="text-gemini-accent">AI</span></h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <Info size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <Settings size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
