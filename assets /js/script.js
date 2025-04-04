document.addEventListener('DOMContentLoaded', function() {

    // Mobil Menü Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainMenu.classList.toggle('is-active');
        });
    }

    // Footer'daki Yılı Güncelle
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth Scroll (Opsiyonel - Sadece # linkler için)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Menü linki değilse ve sadece # ise veya başka bir sayfaya gitmiyorsa
            if (this.hash !== "" && this.pathname === window.location.pathname) {
                e.preventDefault();
                const targetElement = document.querySelector(this.hash);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // İleride buraya slider, animasyonlar vb. eklenebilir

});
