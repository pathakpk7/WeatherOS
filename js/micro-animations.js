// ===== MICRO ANIMATIONS & INTERACTIVE PHYSICS =====
// Provides fluid numeric counters, SVG stroke tweens, rotation eases,
// and dynamic cursor-following spotlight sheen on glass cards.

class MicroAnimations {
    constructor() {
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        this.initCardSpotlight();
    }

    // Dynamic cursor spotlight sheen on all glass cards
    initCardSpotlight() {
        const updateSpotlight = (e) => {
            const cards = document.querySelectorAll('.detail-card, .forecast-card, .world-clock-card, .sun-progress, .moon-display, .atmosphere-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--spotlight-x', `${x}px`);
                card.style.setProperty('--spotlight-y', `${y}px`);
            });
        };

        window.addEventListener('mousemove', updateSpotlight, { passive: true });
    }

    // Smooth number counting animation
    animateCount(element, options = {}) {
        if (!element) return;
        const {
            duration = 1200,
            start = 0,
            decimals = 0,
            prefix = '',
            suffix = '',
            target = null
        } = options;

        const end = target !== null ? target : parseFloat(element.dataset.countTo) || parseFloat(element.textContent) || 0;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing: ease-out quint (smooth, organic stop)
            const eased = 1 - Math.pow(1 - progress, 5);
            const current = start + (end - start) * eased;

            element.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
            }
        };

        requestAnimationFrame(update);
        this.animatedElements.add(element);
    }

    // Smooth progress bar fill
    animateFill(element, options = {}) {
        if (!element) return;
        const {
            duration = 1100,
            targetWidth = null
        } = options;

        const target = targetWidth !== null ? targetWidth : element.dataset.fillTo || element.style.width || '0%';
        const startTime = performance.now();
        const startWidth = element.style.width || '0%';

        const parseWidth = (w) => {
            if (typeof w === 'number') return w;
            const match = String(w).match(/(\d+\.?\d*)/);
            return match ? parseFloat(match[1]) : 0;
        };

        const startVal = parseWidth(startWidth);
        const targetVal = parseWidth(target);

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = startVal + (targetVal - startVal) * eased;

            element.style.width = `${current.toFixed(1)}%`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.style.width = `${targetVal}%`;
            }
        };

        requestAnimationFrame(update);
        this.animatedElements.add(element);
    }

    // Smooth needle/arrow rotation
    animateRotate(element, options = {}) {
        if (!element) return;
        const {
            duration = 850,
            targetRotation = null,
            startRotation = null
        } = options;

        const target = targetRotation !== null ? targetRotation : parseFloat(element.dataset.rotateTo) || 0;
        const currentRot = startRotation !== null ? startRotation : parseFloat(element.dataset.currentRot || 0);
        const startTime = performance.now();

        // Shortest angle path interpolation
        let delta = ((target - currentRot + 540) % 360) - 180;

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = currentRot + delta * eased;

            element.style.transform = `translate(-50%, -50%) rotate(${current.toFixed(1)}deg)`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.style.transform = `translate(-50%, -50%) rotate(${target}deg)`;
                element.dataset.currentRot = target;
            }
        };

        requestAnimationFrame(update);
        this.animatedElements.add(element);
    }

    // Animate SVG stroke dashoffset (e.g. circular AQI ring)
    animateStroke(element, options = {}) {
        if (!element) return;
        const {
            duration = 1300,
            targetOffset = null,
            totalLength = 283
        } = options;

        const target = targetOffset !== null ? targetOffset : parseFloat(element.dataset.strokeTo) || 0;
        const startOffset = parseFloat(element.style.strokeDashoffset) || totalLength;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = startOffset + (target - startOffset) * eased;

            element.style.strokeDashoffset = current.toFixed(1);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.style.strokeDashoffset = String(target);
            }
        };

        requestAnimationFrame(update);
        this.animatedElements.add(element);
    }
}

// Global instance attached to window for vanilla JS compatibility
window.microAnimations = new MicroAnimations();

window.animateCount = function(element, options) {
    window.microAnimations.animateCount(element, options);
};

window.animateFill = function(element, options) {
    window.microAnimations.animateFill(element, options);
};

window.animateRotate = function(element, options) {
    window.microAnimations.animateRotate(element, options);
};

window.animateStroke = function(element, options) {
    window.microAnimations.animateStroke(element, options);
};
