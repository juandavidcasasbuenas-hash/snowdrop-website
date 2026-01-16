/**
 * Snow Drop Carbon Shoe Chargers
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initDegradationBars();
    initEnquiryForm();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
            } else {
                navbar.style.background = '#FFFFFF';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe various elements for animation
    const animateElements = document.querySelectorAll(
        '.science-card, .feature-card, .testimonial-card, .sidebar-card'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Degradation Bar Animation
 */
function initDegradationBars() {
    const degradationSection = document.querySelector('.degradation-visual');
    if (!degradationSection) return;

    const bars = degradationSection.querySelectorAll('.bar-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.classList.contains('degraded') ? '77%' :
                                         bar.classList.contains('more-degraded') ? '54%' : '100%';
                    }, index * 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Reset widths initially
    bars.forEach(bar => {
        bar.style.width = '0%';
    });

    observer.observe(degradationSection);
}

/**
 * Enquiry Form Handling
 */
function initEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    const formSuccess = document.getElementById('form-success');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate API call
        await simulateAPICall(2000);

        // Show success message
        form.style.display = 'none';
        formSuccess.classList.remove('hidden');

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
}

/**
 * Validate individual form field
 */
function validateField(field) {
    const isValid = field.checkValidity();

    if (!isValid && field.value) {
        field.classList.add('invalid');
        field.style.borderColor = '#ff4d6a';
    } else {
        field.classList.remove('invalid');
        field.style.borderColor = '';
    }

    return isValid;
}

/**
 * Simulate API call with delay
 */
function simulateAPICall(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Add subtle parallax effect to hero particles
 */
function initParallax() {
    const particles = document.querySelectorAll('.particle');
    if (!particles.length) return;

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.5;
            particle.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// Initialize parallax on desktop only
if (window.innerWidth > 768) {
    initParallax();
}

/**
 * Counter animation for hero stats
 */
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const text = stat.textContent;
        const match = text.match(/(\d+)/);

        if (match) {
            const target = parseInt(match[1]);
            const suffix = text.replace(match[1], '');
            let current = 0;
            const increment = target / 50;
            const duration = 1500;
            const stepTime = duration / 50;

            stat.textContent = '0' + suffix;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, stepTime);
        }
    });
}

// Trigger counter animation when hero is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    heroObserver.observe(heroSection);
}

/**
 * Add loading animation to charger visual
 */
function pulseChargerLights() {
    const lights = document.querySelectorAll('.charger-lights .light');
    let activeIndex = 0;

    setInterval(() => {
        lights.forEach((light, index) => {
            if (index <= activeIndex) {
                light.classList.add('active');
            }
        });

        activeIndex++;
        if (activeIndex >= lights.length) {
            setTimeout(() => {
                lights.forEach(light => light.classList.remove('active'));
                activeIndex = 0;
            }, 1000);
        }
    }, 800);
}

// Initialize charger animation
const chargerLights = document.querySelector('.charger-lights');
if (chargerLights) {
    // Charger lights are already animated via CSS
}

console.log('Snow Drop Carbon Shoe Chargers - Website Initialized');
console.log('For support: hello@snowdrop.tech');
