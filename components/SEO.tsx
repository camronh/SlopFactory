import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://slop.wiseguyai.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/og-image.png`;

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: 'website' | 'article';
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path = '',
  ogImage,
  type = 'website'
}) => {
  const fullTitle = title ? `${title} | SlopFactory` : 'SlopFactory';
  const canonicalUrl = `${SITE_URL}${path}`;
  const imageUrl = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content="SlopFactory" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};
