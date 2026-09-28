import { siteConfig } from "@/config/site";
import type { Faq } from "./services";

/** Genel sık sorulan sorular. Hizmete özel sorular services.ts içindedir. */
export const generalFaqs: Faq[] = [
  {
    q: "Hangi hizmetleri sunuyorsunuz?",
    a: "Mekanik tesisat projelendirme, doğalgaz projelendirme, yangın tesisatı, havalandırma ve iklimlendirme ile temiz su ve atık su tesisatı başta olmak üzere; klima, kombi ve petek-radyatör sistemlerinde keşif, kurulum ve bakım hizmetleri sunuyoruz.",
  },
  {
    q: "Yalnızca proje mi hazırlıyorsunuz, uygulama da yapıyor musunuz?",
    a: "Hizmete göre değişir. Projelendirme hizmetlerimizin yanında klima, kombi, petek-radyatör ve tesisat uygulamalarını da yürütüyoruz. Projenizde hangi aşamaların kapsama gireceğini teklifte açıkça belirtiriz.",
  },
  {
    q: "Teklif süreci nasıl ilerliyor?",
    a: "Formu doldurmanız, bizi aramanız ya da WhatsApp üzerinden yazmanız yeterli. Projenizi dinledikten sonra gereken belgeleri veya keşif ihtiyacını belirliyoruz. Kapsam netleştiğinde işin içeriğini ve adımlarını açıkça gösteren yazılı bir teklif sunuyoruz.",
  },
  {
    q: "Teklif için hangi bilgileri hazırlamalıyım?",
    a: "Yapının türü ve yaklaşık büyüklüğü, varsa mimari projeler (DWG veya PDF), mevcut tesisata ait fotoğraflar ve beklediğiniz takvim ilk değerlendirme için yeterlidir. Eksik bilgileri görüşme sırasında birlikte tamamlarız.",
  },
  {
    q: "Mimarlar ve müteahhitlerle birlikte çalışıyor musunuz?",
    a: "Evet. Mekanik sistemlerin tasarımın erken aşamasında ele alınması; şaft, tavan ve makine dairesi kararlarında sonradan yaşanabilecek çakışmaları azaltır. Proje ekibinizle aynı dili konuşan, koordinasyona açık bir çalışma yürütüyoruz.",
  },
  {
    q: "Hangi bölgelerde hizmet veriyorsunuz?",
    a: siteConfig.serviceArea
      ? `${siteConfig.serviceArea} ve çevresinde hizmet veriyoruz. Farklı bir konumdaki projeleriniz için de bizimle iletişime geçebilirsiniz.`
      : "Hizmet bölgesini ve projenin konumuna bağlı çalışma koşullarını ilk görüşmede projenize özel olarak netleştiriyoruz. Konumunuzu teklif formunda belirtmeniz yeterlidir.",
  },
  {
    q: "Paylaştığım kişisel veriler nasıl kullanılıyor?",
    a: "Formda paylaştığınız bilgiler talebinizi değerlendirmek ve sizinle iletişime geçmek amacıyla kullanılır. Ayrıntılar için KVKK Aydınlatma Metni'ni inceleyebilirsiniz.",
  },
];
