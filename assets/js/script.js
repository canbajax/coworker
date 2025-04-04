    /**
     * Temel Emlak Sitesi JavaScript Kodları
     * - Mobil Menü Açma/Kapatma
     * - Footer Yıl Güncelleme
     * - Smooth Scroll (Sayfa içi linkler için)
     */
    document.addEventListener('DOMContentLoaded', function() {

        // Mobil Menü Toggle İşlevi
        const menuToggle = document.querySelector('.menu-toggle');
        const mainMenu = document.getElementById('main-menu');

        if (menuToggle && mainMenu) {
            menuToggle.addEventListener('click', function() {
                // Butonun aria-expanded durumunu tersine çevir
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                // Menüye .is-active sınıfını ekle/kaldır (CSS'te display:flex yapar)
                mainMenu.classList.toggle('is-active');
            });
        }

        // Footer'daki Yılı Otomatik Güncelleme İşlevi
        const currentYearSpan = document.getElementById('current-year');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }

        // Smooth Scroll İşlevi (Sayfa içi # linkler için)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                // Linkin sadece # değil, geçerli bir hedefi olduğundan emin ol
                // ve linkin aynı sayfada olduğundan emin ol
                if (this.hash !== "" && this.pathname === window.location.pathname) {

                    // Eğer tıklanan link navigasyon menüsündeyse ve menü açıksa, menüyü kapat
                    if (mainMenu && mainMenu.classList.contains('is-active') && mainMenu.contains(this)) {
                         menuToggle.setAttribute('aria-expanded', 'false');
                         mainMenu.classList.remove('is-active');
                    }

                    const targetId = this.hash;
                    try {
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            // Varsayılan atlama davranışını engelle
                            e.preventDefault();

                            // Header yüksekliğini al (yapışkan header varsa kaydırmayı düzeltmek için)
                            const headerOffset = document.querySelector('.site-header')?.offsetHeight || 0;
                            // Hedef elementin sayfanın üstüne olan uzaklığı
                            const elementPosition = targetElement.getBoundingClientRect().top;
                            // Mevcut kaydırma miktarı + elementin pozisyonu - header yüksekliği
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                            // Hesaplanan pozisyona smooth scroll yap
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth"
                            });
                        }
                    } catch (error) {
                        // Hedef element bulunamazsa veya başka bir hata olursa konsola yazdır
                        console.error("Smooth scroll error:", error);
                    }
                }
            });
        });

    }); // DOMContentLoaded Sonu
    
