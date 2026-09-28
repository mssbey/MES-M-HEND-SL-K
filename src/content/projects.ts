/**
 * Proje ve referans kayıtları.
 *
 * Liste boşken sitede zarif bir boş durum gösterilir; sahte proje veya müşteri
 * logosu eklemeyin. Yalnızca gerçekleşmiş ve paylaşımı için izin alınmış işleri
 * girin. Görselleri /public/images/projeler altına koyup `image.src` ile
 * belirtin (ör. "/images/projeler/ornek-proje.jpg").
 *
 * Örnek kayıt:
 *
 * {
 *   slug: "ornek-ofis-binasi",
 *   title: "Ofis Binası Mekanik Tesisat Projesi",
 *   services: ["mekanik-tesisat-projelendirme", "havalandirma-ve-iklimlendirme"],
 *   location: "İlçe, İl",
 *   year: "2026",
 *   client: "Müşteri adı (izin alındıysa)",
 *   summary: "Projenin kısa, doğrulanmış özeti.",
 *   scope: ["Isı kaybı-kazancı hesapları", "Kanal tasarımı"],
 *   image: { src: "/images/projeler/ornek.jpg", alt: "Görselin açıklaması", width: 1600, height: 1067 },
 *   featured: true,
 * },
 */

export interface Project {
  slug: string;
  title: string;
  /** services.ts içindeki hizmet slug'ları. */
  services: string[];
  location?: string;
  year?: string;
  /** Yalnızca müşterinin yazılı izni varsa doldurun. */
  client?: string;
  summary: string;
  scope?: string[];
  image?: { src: string; alt: string; width: number; height: number };
  /** Ana sayfada gösterilsin mi? */
  featured?: boolean;
}

export const projects: Project[] = [];

export const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
