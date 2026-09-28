"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UiIcon } from "@/components/icons/UiIcon";
import { quoteHref, telHref, whatsappHref, whatsappMessage } from "@/lib/links";

interface MobileContactBarProps {
  /** Hizmet slug'ı → hizmet adı; WhatsApp mesajını sayfadaki hizmete göre doldurmak için. */
  serviceTitles: Record<string, string>;
}

/** Mobil ve tablette ekranın altında sabit duran iletişim çubuğu. */
export function MobileContactBar({ serviceTitles }: MobileContactBarProps) {
  const pathname = usePathname();
  const slug = pathname.startsWith("/hizmetler/") ? pathname.split("/")[2] : undefined;
  const serviceTitle = slug ? serviceTitles[slug] : undefined;

  const item =
    "flex min-h-14 flex-col items-center justify-center gap-1 text-[0.75rem] font-semibold tracking-[0.01em]";

  return (
    <nav
      aria-label="Hızlı iletişim"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/10 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_-18px_rgb(20_36_70/0.4)] backdrop-blur lg:hidden"
    >
      <ul className="grid grid-cols-3">
        <li>
          <a href={telHref} className={`${item} text-navy-900`}>
            <UiIcon name="phone" className="size-5" />
            Ara
          </a>
        </li>
        <li className="border-x border-line">
          <a
            href={whatsappHref(whatsappMessage(serviceTitle))}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item} text-navy-900`}
          >
            <UiIcon name="whatsapp" className="size-5" />
            WhatsApp
          </a>
        </li>
        <li className="bg-navy-900">
          <Link href={quoteHref(serviceTitle ? slug : undefined)} className={`${item} text-white`}>
            <UiIcon name="arrow-up-right" className="size-5" />
            Teklif Al
          </Link>
        </li>
      </ul>
    </nav>
  );
}
