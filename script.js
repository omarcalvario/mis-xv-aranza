const eventDate = new Date('2027-01-09T10:00:00-06:00').getTime();
const countdownUnits = [
    ['dias', 24 * 60 * 60 * 1000],
    ['horas', 60 * 60 * 1000],
    ['minutos', 60 * 1000],
    ['segundos', 1000],
];

function updateCountdown() {
    let remaining = Math.max(0, eventDate - Date.now());

    for (const [id, unit] of countdownUnits) {
        const element = document.getElementById(id);
        if (!element) continue;
        const value = Math.floor(remaining / unit);
        element.textContent = String(value).padStart(2, '0');
        remaining %= unit;
    }
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

const music = document.getElementById('musica');
const musicButton = document.getElementById('botonMusica');

function updateMusicButton(isPlaying) {
    musicButton.dataset.playing = String(isPlaying);
    musicButton.setAttribute('aria-pressed', String(isPlaying));
    musicButton.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');
}

// El navegador puede bloquear autoplay con sonido; el botón permite iniciarlo tras un toque.
music.play().then(() => updateMusicButton(true)).catch(() => updateMusicButton(false));

musicButton.addEventListener('click', async () => {
    if (music.paused) {
        try {
            await music.play();
            updateMusicButton(true);
        } catch {
            updateMusicButton(false);
        }
    } else {
        music.pause();
        updateMusicButton(false);
    }
});

music.addEventListener('play', () => updateMusicButton(true));
music.addEventListener('pause', () => updateMusicButton(false));

const sections = document.querySelectorAll('.invitacion > section');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('has-section-transitions');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    }, { threshold: 0.12 });

    sections.forEach((section) => sectionObserver.observe(section));
} else {
    sections.forEach((section) => section.classList.add('is-visible'));
}
