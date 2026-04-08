import React from 'react';
import { Hero } from '../components/Hero';
import { Manifesto } from '../components/Manifesto';
import { TeamSection } from '../components/TeamSection';
import { FeatureSection } from '../components/FeatureSection';
import { ProcessSection } from '../components/ProcessSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { NewsletterCTA } from '../components/NewsletterCTA';
import { FAQSection } from '../components/FAQSection';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Manifesto />
      <TeamSection />
      <FeatureSection />
      <ProcessSection />
      <PortfolioSection />
      <FAQSection />
    </main>
  );
};
