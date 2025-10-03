import Script from "next/script";
import type { Thing, WithContext } from "schema-dts";

interface StructuredDataProps {
  data: WithContext<Thing> | WithContext<Thing>[];
}

/**
 * Component for rendering JSON-LD structured data
 */
export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonLd.map((item, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item, null, 0),
          }}
        />
      ))}
    </>
  );
}
