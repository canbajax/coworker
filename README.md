# Emlak Sitesi Projesi

Bu depo, "Ortaklık, Güven, Kazanç" temalı temel bir emlak sitesi için HTML, CSS ve JavaScript kodlarını içerir.

## İlan Yönetimi

Sitedeki emlak ilanları `assets/listings.json` dosyasından okunmaktadır.

* **Yeni İlan Ekleme:** `listings.json` dosyasını açın. Mevcut ilan yapısını kopyalayarak dosyanın içine yeni bir JSON objesi olarak yapıştırın ve bilgileri güncelleyin. Virgüllere dikkat edin.
* **İlan Güncelleme/Silme:** İlgili ilanın bilgilerini doğrudan `listings.json` dosyası üzerinden düzenleyin veya objeyi tamamen silin.

Dosyayı kaydettikten sonra değişiklikler sitede görünecektir (sayfayı yenilemeniz gerekebilir).

**Örnek İlan Yapısı (`listings.json` içinde):**

```json
{
  "id": 123, // Benzersiz bir numara veya ID
  "title": "İlan Başlığı",
  "location": "İlçe, İl",
  "price": "Fiyat Bilgisi",
  "imageUrl": "assets/images/ilan_resmi.jpg", // Resmin yolu veya URL'si
  "details": { // İlan detayları objesi
    "oda": "Oda Sayısı (örn: 2+1)",
    "banyo": "Banyo Sayısı (örn: 1)",
    "m2": "Metrekare (örn: 120)"
    // İsteğe bağlı başka detaylar eklenebilir
  },
  "description": "Kısa Açıklama (Opsiyonel)",
  "detailUrl": "ilan_detay_sayfasi.html" // Detay sayfasına link (opsiyonel, # olabilir)
}
```

## Kurulum ve Kullanım

1.  Dosyaları bilgisayarınıza indirin veya klonlayın.
2.  `index.html` dosyasını bir web tarayıcısında açın.
3.  `assets/images` klasörüne kendi görsellerinizi ekleyin ve `listings.json` içindeki `imageUrl` değerlerini güncelleyin.
4.  `assets/css/main.css` dosyasını düzenleyerek site stilini özelleştirin.

## Teknoloji

* HTML5
* CSS3 (CSS Değişkenleri, Flexbox, Grid)
* JavaScript (Vanilla JS, Fetch API)
* JSON

## GitHub Pages

Bu site, GitHub Pages üzerinde yayınlanmaya uygundur.
