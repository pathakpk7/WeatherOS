// ===== WEATHER ORB COMPONENT =====
// High-fidelity interactive 3D celestial weather sphere
// Features real-time gyro mouse tracking, internal weather particle dynamics,
// celestial orbital rings, and specular optical glass sheen.

class WeatherOrb {
    constructor(container) {
        if (!container) return;
        this.container = container;
        this.weatherType = 'clear';
        this.rotation = 0;
        this.pulsePhase = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.currentRotationX = 0;
        this.currentRotationY = 0;
        this.isHovered = false;
        this.rafId = null;

        this.init();
    }

    init() {
        this.createOrb();
        this.initMouseListener();
        this.startAnimationLoop();
    }

    createOrb() {
        this.container.innerHTML = '';
        this.orb = document.createElement('div');
        this.orb.className = 'weather-orb weather-clear';
        this.orb.innerHTML = `
            <div class="orb-atmosphere"></div>
            <div class="orb-core"></div>
            <div class="orb-specular"></div>
            <div class="orb-glow"></div>
            <div class="orb-particles"></div>
            <div class="orb-ring orb-ring-equator"></div>
            <div class="orb-ring orb-ring-inclined"></div>
            <div class="orb-pulse-ring"></div>
        `;
        this.container.appendChild(this.orb);
    }

    initMouseListener() {
        // Track mouse movement relative to the orb
        const handleMove = (e) => {
            const rect = this.container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Normalized distance (-1 to 1)
            const mouseX = (e.clientX - centerX) / (window.innerWidth / 2);
            const mouseY = (e.clientY - centerY) / (window.innerHeight / 2);

            this.targetRotationY = Math.max(-28, Math.min(28, mouseX * 28));
            this.targetRotationX = Math.max(-28, Math.min(28, -mouseY * 28));
        };

        window.addEventListener('mousemove', handleMove, { passive: true });

        this.container.addEventListener('mouseenter', () => {
            this.isHovered = true;
            this.orb.classList.add('orb-hovered');
        });

        this.container.addEventListener('mouseleave', () => {
            this.isHovered = false;
            this.orb.classList.remove('orb-hovered');
            this.targetRotationX = 0;
            this.targetRotationY = 0;
        });

        // Touch support for mobile devices
        this.container.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0]) {
                const touch = e.touches[0];
                const rect = this.container.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                this.targetRotationY = (touch.clientX - centerX) * 0.15;
                this.targetRotationX = -(touch.clientY - centerY) * 0.15;
            }
        }, { passive: true });

        this.container.addEventListener('touchend', () => {
            this.targetRotationX = 0;
            this.targetRotationY = 0;
        });
    }

    startAnimationLoop() {
        let lastTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        const animate = (currentTime) => {
            const deltaTime = currentTime - lastTime;
            if (deltaTime >= frameInterval) {
                lastTime = currentTime - (deltaTime % frameInterval);
                this.update();
            }
            this.rafId = requestAnimationFrame(animate);
        };

        this.rafId = requestAnimationFrame(animate);
    }

    update() {
        if (!this.orb) return;

        // Smooth spring interpolation
        const ease = this.isHovered ? 0.08 : 0.04;
        this.currentRotationX += (this.targetRotationX - this.currentRotationX) * ease;
        this.currentRotationY += (this.targetRotationY - this.currentRotationY) * ease;

        // Slow celestial rotation
        this.rotation = (this.rotation + 0.18) % 360;

        // Breathing pulse
        this.pulsePhase += 0.024;
        const hoverScale = this.isHovered ? 1.06 : 1.0;
        const pulse = hoverScale * (1 + Math.sin(this.pulsePhase) * 0.02);

        // Apply hardware-accelerated 3D transforms
        this.orb.style.transform = `
            translateZ(0)
            rotateX(${this.currentRotationX.toFixed(2)}deg)
            rotateY(${(this.currentRotationY + this.rotation * 0.15).toFixed(2)}deg)
            scale(${pulse.toFixed(3)})
        `;

        // Modulate glow corona breathing
        const glow = this.orb.querySelector('.orb-glow');
        if (glow) {
            const glowOpacity = (0.55 + Math.sin(this.pulsePhase) * 0.15).toFixed(2);
            glow.style.opacity = glowOpacity;
        }
    }

    setWeather(type = 'clear') {
        this.weatherType = type;
        if (!this.orb) return;

        const validTypes = ['clear', 'clouds', 'rain', 'snow', 'storm', 'fog'];
        const cleanType = validTypes.includes(type) ? type : 'clear';

        this.orb.className = `weather-orb weather-${cleanType} ${this.isHovered ? 'orb-hovered' : ''}`;
        this.addInternalParticles(cleanType);
    }

    addInternalParticles(type) {
        const container = this.orb.querySelector('.orb-particles');
        if (!container) return;
        container.innerHTML = '';

        if (type === 'rain') {
            for (let i = 0; i < 18; i++) {
                const drop = document.createElement('div');
                drop.className = 'orb-rain-drop';
                drop.style.left = `${Math.random() * 90 + 5}%`;
                drop.style.top = `${Math.random() * 30}%`;
                drop.style.animationDuration = `${0.5 + Math.random() * 0.4}s`;
                drop.style.animationDelay = `${Math.random() * 0.8}s`;
                container.appendChild(drop);
            }
        } else if (type === 'snow') {
            for (let i = 0; i < 16; i++) {
                const flake = document.createElement('div');
                flake.className = 'orb-snow-flake';
                flake.style.left = `${Math.random() * 90 + 5}%`;
                flake.style.top = `${Math.random() * 80 + 5}%`;
                flake.style.animationDuration = `${1.8 + Math.random() * 1.5}s`;
                flake.style.animationDelay = `${Math.random() * 1.5}s`;
                container.appendChild(flake);
            }
        } else if (type === 'storm') {
            for (let i = 0; i < 8; i++) {
                const spark = document.createElement('div');
                spark.className = 'orb-storm-spark';
                spark.style.left = `${Math.random() * 80 + 10}%`;
                spark.style.top = `${Math.random() * 80 + 10}%`;
                spark.style.animationDelay = `${Math.random() * 2}s`;
                container.appendChild(spark);
            }
        } else if (type === 'clear') {
            for (let i = 0; i < 10; i++) {
                const ember = document.createElement('div');
                ember.className = 'orb-solar-ember';
                ember.style.left = `${Math.random() * 80 + 10}%`;
                ember.style.top = `${Math.random() * 80 + 10}%`;
                ember.style.animationDuration = `${2.5 + Math.random() * 2}s`;
                ember.style.animationDelay = `${Math.random() * 2}s`;
                container.appendChild(ember);
            }
        }
    }

    destroy() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
        if (this.orb && this.orb.parentNode) {
            this.orb.parentNode.removeChild(this.orb);
        }
    }
}

// Global attachment for vanilla JS compatibility
window.WeatherOrb = WeatherOrb;
