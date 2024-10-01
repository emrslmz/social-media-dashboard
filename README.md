# Sosyal Medya İzleme Dashboard'u

Proje belirli anahtar kelimeleri veya hashtag'leri içeren sosyal medya gönderilerini gerçek zamanlı olarak izlemelerini sağlayan bir web uygulamasıdır.

## Teknolojiler ve Kütüphaneler

- **Framework:** Nuxt.js, VueJS
- **State Management:** Pinia
- **Stil Kütüphanesi:** Tailwind CSS
- **API Entegrasyonu**: RapidAPI üzerinden sosyal medya platformlarından (Twitter, Facebook, Instagram) veriler çekildi.
- **Veri Görselleştirme:** Chart.js

## Bileşenler

- Dashboard Page
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

## Kurulum

1. Bu depoyu klonlayın (SSH):
   ```bash
   git clone git@github.com:emrslmz/social-media-dashboard.git
   
2. Proje NPM paketlerini yükleyin:
    ```bash
   npm install

3. Projeyi localde çalıştırın:
    ```bash
   nuxt dev
