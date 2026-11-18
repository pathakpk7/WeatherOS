// ===== PROCEDURAL AMBIENT AUDIO ENGINE =====
// Synthesizes natural weather soundscapes in real-time via Web Audio API.
// No external audio files or network requests required.

class WeatherAudioEngine {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.currentWeather = 'clear';
        this.volume = 0.35;
        this.masterGain = null;
        this.activeNodes = [];
        this.thunderTimer = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
        this.initialized = true;
    }

    async toggle(weatherType = 'clear') {
        if (!this.initialized) {
            this.init();
        }

        if (!this.ctx) return false;

        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }

        if (this.isPlaying) {
            this.stop();
            return false;
        } else {
            this.play(weatherType);
            return true;
        }
    }

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
        }
    }

    play(weatherType = 'clear') {
        if (!this.initialized) this.init();
        if (!this.ctx) return;

        this.stopNodes();
        this.currentWeather = weatherType;
        this.isPlaying = true;

        if (this.masterGain) {
            this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
            this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
            this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 1.2);
        }

        switch (weatherType) {
            case 'rain':
                this.startRainSound(false);
                break;
            case 'storm':
                this.startRainSound(true);
                this.scheduleThunder();
                break;
            case 'snow':
                this.startSnowWindSound();
                break;
            case 'clouds':
            case 'fog':
                this.startGentleBreeze();
                break;
            case 'clear':
            default:
                this.startSunnyWarmth();
                break;
        }

        this.updateUiState(true);
    }

    stop() {
        if (!this.ctx || !this.isPlaying) return;

        if (this.masterGain) {
            this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
            this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
            this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
        }

        setTimeout(() => {
            this.stopNodes();
            this.isPlaying = false;
            this.updateUiState(false);
        }, 850);
    }

    stopNodes() {
        if (this.thunderTimer) {
            clearTimeout(this.thunderTimer);
            this.thunderTimer = null;
        }

        this.activeNodes.forEach(node => {
            try {
                if (typeof node.stop === 'function') node.stop();
                if (typeof node.disconnect === 'function') node.disconnect();
            } catch (e) {
                // Ignore disconnect errors on already stopped nodes
            }
        });
        this.activeNodes = [];
    }

    // Generate brown/pink noise buffer for rain & wind
    createNoiseBuffer(duration = 4) {
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
            b6 = white * 0.115926;
        }
        return buffer;
    }

    // Procedural rain soundscape
    startRainSound(heavy = false) {
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.createNoiseBuffer(5);
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(heavy ? 2200 : 1400, this.ctx.currentTime);

        const highpass = this.ctx.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.setValueAtTime(320, this.ctx.currentTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(heavy ? 0.8 : 0.5, this.ctx.currentTime);

        noise.connect(filter);
        filter.connect(highpass);
        highpass.connect(gain);
        gain.connect(this.masterGain);

        noise.start();
        this.activeNodes.push(noise, filter, highpass, gain);

        // Individual droplet sprinkle simulation
        this.startDropletPatter(heavy ? 35 : 75);
    }

    startDropletPatter(intervalMs = 60) {
        let active = true;
        const dropletLoop = () => {
            if (!this.isPlaying || !active) return;

            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const freq = 1200 + Math.random() * 2400;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(freq * 0.4, this.ctx.currentTime + 0.04);

                gain.gain.setValueAtTime(0.08 * (Math.random() * 0.5 + 0.5), this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

                osc.connect(gain);
                gain.connect(this.masterGain);

                osc.start();
                osc.stop(this.ctx.currentTime + 0.045);
            } catch (e) {}

            const next = intervalMs + (Math.random() * 40 - 20);
            this.thunderTimer = setTimeout(dropletLoop, next);
        };
        dropletLoop();
    }

    // Procedural gentle breeze / wind
    startGentleBreeze() {
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.createNoiseBuffer(6);
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(450, this.ctx.currentTime);
        filter.Q.setValueAtTime(2.2, this.ctx.currentTime);

        // LFO to slowly modulate wind frequency
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(240, this.ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.4, this.ctx.currentTime);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start();
        lfo.start();
        this.activeNodes.push(noise, filter, lfo, lfoGain, gain);
    }

    // Snow ambient wind
    startSnowWindSound() {
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.createNoiseBuffer(5);
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(680, this.ctx.currentTime);
        filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.28, this.ctx.currentTime);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start();
        this.activeNodes.push(noise, filter, gain);
    }

    // Clear day warm ambient tone
    startSunnyWarmth() {
        const frequencies = [220, 330, 440, 550];
        frequencies.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            // Subtle gentle vibrato
            const vib = this.ctx.createOscillator();
            const vibGain = this.ctx.createGain();
            vib.frequency.setValueAtTime(0.15 + idx * 0.05, this.ctx.currentTime);
            vibGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
            vib.connect(vibGain);
            vibGain.connect(osc.frequency);

            gain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx.currentTime);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            vib.start();
            this.activeNodes.push(osc, vib, vibGain, gain);
        });
    }

    // Thunder rumble generator
    scheduleThunder() {
        const triggerThunder = () => {
            if (!this.isPlaying || this.currentWeather !== 'storm') return;

            try {
                const thunderNoise = this.ctx.createBufferSource();
                thunderNoise.buffer = this.createNoiseBuffer(3);

                const filter = this.ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(160, this.ctx.currentTime);

                const gain = this.ctx.createGain();
                gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.7, this.ctx.currentTime + 0.3);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.8);

                thunderNoise.connect(filter);
                filter.connect(gain);
                gain.connect(this.masterGain);

                thunderNoise.start();
                thunderNoise.stop(this.ctx.currentTime + 2.9);

                // Trigger visual lightning flash
                this.triggerLightningFlash();
            } catch (e) {}

            const nextThunder = 8000 + Math.random() * 14000;
            this.thunderTimer = setTimeout(triggerThunder, nextThunder);
        };

        this.thunderTimer = setTimeout(triggerThunder, 3000);
    }

    triggerLightningFlash() {
        const flashOverlay = document.getElementById('lightningFlash');
        if (flashOverlay) {
            flashOverlay.classList.remove('active');
            void flashOverlay.offsetWidth;
            flashOverlay.classList.add('active');
        }
    }

    updateUiState(playing) {
        const soundBtn = document.getElementById('ambientSoundBtn');
        if (soundBtn) {
            soundBtn.classList.toggle('playing', playing);
            soundBtn.setAttribute('aria-pressed', String(playing));
        }

        const soundToggle = document.getElementById('ambientSoundsToggle');
        if (soundToggle && soundToggle.checked !== playing) {
            soundToggle.checked = playing;
        }
    }
}

// Global instance attached to window
window.weatherAudio = new WeatherAudioEngine();
