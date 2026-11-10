import { useEffect } from 'react';
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '../../data/seoData';

function setMetaTag(attribute, name, content) {
  const selector = `meta[${attribute}="${name}"]`;
  const elements = document.head.querySelectorAll(selector);
  let element = elements[0];
  elements.forEach((duplicate) => duplicate !== element && duplicate.remove());

  if (content == null) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setCanonical(href) {
  const links = document.head.querySelectorAll('link[rel="canonical"]');
  let link = links[0];
  links.forEach((duplicate) => duplicate !== link && duplicate.remove());

  if (!href) {
    link?.remove();
    return;
  }

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
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = 'Acecore clean energy systems',
  noindex = false,
  schema,
}) {
  const fullTitle = title || `${SITE_NAME} | Clean Energy Generation & Storage`;
  const fullCanonical = canonical ? new URL(canonical, `${SITE_URL}/`).href : null;
  const fullOgImage = new URL(ogImage, `${SITE_URL}/`).href;
  const robotsValue = noindex ? 'noindex, nofollow' : 'index, follow';

  useEffect(() => {
    document.title = fullTitle;
    setMetaTag('name', 'description', description ?? null);
    setMetaTag('name', 'robots', robotsValue);
    setCanonical(fullCanonical);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description ?? null);
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', fullOgImage);
    setMetaTag('property', 'og:image:alt', ogImageAlt);
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description ?? null);
    setMetaTag('name', 'twitter:image', fullOgImage);
  }, [
    description,
    fullCanonical,
    fullOgImage,
    fullTitle,
    ogImageAlt,
    ogType,
    robotsValue,
  ]);

  const schemaData = schema
    ? Array.isArray(schema)
      ? { '@context': 'https://schema.org', '@graph': schema }
      : schema
    : null;

  return (
    <>
      {schemaData ? (
        <script
          id="acecore-route-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData).replace(/</g, '\\u003c'),
          }}
        />
      ) : null}
    </>
  );
}
