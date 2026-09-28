import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { UiIcon } from "@/components/icons/UiIcon";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ButtonLink } from "@/components/ui/Button";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { approachSteps, clientTypes, principles } from "@/content/company";
import { mailHref, quoteHref, telHref } from "@/lib/links";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const path = "/kurumsal";

export const metadata: Metadata = pageMetadata({
  title: "Kurumsal",
  description:
    "MES Mühendislik Çözümleri; mekanik tesisatta hesaba dayalı tasarım, disiplinler arası koordinasyon ve açık iletişimle çalışan bir mühendislik firmasıdır.",
  path,
});

export default function KurumsalPage() {
  const { contact } = siteConfig;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Kurumsal", path }])} />
      <PageHero
        crumbs={[{ name: "Kurumsal", path }]}
        eyebrow="Hakkımızda"
        title="Mekanik tesisatta güvenilir mühendislik çözümleri."
        lead="MES Mühendislik Çözümleri, binaların mekanik sistemlerini projelendirme aşamasından uygulamaya ve bakıma kadar bütüncül bir mühendislik bakışıyla ele alır."
      />

      {/* Biz kimiz */}
      <section aria-labelledby="biz-kimiz" className="py-20 sm:py-24 lg:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="relative self-start">
            <div className="relative grid aspect-[5/4] place-items-center overflow-hidden border border-line bg-bone">
              <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
              <Logo className="relative h-auto w-[58%] text-navy-900" title="MES logosu" />
              <span className="absolute bottom-4 left-5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-navy-900/50">
                MES Mühendislik Çözümleri
              </span>
            </div>
            <CornerMarks className="text-navy-900/40" size={16} />
          </div>
          <div>
            <SectionHeading
              id="biz-kimiz"
              eyebrow="Biz kimiz"
              title="Görünmeyen sistemler, görünür bir özenle."
            />
            <div className="mt-6 grid gap-5 text-[1.0625rem] leading-relaxed text-muted">
              <p>
                Bir binada konforu, güvenliği ve işletme maliyetini belirleyen sistemlerin çoğu duvarların,
                döşemelerin ve asma tavanların arkasında kalır. Bu sistemlerin doğru kurgulanması; binanın yıllar
                boyunca sorunsuz, verimli ve güvenli çalışmasının temelidir.
              </p>
              <p>
                MES Mühendislik Çözümleri olarak mekanik tesisat, doğalgaz, yangın, havalandırma ve iklimlendirme ile
                sıhhi tesisat projelerini; klima, kombi ve radyatör sistemlerinin kurulum ve bakım hizmetleriyle
                birlikte sunuyoruz. Böylece projelendirme ile uygulama arasındaki kopukluğu ortadan kaldırmayı
                hedefliyoruz.
              </p>
              <p>
                Her işe ihtiyacın doğru anlaşılmasıyla başlıyor, kararlarımızı hesaba dayandırıyor ve kapsamı baştan
                açıkça konuşuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* İlkeler */}
      <section aria-labelledby="ilkeler" className="border-y border-line bg-bone py-20 sm:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading id="ilkeler" eyebrow="Çalışma ilkelerimiz" title="İşimizi dört ilke üzerine kuruyoruz." />
          <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li key={p.title} className="bg-white p-7">
                <span className="font-mono text-[0.75rem] tracking-[0.12em] text-accent-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-[-0.015em] text-navy-900">{p.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kimlerle */}
      <section aria-labelledby="kimlerle" className="py-20 sm:py-24 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            id="kimlerle"
            eyebrow="Kimlerle çalışıyoruz"
            title="Farklı ihtiyaçlar, aynı mühendislik titizliği."
            lead="Bir mimarlık ofisinin beklentisi ile bir konut sahibinin beklentisi farklıdır. Çalışma biçimimizi karşımızdaki ihtiyaca göre şekillendiriyoruz."
          />
          <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {clientTypes.map((c) => (
              <li key={c.title} className="bg-white p-7">
                <h3 className="flex items-center gap-3 text-lg font-bold tracking-[-0.015em] text-navy-900">
                  <span aria-hidden="true" className="size-2 bg-accent-500" />
                  {c.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Süreç */}
      <section aria-labelledby="kurumsal-surec" className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24 lg:py-28">
        <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0" />
        <div className="container-site relative">
          <SectionHeading
            id="kurumsal-surec"
            tone="dark"
            eyebrow="Süreç"
            title="Projelendirmeden uygulamaya nasıl çalışıyoruz?"
          />
          <div className="mt-14 lg:mt-20">
            <ProcessSteps steps={approachSteps} tone="dark" />
          </div>
        </div>
      </section>

      {/* İletişim kişisi */}
      <section aria-labelledby="iletisim-kisisi" className="py-20 sm:py-24">
        <div className="container-site">
          <div className="grid gap-8 border border-line p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-accent-600">İletişim kişisi</p>
              <h2 id="iletisim-kisisi" className="mt-3 text-2xl font-bold tracking-[-0.02em] text-navy-900 sm:text-3xl">
                {contact.person}
              </h2>
              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
                <a href={telHref} className="inline-flex items-center gap-2 font-semibold text-navy-900 hover:underline">
                  <UiIcon name="phone" className="size-4 text-accent-600" />
                  {contact.phoneDisplay}
                </a>
                <a href={mailHref()} className="inline-flex items-center gap-2 font-semibold text-navy-900 hover:underline">
                  <UiIcon name="mail" className="size-4 text-accent-600" />
                  {contact.email}
                </a>
              </div>
            </div>
            <ButtonLink href={quoteHref()} size="lg" icon="arrow-right">
              Teklif Al
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
