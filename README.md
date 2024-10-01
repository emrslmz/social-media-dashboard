# Sosyal Medya İzleme Dashboard

Bu proje, kullanıcıların belirli anahtar kelimeleri veya hashtag'leri içeren sosyal medya gönderilerini aratarak  izleyebilecekleri bir web uygulaması olarak geliştirilmiştir. Uygulamada Twitter, Instagram (free api request expired), Facebook verileri filtrelerek, sıralayarak, grid, list formatında görüntülenebilir.

## Özellikler
- **API Entegrasyonu**: RapidAPI üzerinden sosyal medya platformlarından (Twitter, Facebook, Instagram) veriler çekildi.
- **Gönderi Listeleme**: Sosyal medya gönderilerini liste veya grid formatında görüntülenebilir.
    - Platform Adı
    - Kullanıcı Adı
    - Gönderi İçeriği
    - Gönderi Tarihi ve Saati
    - Beğeni, Yorum, Paylaşım Sayıları
- **Filtreleme ve Sıralama**:
    - Platforma göre filtreleme
    - Anahtar kelimeye göre filtreleme
    - Gönderileri tarih ve etkileşim sayısına göre sıralama
- **Anlık Arama**: Gönderiler içinde anlık arama yapma.
- **Veri Görselleştirme**: Platformlara göre gönderi sayısı ve zaman içindeki dağılımı grafiklerle gösterme.
- **Responsive Tasarım**: Mobil ve masaüstü cihazlarda uyumlu çalışma.

## Kullanılan Teknolojiler
- **Framework**: [Nuxt.js](https://nuxtjs.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Stil Kütüphanesi**: [Tailwind CSS](https://tailwindcss.com/)
- **Veri Görselleştirme**: [Chart.js](https://www.chartjs.org/) veya [ECharts](https://echarts.apache.org/en/index.html) (opsiyonel)
- **API Entegrasyonu**: [RapidAPI](https://rapidapi.com/)

## Kurulum
Projeyi yerel bilgisayarınıza kurmak ve çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler
- Node.js (v14 veya daha yeni)
- NPM veya Yarn

### Adımlar
1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/kullaniciadi/sosyal-medya-dashboard.git
