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

export interface Article {
  id: string;
  slug: string; // Ghost API 연동용
  title: string;
  excerpt: string;
  date: string;
  tag: 'Strategy' | 'Case Study' | 'Tech' | 'Automation';
  image: string;
  content?: string;
}

export interface EducationCase {
  id: string;
  year: string;
  client: string;
  industry: '제조' | 'IT' | '금융' | '유통' | '공공';
  title: string;
  description: string;
  image?: string; // 목록 및 상세 메인 이미지
  details?: {
    target: string;
    duration: string;
    keyTopics: string[];
    curriculum: {
      session: string;
      content: string;
    }[];
    gallery?: string[]; // 현장 사진 갤러리
  };
}
