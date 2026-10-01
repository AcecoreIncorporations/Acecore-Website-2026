import { useEffect } from 'react';
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '../../data/seoData';

function setMetaTag(selector, attribute, value) {
  if (!value) return;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [attrName, attrVal] = selector.replace(/[\[\]"]/g, '').split('=');
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function setCanonical(href) {
  if (!href) return;
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  schema,
}) {
  const fullTitle = title || `${SITE_NAME} | Clean Energy Generation & Storage`;
  const fullCanonical = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : SITE_URL;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
  const robotsValue = noindex ? 'noindex, nofollow' : 'index, follow';

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Standard Meta Tags
    if (description) {
      setMetaTag('meta[name="description"]', 'content', description);
    }
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'content', keywords);
    }
    setMetaTag('meta[name="robots"]', 'content', robotsValue);

    // 3. Canonical URL
    setCanonical(fullCanonical);

    // 4. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'content', fullTitle);
    if (description) {
      setMetaTag('meta[property="og:description"]', 'content', description);
    }
    setMetaTag('meta[property="og:url"]', 'content', fullCanonical);
    setMetaTag('meta[property="og:type"]', 'content', ogType);
    setMetaTag('meta[property="og:image"]', 'content', fullOgImage);
    setMetaTag('meta[property="og:site_name"]', 'content', SITE_NAME);

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
    if (description) {
      setMetaTag('meta[name="twitter:description"]', 'content', description);
    }
    setMetaTag('meta[name="twitter:image"]', 'content', fullOgImage);

    // 6. Dynamic JSON-LD Structured Data
    const SCRIPT_ID = 'acecore-route-schema';
    let scriptTag = document.getElementById(SCRIPT_ID);

    if (schema) {
      const schemaData = Array.isArray(schema)
        ? { '@context': 'https://schema.org', '@graph': schema }
        : schema;

      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaData);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [fullTitle, description, keywords, fullCanonical, ogType, fullOgImage, robotsValue, schema]);

  // Also render React 19 hoisted tags into <head>
  return (
    <>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={robotsValue} />
      <link rel="canonical" href={fullCanonical} />

      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={fullOgImage} />

      <meta name="twitter:title" content={fullTitle} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={fullOgImage} />
    </>
  );
}
