import type { TitledText } from "./services";

/** Ana sayfa ve Kurumsal sayfada kullanılan çalışma yaklaşımı adımları. */
export const approachSteps: TitledText[] = [
  {
    title: "İhtiyaç analizi ve keşif",
    text: "Yapıyı, kullanım senaryosunu, bütçe ve takvim beklentilerini dinleyerek işe başlarız. Gerekirse yerinde keşif yaparız.",
  },
  {
    title: "Hesap ve sistem kurgusu",
    text: "Isı, debi ve basınç hesaplarıyla alternatifleri karşılaştırır; ilk yatırım ve işletme maliyetini birlikte değerlendiririz.",
  },
  {
    title: "Projelendirme ve koordinasyon",
    text: "Uygulanabilir çizimler üretir, mimari ve statik projelerle çakışmaları sahaya taşınmadan çözeriz.",
  },
  {
    title: "Uygulama ve saha takibi",
    text: "Kapsamdaki işleri projeye sadık, düzenli ve temiz bir işçilikle yürütür; sahadaki soruları hızla yanıtlarız.",
  },
  {
    title: "Test, teslim ve bakım",
    text: "Testlerle sistemi devreye alır, işletme bilgilerini paylaşır ve düzenli bakım için yanınızda oluruz.",
  },
];

/** Kurumsal sayfadaki çalışma ilkeleri. */
export const principles: TitledText[] = [
  {
    title: "Önce hesap",
    text: "Kapasite, çap ve debi kararlarını alışkanlıklara değil hesaba dayandırırız. Böylece sistemler ne gereğinden büyük ne de yetersiz olur.",
  },
  {
    title: "Disiplinler arası uyum",
    text: "Mekanik sistemler mimari ve statik kararlarla birlikte yaşar. Koordinasyonu projenin başından itibaren işin parçası sayarız.",
  },
  {
    title: "Uygulanabilirlik",
    text: "Kâğıt üzerinde doğru olan her çözüm sahada da doğru olmayabilir. Çizdiğimiz her detayın uygulanabilir ve bakımı yapılabilir olmasına özen gösteririz.",
  },
  {
    title: "Açık iletişim",
    text: "Kapsamı, süreci ve sınırları baştan açıkça konuşuruz. Teklifte neyin dahil olup neyin olmadığını net biçimde yazarız.",
  },
];

/** Hedef kitle kartları (Kurumsal sayfa). */
export const clientTypes: TitledText[] = [
  {
    title: "Mimarlar",
    text: "Tasarım bütünlüğünü koruyan, erken aşamada entegre edilmiş mekanik çözümler ve hızlı revizyon döngüleri.",
  },
  {
    title: "Müteahhitler",
    text: "Metrajı net, maliyeti öngörülebilir ve sahada sürpriz çıkarmayan uygulanabilir projeler.",
  },
  {
    title: "İşletmeler",
    text: "Çalışan ve müşteri konforunu destekleyen, işletme maliyetini gözeten ve bakımı kolay sistemler.",
  },
  {
    title: "Bireysel müşteriler",
    text: "Evinizin ısıtma, soğutma ve tesisat ihtiyaçları için anlaşılır öneriler ve özenli bir işçilik.",
  },
];
