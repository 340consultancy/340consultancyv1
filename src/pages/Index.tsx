import React from 'react';
import TopNav from '@/components/TopNav';
import Home from '@/components/Home';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <Home />
      <Footer />
    </div>
  );
};

export default Index;
