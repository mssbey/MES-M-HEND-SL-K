# MES Mühendislik Çözümleri — Web Sitesi

Next.js 16 (App Router), TypeScript ve Tailwind CSS 4 ile hazırlanmış kurumsal site.
Sayfalar statik olarak üretilir; yalnızca teklif formu uç noktası (`/api/teklif`) sunucuda çalışır.

## Çalıştırma

Gereksinim: Node.js 20.9 veya üzeri.

```bash
npm install
cp .env.example .env.local   # değerleri doldurun
npm run dev                  # http://localhost:3000
```

Yayın için:

```bash
npm run build
npm run start
```

Vercel veya Node.js çalıştırabilen herhangi bir sunucuya kurulabilir. Formun çalışması için
barındırma ortamında `QUOTE_WEBHOOK_URL` ortam değişkeni tanımlanmalıdır.

## İçeriği güncelleme

| Ne                          | Nerede                                             |
| --------------------------- | -------------------------------------------------- |
| İletişim, adres, bölge, yasal bilgiler | `src/config/site.ts`                    |
| Hizmetler ve hizmet sayfaları | `src/content/services.ts`                        |
| Projeler / referanslar      | `src/content/projects.ts`                          |
| Genel SSS                   | `src/content/faq.ts` (hizmete özel sorular `services.ts` içinde) |
| Süreç adımları, ilkeler     | `src/content/company.ts`                           |
| Gizlilik ve KVKK metinleri  | `src/content/legal.ts`                             |

- **Yeni hizmet:** `services.ts` listesine bir nesne ekleyin; sayfası, menüler, form seçeneği,
  sitemap ve yapılandırılmış veri otomatik oluşur.
- **Proje ekleme:** `projects.ts` içindeki örneğe göre kayıt ekleyin; görselleri
  `public/images/projeler/` altına koyun. Liste boşken sitede boş durum gösterilir.
  `featured: true` olan ilk üç proje ana sayfada görünür.
- **Hizmet fotoğrafı:** Bir hizmetin `image` alanı doldurulursa şematik çizim yerine fotoğraf gösterilir.

## Yayına çıkmadan önce doldurulması gerekenler

- [ ] **WhatsApp numarası:** `+90 553 022 03 82` numarasında WhatsApp hesabı olduğunu doğrulayın (`site.ts → contact.whatsapp`).
- [ ] **Form altyapısı:** `QUOTE_WEBHOOK_URL` tanımlayın ve test gönderimi yapın. Tanımlı değilken form
      "gönderildi" demez; bilgileri e-posta / WhatsApp ile iletme seçenekleri sunar.
- [ ] **Alan adı:** `NEXT_PUBLIC_SITE_URL` (varsayılan `https://www.mes.com.tr`). Canonical, sitemap ve OG adresleri buradan üretilir.
- [ ] **Adres, hizmet bölgesi, çalışma saatleri:** Kartvizitte yer almadığı için boş bırakıldı (`site.ts → address, serviceArea, workingHours`).
      Doldurulduğunda footer, iletişim sayfası, SSS ve yapılandırılmış veride otomatik görünür.
- [ ] **Yasal bilgiler:** `site.ts → legal` altındaki ticari unvan, adres, MERSİS, KEP, form sağlayıcısı,
      saklama süresi ve güncelleme tarihi. Eksik alanlar metinde sarı “Doldurulacak” işaretiyle görünür.
- [ ] **Hukuki onay:** Gizlilik ve KVKK metinleri genel bir şablondur. Hukuk danışmanı onayından sonra
      `legal.reviewed: true` yapın; taslak uyarısı kalkar, sayfalar indekslenir ve sitemap'e eklenir.
- [ ] **Hizmet metinleri:** Özellikle doğalgaz ve kombi sayfalarındaki yetki/onay notlarını firmanın
      gerçek yetki durumuna göre gözden geçirin. Sitede sertifika, yetkili servis, garanti süresi,
      7/24 hizmet veya tamamlanmış proje iddiası bulunmaz; eklenecekse belgeye dayanmalıdır.
- [ ] **Logo:** `src/components/brand/logo-path.ts` ve `public/brand/` dosyaları kartvizit görselinden
      vektörleştirildi. Orijinal vektör logo varsa bu dosyaları onunla değiştirin.
- [ ] **Sosyal medya:** Varsa `site.ts → social` alanlarını doldurun (yapılandırılmış veride `sameAs` olarak eklenir).
- [ ] **Search Console:** Yayından sonra `https://www.mes.com.tr/sitemap.xml` adresini gönderin.

## Teklif formu entegrasyonu

`POST /api/teklif` istekleri sunucuda doğrulanır ve `QUOTE_WEBHOOK_URL` adresine JSON olarak iletilir:

```json
{
  "source": "https://www.mes.com.tr",
  "submittedAt": "2026-10-01T09:00:00.000Z",
  "name": "…", "phone": "…", "email": "… | null",
  "service": "Kombi Sistemleri", "serviceSlug": "kombi-sistemleri",
  "message": "…",
  "consent": { "given": true, "text": "…" },
  "_subject": "Teklif talebi: …", "_replyto": "…"
}
```

Formspree uç noktası doğrudan kullanılabilir; Make/Zapier/n8n ile e-posta, CRM veya tabloya aktarılabilir.
İsteğe bağlı `QUOTE_WEBHOOK_TOKEN` tanımlanırsa `Authorization: Bearer` başlığı eklenir.
Uç noktada bot tuzağı alanı ve IP başına basit hız sınırı (10 dakikada 5 istek) bulunur.

## Yapılan kontroller

- `npx tsc --noEmit`, `npx eslint src` ve `npm run build` hatasız tamamlandı (24 rota statik üretildi).
- Headless Chrome ile 1440 px masaüstü ve 390 px mobil görünümde tüm sayfalar görsel olarak incelendi;
  hiçbir sayfada yatay taşma yok.
- Chrome DevTools Protocol ile etkileşim testleri:
  - `?hizmet=…` parametresi form seçimini dolduruyor; boş gönderimde hatalar gösteriliyor ve ilk hatalı alana odaklanılıyor.
  - Webhook tanımsızken başarı mesajı gösterilmiyor; e-posta/WhatsApp bağlantıları form içeriğiyle dolu geliyor.
  - Webhook tanımlıyken istek, `Authorization` başlığıyla birlikte iletiliyor ve başarı mesajı gösteriliyor.
  - Hizmetler açılır menüsü tıklama/üzerine gelme ile açılıyor, Esc ile kapanıp odağı düğmeye geri veriyor.
  - Mobil menü sayfa kaydırmayı kilitliyor, odağı menü içinde tutuyor, Esc ile kapanıyor.
  - Mobil sabit iletişim çubuğu, hizmet sayfasında WhatsApp mesajını ve teklif bağlantısını o hizmete göre dolduruyor.
- Her sayfada benzersiz başlık, açıklama, canonical, Open Graph ve Twitter etiketleri; `sitemap.xml`, `robots.txt`,
  web manifest ve Organization, WebSite, BreadcrumbList, Service, ItemList, FAQPage, ContactPage yapılandırılmış verileri doğrulandı.
- Erişilebilirlik: semantik başlık hiyerarşisi, “İçeriğe geç” bağlantısı, görünür odak halkaları,
  `aria-current`/`aria-expanded`, etiketli form alanları ve hata bağlantıları, `prefers-reduced-motion` desteği;
  metin renkleri WCAG AA kontrast oranını karşılayacak şekilde seçildi.

Otomatik bir ekran okuyucu denetimi (axe vb.) ve gerçek cihaz testi yapılmadı; yayından önce önerilir.
