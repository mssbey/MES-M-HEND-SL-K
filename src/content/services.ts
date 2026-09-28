/**
 * Hizmet içerikleri — tüm hizmet kartları, hizmet detay sayfaları, menüler,
 * form seçenekleri, sitemap ve yapılandırılmış veri bu listeden üretilir.
 *
 * Yeni hizmet eklemek için listeye bir nesne eklemeniz yeterlidir; sayfası
 * otomatik oluşur. `icon` için ServiceIcon bileşenindeki adlardan birini seçin.
 * Gerçek proje fotoğrafı eklemek isterseniz `image` alanını doldurun
 * (dosyayı /public/images/hizmetler altına koyun).
 */

export type ServiceIconName =
  | "building"
  | "flame"
  | "fire"
  | "fan"
  | "faucet"
  | "ac"
  | "boiler"
  | "radiator";

export type ServiceGroupId = "proje-tesisat" | "isitma-klima";

export const serviceGroups: Record<ServiceGroupId, { title: string; description: string }> = {
  "proje-tesisat": {
    title: "Projelendirme ve tesisat",
    description:
      "Binanın mekanik altyapısını hesapla kurgulayan, mimari ve statik projelerle uyumlu tasarım ve uygulama hizmetleri.",
  },
  "isitma-klima": {
    title: "Isıtma ve klima sistemleri",
    description:
      "Konut ve işletmeler için doğru kapasitede seçilmiş, düzgün kurulmuş ve düzenli bakımla verimini koruyan sistemler.",
  },
};

export interface TitledText {
  title: string;
  text: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Kart, menü ve form seçeneklerinde kullanılan kısa ad. */
  shortTitle: string;
  group: ServiceGroupId;
  icon: ServiceIconName;
  tagline: string;
  summary: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  highlights: string[];
  scope: TitledText[];
  process: TitledText[];
  audiences: TitledText[];
  note?: TitledText;
  faqs: Faq[];
  /** Hizmet sayfasındaki şematik çizimde kullanılan pafta kodu ve etiketler. */
  drawing: { code: string; labels: [string, string, string] };
  image?: { src: string; alt: string; width: number; height: number };
}

