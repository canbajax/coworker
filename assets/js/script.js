/**
 * Temel Emlak Sitesi JavaScript Kodları
 * - Mobil Menü Açma/Kapatma
 * - Footer Yıl Güncelleme
 * - Smooth Scroll (Sayfa içi linkler için)
 * - İlanları listings.json'dan yükleme
 */
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobil Menü Toggle İşlevi ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainMenu.classList.toggle('is-active');
        });
    }

    // --- Footer'daki Yılı Otomatik Güncelleme İşlevi ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scroll İşlevi (Sayfa içi # linkler için) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hash !== "" && this.pathname === window.location.pathname) {
                if (mainMenu && mainMenu.classList.contains('is-active') && mainMenu.contains(this)) {
                     menuToggle.setAttribute('aria-expanded', 'false');
                     mainMenu.classList.remove('is-active');
                }
                const targetId = this.hash;
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        const headerOffset = document.querySelector('.site-header')?.offsetHeight || 0;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                } catch (error) { console.error("Smooth scroll error:", error); }
            }
        });
    });

    // --- İlanları JSON'dan Yükleme İşlevi ---
    const listingsContainer = document.getElementById('listings-container');

    // Sadece ilan konteyneri varsa ilanları yükle
    if (listingsContainer) {
        fetch('assets/listings.json') // JSON dosyasının yolu
            .then(response => {
                // Ağ hatası varsa hata fırlat
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Cevabı JSON olarak parse et
                return response.json();
            })
            .then(listings => {
                // Konteynerin içini temizle (opsiyonel, eski içerik kalmasın diye)
                listingsContainer.innerHTML = '';

                // İlan yoksa mesaj göster
                if (!listings || listings.length === 0) {
                    listingsContainer.innerHTML = '<p>Gösterilecek ilan bulunamadı.</p>';
                    return;
                }

                // Her bir ilan için HTML oluştur ve konteynere ekle
                listings.forEach(listing => {
                    const listingCard = `
                        <article class="listing-card">
                            <img src="${listing.imageUrl || 'https://placehold.co/400x220/cccccc/999999?text=Resim+Yok'}" alt="${listing.title || 'İlan Resmi'}">
                            <div class="listing-card-content">
                                <h3>${listing.title || 'Başlık Yok'}</h3>
                                <p class="location">${listing.location || 'Konum Belirtilmemiş'}</p>
                                <p class="price">${listing.price || 'Fiyat Belirtilmemiş'}</p>
                                <p class="details">
                                    ${listing.details?.oda ? `<span><i aria-hidden="true">🛏️</i> ${listing.details.oda}</span> |` : ''}
                                    ${listing.details?.banyo ? `<span><i aria-hidden="true">🛁</i> ${listing.details.banyo} Banyo</span> |` : ''}
                                    ${listing.details?.m2 ? `<span><i aria-hidden="true">📐</i> ${listing.details.m2} m²</span>` : ''}
                                    ${listing.details?.ozellik ? `<br><span>⭐ ${listing.details.ozellik}</span>` : ''}
                                    ${listing.details?.cephe ? `<br><span>🧭 ${listing.details.cephe}</span>` : ''}
                                    ${listing.details?.durum ? `<br><span> অবস্থা: ${listing.details.durum}</span>` : ''}
                                    ${listing.details?.kat ? `<br><span>🏢 ${listing.details.kat}</span>` : ''}
                                    ${listing.details?.imar ? `<br><span>📜 ${listing.details.imar}</span>` : ''}
                                </p>
                                <a href="${listing.detailUrl || '#'}" class="button">Detayları Gör</a>
                            </div>
                        </article>
                    `;
                    // Oluşturulan kartı konteynerin sonuna ekle
                    listingsContainer.innerHTML += listingCard;
                });
            })
            .catch(error => {
                // Hata durumunda konsola ve sayfaya bilgi yazdır
                console.error('İlanlar yüklenirken hata oluştu:', error);
                listingsContainer.innerHTML = '<p>İlanlar yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>';
            });
    }

}); // DOMContentLoaded Sonu

