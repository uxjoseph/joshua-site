import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { FeatureSection } from './components/FeatureSection';
import { ProcessSection } from './components/ProcessSection';
import { PortfolioSection } from './components/PortfolioSection';
import { FAQSection } from './components/FAQSection';
import { ContactFooter } from './components/ContactFooter';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <FeatureSection />
        <ProcessSection />
        <PortfolioSection />
        <FAQSection />
      </main>
      <ContactFooter />
    </div>
  );
}

export default App;