/** Yapılandırılmış veriyi (schema.org) sayfaya ekler. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON içindeki "<" karakteri kaçırılarak script enjeksiyonu önlenir.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
