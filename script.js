document.addEventListener("DOMContentLoaded", function () {
    // =========================
    // Fade-in (IntersectionObserver)
    // =========================
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // =========================
    // Certificaciones (render + Swiper)
    // =========================
    loadCertifications();
});

// =========================
// Menú móvil
// =========================
function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
}
