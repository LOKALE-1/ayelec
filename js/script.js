// =============================================
// AYELEC 2026 — Main JS
// =============================================

// ---- Countdown Timer ----
const targetDate = new Date("July 18, 2026 09:00:00").getTime();

function setNum(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    const str = String(val).padStart(2, '0');
    if (el.textContent !== str) {
        el.textContent = str;
        el.classList.remove('tick');
        void el.offsetWidth; // force reflow
        el.classList.add('tick');
    }
}

const timer = setInterval(() => {
    const dist = targetDate - new Date().getTime();
    if (dist < 0) {
        clearInterval(timer);
        const cc = document.querySelector('.countdown-container');
        if (cc) cc.innerHTML = "<p style='color:white;font-weight:700;text-align:center;padding:20px'>\uD83C\uDF89 The Convergence Has Begun!</p>";
        return;
    }
    setNum('days',    Math.floor(dist / 86400000));
    setNum('hours',   Math.floor((dist % 86400000) / 3600000));
    setNum('minutes', Math.floor((dist % 3600000)  / 60000));
    setNum('seconds', Math.floor((dist % 60000)    / 1000));
}, 1000);

// ---- Canvas Particle Background ----
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const COLORS = ['#38A169','#DD6B20','#805AD5','#00AEEF','#E53E3E','#FFFFFF'];
    class Particle {
        constructor() { this.reset(true); }
        reset(init = false) {
            this.x = Math.random() * W;
            this.y = init ? Math.random() * H : H + 10;
            this.r = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.2;
            this.opacity = Math.random() * 0.6 + 0.1;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.dx = (Math.random() - 0.5) * 0.3;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
        update() {
            this.y -= this.speed;
            this.x += this.dx;
            if (this.y < -10) this.reset();
        }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// ---- Typewriter (looping) ----
const typeSegments = [
    { text: "I Build. ",         color: "var(--accent-green)" },
    { text: "I Lead. ",          color: "var(--accent-orange)" },
    { text: "I Create Legacy.",  color: "var(--accent-purple)" }
];
const typewriterEl = document.getElementById("typewriter-text");
let segIdx = 0, charIdx = 0, erasing = false, fullText = false;

function typeLoop() {
    if (!typewriterEl) return;

    if (!erasing) {
        // — Typing phase —
        const seg = typeSegments[segIdx];
        if (charIdx === 0) {
            // Start a new span for this segment
            const span = document.createElement('span');
            span.style.color = seg.color;
            span.style.fontWeight = '900';
            typewriterEl.appendChild(span);
        }
        typewriterEl.lastChild.textContent += seg.text.charAt(charIdx);
        charIdx++;

        if (charIdx < seg.text.length) {
            setTimeout(typeLoop, 70); // type next char
        } else {
            charIdx = 0;
            segIdx++;
            if (segIdx < typeSegments.length) {
                setTimeout(typeLoop, 250); // pause before next segment
            } else {
                // All segments typed — pause then erase
                erasing = true;
                setTimeout(typeLoop, 2200);
            }
        }
    } else {
        // — Erasing phase —
        const text = typewriterEl.textContent;
        if (text.length > 0) {
            // Remove last char from last span
            const spans = typewriterEl.querySelectorAll('span');
            let removed = false;
            for (let i = spans.length - 1; i >= 0; i--) {
                if (spans[i].textContent.length > 0) {
                    spans[i].textContent = spans[i].textContent.slice(0, -1);
                    removed = true;
                    break;
                }
            }
            setTimeout(typeLoop, 35); // erase speed
        } else {
            // Fully erased — reset and retype
            typewriterEl.innerHTML = '';
            erasing = false;
            segIdx = 0;
            charIdx = 0;
            setTimeout(typeLoop, 500);
        }
    }
}

if (typewriterEl) setTimeout(typeLoop, 900);

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        document.getElementById('nav-links')?.classList.remove('active');
    });
});

// ---- Mobile Menu ----
document.getElementById('mobile-toggle')?.addEventListener('click', () => {
    document.getElementById('nav-links')?.classList.toggle('active');
});

// ---- Scroll AOS ----
const aosEls = document.querySelectorAll('[data-aos]');
function checkAOS() {
    aosEls.forEach(el => {
        const delay = parseInt(el.getAttribute('data-aos-delay') || '0');
        if (el.getBoundingClientRect().top < window.innerHeight - 60) {
            setTimeout(() => el.classList.add('aos-animate'), delay);
        }
    });
}
window.addEventListener('scroll', checkAOS, { passive: true });
window.addEventListener('load', checkAOS);
checkAOS();

// ---- Flags Carousel ----
const carouselTrack = document.getElementById('carousel-track');
if (carouselTrack) {
    const codes = ['za','ng','ke','eg','gh','tz','ug','dz','ma','ao','et','sn','ci','cm','zw','mz','zm','mg','rw','mw','sd','gn','bf','ml','cd','ss','tg','bj','lr','sl'];
    let html = codes.map(c => `<img src="https://flagcdn.com/w80/${c}.png" alt="${c}" class="flag-item">`).join('');
    carouselTrack.innerHTML = html + html;
}

// ---- Modals ----
window.openModal = id => {
    const m = document.getElementById(id);
    if (m) m.style.display = 'flex';
};
window.closeModal = id => {
    const m = document.getElementById(id);
    if (m) m.style.display = 'none';
};
window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) e.target.style.display = 'none';
});