export const services: Service[] = [
  {
    slug: "mekanik-tesisat-projelendirme",
    title: "Mekanik Tesisat Projelendirme",
    shortTitle: "Mekanik tesisat projelendirme",
    group: "proje-tesisat",
    icon: "building",
    tagline: "Hesaba dayalı, uygulanabilir mekanik projeler",
    summary:
      "Isıtma, soğutma, havalandırma, sıhhi tesisat ve yangın sistemlerini binanın mimarisiyle uyumlu, sahada karşılığı olan projelere dönüştürüyoruz.",
    intro:
      "İyi bir mekanik proje, sorunları sahaya ulaşmadan çözer. Binanın kullanım amacını, mimari ve statik kısıtlarını ve işletme beklentilerini birlikte değerlendiriyor; ısı kaybı ve kazancı hesaplarından ekipman seçimine, şaft ve asma tavan koordinasyonundan detay çizimlerine kadar eksiksiz bir mekanik proje seti hazırlıyoruz.",
    metaTitle: "Mekanik Tesisat Projelendirme",
    metaDescription:
      "Isıtma, soğutma, havalandırma, sıhhi tesisat ve yangın sistemleri için hesaba dayalı, mimari ve statik projelerle koordineli mekanik tesisat projeleri.",
    highlights: [
      "Isı kaybı ve ısı kazancı hesapları",
      "Isıtma, iklimlendirme ve sıhhi tesisat projeleri",
      "Mimari ve statik projelerle koordinasyon",
    ],
    scope: [
      {
        title: "Hesap ve ön tasarım",
        text: "Isı kaybı, ısı kazancı, debi ve basınç kaybı hesaplarıyla sistem seçeneklerini karşılaştırmalı olarak ortaya koyarız.",
      },
      {
        title: "Isıtma ve soğutma",
        text: "Kazan dairesi, ısı pompası, fan-coil, yerden ısıtma ve radyatörlü sistemleri ihtiyaca uygun şekilde projelendiririz.",
      },
      {
        title: "Havalandırma ve iklimlendirme",
        text: "Hava debilerini, kanal güzergâhlarını ve menfez yerleşimini konforlu ve dengeli bir iç ortam için kurgularız.",
      },
      {
        title: "Sıhhi tesisat",
        text: "Temiz su, sıcak su, pis su ve yağmur suyu hatlarını kullanım yoğunluğuna uygun kesitlerle tasarlarız.",
      },
      {
        title: "Koordinasyon ve detaylar",
        text: "Şaft ölçülerini, tavan yüksekliklerini, makine dairesi yerleşimini ve bakım erişimini diğer disiplinlerle eşgüdüm içinde çözeriz.",
      },
      {
        title: "Metraj ve teknik tarifler",
        text: "Uygulama ve maliyet planlamasına temel oluşturacak metraj listelerini ve teknik tarifleri hazırlarız.",
      },
    ],
    process: [
      {
        title: "İhtiyaç ve veri toplama",
        text: "Mimari projeleri, kullanım senaryosunu, bütçe ve takvim beklentilerini birlikte netleştiririz.",
      },
      {
        title: "Hesap ve sistem seçimi",
        text: "Alternatif sistemleri ilk yatırım, işletme maliyeti ve bakım kolaylığı açısından karşılaştırırız.",
      },
      {
        title: "Projelendirme",
        text: "Planlar, kesitler, kolon şemaları ve detaylarla uygulanabilir bir proje seti üretiriz.",
      },
      {
        title: "Koordinasyon ve revizyon",
        text: "Diğer disiplinlerle çakışmaları giderir, geri bildirimlere göre projeyi olgunlaştırırız.",
      },
      {
        title: "Teslim ve uygulama desteği",
        text: "Onay süreçleri için gereken dokümanları hazırlar, uygulama sırasında teknik sorulara yanıt veririz.",
      },
    ],
    audiences: [
      {
        title: "Mimarlık ofisleri",
        text: "Tasarım fikrini bozmadan mekanik gereksinimleri erken aşamada projeye entegre etmek için.",
      },
      {
        title: "Müteahhitler ve yatırımcılar",
        text: "Uygulanabilir, metrajı net ve maliyeti öngörülebilir bir proje için.",
      },
      {
        title: "İşletmeler",
        text: "Ofis, mağaza, restoran ve üretim alanlarında konfor ve işletme verimliliği için.",
      },
      {
        title: "Bireysel müşteriler",
        text: "Müstakil konut, villa veya kapsamlı tadilat projelerinde doğru sistem seçimi için.",
      },
    ],
    faqs: [
      {
        q: "Mekanik proje için hangi belgeler gerekiyor?",
        a: "Başlangıç için mimari projenin güncel hali (tercihen DWG formatında), vaziyet planı ve varsa statik proje yeterlidir. Mevcut bir yapı söz konusuysa fotoğraflar ve mevcut tesisata ait bilgiler süreci hızlandırır.",
      },
      {
        q: "Proje hazırlama süresi neye göre değişir?",
        a: "Yapının büyüklüğüne, kullanım amacına, sistem sayısına ve koordinasyon ihtiyacına göre değişir. Kapsam netleştiğinde iş programını da içeren bir teklif sunarız.",
      },
    ],
    drawing: { code: "M-01", labels: ["ISI KAYBI HESABI", "KOLON ŞEMASI", "ŞAFT DETAYI"] },
  },
  {
    slug: "dogalgaz-projelendirme",
    title: "Doğalgaz Projelendirme",
    shortTitle: "Doğalgaz projelendirme",
    group: "proje-tesisat",
    icon: "flame",
    tagline: "Güvenli ve teknik esaslara uygun doğalgaz tesisatı tasarımı",
    summary:
      "Konut, işyeri ve merkezi sistemler için doğalgaz iç tesisatını; cihaz yerleşimi, baca ve havalandırma koşullarıyla birlikte projelendiriyoruz.",
    intro:
      "Doğalgaz tesisatında güvenlik doğru projeyle başlar. Cihaz kapasitelerini, boru güzergâhlarını, baca bağlantılarını ve yanma havası koşullarını bölgenizdeki gaz dağıtım şirketinin teknik esaslarına göre değerlendiriyor; onay sürecine uygun ve sahada kolayca okunabilen projeler hazırlıyoruz.",
    metaTitle: "Doğalgaz Projelendirme",
    metaDescription:
      "Konut, işyeri ve merkezi sistemler için cihaz yerleşimi, baca ve havalandırma koşullarını birlikte ele alan doğalgaz iç tesisat projelendirme hizmeti.",
    highlights: [
      "Cihaz kapasitesi ve boru çapı hesapları",
      "Baca ve havalandırma koşullarının değerlendirilmesi",
      "Dağıtım şirketi teknik esaslarına uygun çizim",
    ],
    scope: [
      {
        title: "Mahal ve cihaz değerlendirmesi",
        text: "Kombi, kazan, ocak ve diğer gazlı cihazların yerleşimini; mahal hacmi, havalandırma ve baca koşullarıyla birlikte değerlendiririz.",
      },
      {
        title: "Kapasite ve çap hesapları",
        text: "Toplam yük ve basınç kaybı hesaplarıyla boru çaplarını ve sayaç kapasitesini belirleriz.",
      },
      {
        title: "Tesisat güzergâhı",
        text: "Boru hatlarını güvenlik mesafeleri, erişilebilirlik ve iç mekân estetiğiyle birlikte planlarız.",
      },
      {
        title: "Merkezi ve ticari sistemler",
        text: "Kazan daireleri, endüstriyel mutfaklar ve ticari kullanımlar için daha kapsamlı tesisat çözümlerini projelendiririz.",
      },
      {
        title: "Onay dokümantasyonu",
        text: "Projenin onaya sunulması için gereken çizim ve hesap dokümanlarını eksiksiz bir set halinde hazırlarız.",
      },
    ],
    process: [
      {
        title: "Ön görüşme ve keşif",
        text: "Yapıyı, cihaz ihtiyacını ve mevcut koşulları yerinde veya proje üzerinden inceleriz.",
      },
      {
        title: "Hesap ve tasarım",
        text: "Kapasite, çap ve güzergâh kararlarını teknik esaslara göre netleştiririz.",
      },
      {
        title: "Proje çizimi",
        text: "Plan, izometrik şema ve gerekli detayları içeren proje setini hazırlarız.",
      },
      {
        title: "Onay süreci",
        text: "Dağıtım şirketinden gelebilecek revizyon taleplerine teknik olarak yanıt veririz.",
      },
      {
        title: "Uygulama öncesi bilgilendirme",
        text: "Uygulama ve gaz açma aşamalarında dikkat edilmesi gerekenleri açıkça paylaşırız.",
      },
    ],
    audiences: [
      {
        title: "Konut sahipleri",
        text: "Bireysel ısıtmaya geçiş veya cihaz değişikliği planlayanlar için.",
      },
      {
        title: "Site ve apartman yönetimleri",
        text: "Merkezi sisteme geçiş ya da ortak tesisat yenilemesi değerlendirenler için.",
      },
      {
        title: "İşletmeler",
        text: "Restoran, kafe, otel ve üretim alanlarında ticari gaz kullanımı için.",
      },
      {
        title: "Müteahhitler",
        text: "Yeni yapılarda doğalgaz altyapısını en baştan doğru kurgulamak için.",
      },
    ],
    note: {
      title: "Yetki ve onay süreci hakkında",
      text: "Doğalgaz iç tesisat projelerinin onayı ve uygulaması, bölgedeki gaz dağıtım şirketinin mevzuatına ve yetkilendirme şartlarına tabidir. Projenize özel süreci, gerekli belgeleri ve adımları ilk görüşmede açıkça paylaşırız.",
    },
    faqs: [
      {
        q: "Doğalgaz projesinin onaylanması ne kadar sürer?",
        a: "Onay süresi dağıtım şirketinin iş yüküne, projenin kapsamına ve revizyon ihtiyacına göre değişir. Kesin bir süre vermek yerine süreci ve olası revizyonları size önceden anlatır, dosyanın eksiksiz hazırlanmasına özen gösteririz.",
      },
      {
        q: "Mevcut tesisatıma yeni bir cihaz ekleyebilir miyim?",
        a: "Yeni bir cihaz toplam yükü ve gerekli boru çaplarını değiştirebilir. Mevcut tesisatın yeterliliği hesapla kontrol edilmelidir; bu değerlendirmeyi proje aşamasında yaparız.",
      },
    ],
    drawing: { code: "G-01", labels: ["İZOMETRİK ŞEMA", "BACA BAĞLANTISI", "SAYAÇ KAPASİTESİ"] },
  },
  {
    slug: "yangin-tesisati",
    title: "Yangın Tesisatı",
    shortTitle: "Yangın tesisatı",
    group: "proje-tesisat",
    icon: "fire",
    tagline: "Risk analizine dayalı yangından korunma sistemleri",
    summary:
      "Sprinkler, yangın dolabı, hidrant ve pompa sistemlerini binanın kullanım amacına ve tehlike sınıfına uygun biçimde tasarlıyor ve uyguluyoruz.",
    intro:
      "Yangın tesisatından beklenen tek şey, ihtiyaç anında kusursuz çalışmasıdır. Binanın kullanım amacını, yangın yükünü ve tahliye kurgusunu esas alarak; sprinkler, yangın dolabı, hidrant ve pompa sistemlerini yürürlükteki yangın yönetmeliği ve ilgili standartlar çerçevesinde tasarlıyor, uygulamayı aynı disiplinle yürütüyoruz.",
    metaTitle: "Yangın Tesisatı",
    metaDescription:
      "Sprinkler, yangın dolabı, hidrant ve yangın pompası sistemlerinin hidrolik hesaba dayalı tasarımı, uygulaması ve testleri.",
    highlights: [
      "Sprinkler ve yangın dolabı sistemleri",
      "Hidrolik hesap ve pompa seçimi",
      "Yangın suyu deposu ve hidrant hatları",
    ],
    scope: [
      {
        title: "Risk ve sınıf değerlendirmesi",
        text: "Yapının kullanım sınıfını ve tehlike seviyesini belirleyerek hangi sistemlerin gerektiğini ortaya koyarız.",
      },
      {
        title: "Sprinkler sistemleri",
        text: "Sprinkler yerleşimini, boru ağını ve alarm vana istasyonlarını hidrolik hesaplarla tasarlarız.",
      },
      {
        title: "Yangın dolapları ve hidrantlar",
        text: "Dolap ve hidrant konumlarını erişim mesafeleri ve kapsama alanlarına göre planlarız.",
      },
      {
        title: "Pompa ve depo sistemleri",
        text: "Yangın pompası grubunu ve su deposu hacmini gerekli debi ve süreye göre belirleriz.",
      },
      {
        title: "Uygulama ve test",
        text: "Tesisatın projeye uygun kurulmasını, basınç testlerini ve devreye alma adımlarını planlı biçimde yürütürüz.",
      },
    ],
    process: [
      {
        title: "Yapı analizi",
        text: "Mimari proje ve kullanım senaryosu üzerinden risk sınıfını ve gereksinimleri belirleriz.",
      },
      {
        title: "Hidrolik hesap",
        text: "Debi, basınç ve depolama ihtiyacını hesaplayarak sistem boyutlarını netleştiririz.",
      },
      {
        title: "Projelendirme",
        text: "Sprinkler, dolap, hidrant ve pompa sistemlerini detaylı bir proje setinde bir araya getiririz.",
      },
      {
        title: "Uygulama",
        text: "Malzeme seçimini ve montajı projeye ve üretici şartlarına uygun şekilde gerçekleştiririz.",
      },
      {
        title: "Test ve teslim",
        text: "Basınç ve çalışma testleriyle sistemi devreye alır, işletme bilgilerini teslim ederiz.",
      },
    ],
    audiences: [
      {
        title: "İşletmeler ve ticari yapılar",
        text: "Mağaza, depo, ofis ve üretim tesislerinde yönetmelik gerekliliklerini karşılamak için.",
      },
      {
        title: "Konut projeleri",
        text: "Yüksek yapılarda ve toplu konutlarda ortak alan yangın sistemleri için.",
      },
      {
        title: "Müteahhitler",
        text: "Yangın sistemlerini iskân sürecinden önce, en baştan doğru planlamak için.",
      },
      {
        title: "Mimarlar",
        text: "Tahliye kurgusu ile yangın sistemleri arasında tutarlı bir tasarım için.",
      },
    ],
    faqs: [
      {
        q: "Binamda sprinkler sistemi zorunlu mu?",
        a: "Zorunluluk; yapının kullanım amacına, yüksekliğine ve alanına göre yangın yönetmeliğiyle belirlenir. Projenizi inceleyerek hangi sistemlerin gerektiğini açıkça ortaya koyarız.",
      },
      {
        q: "Mevcut bir binaya yangın tesisatı eklenebilir mi?",
        a: "Evet. Mevcut yapılarda güzergâh, depo ve pompa yerleşimi daha fazla planlama gerektirir; keşif sonrasında uygulanabilir bir çözüm önerisi hazırlarız.",
      },
    ],
    drawing: { code: "Y-01", labels: ["SPRİNKLER YERLEŞİMİ", "HİDROLİK HESAP", "POMPA GRUBU"] },
  },
  {
    slug: "havalandirma-ve-iklimlendirme",
    title: "Havalandırma ve İklimlendirme",
    shortTitle: "Havalandırma ve iklimlendirme",
    group: "proje-tesisat",
    icon: "fan",
    tagline: "Temiz hava, dengeli konfor",
    summary:
      "Ofis, ticari alan, restoran ve konutlarda taze hava, egzoz ve iklimlendirme sistemlerini gerçek ihtiyaca göre boyutlandırıyoruz.",
    intro:
      "İç hava kalitesi; verimliliğin, sağlığın ve konforun görünmeyen belirleyicisidir. Mahallerin kullanım yoğunluğuna, iç yüklere ve bina kabuğuna göre taze hava ihtiyacını hesaplıyor; ısı geri kazanım cihazlarından klima santrallerine, kanal ağlarından menfez yerleşimine kadar dengeli ve sessiz çalışan sistemler kurguluyoruz.",
    metaTitle: "Havalandırma ve İklimlendirme",
    metaDescription:
      "Taze hava ve egzoz debisi hesapları, ısı geri kazanımlı havalandırma, klima santrali ve kanal tasarımıyla dengeli ve verimli iç ortam çözümleri.",
    highlights: [
      "Taze hava ve egzoz debisi hesapları",
      "Isı geri kazanımlı havalandırma",
      "Kanal tasarımı ve menfez yerleşimi",
    ],
    scope: [
      {
        title: "Debi ve yük hesapları",
        text: "Mahal bazında taze hava, egzoz ve ısıtma-soğutma yüklerini hesaplarız.",
      },
      {
        title: "Cihaz seçimi",
        text: "Isı geri kazanım cihazı, klima santrali, fan ve terminal ünitelerini ihtiyaca uygun kapasitede seçeriz.",
      },
      {
        title: "Kanal tasarımı",
        text: "Kanal güzergâhlarını tavan yükseklikleri, ses seviyesi ve basınç kayıplarını gözeterek planlarız.",
      },
      {
        title: "Özel mahaller",
        text: "Mutfak davlumbazı, otopark, sığınak ve ıslak hacimler gibi özel havalandırma ihtiyaçlarını çözümleriz.",
      },
      {
        title: "Kurulum ve devreye alma",
        text: "Kanal ve cihaz montajını tamamlar, debi ayarlarıyla sistemi dengeli biçimde devreye alırız.",
      },
    ],
    process: [
      {
        title: "Keşif ve ihtiyaç analizi",
        text: "Mahal kullanımını, mevcut koşulları ve beklentilerinizi netleştiririz.",
      },
      {
        title: "Hesap ve konsept",
        text: "Debi ve yük hesaplarıyla sistem konseptini belirleriz.",
      },
      {
        title: "Projelendirme",
        text: "Kanal, cihaz ve kontrol detaylarını içeren proje setini hazırlarız.",
      },
      {
        title: "Uygulama",
        text: "Montajı proje ve üretici şartlarına uygun olarak yürütürüz.",
      },
      {
        title: "Ayar ve teslim",
        text: "Hava debilerini ölçüp dengeler, işletme ve bakım bilgilerini paylaşırız.",
      },
    ],
    audiences: [
      {
        title: "Ofisler",
        text: "Çalışan konforu ve iç hava kalitesi için.",
      },
      {
        title: "Restoran ve kafeler",
        text: "Mutfak egzozu, koku kontrolü ve salon konforu için.",
      },
      {
        title: "Mağaza ve showroomlar",
        text: "Yoğun kullanımda dengeli sıcaklık ve yeterli taze hava için.",
      },
      {
        title: "Konutlar",
        text: "Isı geri kazanımlı havalandırmayla enerji verimli temiz hava için.",
      },
    ],
    faqs: [
      {
        q: "Isı geri kazanım cihazı ne sağlar?",
        a: "Dışarı atılan havanın enerjisinin bir kısmını içeri alınan taze havaya aktararak havalandırmadan kaynaklanan ısı kayıplarını azaltır. Uygunluğu yapıya ve kullanım biçimine göre değerlendirilmelidir.",
      },
      {
        q: "Tavan yüksekliğim kanal için yeterli mi?",
        a: "Kanal boyutları debiye ve güzergâha göre değişir. Keşif ve proje aşamasında asma tavan içi yerleşimi kontrol eder, gerekirse alternatif çözümler öneririz.",
      },
    ],
    drawing: { code: "H-01", labels: ["KANAL GÜZERGÂHI", "MENFEZ YERLEŞİMİ", "DEBİ HESABI"] },
  },
  {
    slug: "temiz-su-ve-atik-su-tesisati",
    title: "Temiz Su ve Atık Su Tesisatı",
    shortTitle: "Temiz su ve atık su tesisatı",
    group: "proje-tesisat",
    icon: "faucet",
    tagline: "Doğru kesit, sorunsuz akış",
    summary:
      "Temiz su, sıcak su, pis su ve yağmur suyu hatlarını kullanım yoğunluğuna uygun, bakımı kolay ve uzun ömürlü olacak şekilde planlıyoruz.",
    intro:
      "Sıhhi tesisattaki bir hata çoğu zaman duvarın arkasında, en pahalı anda ortaya çıkar. Kullanım yoğunluğunu, basınç ihtiyacını ve eğim koşullarını esas alarak temiz su dağıtımından atık su ve yağmur suyunun uzaklaştırılmasına kadar tüm hatları doğru kesit ve malzemeyle projelendiriyor, uygulamada da aynı titizliği sürdürüyoruz.",
    metaTitle: "Temiz Su ve Atık Su Tesisatı",
    metaDescription:
      "Temiz su, sıcak su, pis su ve yağmur suyu hatlarının hesaba dayalı projelendirilmesi, uygulaması, hidrofor ve depo sistemleri ile tesisat yenileme.",
    highlights: [
      "Temiz ve sıcak su dağıtım hatları",
      "Pis su ve yağmur suyu drenajı",
      "Hidrofor, depo ve pompa sistemleri",
    ],
    scope: [
      {
        title: "Temiz su dağıtımı",
        text: "Şebeke bağlantısından armatürlere kadar boru çaplarını eş zamanlı kullanım hesaplarıyla belirleriz.",
      },
      {
        title: "Sıcak su ve sirkülasyon",
        text: "Sıcak suyun kullanım noktalarına kısa sürede ulaşması için hat ve sirkülasyon düzenini kurgularız.",
      },
      {
        title: "Atık su ve kolon havalandırması",
        text: "Pis su hatlarını yeterli eğim ve havalandırmayla, koku ve tıkanma riskini azaltacak şekilde tasarlarız.",
      },
      {
        title: "Yağmur suyu",
        text: "Çatı ve teras yağmur suyu drenajını yağış yoğunluğuna uygun kapasitede planlarız.",
      },
      {
        title: "Depo, hidrofor ve pompalar",
        text: "Su deposu, hidrofor ve dalgıç pompa ihtiyacını hesaplayarak doğru ekipmanı seçeriz.",
      },
      {
        title: "Tesisat yenileme",
        text: "Eskiyen tesisatların yenilenmesinde yapıya en az müdahaleyle uygulanabilir çözümler geliştiririz.",
      },
    ],
    process: [
      {
        title: "Keşif",
        text: "Yeni yapılarda proje üzerinden, mevcut yapılarda yerinde inceleme yaparız.",
      },
      {
        title: "Hesap",
        text: "Kullanım yoğunluğu, basınç ve eğim hesaplarını yaparız.",
      },
      {
        title: "Projelendirme",
        text: "Plan, kolon şeması ve detaylarla uygulanabilir çizimler hazırlarız.",
      },
      {
        title: "Uygulama",
        text: "Malzeme seçimini ve montajı proje doğrultusunda yürütürüz.",
      },
      {
        title: "Test ve teslim",
        text: "Basınç ve sızdırmazlık testleriyle tesisatı teslim ederiz.",
      },
    ],
    audiences: [
      {
        title: "Yeni konut projeleri",
        text: "Doğru boyutlandırılmış bir sıhhi tesisat arayan müteahhit ve yatırımcılar için.",
      },
      {
        title: "Tadilat ve yenileme",
        text: "Eskiyen boru hatlarını yenilemek isteyen konut ve işyeri sahipleri için.",
      },
      {
        title: "Ticari yapılar",
        text: "Yoğun kullanılan ıslak hacimlere sahip işletmeler için.",
      },
      {
        title: "Mimarlar",
        text: "Islak hacim yerleşimi ve şaft kurgusunda teknik destek için.",
      },
    ],
    faqs: [
      {
        q: "Su basıncım neden düşük?",
        a: "Düşük basınç; şebeke koşulları, yetersiz boru çapı, kireçlenme veya hidrofor ihtiyacı gibi farklı nedenlerden kaynaklanabilir. Kalıcı çözüm için önce nedenin keşifle tespit edilmesi gerekir.",
      },
      {
        q: "Tesisat yenilemesi için tüm duvarların kırılması gerekir mi?",
        a: "Her zaman değil. Güzergâh seçimi, sıva üstü çözümler ve şaft kullanımı gibi yöntemlerle müdahale alanı azaltılabilir. Uygun yöntemi keşif sonrasında birlikte belirleriz.",
      },
    ],
    drawing: { code: "S-01", labels: ["KOLON ŞEMASI", "EĞİM DETAYI", "HİDROFOR GRUBU"] },
  },
  {
    slug: "klima-sistemleri",
    title: "Klima Sistemleri",
    shortTitle: "Klima sistemleri",
    group: "isitma-klima",
    icon: "ac",
    tagline: "Keşiften bakıma, doğru kapasitede iklimlendirme",
    summary:
      "Split, multi-split, kanal tipi ve VRF klima sistemlerinde keşif, kapasite hesabı, projelendirme, kurulum ve periyodik bakım hizmeti veriyoruz.",
    intro:
      "Doğru klima en güçlü olan değil, mekâna en uygun olandır. Mahallerin ısı kazancını hesaplayarak kapasiteyi belirliyor; iç ve dış ünite yerleşimini, bakır boru ve drenaj güzergâhlarını teknik ve estetik açıdan birlikte planlıyoruz. Kurulumdan sonra da düzenli bakımla sistemin verimini korumanıza yardımcı oluyoruz.",
    metaTitle: "Klima Sistemleri: Keşif, Projelendirme, Kurulum ve Bakım",
    metaDescription:
      "Split, multi-split, kanal tipi ve VRF klima sistemlerinde ısı kazancı hesabına dayalı kapasite seçimi, projelendirme, kurulum ve periyodik bakım.",
    highlights: [
      "Isı kazancı hesabına dayalı kapasite seçimi",
      "Split, multi-split ve VRF sistemleri",
      "Kurulum ve periyodik bakım",
    ],
    scope: [
      {
        title: "Keşif",
        text: "Mekânı yerinde inceleyerek kullanım, cephe yönü, güneş alma ve montaj koşullarını değerlendiririz.",
      },
      {
        title: "Kapasite hesabı",
        text: "Isı kazancı hesabıyla her mahal için doğru kapasiteyi belirler, gereğinden büyük cihaz seçiminin önüne geçeriz.",
      },
      {
        title: "Sistem seçimi ve projelendirme",
        text: "Split, multi-split, kanal tipi ve VRF seçeneklerini karşılaştırır, boru ve drenaj güzergâhlarını projelendiririz.",
      },
      {
        title: "Kurulum",
        text: "İç ve dış üniteleri; bakır boru ve drenaj bağlantılarıyla birlikte düzenli ve temiz bir işçilikle monte ederiz.",
      },
      {
        title: "Vakum ve devreye alma",
        text: "Sistemi vakumlayıp sızdırmazlık kontrollerini yapar, çalışma değerlerini kontrol ederek devreye alırız.",
      },
      {
        title: "Periyodik bakım",
        text: "Filtre, serpantin ve drenaj temizliğiyle performansı ve hijyen koşullarını koruruz.",
      },
    ],
    process: [
      {
        title: "Keşif",
        text: "Mekânı ve kullanım alışkanlıklarını yerinde inceleriz.",
      },
      {
        title: "Kapasite ve öneri",
        text: "Hesaba dayalı cihaz önerimizi ve kapsamı açık bir teklifle sunarız.",
      },
      {
        title: "Planlama",
        text: "Ünite yerlerini, boru ve drenaj güzergâhlarını sizinle birlikte netleştiririz.",
      },
      {
        title: "Kurulum ve devreye alma",
        text: "Montajı tamamlar, testlerle sistemi çalışır halde teslim ederiz.",
      },
      {
        title: "Bakım",
        text: "Kullanım yoğunluğuna uygun bir bakım planı öneririz.",
      },
    ],
    audiences: [
      {
        title: "Konutlar",
        text: "Ev ve villalarda sessiz ve verimli iklimlendirme için.",
      },
      {
        title: "Ofisler",
        text: "Çok mahalli yapılarda merkezi olarak kontrol edilebilen sistemler için.",
      },
      {
        title: "Mağaza ve restoranlar",
        text: "Yoğun kullanıma ve değişken yüklere uygun çözümler için.",
      },
      {
        title: "Site ve bina yönetimleri",
        text: "Toplu bakım ve dış ünite yerleşim planlaması için.",
      },
    ],
    note: {
      title: "Cihaz garantisi hakkında",
      text: "Cihaz garantisi ve servis koşulları üretici firmanın şartlarına bağlıdır. Teklifimizde cihaz, işçilik ve bakım kapsamını ayrı ayrı ve açık biçimde belirtiriz.",
    },
    faqs: [
      {
        q: "Kaç BTU klima almam gerekir?",
        a: "Metrekareye dayalı genel kurallar yanıltıcı olabilir. Cephe yönü, cam oranı, yalıtım, kullanıcı sayısı ve cihaz yükleri kapasiteyi doğrudan etkiler. Doğru seçim için ısı kazancı hesabı yapılmasını öneririz.",
      },
      {
        q: "Klima bakımı ne sıklıkla yapılmalı?",
        a: "Kullanım yoğunluğuna ve ortam koşullarına göre değişmekle birlikte bakımın sezon başlarında yapılması önerilir. Yoğun kullanılan ticari alanlarda daha sık bakım gerekebilir.",
      },
    ],
    drawing: { code: "K-01", labels: ["İÇ ÜNİTE", "DRENAJ EĞİMİ", "KAPASİTE HESABI"] },
  },
  {
    slug: "kombi-sistemleri",
    title: "Kombi Sistemleri",
    shortTitle: "Kombi sistemleri",
    group: "isitma-klima",
    icon: "boiler",
    tagline: "Doğru kapasite, düzgün bağlantı, düzenli bakım",
    summary:
      "Kombi seçimi, kurulumu ve periyodik bakımının yanında kombiye bağlı ısıtma ve sıcak su tesisatı çözümleri sunuyoruz.",
    intro:
      "Kombi, evinizin hem ısıtma hem de sıcak su ihtiyacını karşılayan merkezdir. Konutun ısı ihtiyacına ve sıcak su kullanımına uygun kapasiteyi belirliyor; tesisat, baca ve yoğuşma suyu bağlantılarını kurallara uygun şekilde planlıyoruz. Düzenli bakımla cihazın verimli ve güvenli çalışmasına katkı sağlıyoruz.",
    metaTitle: "Kombi Sistemleri: Kurulum, Bakım ve Tesisat",
    metaDescription:
      "Isı ihtiyacına uygun kombi kapasitesi, kurulum ve tesisat bağlantıları, baca ve yoğuşma çözümleri ile periyodik kombi bakımı.",
    highlights: [
      "Isı ihtiyacına uygun kapasite seçimi",
      "Kurulum ve tesisat bağlantıları",
      "Periyodik bakım ve verim kontrolü",
    ],
    scope: [
      {
        title: "Kapasite değerlendirmesi",
        text: "Konutun ısı kaybına ve sıcak su kullanımına göre uygun kombi kapasitesini belirleriz.",
      },
      {
        title: "Kurulum",
        text: "Kombinin montajını ve ısıtma ile sıcak su tesisatı bağlantılarını düzenli bir işçilikle gerçekleştiririz.",
      },
      {
        title: "Baca ve yoğuşma bağlantıları",
        text: "Baca sistemini ve yoğuşma suyu tahliyesini cihaz ve mahal koşullarına uygun şekilde planlarız.",
      },
      {
        title: "Periyodik bakım",
        text: "Yanma, basınç ve güvenlik kontrollerini içeren bakımla cihazın verimini korumasına yardımcı oluruz.",
      },
      {
        title: "Tesisat iyileştirme",
        text: "Sistem temizliği ile pompa, genleşme tankı ve vana gibi bileşenlerde gereken iyileştirmeleri yaparız.",
      },
      {
        title: "Oda termostatı ve kontrol",
        text: "Oda termostatı ve bölgesel kontrol çözümleriyle konforu ve yakıt tasarrufunu destekleriz.",
      },
    ],
    process: [
      {
        title: "Keşif",
        text: "Mevcut tesisatı, baca ve mahal koşullarını inceleriz.",
      },
      {
        title: "Öneri ve teklif",
        text: "Kapasite, cihaz ve işçilik kapsamını açıkça belirten bir teklif hazırlarız.",
      },
      {
        title: "Kurulum",
        text: "Cihazı ve tesisat bağlantılarını projeye uygun şekilde tamamlarız.",
      },
      {
        title: "Devreye alma",
        text: "İlk çalıştırma, gerekli onaylar ve üretici şartları çerçevesinde yapılır; adımları baştan netleştiririz.",
      },
      {
        title: "Bakım",
        text: "Isıtma sezonu öncesi için periyodik bakım planı öneririz.",
      },
    ],
    audiences: [
      {
        title: "Konut sahipleri",
        text: "Yeni kombi alacak ya da mevcut kombisini değiştirecekler için.",
      },
      {
        title: "Isınma sorunu yaşayanlar",
        text: "Yetersiz ısınma veya sıcak su sorunlarını kalıcı olarak çözmek isteyenler için.",
      },
      {
        title: "Müteahhitler",
        text: "Yeni konutlarda bireysel ısıtma sistemlerini topluca planlamak için.",
      },
      {
        title: "Küçük işletmeler",
        text: "Ofis ve dükkânlarda bireysel ısıtma çözümleri için.",
      },
    ],
    note: {
      title: "Yetki ve onay süreci hakkında",
      text: "Kombi montajı ve gaz bağlantısı içeren işler, gaz dağıtım şirketinin ve cihaz üreticisinin öngördüğü yetki ve onay şartlarına tabidir. Hangi adımın hangi belgeyi gerektirdiğini ve işin nasıl yürütüleceğini teklif aşamasında açıkça belirtiriz.",
    },
    faqs: [
      {
        q: "Kombi bakımı neden önemli?",
        a: "Düzenli bakım; cihazın verimli çalışmasına, arızaların erken fark edilmesine ve güvenli kullanıma katkı sağlar. Bakımın ısıtma sezonu öncesinde yapılması genellikle önerilir.",
      },
      {
        q: "Yoğuşmalı kombiye geçerken tesisat değişir mi?",
        a: "Yoğuşmalı cihazlar yoğuşma suyu tahliyesi ve uygun bir baca sistemi gerektirir. Mevcut tesisatın uygunluğunu keşifte değerlendirir, gereken değişiklikleri teklifte belirtiriz.",
      },
    ],
    drawing: { code: "I-01", labels: ["KOMBİ BAĞLANTISI", "YOĞUŞMA TAHLİYESİ", "GENLEŞME TANKI"] },
  },
  {
    slug: "petek-ve-radyator-sistemleri",
    title: "Petek ve Radyatör Sistemleri",
    shortTitle: "Petek ve radyatör sistemleri",
    group: "isitma-klima",
    icon: "radiator",
    tagline: "Her odada dengeli ısı",
    summary:
      "Petek ve radyatör tesisatı, montajı, bakımı, temizliği ve dengeleme uygulamalarıyla ısıtma sisteminizin verimini artırıyoruz.",
    intro:
      "Bazı odaların ısınıp bazılarının soğuk kalması çoğu zaman yanlış boyutlandırmanın ya da dengesiz bir tesisatın sonucudur. Oda bazında ısı ihtiyacını hesaplayarak doğru radyatör boyutunu belirliyor; montaj, tesisat, temizlik ve hidrolik dengeleme uygulamalarıyla ısının her noktaya eşit ve verimli dağılmasını hedefliyoruz.",
    metaTitle: "Petek ve Radyatör Sistemleri",
    metaDescription:
      "Oda bazında radyatör boyutlandırma, petek montajı ve değişimi, tesisat temizliği, hidrolik dengeleme ve termostatik vana uygulamaları.",
    highlights: [
      "Oda bazında radyatör boyutlandırma",
      "Montaj, değişim ve tesisat",
      "Temizlik ve hidrolik dengeleme",
    ],
    scope: [
      {
        title: "Boyutlandırma",
        text: "Her mahalin ısı kaybını hesaplayarak doğru radyatör tipini ve boyunu belirleriz.",
      },
      {
        title: "Tesisat ve montaj",
        text: "Yeni tesisat kurulumu, radyatör değişimi ve yer değiştirme işlerini düzenli bir işçilikle yaparız.",
      },
      {
        title: "Temizlik",
        text: "Tesisatta biriken tortu ve çamuru uygun yöntemlerle temizleyerek ısı geçişini iyileştiririz.",
      },
      {
        title: "Hidrolik dengeleme",
        text: "Vana ayarlarıyla suyun tüm radyatörlere dengeli dağılmasını sağlarız.",
      },
      {
        title: "Termostatik vanalar",
        text: "Oda bazında sıcaklık kontrolüyle konforu ve enerji verimliliğini artırırız.",
      },
      {
        title: "Arıza tespiti",
        text: "Isınmayan radyatör, hava yapma ve basınç kaybı gibi sorunların nedenini tespit ederiz.",
      },
    ],
    process: [
      {
        title: "Keşif ve tespit",
        text: "Sistemin mevcut durumunu ve yaşanan sorunları yerinde inceleriz.",
      },
      {
        title: "Hesap ve öneri",
        text: "Gerekli değişiklikleri ve iyileştirmeleri önceliklendirerek sunarız.",
      },
      {
        title: "Uygulama",
        text: "Montaj, temizlik veya yenileme işlerini planlanan kapsamda yaparız.",
      },
      {
        title: "Dengeleme",
        text: "Sistemi dengeleyerek her odada homojen ısınmayı hedefleriz.",
      },
      {
        title: "Teslim",
        text: "Kullanım ve bakım önerilerimizi paylaşırız.",
      },
    ],
    audiences: [
      {
        title: "Konutlar",
        text: "Soğuk kalan odalar veya yüksek ısınma giderleriyle karşılaşanlar için.",
      },
      {
        title: "Tadilat yapanlar",
        text: "Radyatör yerini değiştirmek veya daha verimli modellere geçmek isteyenler için.",
      },
      {
        title: "Apartmanlar",
        text: "Merkezi sistemlerde daire ve kat bazında dengesizlik yaşayanlar için.",
      },
      {
        title: "Ofisler",
        text: "Çok bölümlü alanlarda dengeli ısıtma için.",
      },
    ],
    faqs: [
      {
        q: "Peteğimin üstü sıcak, altı neden soğuk?",
        a: "Bu durum genellikle radyatör içinde biriken tortu ve çamurun su dolaşımını engellemesinden kaynaklanır. Tesisat temizliği ve gerekirse dengeleme ile çözülebilir.",
      },
      {
        q: "Petek temizliği ne sıklıkla yapılmalı?",
        a: "Sistemin yaşına, su kalitesine ve kullanım koşullarına bağlıdır. Isınma sorunları, gürültü veya belirgin bir verim düşüşü fark ettiğinizde kontrol yaptırmanızı öneririz.",
      },
    ],
    drawing: { code: "I-02", labels: ["RADYATÖR BOYU", "TERMOSTATİK VANA", "DENGELEME"] },
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServicesByGroup(group: ServiceGroupId) {
  return services.filter((service) => service.group === group);
}

/** Ana sayfadaki "tek bakış" bölümü için üç sistem ailesi. */
export const systemFamilies: {
  id: string;
  title: string;
  text: string;
  icon: ServiceIconName;
  services: string[];
}[] = [
  {
    id: "mekanik",
    title: "Mekanik tesisat",
    text: "Su, gaz ve yangın hatları; binanın damarlarını oluşturan altyapı.",
    icon: "building",
    services: [
      "mekanik-tesisat-projelendirme",
      "dogalgaz-projelendirme",
      "yangin-tesisati",
      "temiz-su-ve-atik-su-tesisati",
    ],
  },
  {
    id: "iklimlendirme",
    title: "İklimlendirme",
    text: "Taze hava, soğutma ve iç hava kalitesi; mekânın nefes alma biçimi.",
    icon: "fan",
    services: ["havalandirma-ve-iklimlendirme", "klima-sistemleri"],
  },
  {
    id: "isitma",
    title: "Isıtma",
    text: "Isı kaynağından her odaya kadar dengeli ve verimli bir dağıtım.",
    icon: "radiator",
    services: ["kombi-sistemleri", "petek-ve-radyator-sistemleri", "dogalgaz-projelendirme"],
  },
];
