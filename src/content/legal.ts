/**
 * Gizlilik Politikası ve KVKK Aydınlatma Metni taslakları.
 *
 * Metinlerdeki {{alan}} ifadeleri src/config/site.ts içindeki değerlerle
 * doldurulur. Değer girilmemişse sayfada vurgulu bir "doldurulacak" işareti
 * görünür. Metinler genel bir şablondur; yayına almadan önce hukuk
 * danışmanınızın firmanızın gerçek veri işleme süreçlerine göre gözden
 * geçirmesi gerekir.
 */

export type LegalBlock = string | { list: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
}

export const kvkkDocument: LegalDocument = {
  title: "KVKK Aydınlatma Metni",
  description:
    "MES Mühendislik Çözümleri tarafından web sitesi, teklif formu ve iletişim kanalları aracılığıyla işlenen kişisel verilere ilişkin aydınlatma metni.",
  intro:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verilerinizin hangi amaçlarla ve hangi hukuki sebeplere dayanılarak işlendiğini ve haklarınızı bu metinle bilgilerinize sunarız.",
  sections: [
    {
      heading: "1. Veri sorumlusu",
      blocks: [
        "Kişisel verileriniz, veri sorumlusu sıfatıyla {{companyTitle}} (“MES Mühendislik Çözümleri”) tarafından işlenmektedir.",
        {
          list: [
            "Adres: {{registeredAddress}}",
            "MERSİS No: {{mersisNo}}",
            "KEP adresi: {{kepAddress}}",
            "E-posta: {{email}}",
            "Telefon: {{phone}}",
          ],
        },
      ],
    },
    {
      heading: "2. İşlenen kişisel veriler",
      blocks: [
        "Web sitemiz, teklif formumuz, telefon, e-posta ve WhatsApp gibi iletişim kanallarımız aracılığıyla aşağıdaki kişisel verileriniz işlenebilir:",
        {
          list: [
            "Kimlik bilgileri: ad ve soyad.",
            "İletişim bilgileri: telefon numarası ve e-posta adresi.",
            "Talep bilgileri: ilgilendiğiniz hizmet, proje veya işe ilişkin açıklamalar ve paylaşmayı tercih ettiğiniz ek bilgiler.",
            "İşlem güvenliği bilgileri: web sitesinin güvenli çalışması için barındırma altyapısı tarafından tutulabilen IP adresi ve erişim kayıtları.",
          ],
        },
        "Formda sağlık, din, etnik köken gibi özel nitelikli kişisel verilerinizi paylaşmamanızı rica ederiz.",
      ],
    },
    {
      heading: "3. Kişisel verilerin işlenme amaçları",
      blocks: [
        {
          list: [
            "Teklif ve bilgi taleplerinizin alınması, değerlendirilmesi ve yanıtlanması,",
            "Keşif, teklif ve sözleşme süreçlerinin yürütülmesi,",
            "Sizinle talebiniz kapsamında iletişime geçilmesi,",
            "Hukuki yükümlülüklerin yerine getirilmesi ve yetkili makamların taleplerinin karşılanması,",
            "Web sitesinin ve bilgi sistemlerinin güvenliğinin sağlanması.",
          ],
        },
      ],
    },
    {
      heading: "4. Hukuki sebepler",
      blocks: [
        "Kişisel verileriniz KVKK’nın 5. maddesinde yer alan aşağıdaki hukuki sebeplere dayanılarak işlenir:",
        {
          list: [
            "Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (md. 5/2-c),",
            "Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi (md. 5/2-ç),",
            "İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati (md. 5/2-f),",
            "Yukarıdaki sebeplerin bulunmadığı durumlarda açık rızanız (md. 5/1).",
          ],
        },
      ],
    },
    {
      heading: "5. Kişisel verilerin aktarılması",
      blocks: [
        "Kişisel verileriniz, yukarıdaki amaçlarla sınırlı olarak ve KVKK’nın 8. ve 9. maddelerine uygun şekilde aşağıdaki alıcı gruplarına aktarılabilir:",
        {
          list: [
            "Web sitesi barındırma, e-posta ve form altyapısı gibi hizmetleri aldığımız tedarikçiler (form altyapısı: {{formServiceProvider}}),",
            "Talebinizin gerektirdiği hallerde projenin yürütülmesiyle ilgili kurum ve kuruluşlar (ör. onay süreçlerindeki ilgili idareler veya dağıtım şirketleri),",
            "Kanunen yetkili kamu kurum ve kuruluşları.",
          ],
        },
        "Kullanılan hizmet sağlayıcılarının sunucuları yurt dışında bulunuyorsa aktarım, KVKK’nın 9. maddesinde öngörülen şartlara uygun olarak gerçekleştirilir.",
      ],
    },
    {
      heading: "6. Toplama yöntemi",
      blocks: [
        "Kişisel verileriniz; web sitemizdeki teklif formu, telefon, e-posta ve WhatsApp gibi kanallar aracılığıyla elektronik ortamda, doğrudan sizin tarafınızdan paylaşılması yoluyla toplanır.",
      ],
    },
    {
      heading: "7. Saklama süresi",
      blocks: [
        "Kişisel verileriniz işlenme amaçlarının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen süreler kadar saklanır: {{retentionPeriod}}. Sürenin sonunda verileriniz silinir, yok edilir veya anonim hale getirilir.",
      ],
    },
    {
      heading: "8. Haklarınız",
      blocks: [
        "KVKK’nın 11. maddesi uyarınca veri sorumlusuna başvurarak;",
        {
          list: [
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
            "İşlenmişse buna ilişkin bilgi talep etme,",
            "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
            "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,",
            "Eksik veya yanlış işlenmişse düzeltilmesini isteme,",
            "KVKK’nın 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme,",
            "Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
            "Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,",
            "Kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme",
          ],
        },
        "haklarına sahipsiniz.",
      ],
    },
    {
      heading: "9. Başvuru",
      blocks: [
        "Haklarınıza ilişkin taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ’e uygun olarak {{registeredAddress}} adresine yazılı olarak, {{kepAddress}} KEP adresine veya sistemimizde kayıtlı e-posta adresinizden {{email}} adresine iletebilirsiniz. Başvurularınız en geç otuz gün içinde sonuçlandırılır.",
      ],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  title: "Gizlilik Politikası",
  description:
    "MES Mühendislik Çözümleri web sitesinin ziyaretçi bilgilerini nasıl topladığını, kullandığını ve koruduğunu açıklayan gizlilik politikası.",
  intro:
    "Bu politika, {{siteUrl}} adresindeki web sitesini ziyaret ettiğinizde ve bizimle iletişime geçtiğinizde bilgilerinizin nasıl ele alındığını açıklar.",
  sections: [
    {
      heading: "1. Kapsam",
      blocks: [
        "Bu politika, web sitemiz ve sitede yer alan teklif formu, telefon, e-posta ve WhatsApp bağlantıları aracılığıyla kurulan iletişim için geçerlidir. Kişisel verilerin işlenmesine ilişkin ayrıntılı bilgi KVKK Aydınlatma Metni’nde yer alır.",
      ],
    },
    {
      heading: "2. Topladığımız bilgiler",
      blocks: [
        "Web sitemizi yalnızca gezmek için herhangi bir kişisel bilgi paylaşmanız gerekmez. Teklif formunu kullandığınızda ad-soyad, telefon, isteğe bağlı olarak e-posta, ilgilendiğiniz hizmet ve iş açıklaması bilgilerini paylaşırsınız.",
      ],
    },
    {
      heading: "3. Çerezler ve analiz araçları",
      blocks: [
        "Web sitemiz, mevcut yapılandırmasında reklam veya analiz amaçlı çerez kullanmaz. İleride analiz ya da pazarlama araçları eklenirse bu politika güncellenecek ve mevzuatın gerektirdiği durumlarda onayınız alınacaktır.",
      ],
    },
    {
      heading: "4. Bilgilerin kullanımı",
      blocks: [
        "Paylaştığınız bilgileri yalnızca talebinizi değerlendirmek, sizinle iletişime geçmek ve teklif sürecini yürütmek için kullanırız. Bilgilerinizi satmaz veya pazarlama amacıyla üçüncü kişilerle paylaşmayız.",
      ],
    },
    {
      heading: "5. Üçüncü taraf hizmetler",
      blocks: [
        "Form gönderimleri {{formServiceProvider}} altyapısı üzerinden iletilir. WhatsApp bağlantısını kullandığınızda iletişim WhatsApp’ın kendi gizlilik koşullarına tabi olur. Sitemizde yer alan diğer web sitelerine verilen bağlantıların içeriğinden ve gizlilik uygulamalarından sorumlu değiliz.",
      ],
    },
    {
      heading: "6. Güvenlik",
      blocks: [
        "Web sitemiz şifreli bağlantı (HTTPS) üzerinden hizmet verir. Bilgilerinizi yetkisiz erişime karşı korumak için makul teknik ve idari önlemler alırız.",
      ],
    },
    {
      heading: "7. Değişiklikler",
      blocks: [
        "Bu politikayı gerektiğinde güncelleyebiliriz. Güncel sürüm her zaman bu sayfada yayımlanır.",
      ],
    },
    {
      heading: "8. İletişim",
      blocks: [
        "Gizlilikle ilgili sorularınız için {{email}} adresine yazabilir veya {{phone}} numarasından bize ulaşabilirsiniz.",
      ],
    },
  ],
};
