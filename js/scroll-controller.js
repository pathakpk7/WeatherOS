// ===== SCROLL & PARALLAX CONTROLLER =====
// Manages smooth scroll events, viewport triggers, and subtle 3D mouse parallax

class ScrollController {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetMouseX = 0;
        this.targetMouseY = 0;
        this.rafId = null;
        this.init();
    }

    init() {
        this.initParallax();
        this.initScrollWatch();
    }

    initParallax() {
        window.addEventListener('mousemove', (e) => {
            this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });

        const render = () => {
            // Smooth mouse interpolation
            this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
            this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

            const parallaxElements = document.querySelectorAll('[data-parallax]');
            parallaxElements.forEach(el => {
                const depth = parseFloat(el.dataset.parallax) || 0.4;
                const x = this.mouseX * depth * 22;
                const y = this.mouseY * depth * 22;
                el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
            });

            this.rafId = requestAnimationFrame(render);
        };

        this.rafId = requestAnimationFrame(render);
    }

    initScrollWatch() {
        // Observe sections to trigger staggered entrance animations without ever hiding them
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('section, .weather-details, .sun-section, .moon-section, .hourly-forecast, .daily-forecast, .world-clock-section').forEach(el => {
            observer.observe(el);
        });
    }

    destroy() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
    }
}

// Global instance attached to window for vanilla JS compatibility
window.scrollController = new ScrollController();
