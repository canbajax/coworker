// Slider İşlevselliği
let slideIndex = 0;
const slides = document.querySelectorAll('#slider .slide');

function showNextSlide() {
  slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}

if (slides.length > 0) {
  // İlk slide aktif olsun
  slides[slideIndex].classList.add('active');
  // Her 5 saniyede bir slide değiştir
  setInterval(showNextSlide, 5000);
}

// İlanlarda Arama Filtreleme (İlanlar bölümü için)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    const filter = searchInput.value.toLowerCase();
    const ilanlar = document.querySelectorAll('.ilan');
    ilanlar.forEach(ilan => {
      const title = ilan.getAttribute('data-title').toLowerCase();
      ilan.style.display = title.includes(filter) ? 'block' : 'none';
    });
  });
}
