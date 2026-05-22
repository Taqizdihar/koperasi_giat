
// Added import to resolve 'React' namespace error for React.ReactNode
import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface MemberProfile {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface Testimonial {
  name: string;
  city: string;
  content: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageBlockData {
  headline?: string;
  sub_headline?: string;
  background_image?: string;
  stats?: Array<{ label: string; value: string } | string | any>;
  [key: string]: any;
}

export interface PageBlock {
  id: string;
  type: string;
  data: PageBlockData;
}

export interface CmsPage {
  id: number;
  tenant_id: number;
  title: string;
  slug: string;
  content: PageBlock[];
  status: string;
  author_id: number | null;
  created_at: string;
  updated_at: string;
  is_in_navbar: number;
  priority: number;
  is_contact_form_active: boolean;
}

