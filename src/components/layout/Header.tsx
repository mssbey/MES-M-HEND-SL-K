"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Logo } from "@/components/brand/Logo";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { UiIcon } from "@/components/icons/UiIcon";
import { buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import type { ServiceGroupId, ServiceIconName } from "@/content/services";
import { mailHref as buildMailHref, telHref, whatsappHref as buildWhatsappHref, whatsappMessage } from "@/lib/links";

export interface NavService {
  slug: string;
  shortTitle: string;
  icon: ServiceIconName;
  group: ServiceGroupId;
}

interface HeaderProps {
  services: NavService[];
  groups: Record<ServiceGroupId, { title: string }>;
}

const { phoneDisplay, email } = siteConfig.contact;
const mailHref = buildMailHref();
const whatsappHref = buildWhatsappHref(whatsappMessage());

const navItems = [
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/hizmetler", label: "Hizmetler", hasMenu: true },
  { href: "/projeler", label: "Projeler" },
  { href: "/sss", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header({ services, groups }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const servicesWrapRef = useRef<HTMLLIElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const menuId = useId();
  const mobileId = useId();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const closeAll = useCallback(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, []);

  // Kaydırma durumunda başlığa ince gölge
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hizmetler menüsü: dışarı tıklama ve Esc ile kapanma
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!servicesWrapRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesBtnRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  // Mobil menü: kaydırma kilidi, Esc, ilk öğeye odak ve odak döngüsü
  useEffect(() => {
    if (!mobileOpen) return;
    const panel = mobilePanelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        mobileBtnRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = [mobileBtnRef.current, ...panel.querySelectorAll<HTMLElement>("a, button")].filter(
        Boolean,
      ) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setMobileOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [mobileOpen]);

  const openOnHover = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hoverTimer.current);
    setServicesOpen(true);
  };
  const closeOnLeave = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setServicesOpen(false), 160);
  };

  const groupIds = Object.keys(groups) as ServiceGroupId[];

  return (
    <>
      {/* Üst bilgi şeridi (tablet ve üzeri) */}
      <div className="hidden bg-navy-950 text-[0.8125rem] text-navy-200 md:block">
        <div className="container-site flex h-10 items-center justify-between gap-6">
          <p className="truncate">Mekanik Tesisatta Güvenilir Mühendislik Çözümleri.</p>
          <div className="flex shrink-0 items-center gap-6">
            <a href={telHref} className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <UiIcon name="phone" className="size-3.5" />
              {phoneDisplay}
            </a>
            <a href={mailHref} className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <UiIcon name="mail" className="size-3.5" />
              {email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 transition-shadow duration-300 ${
          scrolled || mobileOpen ? "border-line shadow-[0_10px_30px_-20px_rgb(20_36_70/0.35)]" : "border-transparent"
        }`}
      >
        <div className="container-site flex h-[4.25rem] items-center justify-between gap-6 lg:h-[4.75rem]">
          <Link
            href="/"
            className="flex items-center gap-3 text-navy-900"
            aria-label="MES Mühendislik Çözümleri — Ana sayfa"
            onClick={closeAll}
          >
            <Logo className="h-7 w-auto lg:h-8" />
            <span aria-hidden="true" className="h-7 w-px bg-navy-900/15" />
            <span aria-hidden="true" className="flex flex-col leading-[1.15] tracking-[-0.01em]">
              <span className="text-[0.9375rem] font-bold">MES Mühendislik</span>
              <span className="text-[0.75rem] font-medium text-navy-900/70">Mekanik Endüstriyel Sistemler</span>
            </span>
          </Link>

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) =>
                item.hasMenu ? (
                  <li
                    key={item.href}
                    ref={servicesWrapRef}
                    onPointerEnter={openOnHover}
                    onPointerLeave={closeOnLeave}
                  >
                    <button
                      ref={servicesBtnRef}
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls={menuId}
                      onClick={() => setServicesOpen((v) => !v)}
                      className={`relative inline-flex h-11 items-center gap-1.5 px-3.5 text-[0.9375rem] font-semibold transition-colors hover:text-navy-900 ${
                        isActive(item.href) ? "text-navy-900" : "text-navy-900/70"
                      }`}
                    >
                      {item.label}
                      <UiIcon
                        name="chevron-down"
                        className={`size-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                      />
                      {isActive(item.href) && <ActiveBar />}
                    </button>

                    <div
                      id={menuId}
                      hidden={!servicesOpen}
                      className="absolute inset-x-0 top-full"
                    >
                      <div className="border-y border-line bg-white shadow-[0_30px_60px_-30px_rgb(20_36_70/0.35)]">
                        <div className="container-site grid grid-cols-[1fr_1fr_20rem] gap-10 py-10">
                          {groupIds.map((gid) => (
                            <div key={gid}>
                              <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-accent-600">
                                {groups[gid].title}
                              </p>
                              <ul className="mt-4 grid gap-1">
                                {services
                                  .filter((s) => s.group === gid)
                                  .map((s) => (
                                    <li key={s.slug}>
                                      <Link
                                        href={`/hizmetler/${s.slug}`}
                                        onClick={closeAll}
                                        aria-current={pathname === `/hizmetler/${s.slug}` ? "page" : undefined}
                                        className="group/item -mx-3 flex items-center gap-3.5 rounded-[3px] px-3 py-2.5 text-[0.9375rem] font-medium text-navy-900 transition-colors hover:bg-bone aria-[current=page]:bg-bone"
                                      >
                                        <span className="grid size-10 shrink-0 place-items-center border border-line bg-white text-navy-900 transition-colors group-hover/item:border-navy-900/30 group-hover/item:text-accent-600">
                                          <ServiceIcon name={s.icon} className="size-6" />
                                        </span>
                                        {s.shortTitle}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          ))}
                          <div className="relative flex flex-col justify-between overflow-hidden bg-navy-900 p-7 text-white">
                            <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 opacity-70" />
                            <div className="relative">
                              <p className="text-lg font-bold leading-snug">
                                Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?
                              </p>
                              <p className="mt-3 text-sm leading-relaxed text-navy-200">
                                Projenizi anlatın, doğru kapsamı birlikte belirleyelim.
                              </p>
                            </div>
                            <div className="relative mt-6 flex flex-col gap-2">
                              <Link
                                href="/iletisim#teklif"
                                onClick={closeAll}
                                className={buttonClasses("light", "md", "w-full")}
                              >
                                Teklif Al
                              </Link>
                              <Link
                                href="/hizmetler"
                                onClick={closeAll}
                                className="inline-flex h-10 items-center justify-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
                              >
                                Tüm hizmetler
                                <UiIcon name="arrow-right" className="size-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`relative inline-flex h-11 items-center px-3.5 text-[0.9375rem] font-semibold transition-colors hover:text-navy-900 ${
                        isActive(item.href) ? "text-navy-900" : "text-navy-900/70"
                      }`}
                    >
                      {item.label}
                      {isActive(item.href) && <ActiveBar />}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={telHref}
              className="hidden items-center gap-2.5 px-2 text-[0.9375rem] font-semibold text-navy-900 xl:inline-flex"
            >
              <span className="grid size-9 place-items-center rounded-full border border-navy-900/15">
                <UiIcon name="phone" className="size-4" />
              </span>
              {phoneDisplay}
            </a>
            <Link href="/iletisim#teklif" className={buttonClasses("primary", "md", "hidden sm:inline-flex")}>
              Teklif Al
            </Link>
            <button
              ref={mobileBtnRef}
              type="button"
              className="-mr-2 grid size-11 place-items-center text-navy-900 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls={mobileId}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <UiIcon name={mobileOpen ? "close" : "menu"} className="size-6" />
            </button>
          </div>
        </div>

        {/* Mobil menü */}
        <div
          id={mobileId}
          ref={mobilePanelRef}
          hidden={!mobileOpen}
          className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
        >
          <nav aria-label="Mobil menü" className="container-site pb-32 pt-6">
            <ul className="divide-y divide-line border-b border-line">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4 text-[1.375rem] font-bold tracking-[-0.02em] text-navy-900 aria-[current=page]:text-accent-600"
                  >
                    {item.label}
                    <UiIcon name="arrow-right" className="size-5 text-navy-900/40" />
                  </Link>
                  {item.hasMenu && (
                    <ul className="grid gap-0.5 pb-4 sm:grid-cols-2">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/hizmetler/${s.slug}`}
                            onClick={closeAll}
                            className="flex items-center gap-3 py-2 text-[0.9375rem] font-medium text-muted hover:text-navy-900"
                          >
                            <ServiceIcon name={s.icon} className="size-5 shrink-0 text-accent-600" />
                            {s.shortTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3">
              <Link href="/iletisim#teklif" onClick={closeAll} className={buttonClasses("primary", "lg", "w-full")}>
                Teklif Al
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a href={telHref} className={buttonClasses("secondary", "md", "w-full")}>
                  <UiIcon name="phone" className="size-4" />
                  Ara
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("secondary", "md", "w-full")}
                >
                  <UiIcon name="whatsapp" className="size-4" />
                  WhatsApp
                </a>
              </div>
              <a href={mailHref} className="mt-2 text-center text-sm font-medium text-muted underline-offset-4 hover:underline">
                {email}
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

function ActiveBar() {
  return <span aria-hidden="true" className="absolute inset-x-3.5 bottom-1 h-0.5 bg-accent-500" />;
}
