// Countdown Timer Logic
const targetDate = new Date("July 18, 2026 09:00:00").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(timer);
        document.querySelector('.countdown-container').innerHTML = "<h3>Event has started!</h3>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}, 1000);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if(navLinks) navLinks.classList.remove('active');
        }
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Modals Logic
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = 'flex';
    }
}

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

// Populate Country Flags Carousel
const carouselTrack = document.getElementById('carousel-track');
if (carouselTrack) {
    // Array of African country ISO codes for flag icons
    const africanCountries = [
        'za', 'ng', 'ke', 'eg', 'gh', 'tz', 'ug', 'dz', 'ma', 'ao', 
        'et', 'sn', 'ci', 'cm', 'zw', 'mz', 'zm', 'mg', 'rw', 'mw',
        'sd', 'gn', 'bf', 'ml', 'cd', 'ug', 'ss', 'tg', 'bj', 'lr'
    ];
    
    // Create flag images
    let flagsHTML = '';
    africanCountries.forEach(code => {
        flagsHTML += `<img src="https://flagcdn.com/w160/${code}.png" alt="Flag" class="flag-item">`;
    });
    
    // Duplicate for infinite scroll effect
    carouselTrack.innerHTML = flagsHTML + flagsHTML;
}

// Typewriter Effect for Hero
const textElements = [
    { text: "I BUILD ", color: "var(--accent-green)" },
    { text: "| I LEAD ", color: "var(--accent-orange)" },
    { text: "| I CREATE LEGACY", color: "var(--accent-purple)" }
];

const typewriterEl = document.getElementById("typewriter-text");
let currentElementIndex = 0;
let currentCharIndex = 0;

function typeWriter() {
    if (currentElementIndex < textElements.length) {
        const currentElement = textElements[currentElementIndex];
        
        if (currentCharIndex === 0) {
            const span = document.createElement("span");
            span.style.color = currentElement.color;
            typewriterEl.appendChild(span);
        }
        
        const currentSpan = typewriterEl.lastChild;
        currentSpan.textContent += currentElement.text.charAt(currentCharIndex);
        currentCharIndex++;
        
        if (currentCharIndex < currentElement.text.length) {
            setTimeout(typeWriter, 80);
        } else {
            currentCharIndex = 0;
            currentElementIndex++;
            setTimeout(typeWriter, 300);
        }
    }
}

if (typewriterEl) {
    setTimeout(typeWriter, 800);
}
