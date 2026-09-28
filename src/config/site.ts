/**
 * Site genelindeki marka, iletişim ve yasal bilgiler.
 *
 * `null` bırakılan alanlar sitede hiç gösterilmez ve yapılandırılmış veriye
 * eklenmez. Yayına çıkmadan önce README'deki kontrol listesine göre doldurun.
 */

export interface PostalAddress {
  streetAddress: string;
  addressLocality: string; // İlçe
  addressRegion: string; // İl
  postalCode: string;
  addressCountry: "TR";
}

export interface LegalInfo {
  /** Ticari unvan (ör. "MES Mühendislik ... Ltd. Şti."). */
  companyTitle: string | null;
  /** Tebligat / merkez adresi (tek satır). */
  registeredAddress: string | null;
  mersisNo: string | null;
  kepAddress: string | null;
  /** Form verilerini alan hizmet sağlayıcısının adı (ör. Formspree). */
  formServiceProvider: string | null;
  /** Verilerin saklanma süresi (ör. "talebin sonuçlanmasından itibaren 2 yıl"). */
  retentionPeriod: string | null;
  /** Metinlerin son güncellenme tarihi (ör. "1 Ekim 2026"). */
  lastUpdated: string | null;
  /**
   * Hukuk danışmanı onayı alındığında `true` yapın. `false` iken yasal
   * sayfalarda taslak uyarısı görünür ve sayfalar arama motorlarına kapalıdır.
   */
  reviewed: boolean;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  slogan: string;
  description: string;
  url: string;
  locale: string;
  contact: {
    person: string;
    phoneDisplay: string;
    phoneE164: string;
    email: string;
    /** Ülke koduyla, başında + olmadan. WhatsApp hesabının bu numarada olduğunu doğrulayın. */
    whatsapp: string;
    website: string;
  };
  address: PostalAddress | null;
  /** Hizmet bölgesi (ör. "İstanbul"). Boşsa sitede hiçbir bölge iddiası yer almaz. */
  serviceArea: string | null;
  /** Çalışma saatleri (ör. "Hafta içi 09.00–18.00"). */
  workingHours: string | null;
  social: {
    linkedin: string | null;
    instagram: string | null;
  };
  legal: LegalInfo;
}

export const siteConfig: SiteConfig = {
  name: "MES Mühendislik Çözümleri",
  shortName: "MES Mühendislik",
  slogan: "Mekanik Tesisatta Güvenilir Mühendislik Çözümleri.",
  description:
    "Mekanik tesisat, doğalgaz, yangın, havalandırma ve iklimlendirme, sıhhi tesisat ile klima, kombi ve radyatör sistemlerinde projelendirmeden uygulamaya mühendislik çözümleri.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mes.com.tr").replace(/\/$/, ""),
  locale: "tr_TR",
  contact: {
    person: "Emin Şaplı",
    phoneDisplay: "+90 553 022 03 82",
    phoneE164: "+905530220382",
    email: "e.sapli@mes.com.tr",
    whatsapp: "905530220382",
    website: "www.mes.com.tr",
  },
  address: null,
  serviceArea: null,
  workingHours: null,
  social: {
    linkedin: null,
    instagram: null,
  },
  legal: {
    companyTitle: null,
    registeredAddress: null,
    mersisNo: null,
    kepAddress: null,
    formServiceProvider: null,
    retentionPeriod: null,
    lastUpdated: null,
    reviewed: false,
  },
};
