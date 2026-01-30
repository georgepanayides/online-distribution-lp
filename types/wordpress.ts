import { CaseStudiesSection } from './case-studies';

export type ACFImage = {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    "thumbnail-width": number;
    "thumbnail-height": number;
    medium: string;
    "medium-width": number;
    "medium-height": number;
    medium_large: string;
    "medium_large-width": number;
    "medium_large-height": number;
    large: string;
    "large-width": number;
    "large-height": number;
  };
};

// Base props that every section might generally share, but mostly empty for Flexible Content
export interface BaseSection {
  // The 'acf_fc_layout' is the key field from WP REST API for Flexible Content
  acf_fc_layout: string;
}

// 1. HERO SECTION
// This matches what we will eventually build in WordPress ACF
export interface HeroSection extends BaseSection {
  acf_fc_layout: 'hero_section';
  heading: string;
  subheading?: string;
  cta_text?: string;
  cta_link?: string;
  background_image?: ACFImage | string; // Handle both object (ACF default) or URL string
  hero_graphic?: 'none' | '3pl-animation';
  theme?: 'light' | 'dark';
}

// 2. TEXT / CONTENT SECTION
export interface ContentSection extends BaseSection {
  acf_fc_layout: 'content_section';
  title?: string;
  content_html: string; // WYSIWYG content
}

// 3. FEATURES GRID SECTION
export interface FeatureItem {
  icon?: string; // Could be a Lucide icon name string
  title: string;
  description: string;
}

export interface FeaturesSection extends BaseSection {
  acf_fc_layout: 'features_section';
  section_title: string;
  features: FeatureItem[];
}

// Discriminated Union of all possible sections
// This allows TypeScript to automatically narrow the type based on acf_fc_layout
export type PageSection = HeroSection | ContentSection | FeaturesSection | CaseStudiesSection;

// The structure of the ACF field on the page object
// Assuming the field name in WP is 'page_sections'
export interface PageAcfData {
  page_sections: PageSection[];
}
