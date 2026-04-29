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
    // Cerrar menú móvil al hacer click en un enlace
    // =========================
    document.querySelectorAll('#menu a').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('menu');
            const btn = document.querySelector('.menu-icon');
            if (window.innerWidth <= 820 && !menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // =========================
    // Testimonios (hover text change)
    // =========================
    const imagenes = document.querySelectorAll('.testimonio-imagen');
    const nombre = document.querySelector('.globo-nombre');
    const mensaje = document.querySelector('.globo-mensaje');

    imagenes.forEach(img => {
        img.addEventListener('mouseenter', () => {
            nombre.textContent = img.dataset.nombre;
            mensaje.textContent = img.dataset.texto;
        });

        img.addEventListener('mouseleave', () => {
            nombre.textContent = '...';
            mensaje.textContent = '';
        });
    });

    // =========================
    // Formulario de contacto
    // =========================
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMsg');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        successMsg.textContent = '';

        const submitBtn = form.querySelector('.btn-enviar');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Enviando...</span>';

        try {
            const formData = new FormData(form);

            const res = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                successMsg.textContent = '✅ ¡Gracias! Tu mensaje fue enviado correctamente.';
                successMsg.style.color = '#0f766e';
                form.reset();
            } else {
                successMsg.textContent = '⚠️ No se pudo enviar. Intenta de nuevo.';
                successMsg.style.color = '#dc2626';
            }
        } catch (err) {
            successMsg.textContent = '⚠️ Error de conexión. Revisa tu internet e intenta otra vez.';
            successMsg.style.color = '#dc2626';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
        }
    });
});

// =========================
// Menú móvil
// =========================
function toggleMenu() {
    const menu = document.getElementById("menu");
    const btn = document.querySelector(".menu-icon");
    const isHidden = menu.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", String(!isHidden));
}

// =========================
// Descargar CV
// =========================
function downloadCV() {
    const link = document.createElement("a");
    link.href = "cv/Sergio-Martinez-CV.pdf";
    link.download = "Sergio-Martinez-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
