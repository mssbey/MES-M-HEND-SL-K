import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-bone">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
      <div className="container-site relative py-28 sm:py-36">
        <Eyebrow index="404">Sayfa bulunamadı</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-[-0.03em] text-navy-900 sm:text-5xl">
          Aradığınız sayfa bu paftada yer almıyor.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Bağlantı değişmiş ya da sayfa kaldırılmış olabilir. Ana sayfadan veya hizmetlerimizden devam edebilirsiniz.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" icon="arrow-right">
            Ana sayfaya dön
          </ButtonLink>
          <ButtonLink href="/hizmetler" variant="secondary">
            Hizmetler
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
