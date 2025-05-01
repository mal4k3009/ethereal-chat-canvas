
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import ChatInterface from '@/components/ChatInterface';
import Header from '@/components/Header';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gemini-dark to-gemini-light overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col h-screen">
        <Header />
        <main className="flex-1 pt-24 pb-6">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
};

export default Index;
