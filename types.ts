
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

export interface CmsPostContent {
  excerpt: string;
  featured_image: string | null;
  body_content: string;
  tags: string;
}

export interface CmsPost {
  id: number;
  tenant_id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: CmsPostContent[];
  featured_image_id: number | null;
  status: string;
  author_id: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  icon: string;
  url: string;
}

export interface CmsSettings {
  site_name: string;
  title: string;
  tagline: string;
  logo_url: string;
  frontend_url: string;
  copyright_text: string;
  social_links: SocialLink[];
  quick_links: any;
  google_maps_url: string;
  support_email?: string;
  footer_text?: string;
  footer_nav_1?: Array<{ label: string; url: string }>;
  footer_nav_2?: Array<{ label: string; url: string }>;
  footer_contacts?: Array<{ label: string; value: string }>;
}


