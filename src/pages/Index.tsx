
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import ChatInterface from '@/components/ChatInterface';
import Header from '@/components/Header';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gemini-dark to-gemini-light">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main className="chat-container">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
};

export default Index;
