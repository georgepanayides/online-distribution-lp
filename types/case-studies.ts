import { ACFImage, BaseSection } from './wordpress';

export interface CaseStudyDetail {
  detail_text: string;
}

export interface CaseStudy {
  client_name: string; // e.g. "aim'n"
  client_logo: ACFImage | string;
  summary_title?: string; // e.g. "Australasian 3PL & Warehousing Solutions"
  description: string; // The long text content
  quote?: string;
  details: CaseStudyDetail[]; // The "Detail" list items
}

export interface CaseStudiesSection extends BaseSection {
  acf_fc_layout: 'case_studies_section';
  section_heading?: string;
  items: CaseStudy[];
}
