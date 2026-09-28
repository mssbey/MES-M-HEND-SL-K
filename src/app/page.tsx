import type { Metadata } from "next";
import Link from "next/link";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { UiIcon } from "@/components/icons/UiIcon";
import { HeroSchematic } from "@/components/illustrations/HeroSchematic";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectCard, ProjectsEmptyState } from "@/components/sections/Projects";
import { ServiceGrid } from "@/components/sections/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { approachSteps } from "@/content/company";
import { generalFaqs } from "@/content/faq";
import { featuredProjects } from "@/content/projects";
import { getService, services, systemFamilies } from "@/content/services";
import { quoteHref } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} | Mekanik Tesisat ve Projelendirme`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

const pillars = [
  { title: "Hesaba dayalı tasarım", text: "Kapasite ve çap kararları ölçüye ve hesaba dayanır." },
  { title: "Disiplinler arası uyum", text: "Mimari ve statik projelerle eşgüdüm baştan planlanır." },
  { title: "Açık kapsam", text: "Teklifte neyin dahil olduğu net biçimde yazılır." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-bone">
        <div
          aria-hidden="true"
          className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]"
        />
        <div className="container-site relative grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-24 lg:pt-20 xl:gap-20">
          <div className="animate-fade-up">
            <Eyebrow>Projelendirme · Tesisat · İklimlendirme · Isıtma</Eyebrow>
            <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-navy-900 sm:text-6xl lg:text-[3.375rem] xl:text-[3.75rem]">
              Binanın görünmeyen sistemleri, <span className="text-accent-600">mühendislikle</span> kurgulanır.
            </h1>
            <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
              MES Mühendislik Çözümleri; mekanik tesisat, doğalgaz, yangın, havalandırma ve ısıtma sistemlerini
              projelendirmeden uygulamaya tek bir teknik bakışla ele alır. Mimarlar, müteahhitler, işletmeler ve
              konut sahipleri için hesaba dayalı, uygulanabilir ve uzun ömürlü çözümler üretir.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={quoteHref()} size="lg" icon="arrow-right">
                Teklif Al
              </ButtonLink>
              <ButtonLink href="/hizmetler" variant="secondary" size="lg">
                Hizmetleri İncele
              </ButtonLink>
            </div>
            <dl className="mt-12 grid gap-6 border-t border-navy-900/10 pt-8 sm:grid-cols-3 sm:gap-5">
              {pillars.map((p, i) => (
                <div key={p.title}>
                  <dt className="flex items-baseline gap-2 text-[0.9375rem] font-bold text-navy-900">
                    <span className="font-mono text-[0.6875rem] font-medium text-accent-600">0{i + 1}</span>
                    {p.title}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[40rem] lg:max-w-none">
            <div className="relative bg-white p-2 shadow-[0_40px_80px_-40px_rgb(20_36_70/0.45)] sm:p-3">
              <HeroSchematic className="h-auto w-full" />
            </div>
            <CornerMarks className="text-navy-900/40" size={18} />
          </div>
        </div>
      </section>

      {/* HİZMETLER */}
      <section aria-labelledby="hizmetler-baslik" className="py-20 sm:py-24 lg:py-32">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="hizmetler-baslik"
              index="01"
              eyebrow="Hizmet alanları"
              title="Projeden bakıma, mekanik sistemlerin tamamı."
              lead="Tek bir sistemle ilgilenen uzmanlar yerine, birbirini etkileyen tüm mekanik sistemleri birlikte düşünen bir mühendislik ekibi."
            />
            <ButtonLink href="/hizmetler" variant="secondary" icon="arrow-right" className="shrink-0 self-start lg:self-end">
              Tüm hizmetler
            </ButtonLink>
          </div>
          <div className="mt-12 lg:mt-16">
            <ServiceGrid items={services} />
          </div>
        </div>
      </section>

      {/* SÜREÇ */}
      <section aria-labelledby="surec-baslik" className="relative overflow-hidden border-y border-line bg-bone py-20 sm:py-24 lg:py-32">
        <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-60" />
        <div className="container-site relative">
          <SectionHeading
            id="surec-baslik"
            index="02"
            eyebrow="Çalışma yaklaşımı"
            title="Projelendirmeden uygulamaya, kesintisiz bir süreç."
            lead="Her iş, ihtiyacın doğru anlaşılmasıyla başlar ve sistemin sorunsuz çalıştığı doğrulandığında tamamlanır. Aradaki her adımı ölçülebilir ve şeffaf tutarız."
          />
          <div className="mt-14 lg:mt-20">
            <ProcessSteps steps={approachSteps} />
          </div>
        </div>
      </section>

      {/* ENTEGRE SİSTEMLER */}
      <section aria-labelledby="sistemler-baslik" className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24 lg:py-32">
        <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0" />
        <div className="container-site relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <SectionHeading
              id="sistemler-baslik"
              index="03"
              eyebrow="Tek bakış, üç sistem"
              tone="dark"
              title="Tesisat, iklimlendirme ve ısıtma birlikte tasarlandığında çalışır."
            />
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-navy-200 lg:justify-self-end">
              Kazan dairesinden radyatöre, klima santralinden menfeze, şaft ölçüsünden bakım kapağına kadar bütün
              kararlar birbirine bağlıdır. Bu sistemleri ayrı ayrı değil, tek bir mühendislik kurgusunun parçaları
              olarak ele alıyoruz.
            </p>
          </div>

          <div className="relative mt-14 lg:mt-20">
            <span aria-hidden="true" className="absolute inset-x-[16.66%] top-[2.75rem] hidden h-px bg-accent-300/40 lg:block" />
            <ul className="grid gap-px bg-white/10 lg:grid-cols-3 lg:gap-8 lg:bg-transparent">
              {systemFamilies.map((family) => (
                <li key={family.id} className="relative bg-navy-900 p-7 lg:border lg:border-white/12 lg:bg-navy-950/40 lg:p-8 lg:backdrop-blur-sm">
                  <span className="relative z-10 grid size-16 place-items-center border border-accent-300/40 bg-navy-900 text-accent-300 lg:mx-auto">
                    <ServiceIcon name={family.icon} className="size-10" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold tracking-[-0.015em] lg:text-center">{family.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-200 lg:text-center">{family.text}</p>
                  <ul className="mt-6 grid gap-px border-t border-white/10">
                    {family.services.map((slug) => {
                      const s = getService(slug);
                      if (!s) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/hizmetler/${slug}`}
                            className="group flex items-center justify-between gap-3 border-b border-white/10 py-3.5 text-[0.9375rem] font-medium text-white/90 transition-colors hover:text-white"
                          >
                            {s.shortTitle}
                            <UiIcon
                              name="arrow-right"
                              className="size-4 shrink-0 text-accent-300 transition-transform group-hover:translate-x-1"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROJELER */}
      <section aria-labelledby="projeler-baslik" className="py-20 sm:py-24 lg:py-32">
        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="projeler-baslik"
              index="04"
              eyebrow="Projeler ve referanslar"
              title="Projeler, kapsamı ve çözümüyle."
              lead="Referanslarımızı; işin kapsamı, kullanılan sistemler ve çözülen teknik problemlerle birlikte, yalnızca doğrulanmış bilgilerle paylaşıyoruz."
            />
            {featuredProjects.length > 0 && (
              <ButtonLink href="/projeler" variant="secondary" icon="arrow-right" className="shrink-0 self-start lg:self-end">
                Tüm projeler
              </ButtonLink>
            )}
          </div>
          <div className="mt-12 lg:mt-16">
            {featuredProjects.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project) => (
                  <li key={project.slug}>
                    <ProjectCard project={project} />
                  </li>
                ))}
              </ul>
            ) : (
              <ProjectsEmptyState />
            )}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section aria-labelledby="sss-baslik" className="border-t border-line bg-bone py-20 sm:py-24 lg:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="sss-baslik"
              index="05"
              eyebrow="Sık sorulan sorular"
              title="Başlamadan önce merak edilenler."
              lead="Aradığınız yanıtı bulamazsanız bize doğrudan sorabilirsiniz."
            />
            <div className="mt-8">
              <ButtonLink href="/sss" variant="secondary" icon="arrow-right">
                Tüm sorular
              </ButtonLink>
            </div>
          </div>
          <FaqList items={generalFaqs.slice(0, 5)} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
