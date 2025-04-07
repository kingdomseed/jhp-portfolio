import Head from 'next/head';

type PhotoGalleryProps = {
  galleryName: string;
  galleryUrl: string;
  images: {
    url: string;
    name: string;
    description?: string;
    contentUrl: string;
    thumbnailUrl?: string;
    dateCreated?: string;
    category?: string;
  }[];
}

/**
 * Schema.org ImageGallery & Photograph structured data component
 * Helps search engines understand photography content better
 * 
 * @param galleryName Name of the gallery or collection
 * @param galleryUrl URL of the gallery page
 * @param images Array of image data including URLs and metadata
 */
export default function PhotoGallerySchema({
  galleryName,
  galleryUrl,
  images
}: PhotoGalleryProps) {
  if (!images.length) return null;

  // Create ImageGallery schema
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": galleryName,
    "url": galleryUrl,
    "description": `${galleryName} - Jason Holt Photography`,
    "numberOfItems": images.length
  };

  // Create individual Photograph schemas for each image
  const photographSchemas = images.map((image, index) => ({
    "@context": "https://schema.org",
    "@type": "Photograph",
    "name": image.name,
    "description": image.description || `${image.name} - Jason Holt Photography`,
    "contentUrl": image.contentUrl,
    "thumbnailUrl": image.thumbnailUrl || image.contentUrl,
    "dateCreated": image.dateCreated || new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": "Jason Holt"
    },
    "genre": image.category || galleryName,
    "copyrightHolder": {
      "@type": "Person",
      "name": "Jason Holt"
    },
    "position": index + 1
  }));

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gallerySchema)
        }}
      />
      {photographSchemas.map((schema, index) => (
        <script
          key={`photo-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </Head>
  );
}
