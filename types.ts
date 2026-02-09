import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureProps {
  title: string;
  description: string;
  tag: string;
  icon: LucideIcon;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
}

export interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PortfolioItemProps {
  title: string;
  description: string;
  category: string;
  image?: string;
}

export interface FaqItemProps {
  question: string;
  answer: string;
}
