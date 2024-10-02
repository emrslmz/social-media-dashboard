# Sosyal Medya İzleme Dashboard'u

Proje belirli anahtar kelimeleri veya hashtag'leri içeren sosyal medya gönderilerini gerçek zamanlı olarak izlemelerini
sağlayan bir web uygulamasıdır.

## Teknolojiler ve Kütüphaneler

- **Framework:** Nuxt.js, VueJS
- **State Management:** Pinia
- **Stil Kütüphanesi:** Tailwind CSS, FonAwesome Icon Package
- **API Entegrasyonu**: RapidAPI üzerinden sosyal medya platformlarından (Twitter, Facebook, Instagram) veriler çekildi.
- **Veri Görselleştirme:** Chart.js

## Bileşenler

- Dashboard Page
- Graph Page
- TheHeader Component
- TheSidebar Component
- PostDetailModal Component
- SortDropdown Component
- PostList Component
- PostGrid Component
- PostItem Component
- PostChart Component
- SortModal Component
- ToggleFilterView Component
- SearchBar Component

### Gereksinimler

- Node.js (v14 veya daha yeni)
- NPM veya Yarn

## Kurulum & ENV

1. Bu depoyu klonlayın (SSH):
   ```bash
   git clone git@github.com:emrslmz/social-media-dashboard.git

2. Proje NPM paketlerini yükleyin:
    ```bash
   npm install

3. Projeyi localde çalıştırın:
    ```bash
   nuxt dev

4. Lütfen projeyi canlıda görmeden önce .env dosyasını da mevcut dizine ekleyin. (sizinle mail yoluyla paylaşılacak)

## Canlı'da Görmek için

- https://emresolmaz-dedecta.netlify.app/

## Ekstra & Özellikler

- Top ve latest özellikli gönderiler görüntülenebiliyor.
- Live update: anlık olarak gönderiler getirilebiliyor
- Query: aranan searchText, querry olarak saklanıyor. Eğer linkte searchText varsa, otomatik istek atılır.
- Query Örnek: https://emresolmaz-dedecta.netlify.app/?searchText=sondakika adresine gidildiğinde api'den otomatik
  gönderi çekilir
- Normal gönderi aramada, Add Searched Items eğer aktifse(checbox) yeni gönderiler önceki gönderilerle beraber sunulur
- Gönderi detaylar: gönderi üzerine tıklayınca daha fazla bilgi edilinebilir.
- Sıralama ve filtreleme. Tüm özellikler dropdown butonunda eklenmiştir. Çekilen gönderiler arasında sıralama, seçili 2
  tarih arasında veri varsa bunlar listelenir.
- Platforma göre sıralama: view all, facebook, instagram, twitter butonlarına tıkayarak ilgili platform için filtereleme
  kolayca yapılır
- Open search input butonu aktifse, çekilen gönderiler arasında kelime araması yapılabilir.
- List ve Grid görünümü: butona tıklayarak ikisi arasında değişim yapılır
- Clear posts button (ekranın aşağısında): tıklayarak tüm ayarlar ve gönderiler silinir
- Graph Page: çekilen gönderiler için 2 farklı grafik eklenmiştir. NOT: eğer latest seçeneğiyle gönderiler çekilmişse
  grafik sizi yanıltmasın. Api'den tek seferde max 10 veri alınabiliyor.

## NOT

- rapidapi.com'dan bulabildiğim kadarıyla en sağlam facebook ve twitter api'ler mevcut. Diğerleri ücretli veya free
  trial'ları çok az bir dataya izin veriyor. bu sebeple yalnızca facebook ve twitter istekleri atıldı.
- 