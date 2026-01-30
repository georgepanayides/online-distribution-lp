// import React from 'react';
// import { PageSection } from '@/types/wordpress';
// import { PageHero } from '@/components/sections/PageHero';
// import { Features } from '@/components/sections/features';
// import { ContentBlock } from '@/components/sections/content-block';

// interface SectionRendererProps {
//   sections: PageSection[] | null | undefined;
// }

// export function SectionRenderer({ sections }: SectionRendererProps) {
//   if (!sections || sections.length === 0) {
//     return null;
//   }

//   return (
//     <>
//       {sections.map((section, index) => {
//         // We use index as part of key because multiple same-type sections can exist.
//         // In production, better to generate a unique ID if possible.
//         const key = `${section.acf_fc_layout}-${index}`;

//         switch (section.acf_fc_layout) {
//           case 'hero_section':
//             return <PageHero key={key} {...section} />;
          
//           case 'features_section':
//             return <Features key={key} {...section} />;

//           case 'content_section':
//             return <ContentBlock key={key} {...section} />;
            
//           default:
//             // Helpful for debugging: shows if a new section type was added in WP 
//             // but not yet in React
//             console.warn(`Unknown section layout: ${(section as any).acf_fc_layout}`);
//             return null;
//         }
//       })}
//     </>
//   );
// }
