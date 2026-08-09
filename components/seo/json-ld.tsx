interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Server-rendered JSON-LD block. Escapes `<` so a value can never break out
 * of the script tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
