// ===== WEATHEROS OPERATING SYSTEM CORE =====
// Orchestrates atmospheric data feeds, celestial ephemeris, 3D orb state,
// SVG sparklines, temperature spectrum bars, particle simulations, and procedural audio.

const STORAGE_KEYS = {
    settings: 'weatherOS_settings_v3',
    recentSearches: 'weatherOS_recentSearches_v3',
    worldClocks: 'weatherOS_worldClocks_v3',
    cosmic: 'weatherOS_cosmic_v1'
};

const DEFAULT_LOCATION = {
    name: 'New York',
    country: 'United States',
    lat: 40.7128,
    lon: -74.0060,
    timezone: 'America/New_York'
};

const DEFAULT_SETTINGS = {
    theme: 'auto',
    timeFormat24: true,
    temperatureUnit: 'celsius',
    animations: true,
    particles: true,
    aurora: true,
    backgroundEffects: true,
    reduceMotion: false,
    glassBlur: 14,
    ambientSounds: false,
    soundVolume: 0.35,
    clockMode: 'digital',
    clockStyle: 'cyber'
};

const DEFAULT_CLOCKS = [
    { name: 'London', timezone: 'Europe/London' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' }
];

const COUNTRY_CHOICES = {
    IN: { query: 'New Delhi', name: 'India', lat: 28.6139, lon: 77.2090, timezone: 'Asia/Kolkata' },
    GB: { query: 'London', name: 'United Kingdom', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London' },
    US: { query: 'Washington', name: 'United States', lat: 38.9072, lon: -77.0369, timezone: 'America/New_York' },
    JP: { query: 'Tokyo', name: 'Japan', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo' },
    AU: { query: 'Canberra', name: 'Australia', lat: -35.2809, lon: 149.1300, timezone: 'Australia/Sydney' },
    AE: { query: 'Abu Dhabi', name: 'United Arab Emirates', lat: 24.4539, lon: 54.3773, timezone: 'Asia/Dubai' },
    SG: { query: 'Singapore', name: 'Singapore', lat: 1.3521, lon: 103.8198, timezone: 'Asia/Singapore' }
};

const WEATHER_CODES = {
    0: { description: 'Clear sky', icon: 'sun', background: 'clear', particle: 'stars', message: 'Optimal clear skies with luminous visibility. Perfect conditions for outdoor recreation.', accent: ['#f59e0b', '#fb8500'] },
    1: { description: 'Mainly clear', icon: 'sun', background: 'clear', particle: 'stars', message: 'Bright and serene with sparse high-altitude wisps. Excellent outdoor atmosphere.', accent: ['#f59e0b', '#38bdf8'] },
    2: { description: 'Partly cloudy', icon: 'partly-cloudy', background: 'clouds', particle: 'dust', message: 'Gentle cumulus drifting through a bright sky. Pleasant atmospheric balance.', accent: ['#38bdf8', '#64748b'] },
    3: { description: 'Overcast', icon: 'clouds', background: 'clouds', particle: 'fog', message: 'Soft diffuse cloud cover. Stable barometric readings and gentle air circulation.', accent: ['#64748b', '#94a3b8'] },
    45: { description: 'Foggy mist', icon: 'fog', background: 'fog', particle: 'fog', message: 'Atmospheric condensation resting near ground level. Reduced optical distance.', accent: ['#94a3b8', '#cbd5e1'] },
    48: { description: 'Depositing rime fog', icon: 'fog', background: 'fog', particle: 'fog', message: 'Freezing vapor forming delicate crystalline frost on exposed surfaces.', accent: ['#cbd5e1', '#67e8f9'] },
    51: { description: 'Light drizzle', icon: 'rain', background: 'rain', particle: 'rain', message: 'Fine droplet precipitation. An umbrella or light weatherproof shell is advisable.', accent: ['#38bdf8', '#2563eb'] },
    53: { description: 'Moderate drizzle', icon: 'rain', background: 'rain', particle: 'rain', message: 'Consistent misting precipitation settling across the region.', accent: ['#38bdf8', '#1d4ed8'] },
    55: { description: 'Dense drizzle', icon: 'rain', background: 'rain', particle: 'rain', message: 'Dense low-altitude drizzle. Roads and footpaths will be slick.', accent: ['#0284c7', '#1e1b4b'] },
    56: { description: 'Freezing drizzle', icon: 'freezing-rain', background: 'rain', particle: 'snow', message: 'Supercooled liquid drizzle freezing upon surface impact.', accent: ['#67e8f9', '#2563eb'] },
    57: { description: 'Dense freezing drizzle', icon: 'freezing-rain', background: 'rain', particle: 'snow', message: 'Hazardous surface glaze forming. Exercise caution during travel.', accent: ['#67e8f9', '#1e1b4b'] },
    61: { description: 'Slight rain', icon: 'rain', background: 'rain', particle: 'rain', message: 'Steady gentle showers passing through. Fresh petrichor in the air.', accent: ['#38bdf8', '#2563eb'] },
    63: { description: 'Moderate rain', icon: 'rain', background: 'rain', particle: 'rain', message: 'Sustained rain showers. Good moisture saturation across the soil.', accent: ['#2563eb', '#1d4ed8'] },
    65: { description: 'Heavy rainfall', icon: 'heavy-rain', background: 'rain', particle: 'rain', message: 'Substantial precipitation downpour. Keep warm and remain sheltered.', accent: ['#1d4ed8', '#0f172a'] },
    66: { description: 'Freezing rain', icon: 'freezing-rain', background: 'rain', particle: 'snow', message: 'Winter precipitation creating immediate black ice on tarmac.', accent: ['#a5f3fc', '#2563eb'] },
    67: { description: 'Heavy freezing rain', icon: 'freezing-rain', background: 'rain', particle: 'snow', message: 'Severe glaze ice conditions. Minimize all non-essential road transit.', accent: ['#a5f3fc', '#1e1b4b'] },
    71: { description: 'Slight snowfall', icon: 'snow', background: 'snow', particle: 'snow', message: 'Graceful crystalline snowflakes floating down. Gentle winter serenity.', accent: ['#67e8f9', '#38bdf8'] },
    73: { description: 'Moderate snowfall', icon: 'snow', background: 'snow', particle: 'snow', message: 'Steady snow accumulation creating an immaculate winter landscape.', accent: ['#a5f3fc', '#2563eb'] },
    75: { description: 'Heavy snowstorm', icon: 'heavy-snow', background: 'snow', particle: 'snow', message: 'Substantial accumulation and reduced visibility. Stay cozy indoors.', accent: ['#ffffff', '#1e1b4b'] },
    77: { description: 'Snow grains', icon: 'snow', background: 'snow', particle: 'snow', message: 'Opaque ice grains falling from stratiform clouds.', accent: ['#e0e7ff', '#38bdf8'] },
    80: { description: 'Passing rain showers', icon: 'rain-shower', background: 'rain', particle: 'rain', message: 'Intermittent localized rain bands moving swiftly across the area.', accent: ['#38bdf8', '#2563eb'] },
    81: { description: 'Moderate rain showers', icon: 'rain-shower', background: 'rain', particle: 'rain', message: 'Brisk convective showers with brief sunny clearings in between.', accent: ['#0284c7', '#1d4ed8'] },
    82: { description: 'Violent downpour', icon: 'heavy-rain', background: 'storm', particle: 'rain', message: 'Intense convective precipitation. Seek sturdy overhead shelter.', accent: ['#1e1b4b', '#090d16'] },
    85: { description: 'Light snow showers', icon: 'snow-shower', background: 'snow', particle: 'snow', message: 'Brisk flurries drifting on chilly gusts.', accent: ['#67e8f9', '#2563eb'] },
    86: { description: 'Heavy snow showers', icon: 'heavy-snow', background: 'snow', particle: 'snow', message: 'Dense snow squalls with sudden optical obscurity.', accent: ['#ffffff', '#1e1b4b'] },
    95: { description: 'Thunderstorm', icon: 'storm', background: 'storm', particle: 'rain', message: 'Active atmospheric electrical discharges with resonant thunder rumbles.', accent: ['#c084fc', '#9333ea'] },
    96: { description: 'Thunderstorm with hail', icon: 'storm', background: 'storm', particle: 'rain', message: 'Severe convective storm cell with frozen hail pellets.', accent: ['#c084fc', '#f43f5e'] },
    99: { description: 'Severe thunderstorm & heavy hail', icon: 'storm', background: 'storm', particle: 'rain', message: 'Severe thunderstorm system. Remain indoors away from exterior windows.', accent: ['#9333ea', '#f43f5e'] }
};

const TIMEZONE_CHOICES = [
    { name: 'London', timezone: 'Europe/London' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Berlin', timezone: 'Europe/Berlin' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Mumbai', timezone: 'Asia/Kolkata' },
    { name: 'San Francisco', timezone: 'America/Los_Angeles' },
    { name: 'Toronto', timezone: 'America/Toronto' },
    { name: 'Sao Paulo', timezone: 'America/Sao_Paulo' },
    { name: 'Reykjavik', timezone: 'Atlantic/Reykjavik' },
    { name: 'Cairo', timezone: 'Africa/Cairo' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' }
];

const state = {
    settings: loadJson(STORAGE_KEYS.settings, DEFAULT_SETTINGS),
    recentSearches: loadJson(STORAGE_KEYS.recentSearches, []),
    worldClocks: loadJson(STORAGE_KEYS.worldClocks, DEFAULT_CLOCKS),
    cosmic: loadJson(STORAGE_KEYS.cosmic, {
        panchangLang: 'en',
        horoscopeLang: 'en',
        horoscopeSign: 'aries',
        horoscopeTimeframe: 'daily',
        activeTab: 'panchang'
    }),
    location: null,
    weather: null,
    airQuality: null,
    weatherOrbInstance: null,
    selectedSearchIndex: -1,
    particleTimer: null,
    clockTimer: null,
    worldClockTimer: null,
    weatherRefreshTimer: null,
    lastClockDigits: { hours: '', minutes: '', seconds: '' }
};

const dom = {};

function cacheDom() {
    const ids = [
        'loadingScreen', 'loadingProgress', 'backgroundLayer', 'particlesContainer', 'lightningFlash', 'drawerBackdrop',
        'settingsToggle', 'closeSettings', 'settingsPanel', 'searchToggle', 'closeSearch', 'searchPanel',
        'citySearch', 'clearSearch', 'searchResults', 'placeSearch', 'placeApply', 'placeGpsBtn', 'currentPlace', 'countrySelect',
        'refreshBtn', 'locationBadge', 'currentPlaceHeader', 'detectLocationBtn',
        'unitToggleInline', 'timeFormatToggleInline', 'timeFormatToggle',
        'ambientSoundBtn', 'ambientSoundsToggle', 'soundVolumeRange', 'soundVolumeValue',
        'animationsToggle', 'particlesToggle', 'auroraToggle', 'backgroundToggle', 'reduceMotionToggle',
        'glassBlurRange', 'glassBlurValue',
        'greeting', 'hours', 'minutes', 'seconds', 'timePeriod', 'heroDate', 'heroClock',
        'weatherOrbContainer', 'weatherIconLarge', 'temperatureLarge', 'weatherDescription', 'feelsLike',
        'tempHigh', 'tempLow', 'weatherMessage', 'heroHumidity', 'heroWind', 'heroUv', 'heroAqi',
        'humidity', 'humidityProgress', 'dewPoint',
        'windSpeed', 'compassNeedle', 'windDirection',
        'uvIndex', 'uvFill', 'uvCategory', 'uvAdvice',
        'aqi', 'aqiRing', 'aqiCategory',
        'visibility', 'visibilityFill', 'visibilityClarity',
        'pressure', 'pressureFill', 'pressureTendency',
        'sunIndicator', 'sunPathActive', 'sunCountdown', 'sunriseTime', 'sunsetTime',
        'celestialStatusPill', 'celestialStatusText', 'celestialSidereal',
        'sunPathCard', 'solarElevation', 'sunAltitudeBeam', 'daylightProgressText', 'daylightProgressPct', 'daylightProgressBar',
        'dawnTime', 'solarNoonTime', 'duskTime',
        'moonGraphic', 'moonShadowMask', 'moonPhase', 'moonIllumination', 'moonIllumFill', 'nextFullMoon',
        'moonPhaseCard', 'moonZodiac', 'moonIlluminationBadge', 'moonAgeText', 'moonDistance', 'moonTerminator',
        'lunarPhasesStrip', 'moonriseTime', 'moonsetTime', 'moonSkyWindow',
        'hourlySparklineWrapper', 'hourlySparklineSvg', 'sparklineArea', 'sparklinePath', 'sparklinePoints', 'hourlyScroll',
        'forecastGrid', 'worldClockSearch', 'worldClockResults', 'worldClockGrid', 'toastContainer',
        // Dual-Mode Chrono Watch (Digital & Analog)
        'btnClockDigital', 'btnClockAnalog', 'heroChronoContainer', 'chronoDigitalFace', 'chronoAnalogFace',
        'analogHourHand', 'analogMinuteHand', 'analogSecondHand', 'analogDateWindow',
        'headerChronoWrapper', 'headerChronoModeToggle', 'headerChronoModeBadge',
        'headerChronoDropdownBtn', 'headerChronoStyleName', 'chronoDropdownPanel',
        // Main Website Cosmic Hub (Panchang & Horoscope)
        'headerPanchangBtn', 'headerHoroscopeBtn',
        'cosmicHubSection', 'cosmicHubTitle', 'cosmicDateDisplay', 'cosmicSamvatDisplay',
        'mainCosmicLangSwitch',
        'cosmicNavPanchang', 'cosmicNavHoroscope', 'cosmicPanchangPane', 'cosmicHoroscopePane',
        'labelNavPanchang', 'labelNavHoroscope',
        'panchangPakshaTag', 'panchangTithiName', 'panchangTithiEnds', 'panchangTithiDesc',
        'panchangVaar', 'panchangVaarDeity', 'labelVaar',
        'panchangNakshatra', 'panchangNakshatraPada', 'labelNakshatra',
        'panchangYoga', 'panchangYogaQuality', 'labelYoga',
        'panchangKarana', 'panchangKaranaSub', 'labelKarana',
        'labelMuhuratHeader', 'labelRahuKaal', 'adviceRahuKaal', 'panchangRahuTime',
        'labelAbhijit', 'adviceAbhijit', 'panchangAbhijitTime',
        'labelBrahma', 'adviceBrahma', 'panchangBrahmaTime',
        'labelYamaganda', 'adviceYamaganda', 'panchangYamaTime',
        'labelAmrit', 'adviceAmrit', 'panchangAmritTime',
        'labelGodhuli', 'adviceGodhuli', 'panchangGodhuliTime',
        'labelVikramSamvat', 'panchangVikramVal',
        'labelShakaSamvat', 'panchangShakaVal', 'labelHinduMonth', 'panchangMonthVal',
        'labelRitu', 'panchangRituVal', 'labelSunSign', 'panchangSunSign', 'labelMoonSign', 'panchangMoonSign',
        'tfBtnDaily', 'tfBtnWeekly', 'tfBtnMonthly', 'tfBtnYearly', 'horoscopeHintText',
        'zodiacSignsContainer', 'horoscopeReadingDisplay',
        'hrSignGlyph', 'hrSignName', 'hrSignDates', 'hrHarmonyScore', 'hrElementBadge', 'hrPlanetBadge', 'labelHarmony',
        'labelLuckyNum', 'hrLuckyNum', 'labelLuckyColor', 'hrLuckyColor',
        'labelRulingPlanet', 'hrPlanet', 'labelElement', 'hrElement',
        'labelGeneralPred', 'hrOverviewText', 'labelCareerPred', 'hrCareerText',
        'labelLovePred', 'hrLoveText', 'labelHealthPred', 'hrHealthText',
        'labelCompat', 'hrCompatibleSigns', 'labelGemstone', 'hrGemstone'
    ];

    ids.forEach(id => {
        dom[id] = document.getElementById(id);
    });

    dom.themeButtons = Array.from(document.querySelectorAll('.theme-btn'));
    dom.unitButtons = Array.from(document.querySelectorAll('.unit-btn'));
    dom.chronoStyleChips = Array.from(document.querySelectorAll('.chrono-style-chip'));
    dom.chronoStyleOptions = Array.from(document.querySelectorAll('.chrono-style-option'));
}

// ===== LOCAL PERSISTENCE HELPERS =====
function loadJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return JSON.parse(JSON.stringify(fallback));
        const parsed = JSON.parse(raw);
        if (Array.isArray(fallback)) return Array.isArray(parsed) ? parsed : fallback;
        return parsed && typeof parsed === 'object' ? { ...fallback, ...parsed } : fallback;
    } catch {
        return JSON.parse(JSON.stringify(fallback));
    }
}

function saveJson(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('LocalStorage save failed:', e);
    }
}

function debounce(callback, delay = 250) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function formatNumber(value, fallback = '--') {
    return Number.isFinite(value) ? Math.round(value).toString() : fallback;
}

function celsiusToDisplay(value) {
    if (!Number.isFinite(value)) return null;
    return state.settings.temperatureUnit === 'fahrenheit' ? (value * 9 / 5) + 32 : value;
}

function getTempUnitSymbol() {
    return state.settings.temperatureUnit === 'fahrenheit' ? '°F' : '°C';
}

function getWeatherMeta(code) {
    return WEATHER_CODES[Number(code)] || {
        description: 'Ambient Atmosphere',
        icon: 'sun',
        background: 'clear',
        particle: 'stars',
        message: 'Weather condition information currently being verified.',
        accent: ['#f59e0b', '#38bdf8']
    };
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    let progress = 0;
    const interval = setInterval(() => {
        progress = Math.min(100, progress + 20);
        if (dom.loadingProgress) dom.loadingProgress.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => dom.loadingScreen?.classList.add('hidden'), 180);
        }
    }, 60);
}

// ===== DATA ACQUISITION =====
function buildUrl(base, params) {
    const url = new URL(base);
    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            url.searchParams.set(key, value.join(','));
        } else if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, String(value));
        }
    });
    return url.toString();
}

async function fetchJsonWithTimeout(url, timeoutMs = 8500) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        return await response.json();
    } finally {
        clearTimeout(timeout);
    }
}

async function fetchForecast(location) {
    const url = buildUrl('https://api.open-meteo.com/v1/forecast', {
        latitude: location.lat,
        longitude: location.lon,
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'is_day',
            'precipitation',
            'weather_code',
            'cloud_cover',
            'surface_pressure',
            'wind_speed_10m',
            'wind_direction_10m',
            'wind_gusts_10m'
        ],
        hourly: ['temperature_2m', 'apparent_temperature', 'relative_humidity_2m', 'precipitation_probability', 'weather_code', 'visibility', 'wind_speed_10m'],
        daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset', 'uv_index_max', 'precipitation_probability_max'],
        timezone: 'auto',
        forecast_days: 7
    });

    return fetchJsonWithTimeout(url);
}

async function fetchAirQuality(location) {
    const url = buildUrl('https://air-quality-api.open-meteo.com/v1/air-quality', {
        latitude: location.lat,
        longitude: location.lon,
        current: ['us_aqi'],
        timezone: 'auto'
    });

    try {
        return await fetchJsonWithTimeout(url, 6000);
    } catch {
        return null;
    }
}

async function loadWeather(location, saveToRecent = false) {
    if (!location || !Number.isFinite(Number(location.lat)) || !Number.isFinite(Number(location.lon))) {
        location = DEFAULT_LOCATION;
    }
    state.location = location;
    setLoadingState(true);

    try {
        const [forecast, airQuality] = await Promise.all([
            fetchForecast(location),
            fetchAirQuality(location)
        ]);

        state.weather = forecast;
        state.airQuality = airQuality;
        if (saveToRecent) {
            addRecentSearch(location);
        }
        updateLocationBadges();
        renderWeather();
        renderForecasts();
        renderWorldClock();
        renderPanchang();
        renderHoroscope();

        showToast(`Atmosphere synchronized for ${location.name}`, 'success');
    } catch (error) {
        console.error('Weather load error:', error);
        showToast('Live weather temporarily unavailable. Showing cached data.', 'warning');
    } finally {
        setLoadingState(false);
    }
}

function setLoadingState(loading) {
    dom.mainContainer?.classList.toggle('is-loading-weather', loading);
    if (dom.refreshBtn) {
        dom.refreshBtn.classList.toggle('spin-active', loading);
    }
}

function updateLocationBadges() {
    if (!state.location) return;
    const locName = state.location.name || 'Custom Location';
    const country = state.location.country ? ` · ${state.location.country}` : '';

    if (dom.currentPlaceHeader) dom.currentPlaceHeader.textContent = `${locName}${country}`;
    if (dom.currentPlace) dom.currentPlace.textContent = `${locName}${country} (${Number(state.location.lat).toFixed(2)}, ${Number(state.location.lon).toFixed(2)})`;
}

// ===== PRIMARY WEATHER RENDERING =====
function renderWeather() {
    if (!state.weather?.current) return;

    const current = state.weather.current;
    const daily = state.weather.daily;
    const meta = getWeatherMeta(current.weather_code);

    const tempVal = celsiusToDisplay(current.temperature_2m);
    const feelsVal = celsiusToDisplay(current.apparent_temperature);
    const highVal = daily?.temperature_2m_max?.[0] ? celsiusToDisplay(daily.temperature_2m_max[0]) : null;
    const lowVal = daily?.temperature_2m_min?.[0] ? celsiusToDisplay(daily.temperature_2m_min[0]) : null;

    const humidityVal = Number.isFinite(current.relative_humidity_2m) ? Math.round(current.relative_humidity_2m) : 0;
    const windSpeedVal = Number.isFinite(current.wind_speed_10m) ? Math.round(current.wind_speed_10m) : 0;
    const windDir = Number.isFinite(current.wind_direction_10m) ? current.wind_direction_10m : 0;
    const uvVal = daily?.uv_index_max?.[0] ? parseFloat(daily.uv_index_max[0].toFixed(1)) : 0;
    const aqiVal = state.airQuality?.current?.us_aqi ? Math.round(state.airQuality.current.us_aqi) : 28;
    const visMeters = state.weather.hourly?.visibility?.[0];
    const pressureVal = Number.isFinite(current.surface_pressure) ? Math.round(current.surface_pressure) : 1013;

    // Hero Core
    animateCount(dom.temperatureLarge, { target: tempVal, duration: 900 });
    document.querySelectorAll('.temp-unit').forEach(el => el.textContent = getTempUnitSymbol());
    
    setText(dom.feelsLike, formatNumber(feelsVal));
    setText(dom.tempHigh, formatNumber(highVal));
    setText(dom.tempLow, formatNumber(lowVal));
    setText(dom.weatherDescription, meta.description);
    setText(dom.weatherMessage, meta.message);

    if (dom.weatherIconLarge) {
        dom.weatherIconLarge.innerHTML = getWeatherSvgIcon(meta.icon, 84);
    }

    // Hero Vitals Strip
    setText(dom.heroHumidity, `${humidityVal}%`);
    setText(dom.heroWind, `${windSpeedVal} km/h`);
    setText(dom.heroUv, `UV ${uvVal.toFixed(1)}`);
    setText(dom.heroAqi, `AQI ${aqiVal}`);

    // Atmospheric Details: Humidity & Dew Point
    animateCount(dom.humidity, { target: humidityVal, suffix: '%', duration: 1000 });
    animateFill(dom.humidityProgress, { targetWidth: `${clamp(humidityVal, 0, 100)}%`, duration: 1100 });
    // Approximate dew point: T - ((100 - RH) / 5)
    const dewPointCalc = current.temperature_2m - ((100 - humidityVal) / 5);
    setText(dom.dewPoint, `Dew point: ${formatNumber(celsiusToDisplay(dewPointCalc))}° · ${getHumidityComfort(humidityVal)}`);

    // Wind & Compass Rose
    animateCount(dom.windSpeed, { target: windSpeedVal, suffix: ' km/h', duration: 1000 });
    animateRotate(dom.compassNeedle, { targetRotation: windDir, duration: 1200 });
    setText(dom.windDirection, `${getCompassHeading(windDir)} (${windDir}°) · ${getWindBeaufort(windSpeedVal)}`);

    // UV Index
    animateCount(dom.uvIndex, { target: uvVal, decimals: 1, duration: 1000 });
    animateFill(dom.uvFill, { targetWidth: `${clamp((uvVal / 11) * 100, 0, 100)}%`, duration: 1100 });
    const uvData = getUvAdvisory(uvVal);
    setText(dom.uvCategory, uvData.category);
    setText(dom.uvAdvice, uvData.advice);

    // Air Quality (AQI)
    animateCount(dom.aqi, { target: aqiVal, duration: 1000 });
    const aqiOffset = 283 - clamp((aqiVal / 200) * 283, 0, 283);
    animateStroke(dom.aqiRing, { targetOffset: aqiOffset, duration: 1300 });
    const aqiData = getAqiRating(aqiVal);
    setText(dom.aqiCategory, aqiData.rating);
    if (dom.aqiRing) dom.aqiRing.style.stroke = aqiData.color;

    // Visibility
    const visKm = Number.isFinite(visMeters) ? Math.round(visMeters / 1000) : 10;
    animateCount(dom.visibility, { target: visKm, suffix: ' km', duration: 1000 });
    animateFill(dom.visibilityFill, { targetWidth: `${clamp((visKm / 20) * 100, 0, 100)}%`, duration: 1000 });
    setText(dom.visibilityClarity, getVisibilityDescription(visKm));

    // Barometric Pressure
    animateCount(dom.pressure, { target: pressureVal, suffix: ' hPa', duration: 1000 });
    animateFill(dom.pressureFill, { targetWidth: `${clamp(((pressureVal - 980) / 60) * 100, 0, 100)}%`, duration: 1000 });
    setText(dom.pressureTendency, getPressureTendency(pressureVal));

    // Update 3D Weather Orb
    updateWeatherOrb(meta.background);

    // Celestial Ephemeris
    renderSunTrack();
    renderMoonPhase();

    // Contextual Themes and Particles
    updateBackgroundTheme(meta);
    startWeatherParticles(meta.particle);

    // Update Ambient Audio if currently playing
    if (window.weatherAudio && window.weatherAudio.isPlaying) {
        window.weatherAudio.play(meta.background);
    }
}

// ===== 3D WEATHER ORB CONTROLLER =====
function updateWeatherOrb(weatherType) {
    if (!dom.weatherOrbContainer) return;

    if (!state.weatherOrbInstance && typeof WeatherOrb !== 'undefined') {
        state.weatherOrbInstance = new WeatherOrb(dom.weatherOrbContainer);
    }

    if (state.weatherOrbInstance) {
        state.weatherOrbInstance.setWeather(weatherType);
    }
}

// ===== CELESTIAL EPHEMERIS (PARABOLIC SUN ARC & MOON) =====
function renderSunTrack() {
    const daily = state.weather?.daily;
    if (!daily?.sunrise?.[0] || !daily?.sunset?.[0]) return;

    const sunrise = new Date(daily.sunrise[0]);
    const sunset = new Date(daily.sunset[0]);
    const now = new Date();

    // Astronomical Milestones: Dawn, Sunrise, Solar Noon, Sunset, Dusk
    const solarNoon = new Date((sunrise.getTime() + sunset.getTime()) / 2);
    const dawn = new Date(sunrise.getTime() - 28 * 60 * 1000);
    const dusk = new Date(sunset.getTime() + 28 * 60 * 1000);

    setText(dom.dawnTime, formatClockTime(dawn));
    setText(dom.sunriseTime, formatClockTime(sunrise));
    setText(dom.solarNoonTime, formatClockTime(solarNoon));
    setText(dom.sunsetTime, formatClockTime(sunset));
    setText(dom.duskTime, formatClockTime(dusk));

    const isDay = now >= sunrise && now <= sunset;
    const totalDaylightMs = sunset - sunrise;
    const elapsedDaylightMs = now - sunrise;
    const progress = clamp(elapsedDaylightMs / totalDaylightMs, 0, 1);

    // Parabolic daytime curve: P0=(30,125), P1=(270,15), P2=(510,125)
    // Nocturnal subterranean curve: P0=(510,125), P1=(270,180), P2=(30,125)
    let x, y, elevation, azimuth;

    if (isDay) {
        const t = progress;
        x = Math.round((1 - t) * (1 - t) * 30 + 2 * (1 - t) * t * 270 + t * t * 510);
        y = Math.round((1 - t) * (1 - t) * 125 + 2 * (1 - t) * t * 15 + t * t * 125);
        elevation = Math.sin(t * Math.PI) * 64.5;
        azimuth = 90 + t * 180;
        
        setText(dom.solarElevation, `Alt: +${elevation.toFixed(1)}° · Az: ${Math.round(azimuth)}°`);

        if (dom.sunAltitudeBeam) {
            dom.sunAltitudeBeam.setAttribute('x1', x);
            dom.sunAltitudeBeam.setAttribute('y1', y);
            dom.sunAltitudeBeam.setAttribute('x2', x);
            dom.sunAltitudeBeam.setAttribute('y2', 125);
            dom.sunAltitudeBeam.style.opacity = '1';
        }
    } else {
        const prevSunset = now < sunrise ? new Date(sunset.getTime() - 86400000) : sunset;
        const nextSunrise = now < sunrise ? sunrise : new Date(sunrise.getTime() + 86400000);
        const nightProgress = clamp((now - prevSunset) / (nextSunrise - prevSunset), 0, 1);
        const t = nightProgress;
        x = Math.round((1 - t) * (1 - t) * 510 + 2 * (1 - t) * t * 270 + t * t * 30);
        y = Math.round((1 - t) * (1 - t) * 125 + 2 * (1 - t) * t * 180 + t * t * 125);
        elevation = -Math.sin(t * Math.PI) * 52.0;
        azimuth = (270 + t * 180) % 360;

        setText(dom.solarElevation, `Alt: ${elevation.toFixed(1)}° (Nocturnal)`);

        if (dom.sunAltitudeBeam) {
            dom.sunAltitudeBeam.style.opacity = '0';
        }
    }

    if (dom.sunIndicator) {
        dom.sunIndicator.style.transform = `translate(${x}px, ${y}px)`;
        const glowCircle = dom.sunIndicator.querySelector('.sun-marker-glow');
        if (glowCircle) glowCircle.style.opacity = isDay ? '1' : '0.35';
    }

    // Daylight Exposure Meter
    const dayHours = Math.floor(totalDaylightMs / (1000 * 60 * 60));
    const dayMins = Math.floor((totalDaylightMs % (1000 * 60 * 60)) / (1000 * 60));

    if (isDay) {
        const elapsedHrs = Math.floor(elapsedDaylightMs / (1000 * 60 * 60));
        const elapsedMins = Math.floor((elapsedDaylightMs % (1000 * 60 * 60)) / (1000 * 60));
        const pct = Math.round(progress * 100);
        setText(dom.daylightProgressText, `Daylight: ${elapsedHrs}h ${elapsedMins}m elapsed of ${dayHours}h ${dayMins}m total`);
        setText(dom.daylightProgressPct, `${pct}%`);
        if (dom.daylightProgressBar) dom.daylightProgressBar.style.width = `${pct}%`;
    } else {
        setText(dom.daylightProgressText, `Total Daylight: ${dayHours}h ${dayMins}m · Sun Below Horizon`);
        const pct = now < sunrise ? 0 : 100;
        setText(dom.daylightProgressPct, `${pct}%`);
        if (dom.daylightProgressBar) dom.daylightProgressBar.style.width = `${pct}%`;
    }

    // Countdown Badge
    if (dom.sunCountdown) {
        if (isDay) {
            const msUntilSunset = sunset - now;
            const hrs = Math.floor(msUntilSunset / (1000 * 60 * 60));
            const mins = Math.floor((msUntilSunset % (1000 * 60 * 60)) / (1000 * 60));
            dom.sunCountdown.textContent = `Sunset in ${hrs}h ${mins}m`;
        } else {
            const nextRise = now > sunset ? new Date(daily.sunrise[1] || sunrise.getTime() + 86400000) : sunrise;
            const msUntilSunrise = nextRise - now;
            const hrs = Math.floor(msUntilSunrise / (1000 * 60 * 60));
            const mins = Math.floor((msUntilSunrise % (1000 * 60 * 60)) / (1000 * 60));
            dom.sunCountdown.textContent = `Sunrise in ${hrs}h ${mins}m`;
        }
    }

    // Astronomical Status & Local Sidereal Time
    if (dom.celestialStatusText) {
        if (isDay) {
            if (progress > 0.44 && progress < 0.56) {
                dom.celestialStatusText.textContent = 'Solar Apex · High Altitude Transit';
            } else if (progress < 0.12 || progress > 0.88) {
                dom.celestialStatusText.textContent = 'Golden Hour Horizon Passage';
            } else {
                dom.celestialStatusText.textContent = 'Heliocentric Daylight Transit';
            }
        } else {
            dom.celestialStatusText.textContent = 'Subterranean Nocturnal Transit';
        }
    }

    // Compute approximate Local Sidereal Time (LST)
    if (dom.celestialSidereal) {
        const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
        const lon = state.location?.lon || 0;
        const d = (now - new Date('2000-01-01T12:00:00Z')) / 86400000;
        const gmst = (18.697374558 + 24.06570982441908 * d) % 24;
        const lst = (gmst + lon / 15 + 24) % 24;
        const lstH = Math.floor(lst);
        const lstM = Math.floor((lst % 1) * 60);
        dom.celestialSidereal.textContent = `LST: ${String(lstH).padStart(2, '0')}:${String(lstM).padStart(2, '0')}`;
    }
}

function renderMoonPhase() {
    const now = new Date();
    const moon = computeMoonPhase(now);

    setText(dom.moonPhase, moon.name);
    setText(dom.moonIllumination, `${moon.illumination}%`);
    setText(dom.moonIlluminationBadge, `${moon.illumination}% Illuminated`);
    setText(dom.moonAgeText, `Age: ${moon.age.toFixed(1)} days · Cycle Day ${Math.ceil(moon.age)} of 29.5`);
    setText(dom.nextFullMoon, moon.nextMilestone);
    setText(dom.moonZodiac, `Transit: ${moon.zodiac}`);
    setText(dom.moonDistance, `Orbit: ${moon.distance} · Zenith: ${moon.zenithTime}`);
    setText(dom.moonriseTime, moon.moonrise);
    setText(dom.moonsetTime, moon.moonset);
    setText(dom.moonSkyWindow, moon.visibilityWindow);

    if (dom.moonIllumFill) dom.moonIllumFill.style.width = `${moon.illumination}%`;

    // Dynamic 3D Moon Shadow Mask Transform
    if (dom.moonShadowMask) {
        const maskShift = (1 - (moon.illumination / 100)) * 85;
        dom.moonShadowMask.style.transform = `translateX(${moon.isWaxing ? maskShift : -maskShift}%)`;
    }

    // Highlight active phase in the 8-phase synodic rail
    if (dom.lunarPhasesStrip) {
        const steps = dom.lunarPhasesStrip.querySelectorAll('.synodic-phase-step');
        steps.forEach((step) => {
            const phaseIndex = parseInt(step.dataset.phase);
            step.classList.toggle('active', phaseIndex === moon.index);
        });
    }
}

function computeMoonPhase(date) {
    const knownNewMoon = new Date('2000-01-06T18:14:00Z');
    const lunarCycle = 29.530588853;
    const days = (date - knownNewMoon) / 86400000;
    const age = ((days % lunarCycle) + lunarCycle) % lunarCycle;
    const index = Math.floor((age / lunarCycle) * 8 + 0.5) % 8;
    const illumination = Math.round((1 - Math.cos((age / lunarCycle) * 2 * Math.PI)) * 50);

    const phases = [
        'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
        'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'
    ];

    const fullMoonAge = lunarCycle / 2;
    const isWaxing = age <= fullMoonAge;
    const daysToFull = Math.round(age <= fullMoonAge ? (fullMoonAge - age) : (lunarCycle - age + fullMoonAge));
    const daysToNew = Math.round(lunarCycle - age);

    // Milestone calculation
    let nextMilestone;
    if (age < 7.38) {
        nextMilestone = `First Quarter in ~${Math.round(7.38 - age)} days`;
    } else if (age < 14.76) {
        nextMilestone = `Full Moon in ~${daysToFull} days`;
    } else if (age < 22.15) {
        nextMilestone = `Last Quarter in ~${Math.round(22.15 - age)} days`;
    } else {
        nextMilestone = `New Moon in ~${daysToNew} days`;
    }

    // Lunar distance variation in km (Perigee ~363,300 km to Apogee ~405,500 km)
    const anomalisticCycle = 27.55455;
    const dist = Math.round(384400 - 21100 * Math.cos((days / anomalisticCycle) * 2 * Math.PI));
    const distState = dist < 370000 ? 'Perigee' : (dist > 398000 ? 'Apogee' : 'Mean Orbit');
    const distanceStr = `${dist.toLocaleString()} km · ${distState}`;

    // Lunar Zodiac Constellation Transit (sidereal orbit = 27.32166 days)
    const zodiacSigns = [
        'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋',
        'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏',
        'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
    ];
    const zodiacIndex = Math.floor(((days % 27.32166 + 27.32166) % 27.32166 / 27.32166) * 12);
    const zodiac = zodiacSigns[zodiacIndex] || 'Taurus ♉';

    // Estimated Moonrise & Moonset based on synodic phase offset
    const moonriseHour = Math.floor((6 + (age / lunarCycle) * 24) % 24);
    const moonsetHour = Math.floor((moonriseHour + 12.4) % 24);
    const moonriseStr = `${String(moonriseHour).padStart(2, '0')}:15`;
    const moonsetStr = `${String(moonsetHour).padStart(2, '0')}:40`;

    // Night visibility window
    const visibilityWindow = illumination > 70 ? 'All Night Long' : (isWaxing ? 'Evening Sky' : 'Late Night / Dawn');
    const zenithHour = Math.floor((moonriseHour + 6.2) % 24);
    const zenithStr = `${String(zenithHour).padStart(2, '0')}:30`;

    return {
        name: phases[index],
        index,
        age,
        illumination,
        isWaxing,
        daysToFull,
        nextMilestone,
        distance: distanceStr,
        zodiac,
        moonrise: moonriseStr,
        moonset: moonsetStr,
        zenithTime: zenithStr,
        visibilityWindow
    };
}

// ===== FORECAST RENDERING (SPARKLINE & SPECTRUM BARS) =====
function renderForecasts() {
    renderHourlyForecast();
    renderDailyForecast();
}

function renderHourlyForecast() {
    const hourly = state.weather?.hourly;
    if (!hourly?.time?.length || !dom.hourlyScroll) return;

    const now = Date.now();
    const items = hourly.time
        .map((time, index) => ({
            time,
            date: new Date(time),
            temp: hourly.temperature_2m?.[index],
            code: hourly.weather_code?.[index],
            rainProb: hourly.precipitation_probability?.[index]
        }))
        .filter(item => item.date.getTime() >= now - 3600000)
        .slice(0, 24);

    if (!items.length) return;

    // Render SVG temperature sparkline curve
    renderHourlySparkline(items);

    // Render interactive cards
    dom.hourlyScroll.innerHTML = items.map((item, idx) => {
        const meta = getWeatherMeta(item.code);
        const temp = celsiusToDisplay(item.temp);
        const isNow = idx === 0;

        return `
            <article class="hourly-card fade-in" aria-label="${formatClockTime(item.date)} ${meta.description}">
                <div class="hourly-time">${isNow ? 'Now' : formatClockTime(item.date)}</div>
                <div class="hourly-icon">${getWeatherSvgIcon(meta.icon, 38)}</div>
                <div class="hourly-temp">${formatNumber(temp)}°</div>
                <div class="hourly-rain-chip">
                    <svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                    <span>${Number.isFinite(item.rainProb) ? `${Math.round(item.rainProb)}%` : '0%'}</span>
                </div>
            </article>
        `;
    }).join('');
}

function renderHourlySparkline(items) {
    if (!dom.sparklinePath || !dom.sparklineArea || !dom.sparklinePoints) return;

    const temps = items.map(i => i.temp).filter(Number.isFinite);
    if (!temps.length) return;

    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const range = (max - min) || 1;

    const width = 1000;
    const height = 80;
    const padding = 20;

    const points = items.map((item, idx) => {
        const x = (idx / (items.length - 1)) * (width - 40) + 20;
        const norm = (item.temp - min) / range;
        const y = height - padding - (norm * (height - padding * 2));
        return { x, y, temp: item.temp };
    });

    // Build smooth cubic bezier curve
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cx = (p0.x + p1.x) / 2;
        d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    dom.sparklinePath.setAttribute('d', d);
    dom.sparklineArea.setAttribute('d', `${d} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`);

    // Render hover interactive points
    dom.sparklinePoints.innerHTML = points.map(p => `
        <circle class="sparkline-point" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}">
            <title>${formatNumber(celsiusToDisplay(p.temp))}°</title>
        </circle>
    `).join('');
}

function renderDailyForecast() {
    const daily = state.weather?.daily;
    if (!daily?.time?.length || !dom.forecastGrid) return;

    const days = daily.time.slice(0, 7).map((time, index) => ({
        date: new Date(`${time}T12:00:00`),
        code: daily.weather_code?.[index],
        high: daily.temperature_2m_max?.[index],
        low: daily.temperature_2m_min?.[index],
        rain: daily.precipitation_probability_max?.[index]
    }));

    // Compute weekly absolute min and max for spectrum bars
    const weekLows = days.map(d => d.low).filter(Number.isFinite);
    const weekHighs = days.map(d => d.high).filter(Number.isFinite);
    const weekMin = Math.min(...weekLows);
    const weekMax = Math.max(...weekHighs);
    const weekRange = (weekMax - weekMin) || 1;

    const currentTemp = state.weather?.current?.temperature_2m;

    dom.forecastGrid.innerHTML = days.map((day, idx) => {
        const meta = getWeatherMeta(day.code);
        const isToday = idx === 0;
        const lowDisp = celsiusToDisplay(day.low);
        const highDisp = celsiusToDisplay(day.high);

        // Calculate Spectrum Bar Percentage Positions
        const leftPercent = clamp(((day.low - weekMin) / weekRange) * 100, 0, 100);
        const widthPercent = clamp(((day.high - day.low) / weekRange) * 100, 6, 100);
        const pipPercent = Number.isFinite(currentTemp) ? clamp(((currentTemp - weekMin) / weekRange) * 100, 0, 100) : null;

        return `
            <article class="daily-card ${isToday ? 'today' : ''} slide-up" aria-label="${formatDate(day.date)} ${meta.description}">
                <div class="daily-card-header">
                    <div>
                        <span class="daily-day-title">${formatDate(day.date, { weekday: 'short' })}</span>
                        ${isToday ? '<span class="today-tag">Today</span>' : ''}
                    </div>
                    <span class="daily-date-sub">${formatDate(day.date, { month: 'short', day: 'numeric' })}</span>
                </div>

                <div class="daily-condition-row">
                    <div class="daily-condition-info">
                        <div class="daily-icon">${getWeatherSvgIcon(meta.icon, 36)}</div>
                        <span class="daily-desc">${meta.description}</span>
                    </div>
                    <div class="hourly-rain-chip">
                        <svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                        <span>${Number.isFinite(day.rain) ? `${Math.round(day.rain)}%` : '0%'}</span>
                    </div>
                </div>

                <!-- Horizontal Temperature Range Spectrum Bar -->
                <div class="forecast-spectrum-row">
                    <span class="spectrum-temp-low">${formatNumber(lowDisp)}°</span>
                    <div class="spectrum-bar-track">
                        <div class="spectrum-bar-fill" style="left: ${leftPercent.toFixed(1)}%; width: ${widthPercent.toFixed(1)}%;"></div>
                        ${(isToday && pipPercent !== null) ? `<div class="spectrum-bar-pip" style="left: ${pipPercent.toFixed(1)}%;" title="Current: ${formatNumber(celsiusToDisplay(currentTemp))}°"></div>` : ''}
                    </div>
                    <span class="spectrum-temp-high">${formatNumber(highDisp)}°</span>
                </div>
            </article>
        `;
    }).join('');
}

// ===== WORLD CLOCK HUB =====
function renderWorldClock() {
    if (!dom.worldClockGrid) return;
    const now = new Date();
    const userOffsetMins = -now.getTimezoneOffset();

    dom.worldClockGrid.innerHTML = state.worldClocks.map((city) => {
        try {
            const timeStr = now.toLocaleTimeString([], {
                timeZone: city.timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: !state.settings.timeFormat24
            });

            const dateStr = now.toLocaleDateString([], {
                timeZone: city.timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });

            // Calculate hour difference relative to user
            const targetHour = parseInt(now.toLocaleTimeString('en-US', { timeZone: city.timezone, hour: 'numeric', hour12: false }));
            const userHour = now.getHours();
            let diff = targetHour - userHour;
            if (diff > 12) diff -= 24;
            if (diff < -12) diff += 24;
            const offsetLabel = diff === 0 ? 'Same time' : (diff > 0 ? `+${diff}h` : `${diff}h`);

            return `
                <article class="world-clock-card" aria-label="${escapeHtml(city.name)} local time">
                    <button class="remove-clock" type="button" aria-label="Remove ${escapeHtml(city.name)}" data-timezone="${escapeHtml(city.timezone)}">×</button>
                    <div class="world-clock-header">
                        <span class="world-clock-city">${escapeHtml(city.name)}</span>
                        <span class="world-offset-badge">${offsetLabel}</span>
                    </div>
                    <div class="world-clock-time">${timeStr}</div>
                    <div class="world-clock-date">${dateStr}</div>
                </article>
            `;
        } catch {
            return '';
        }
    }).join('');

    dom.worldClockGrid.querySelectorAll('.remove-clock').forEach(btn => {
        btn.addEventListener('click', () => removeWorldClock(btn.dataset.timezone));
    });
}

function addWorldClock(clock) {
    if (state.worldClocks.some(c => c.timezone === clock.timezone)) {
        showToast('This city is already pinned to your hub.', 'warning');
        return;
    }
    state.worldClocks.push(clock);
    saveJson(STORAGE_KEYS.worldClocks, state.worldClocks);
    renderWorldClock();
    showToast(`Added ${clock.name} to World Clocks`, 'success');
}

function removeWorldClock(timezone) {
    state.worldClocks = state.worldClocks.filter(c => c.timezone !== timezone);
    saveJson(STORAGE_KEYS.worldClocks, state.worldClocks);
    renderWorldClock();
}

function initWorldClockSearch() {
    renderWorldClock();
    clearInterval(state.worldClockTimer);
    state.worldClockTimer = setInterval(renderWorldClock, 15000);

    dom.worldClockSearch?.addEventListener('input', debounce((e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
            if (dom.worldClockResults) dom.worldClockResults.innerHTML = '';
            return;
        }

        const matches = TIMEZONE_CHOICES.filter(c => 
            c.name.toLowerCase().includes(query) || c.timezone.toLowerCase().includes(query)
        ).slice(0, 5);

        renderWorldClockSearchResults(matches);
    }, 200));

    // Quick Add Chips
    document.querySelectorAll('.quick-city-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            addWorldClock({ name: chip.dataset.city, timezone: chip.dataset.tz });
        });
    });
}

function renderWorldClockSearchResults(results) {
    if (!dom.worldClockResults) return;
    dom.worldClockResults.innerHTML = results.map(item => `
        <button class="timezone-result" type="button" data-name="${escapeHtml(item.name)}" data-tz="${escapeHtml(item.timezone)}">
            <span class="result-name">${escapeHtml(item.name)}</span>
            <span>${escapeHtml(item.timezone)}</span>
        </button>
    `).join('');

    dom.worldClockResults.querySelectorAll('.timezone-result').forEach(btn => {
        btn.addEventListener('click', () => {
            addWorldClock({ name: btn.dataset.name, timezone: btn.dataset.tz });
            dom.worldClockResults.innerHTML = '';
            if (dom.worldClockSearch) dom.worldClockSearch.value = '';
        });
    });
}

// ===== DIGITAL CLOCK & GREETING =====
function updateClock() {
    const now = new Date();
    let hoursNum = now.getHours();
    let period = '';

    if (!state.settings.timeFormat24) {
        period = hoursNum >= 12 ? 'PM' : 'AM';
        hoursNum = hoursNum % 12 || 12;
    }

    const nextDigits = {
        hours: String(hoursNum).padStart(2, '0'),
        minutes: String(now.getMinutes()).padStart(2, '0'),
        seconds: String(now.getSeconds()).padStart(2, '0')
    };

    Object.entries(nextDigits).forEach(([key, val]) => {
        if (state.lastClockDigits[key] !== val && dom[key]) {
            dom[key].textContent = val;
            dom[key].classList.remove('digit-pop');
            void dom[key].offsetWidth;
            dom[key].classList.add('digit-pop');
            state.lastClockDigits[key] = val;
        }
    });

    if (dom.timePeriod) dom.timePeriod.textContent = period;

    setText(dom.heroDate, formatDate(now, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }));

    updateGreeting();

    if (now.getSeconds() === 0 && state.weather) {
        renderSunTrack();
    }
}

function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good Night';
    if (hour >= 5 && hour < 12) greeting = 'Good Morning';
    else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
    else if (hour >= 17 && hour < 22) greeting = 'Good Evening';

    const place = state.location?.name ? `, ${state.location.name}` : '';
    const desc = state.weather?.current ? ` · ${getWeatherMeta(state.weather.current.weather_code).description}` : '';
    setText(dom.greeting, `${greeting}${place}${desc}`);
}

let analogSweepRaf = null;

function updateAnalogClock(now = new Date()) {
    if (!dom.analogHourHand || !dom.analogMinuteHand || !dom.analogSecondHand) return;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ms = now.getMilliseconds();

    const secondDeg = ((seconds + ms / 1000) / 60) * 360;
    const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
    const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

    dom.analogHourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    dom.analogMinuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    dom.analogSecondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;

    if (dom.analogDateWindow) {
        dom.analogDateWindow.textContent = now.getDate();
    }
}

function startAnalogSweep() {
    if (state.settings.clockMode !== 'analog') return;
    updateAnalogClock(new Date());
    analogSweepRaf = requestAnimationFrame(startAnalogSweep);
}

function stopAnalogSweep() {
    if (analogSweepRaf) {
        cancelAnimationFrame(analogSweepRaf);
        analogSweepRaf = null;
    }
}

const CHRONO_STYLES = ['cyber', 'swiss', 'bauhaus', 'amber', 'tokyo', 'cosmic', 'matrix', 'aviator'];
const CHRONO_STYLE_LABELS = {
    cyber: 'Cyber Neo',
    swiss: 'Swiss Luxury',
    bauhaus: 'Bauhaus',
    amber: 'Amber CRT',
    tokyo: 'Tokyo Arcade',
    cosmic: 'Cosmic Astrolabe',
    matrix: 'Matrix Cascade',
    aviator: 'Aviator Flieger'
};

function setClockMode(mode) {
    if (!['digital', 'analog'].includes(mode)) mode = 'digital';
    state.settings.clockMode = mode;
    saveJson(STORAGE_KEYS.settings, state.settings);

    if (dom.heroChronoContainer) {
        dom.heroChronoContainer.classList.remove('mode-digital', 'mode-analog');
        dom.heroChronoContainer.classList.add(`mode-${mode}`);
    }

    if (dom.headerChronoModeBadge) {
        dom.headerChronoModeBadge.textContent = mode.toUpperCase();
    }

    dom.btnClockDigital?.classList.toggle('active', mode === 'digital');
    dom.btnClockAnalog?.classList.toggle('active', mode === 'analog');

    if (mode === 'analog') {
        startAnalogSweep();
    } else {
        stopAnalogSweep();
    }
}

function setClockStyle(style) {
    if (!CHRONO_STYLES.includes(style)) style = 'cyber';
    state.settings.clockStyle = style;
    saveJson(STORAGE_KEYS.settings, state.settings);

    if (dom.heroChronoContainer) {
        CHRONO_STYLES.forEach(s => dom.heroChronoContainer.classList.remove(`style-${s}`));
        dom.heroChronoContainer.classList.add(`style-${style}`);
    }

    if (dom.headerChronoStyleName) {
        dom.headerChronoStyleName.textContent = CHRONO_STYLE_LABELS[style] || 'Cyber';
    }

    if (dom.chronoStyleOptions) {
        dom.chronoStyleOptions.forEach(opt => {
            opt.classList.toggle('active', opt.dataset.style === style);
        });
    }

    if (dom.chronoStyleChips) {
        dom.chronoStyleChips.forEach(chip => {
            chip.classList.toggle('active', chip.dataset.style === style);
        });
    }

    // Dynamic dial indices tailored for each distinct watch face & typography
    const ring = document.getElementById('analogIndicesRing');
    if (ring) {
        if (style === 'swiss') {
            ring.innerHTML = `
                <span class="dial-mark mark-12">XII</span>
                <span class="dial-mark mark-3">III</span>
                <span class="dial-mark mark-6">VI</span>
                <span class="dial-mark mark-9">IX</span>
            `;
        } else if (style === 'amber') {
            ring.innerHTML = `
                <span class="dial-mark mark-12">12</span>
                <span class="dial-mark mark-3">03</span>
                <span class="dial-mark mark-6">06</span>
                <span class="dial-mark mark-9">09</span>
            `;
        } else if (style === 'bauhaus') {
            ring.innerHTML = `
                <span class="dial-mark mark-12">|</span>
                <span class="dial-mark mark-3">|</span>
                <span class="dial-mark mark-6">|</span>
                <span class="dial-mark mark-9">|</span>
            `;
        } else if (style === 'tokyo') {
            ring.innerHTML = `
                <span class="dial-mark mark-12">十二</span>
                <span class="dial-mark mark-3">三</span>
                <span class="dial-mark mark-6">六</span>
                <span class="dial-mark mark-9">九</span>
            `;
        } else if (style === 'cosmic') {
            ring.innerHTML = `
                <span class="dial-mark mark-12">★</span>
                <span class="dial-mark mark-3">◆</span>
                <span class="dial-mark mark-6">▲</span>
                <span class="dial-mark mark-9">●</span>
            `;
        } else if (style === 'matrix') {
            ring.innerHTML = `
                <span class="dial-mark mark-12">00</span>
                <span class="dial-mark mark-3">15</span>
                <span class="dial-mark mark-6">30</span>
                <span class="dial-mark mark-9">45</span>
            `;
        } else if (style === 'aviator') {
            ring.innerHTML = `
                <span class="dial-mark mark-12">▲</span>
                <span class="dial-mark mark-3">3</span>
                <span class="dial-mark mark-6">6</span>
                <span class="dial-mark mark-9">9</span>
            `;
        } else {
            // Default cyber
            ring.innerHTML = `
                <span class="dial-mark mark-12">12</span>
                <span class="dial-mark mark-3">3</span>
                <span class="dial-mark mark-6">6</span>
                <span class="dial-mark mark-9">9</span>
            `;
        }
    }
}

function initClock() {
    updateClock();
    clearInterval(state.clockTimer);
    state.clockTimer = setInterval(updateClock, 1000);

    // Header A/D Mode Toggle Button
    dom.headerChronoModeToggle?.addEventListener('click', () => {
        const nextMode = (state.settings.clockMode || 'digital') === 'digital' ? 'analog' : 'digital';
        setClockMode(nextMode);
    });

    // Header Watch Subtype Dropdown Open/Close
    dom.headerChronoDropdownBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dom.chronoDropdownPanel?.classList.toggle('open');
        dom.headerChronoWrapper?.classList.toggle('active-open', !!isOpen);
    });

    // Close Dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!dom.headerChronoWrapper?.contains(e.target)) {
            dom.chronoDropdownPanel?.classList.remove('open');
            dom.headerChronoWrapper?.classList.remove('active-open');
        }
    });

    // Watch Style Options in Dropdown
    if (dom.chronoStyleOptions) {
        dom.chronoStyleOptions.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                setClockStyle(opt.dataset.style);
                dom.chronoDropdownPanel?.classList.remove('open');
                dom.headerChronoWrapper?.classList.remove('active-open');
            });
        });
    }

    // Legacy support for direct buttons if present
    dom.btnClockDigital?.addEventListener('click', () => setClockMode('digital'));
    dom.btnClockAnalog?.addEventListener('click', () => setClockMode('analog'));
    if (dom.chronoStyleChips) {
        dom.chronoStyleChips.forEach(chip => {
            chip.addEventListener('click', () => setClockStyle(chip.dataset.style));
        });
    }

    // Restore saved clock settings
    setClockMode(state.settings.clockMode || 'digital');
    setClockStyle(state.settings.clockStyle || 'cyber');
}

// ===== PARTICLE SIMULATION ENGINE =====
function startWeatherParticles(type = 'stars') {
    stopWeatherParticles();
    if (!state.settings.particles || !dom.particlesContainer) return;

    const intervalMs = type === 'rain' ? 65 : type === 'snow' ? 180 : 350;
    state.particleTimer = setInterval(() => createParticle(type), intervalMs);
}

function stopWeatherParticles() {
    clearInterval(state.particleTimer);
    state.particleTimer = null;
    if (dom.particlesContainer) dom.particlesContainer.innerHTML = '';
}

function createParticle(type) {
    if (!dom.particlesContainer || document.hidden) return;
    const p = document.createElement('span');
    p.className = `particle particle-${type}`;
    p.style.left = `${Math.random() * 100}%`;

    if (type === 'rain') {
        p.style.setProperty('--drift', `${Math.random() * 40 - 20}px`);
        p.style.setProperty('--duration', `${0.45 + Math.random() * 0.35}s`);
    } else if (type === 'snow') {
        p.style.setProperty('--drift-mid', `${Math.random() * 60 - 30}px`);
        p.style.setProperty('--drift-end', `${Math.random() * 100 - 50}px`);
        p.style.setProperty('--duration', `${4 + Math.random() * 4}s`);
        p.style.width = `${Math.random() * 4 + 2}px`;
        p.style.height = p.style.width;
    } else {
        p.style.setProperty('--drift', `${Math.random() * 80 - 40}px`);
        p.style.setProperty('--duration', `${6 + Math.random() * 6}s`);
        p.style.width = `${Math.random() * 3 + 1.5}px`;
        p.style.height = p.style.width;
    }

    dom.particlesContainer.appendChild(p);
    setTimeout(() => p.remove(), 10000);
}

// ===== CONTEXTUAL THEMING & ATMOSPHERIC LAYERS =====
function updateBackgroundTheme(meta) {
    if (!meta) return;
    const body = document.body;

    body.classList.remove('weather-clear', 'weather-clouds', 'weather-rain', 'weather-snow', 'weather-storm', 'weather-fog');
    body.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night');

    if (state.settings.backgroundEffects) {
        body.classList.add(`weather-${meta.background}`);
    }

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) body.classList.add('theme-morning');
    else if (hour >= 12 && hour < 17) body.classList.add('theme-afternoon');
    else if (hour >= 17 && hour < 21) body.classList.add('theme-evening');
    else body.classList.add('theme-night');

    if (meta.accent) {
        body.style.setProperty('--accent-primary', meta.accent[0]);
        body.style.setProperty('--accent-secondary', meta.accent[1]);
    }
}

// ===== SEARCH & AUTOCOMPLETE =====
function initSearch() {
    dom.searchToggle?.addEventListener('click', openSearchDrawer);
    dom.closeSearch?.addEventListener('click', closeSearchDrawer);
    dom.detectLocationBtn?.addEventListener('click', () => {
        closeSearchDrawer();
        detectUserLocation(true);
    });
    dom.clearSearch?.addEventListener('click', () => {
        if (dom.citySearch) {
            dom.citySearch.value = '';
            dom.citySearch.focus();
        }
        renderRecentSearches();
    });

    dom.citySearch?.addEventListener('input', debounce((e) => {
        const query = e.target.value.trim();
        if (!query) {
            renderRecentSearches();
            return;
        }
        searchGeoLocations(query);
    }, 280));

    // Keyboard Navigation in Search
    dom.citySearch?.addEventListener('keydown', (e) => {
        const items = dom.searchResults?.querySelectorAll('.search-result');
        if (!items || !items.length) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            state.selectedSearchIndex = (state.selectedSearchIndex + 1) % items.length;
            highlightSearchResult(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            state.selectedSearchIndex = (state.selectedSearchIndex - 1 + items.length) % items.length;
            highlightSearchResult(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (state.selectedSearchIndex >= 0 && items[state.selectedSearchIndex]) {
                items[state.selectedSearchIndex].click();
            }
        }
    });
}

function openSearchDrawer() {
    closeSettingsDrawer();
    dom.searchPanel?.classList.add('open');
    dom.drawerBackdrop?.classList.add('active');
    setTimeout(() => dom.citySearch?.focus(), 150);
    renderRecentSearches();
}

function closeSearchDrawer() {
    dom.searchPanel?.classList.remove('open');
    if (!dom.settingsPanel?.classList.contains('open')) {
        dom.drawerBackdrop?.classList.remove('active');
    }
}

async function searchGeoLocations(query) {
    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`);
        const data = await res.json();
        renderSearchResults(data.results || []);
    } catch {
        renderSearchResults([]);
    }
}

function renderSearchResults(results) {
    if (!dom.searchResults) return;
    state.selectedSearchIndex = -1;

    if (!results.length) {
        dom.searchResults.innerHTML = '<div class="card-subtext" style="padding: 1rem 0;">No matching locations found.</div>';
        return;
    }

    dom.searchResults.innerHTML = results.map(loc => {
        const admin = [loc.admin1, loc.country].filter(Boolean).join(', ');
        return `
            <button class="search-result" type="button" data-name="${escapeHtml(loc.name)}" data-country="${escapeHtml(loc.country || '')}" data-lat="${loc.latitude}" data-lon="${loc.longitude}">
                <span class="result-name">${escapeHtml(loc.name)}</span>
                <span class="result-meta">${escapeHtml(admin)}</span>
            </button>
        `;
    }).join('');

    dom.searchResults.querySelectorAll('.search-result').forEach(btn => {
        btn.addEventListener('click', () => {
            const loc = {
                name: btn.dataset.name,
                country: btn.dataset.country,
                lat: parseFloat(btn.dataset.lat),
                lon: parseFloat(btn.dataset.lon)
            };
            loadWeather(loc, true);
            closeSearchDrawer();
        });
    });
}

function renderRecentSearches() {
    if (!dom.searchResults) return;
    if (!state.recentSearches.length) {
        dom.searchResults.innerHTML = '<div class="card-subtext" style="padding: 1rem 0;">Type a city name or coordinates above.</div>';
        return;
    }

    dom.searchResults.innerHTML = `
        <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 0.5rem; font-weight: 700;">Recent Searches</div>
        ${state.recentSearches.map(loc => `
            <button class="search-result" type="button" data-name="${escapeHtml(loc.name)}" data-country="${escapeHtml(loc.country || '')}" data-lat="${loc.lat}" data-lon="${loc.lon}">
                <span class="result-name">${escapeHtml(loc.name)}</span>
                <span class="result-meta">${escapeHtml(loc.country || '')}</span>
            </button>
        `).join('')}
    `;

    dom.searchResults.querySelectorAll('.search-result').forEach(btn => {
        btn.addEventListener('click', () => {
            loadWeather({
                name: btn.dataset.name,
                country: btn.dataset.country,
                lat: parseFloat(btn.dataset.lat),
                lon: parseFloat(btn.dataset.lon)
            }, true);
            closeSearchDrawer();
        });
    });
}

function highlightSearchResult(items) {
    items.forEach((item, idx) => {
        item.classList.toggle('active', idx === state.selectedSearchIndex);
    });
}

function addRecentSearch(location) {
    if (!location.name) return;
    state.recentSearches = [
        location,
        ...state.recentSearches.filter(l => l.name !== location.name)
    ].slice(0, 5);
    saveJson(STORAGE_KEYS.recentSearches, state.recentSearches);
}

// ===== SETTINGS & CONTROLS =====
function initSettings() {
    dom.settingsToggle?.addEventListener('click', openSettingsDrawer);
    dom.closeSettings?.addEventListener('click', closeSettingsDrawer);
    dom.drawerBackdrop?.addEventListener('click', () => {
        closeSearchDrawer();
        closeSettingsDrawer();
    });

    // Theme Switcher
    dom.themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            state.settings.theme = btn.dataset.theme;
            applySettings();
            syncSettingsUi();
        });
    });

    // Unit Switcher
    dom.unitButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            state.settings.temperatureUnit = btn.dataset.unit;
            applySettings();
            syncSettingsUi();
            renderWeather();
            renderForecasts();
        });
    });

    // Inline Unit Toggle in Header
    dom.unitToggleInline?.addEventListener('click', () => {
        state.settings.temperatureUnit = state.settings.temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';
        applySettings();
        syncSettingsUi();
        renderWeather();
        renderForecasts();
    });

    // Inline 24H/12H Toggle in Header
    dom.timeFormatToggleInline?.addEventListener('click', () => {
        state.settings.timeFormat24 = !state.settings.timeFormat24;
        applySettings();
        syncSettingsUi();
        updateClock();
        renderForecasts();
        renderWorldClock();
    });

    // Checkbox Toggles
    bindCheckbox(dom.timeFormatToggle, 'timeFormat24', () => {
        updateClock();
        renderForecasts();
        renderWorldClock();
    });

    bindCheckbox(dom.animationsToggle, 'animations');
    bindCheckbox(dom.particlesToggle, 'particles', () => startWeatherParticles(getWeatherMeta(state.weather?.current?.weather_code).particle));
    bindCheckbox(dom.auroraToggle, 'aurora');
    bindCheckbox(dom.backgroundToggle, 'backgroundEffects', () => updateBackgroundTheme(getWeatherMeta(state.weather?.current?.weather_code)));
    bindCheckbox(dom.reduceMotionToggle, 'reduceMotion');

    // Ambient Sound Toggle & Header Button
    dom.ambientSoundBtn?.addEventListener('click', async () => {
        if (!window.weatherAudio) return;
        const meta = getWeatherMeta(state.weather?.current?.weather_code);
        const playing = await window.weatherAudio.toggle(meta.background);
        state.settings.ambientSounds = playing;
        saveJson(STORAGE_KEYS.settings, state.settings);
        showToast(playing ? 'Ambient soundscape engaged' : 'Ambient soundscape muted', 'success');
    });

    dom.ambientSoundsToggle?.addEventListener('change', async (e) => {
        if (!window.weatherAudio) return;
        const meta = getWeatherMeta(state.weather?.current?.weather_code);
        if (e.target.checked) {
            await window.weatherAudio.play(meta.background);
        } else {
            window.weatherAudio.stop();
        }
        state.settings.ambientSounds = e.target.checked;
        saveJson(STORAGE_KEYS.settings, state.settings);
    });

    // Volume Range Slider
    dom.soundVolumeRange?.addEventListener('input', (e) => {
        const val = parseInt(e.target.value) / 100;
        state.settings.soundVolume = val;
        if (dom.soundVolumeValue) dom.soundVolumeValue.textContent = `${e.target.value}%`;
        if (window.weatherAudio) window.weatherAudio.setVolume(val);
        saveJson(STORAGE_KEYS.settings, state.settings);
    });

    // Glass Blur Slider
    dom.glassBlurRange?.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        state.settings.glassBlur = val;
        if (dom.glassBlurValue) dom.glassBlurValue.textContent = `${val}px`;
        document.documentElement.style.setProperty('--glass-blur', `${val}px`);
        saveJson(STORAGE_KEYS.settings, state.settings);
    });

    // Presets and Place Controls
    dom.countrySelect?.addEventListener('change', (e) => {
        const country = COUNTRY_CHOICES[e.target.value];
        if (country) {
            loadWeather(country, true);
            closeSettingsDrawer();
        }
    });

    dom.placeApply?.addEventListener('click', () => {
        const query = dom.placeSearch?.value.trim();
        if (query) {
            searchGeoLocations(query).then(() => {
                const firstResult = dom.searchResults?.querySelector('.search-result');
                if (firstResult) firstResult.click();
            });
            closeSettingsDrawer();
        }
    });

    dom.refreshBtn?.addEventListener('click', () => {
        if (state.location) loadWeather(state.location, false);
    });

    dom.placeGpsBtn?.addEventListener('click', () => {
        closeSettingsDrawer();
        detectUserLocation(true);
    });

    dom.locationBadge?.addEventListener('click', () => {
        openSearchDrawer();
    });

    applySettings();
    syncSettingsUi();
}

function openSettingsDrawer() {
    closeSearchDrawer();
    dom.settingsPanel?.classList.add('open');
    dom.drawerBackdrop?.classList.add('active');
}

function closeSettingsDrawer() {
    dom.settingsPanel?.classList.remove('open');
    if (!dom.searchPanel?.classList.contains('open')) {
        dom.drawerBackdrop?.classList.remove('active');
    }
}

function bindCheckbox(element, key, onChange) {
    if (!element) return;
    element.addEventListener('change', (e) => {
        state.settings[key] = e.target.checked;
        saveJson(STORAGE_KEYS.settings, state.settings);
        applySettings();
        if (typeof onChange === 'function') onChange(e.target.checked);
    });
}

function applySettings() {
    const body = document.body;
    body.classList.toggle('light-mode', state.settings.theme === 'light');
    body.classList.toggle('dark-mode', state.settings.theme === 'dark');
    body.classList.toggle('animations-off', !state.settings.animations || state.settings.reduceMotion);
    body.classList.toggle('particles-off', !state.settings.particles);
    body.classList.toggle('aurora-off', !state.settings.aurora);
    body.classList.toggle('background-effects-off', !state.settings.backgroundEffects);
    document.documentElement.style.setProperty('--glass-blur', `${state.settings.glassBlur}px`);

    saveJson(STORAGE_KEYS.settings, state.settings);
}

function syncSettingsUi() {
    dom.themeButtons?.forEach(btn => btn.classList.toggle('active', btn.dataset.theme === state.settings.theme));
    dom.unitButtons?.forEach(btn => btn.classList.toggle('active', btn.dataset.unit === state.settings.temperatureUnit));

    if (dom.unitToggleInline) dom.unitToggleInline.textContent = getTempUnitSymbol();
    if (dom.timeFormatToggleInline) {
        const label = dom.timeFormatToggleInline.querySelector('.format-label');
        if (label) label.textContent = state.settings.timeFormat24 ? '24H' : '12H';
    }

    if (dom.timeFormatToggle) dom.timeFormatToggle.checked = state.settings.timeFormat24;
    if (dom.animationsToggle) dom.animationsToggle.checked = state.settings.animations;
    if (dom.particlesToggle) dom.particlesToggle.checked = state.settings.particles;
    if (dom.auroraToggle) dom.auroraToggle.checked = state.settings.aurora;
    if (dom.backgroundToggle) dom.backgroundToggle.checked = state.settings.backgroundEffects;
    if (dom.reduceMotionToggle) dom.reduceMotionToggle.checked = state.settings.reduceMotion;
    if (dom.ambientSoundsToggle) dom.ambientSoundsToggle.checked = state.settings.ambientSounds;
    if (dom.ambientSoundBtn) dom.ambientSoundBtn.classList.toggle('playing', state.settings.ambientSounds);

    if (dom.soundVolumeRange) {
        dom.soundVolumeRange.value = Math.round((state.settings.soundVolume || 0.35) * 100);
        if (dom.soundVolumeValue) dom.soundVolumeValue.textContent = `${dom.soundVolumeRange.value}%`;
    }

    if (dom.glassBlurRange) {
        dom.glassBlurRange.value = state.settings.glassBlur || 14;
        if (dom.glassBlurValue) dom.glassBlurValue.textContent = `${state.settings.glassBlur}px`;
    }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
    if (!dom.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

    const icons = {
        success: '✓',
        warning: '⚠',
        error: '✕'
    };

    toast.innerHTML = `<span style="font-weight: 700;">${icons[type] || '•'}</span><span>${escapeHtml(message)}</span>`;
    dom.toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(30px)';
        setTimeout(() => toast.remove(), 350);
    }, 3800);
}

// ===== WEATHER SVGS & ICONOGRAPHY =====
function getWeatherSvgIcon(type, size = 64) {
    const common = `width="${size}" height="${size}" viewBox="0 0 100 100" class="weather-icon-svg" aria-hidden="true"`;
    const cloud = '<ellipse cx="50" cy="54" rx="28" ry="17" fill="#cbd5e1"/><ellipse cx="36" cy="58" rx="20" ry="14" fill="#94a3b8"/><ellipse cx="64" cy="59" rx="22" ry="14" fill="#e2e8f0"/>';

    const icons = {
        sun: `<svg ${common}><circle cx="50" cy="50" r="22" fill="#ffd166"/><g stroke="#fb8500" stroke-width="4.5" stroke-linecap="round"><line x1="50" y1="12" x2="50" y2="22"/><line x1="50" y1="78" x2="50" y2="88"/><line x1="12" y1="50" x2="22" y2="50"/><line x1="78" y1="50" x2="88" y2="50"/><line x1="23" y1="23" x2="30" y2="30"/><line x1="70" y1="70" x2="77" y2="77"/><line x1="23" y1="77" x2="30" y2="70"/><line x1="70" y1="30" x2="77" y2="23"/></g></svg>`,
        'partly-cloudy': `<svg ${common}><circle cx="36" cy="36" r="18" fill="#ffd166"/><g stroke="#fb8500" stroke-width="3" stroke-linecap="round"><line x1="36" y1="12" x2="36" y2="18"/><line x1="12" y1="36" x2="18" y2="36"/><line x1="20" y1="20" x2="24" y2="24"/></g>${cloud}</svg>`,
        clouds: `<svg ${common}>${cloud}</svg>`,
        rain: `<svg ${common}>${cloud}<g fill="#38bdf8"><rect x="34" y="74" width="4" height="15" rx="2"/><rect x="50" y="76" width="4" height="15" rx="2"/><rect x="66" y="74" width="4" height="15" rx="2"/></g></svg>`,
        'heavy-rain': `<svg ${common}>${cloud}<g fill="#2563eb"><rect x="28" y="72" width="4.5" height="18" rx="2"/><rect x="44" y="75" width="4.5" height="18" rx="2"/><rect x="60" y="72" width="4.5" height="18" rx="2"/><rect x="74" y="74" width="4.5" height="18" rx="2"/></g></svg>`,
        snow: `<svg ${common}>${cloud}<g fill="#ffffff" stroke="#a5f3fc" stroke-width="1.5"><circle cx="36" cy="78" r="3.5"/><circle cx="52" cy="82" r="3.5"/><circle cx="68" cy="78" r="3.5"/></g></svg>`,
        'heavy-snow': `<svg ${common}>${cloud}<g fill="#ffffff" stroke="#a5f3fc" stroke-width="2"><circle cx="28" cy="76" r="4"/><circle cx="44" cy="84" r="4"/><circle cx="60" cy="78" r="4"/><circle cx="76" cy="84" r="4"/></g></svg>`,
        storm: `<svg ${common}>${cloud}<polygon points="48,64 62,64 54,80 66,80 42,96 48,77 38,77" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/></svg>`,
        fog: `<svg ${common}>${cloud}<g stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"><line x1="24" y1="74" x2="76" y2="74"/><line x1="32" y1="84" x2="68" y2="84"/></g></svg>`,
        'freezing-rain': `<svg ${common}>${cloud}<g fill="#67e8f9"><rect x="38" y="72" width="4" height="14" rx="2"/><polygon points="56,72 62,85 50,85"/></g></svg>`,
        'rain-shower': `<svg ${common}><circle cx="34" cy="34" r="15" fill="#ffd166"/>${cloud}<g fill="#38bdf8"><rect x="44" y="75" width="4" height="14" rx="2"/><rect x="62" y="73" width="4" height="15" rx="2"/></g></svg>`,
        'snow-shower': `<svg ${common}><circle cx="34" cy="34" r="15" fill="#ffd166"/>${cloud}<g fill="#ffffff" stroke="#a5f3fc" stroke-width="2"><circle cx="46" cy="80" r="3.5"/><circle cx="64" cy="83" r="3.5"/></g></svg>`
    };

    return icons[type] || icons.clouds;
}

// ===== HELPER METRIC INTERPRETERS =====
function getCompassHeading(degrees) {
    const headings = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return headings[Math.round(degrees / 45) % headings.length];
}

function getWindBeaufort(speedKm) {
    if (speedKm < 5) return 'Calm breeze';
    if (speedKm < 20) return 'Gentle breeze';
    if (speedKm < 38) return 'Moderate wind';
    if (speedKm < 60) return 'Strong breeze';
    return 'Gale conditions';
}

function getHumidityComfort(rh) {
    if (rh < 35) return 'Crisp & dry';
    if (rh <= 65) return 'Optimal comfort';
    return 'Humid atmosphere';
}

function getUvAdvisory(uv) {
    if (uv <= 2) return { category: 'Low Risk', advice: 'No special protection needed' };
    if (uv <= 5) return { category: 'Moderate', advice: 'Sunglasses recommended outdoors' };
    if (uv <= 7) return { category: 'High Exposure', advice: 'Wear SPF 30+ & seek shade' };
    if (uv <= 10) return { category: 'Very High', advice: 'Minimize direct midday exposure' };
    return { category: 'Extreme Alert', advice: 'Avoid direct sun exposure' };
}

function getAqiRating(aqi) {
    if (aqi <= 50) return { rating: 'Good (Air is clear)', color: '#10b981' };
    if (aqi <= 100) return { rating: 'Moderate (Acceptable)', color: '#f59e0b' };
    if (aqi <= 150) return { rating: 'Sensitive Alert', color: '#f97316' };
    if (aqi <= 200) return { rating: 'Unhealthy Air', color: '#ef4444' };
    return { rating: 'Hazardous Air Quality', color: '#8b5cf6' };
}

function getVisibilityDescription(km) {
    if (km >= 15) return 'Crystal clear optical horizon';
    if (km >= 9) return 'Good visual clarity';
    if (km >= 4) return 'Atmospheric haze present';
    return 'Dense fog obscuration';
}

function getPressureTendency(hPa) {
    if (hPa > 1018) return 'High pressure · Clear stable weather';
    if (hPa >= 1010) return 'Steady barometer · Balanced conditions';
    return 'Low pressure · Precipitation likely';
}

function formatClockTime(date) {
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: !state.settings.timeFormat24
    });
}

function formatDate(date, options = {}) {
    return date.toLocaleDateString([], options);
}

function setText(el, value) {
    if (el && el.textContent !== String(value)) {
        el.textContent = value;
    }
}

function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

// ===== SYSTEM INITIALIZATION =====
function initGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchDrawer();
            closeSettingsDrawer();
        } else if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && document.activeElement?.tagName !== 'INPUT') {
            e.preventDefault();
            openSearchDrawer();
        }
    });

    window.addEventListener('online', () => {
        showToast('Connection restored. Updating live satellite data.', 'success');
        if (state.location) loadWeather(state.location);
    });

    window.addEventListener('offline', () => {
        showToast('Offline mode. Keeping current weather on display.', 'warning');
    });
}

// ===== HIGH-PRECISION REVERSE GEOCODING & MULTI-TIER LOCATION DETECTION =====
async function reverseGeocode(lat, lon) {
    try {
        const data = await fetchJsonWithTimeout(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`, 5000);
        const city = data.city || data.locality || data.principalSubdivision || '';
        const country = data.countryName || '';
        return {
            name: city || 'Local Area',
            country: country
        };
    } catch (e) {
        console.warn('Reverse geocoding failed:', e);
        return { name: 'Local Area', country: '' };
    }
}

async function detectLocationByIp() {
    // Primary: ipwho.is (fast, CORS-open, HTTPS)
    try {
        const data = await fetchJsonWithTimeout('https://ipwho.is/', 4000);
        if (data && data.success && data.latitude && data.longitude) {
            return {
                name: data.city || data.region || 'Local Area',
                country: data.country || '',
                lat: parseFloat(data.latitude),
                lon: parseFloat(data.longitude)
            };
        }
    } catch (e) {
        console.warn('ipwho.is lookup failed:', e);
    }

    // Secondary: freeipapi.com (open HTTPS API)
    try {
        const data = await fetchJsonWithTimeout('https://freeipapi.com/api/json', 4000);
        if (data && data.latitude && data.longitude) {
            return {
                name: data.cityName || data.regionName || 'Local Area',
                country: data.countryName || '',
                lat: parseFloat(data.latitude),
                lon: parseFloat(data.longitude)
            };
        }
    } catch (e) {
        console.warn('freeipapi lookup failed:', e);
    }

    // Tertiary: ipapi.co
    try {
        const data = await fetchJsonWithTimeout('https://ipapi.co/json/', 4000);
        if (data && data.latitude && data.longitude) {
            return {
                name: data.city || data.region || 'Local Area',
                country: data.country_name || '',
                lat: parseFloat(data.latitude),
                lon: parseFloat(data.longitude)
            };
        }
    } catch (e) {
        console.warn('ipapi.co lookup failed:', e);
    }

    return null;
}

async function detectUserLocation(interactive = false) {
    if (interactive) {
        showToast('Acquiring atmospheric coordinates...', 'warning');
    }

    let resolved = false;

    const applyLocation = (loc, method = 'network') => {
        if (!loc || !Number.isFinite(Number(loc.lat)) || !Number.isFinite(Number(loc.lon))) return;
        if (resolved && method === 'network') return;
        resolved = true;
        loadWeather(loc, false);
        if (interactive) {
            showToast(`Location locked: ${loc.name}${loc.country ? `, ${loc.country}` : ''}`, 'success');
        }
    };

    // Fast initial IP resolution: runs in parallel to show instant weather
    detectLocationByIp().then(ipLoc => {
        if (ipLoc && !resolved) {
            applyLocation(ipLoc, 'network');
        }
    }).catch(err => console.warn('Instant IP location error:', err));

    // Browser Geolocation API for GPS-level precision
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const geo = await reverseGeocode(lat, lon);
                applyLocation({
                    name: geo.name || 'Current Location',
                    country: geo.country || '',
                    lat: lat,
                    lon: lon
                }, 'gps');
            },
            async (err) => {
                console.warn('Browser GPS declined or unavailable:', err.message);
                if (!resolved) {
                    const fallbackIp = await detectLocationByIp();
                    if (fallbackIp) {
                        applyLocation(fallbackIp, 'network');
                    } else if (!state.location) {
                        loadWeather(DEFAULT_LOCATION, false);
                    }
                }
            },
            { timeout: 7000, maximumAge: 60000, enableHighAccuracy: true }
        );
    } else {
        if (!resolved) {
            const fallbackIp = await detectLocationByIp();
            if (fallbackIp) {
                applyLocation(fallbackIp, 'network');
            } else if (!state.location) {
                loadWeather(DEFAULT_LOCATION, false);
            }
        }
    }
}

// ==========================================================================
// VEDIC PANCHANG & DUAL-LANGUAGE HOROSCOPE MAIN HUB CONTROLLER
// ==========================================================================

function switchCosmicHubTab(tab) {
    if (!['panchang', 'horoscope'].includes(tab)) tab = 'panchang';
    state.cosmic.activeTab = tab;
    saveJson(STORAGE_KEYS.cosmic, state.cosmic);

    const isPanchang = tab === 'panchang';
    dom.cosmicNavPanchang?.classList.toggle('active', isPanchang);
    dom.cosmicNavPanchang?.setAttribute('aria-selected', isPanchang ? 'true' : 'false');
    dom.cosmicNavHoroscope?.classList.toggle('active', !isPanchang);
    dom.cosmicNavHoroscope?.setAttribute('aria-selected', !isPanchang ? 'true' : 'false');

    dom.cosmicPanchangPane?.classList.toggle('active', isPanchang);
    dom.cosmicHoroscopePane?.classList.toggle('active', !isPanchang);

    if (isPanchang) {
        renderPanchang();
    } else {
        renderHoroscope();
    }
}

function renderPanchang() {
    if (!window.VedicPanchang) return;
    const lang = state.cosmic.panchangLang || state.cosmic.lang || 'en';
    const isHi = lang === 'hi';

    // Retrieve sunrise and sunset from weather state or null (VedicPanchang calculates equinox fallback instantly)
    const sunrise = state.weather?.daily?.sunrise?.[0] || null;
    const sunset = state.weather?.daily?.sunset?.[0] || null;
    const panchang = window.VedicPanchang.calculatePanchang(new Date(), sunrise, sunset, state.settings.timeFormat24, lang);
    if (!panchang) return;

    // Synchronize Language Switcher UI
    if (dom.mainCosmicLangSwitch) {
        dom.mainCosmicLangSwitch.querySelectorAll('.lang-pill-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    // Dynamic Section Headings & Static Labels
    if (dom.cosmicHubTitle) dom.cosmicHubTitle.textContent = isHi ? 'वैदिक पंचांग एवं ब्रह्मांडीय राशिफल' : 'Vedic Panchang & Cosmic Horoscope';
    if (dom.labelNavPanchang) dom.labelNavPanchang.textContent = isHi ? 'दैनिक पंचांग (Panchang)' : 'Vedic Panchang (पंचांग)';
    if (dom.labelNavHoroscope) dom.labelNavHoroscope.textContent = isHi ? 'राशिफल (Horoscope)' : 'Cosmic Horoscope (राशिफल)';

    if (dom.labelVaar) dom.labelVaar.textContent = isHi ? 'वार (दिन)' : 'Solar Day (Vaar)';
    if (dom.labelNakshatra) dom.labelNakshatra.textContent = isHi ? 'नक्षत्र' : 'Nakshatra';
    if (dom.labelYoga) dom.labelYoga.textContent = isHi ? 'योग' : 'Yoga';
    if (dom.labelKarana) dom.labelKarana.textContent = isHi ? 'करण' : 'Karana';
    if (dom.labelMuhuratHeader) dom.labelMuhuratHeader.textContent = isHi ? 'शुभ एवं अशुभ मुहूर्त' : 'Auspicious & Inauspicious Muhurats';
    if (dom.labelRahuKaal) dom.labelRahuKaal.textContent = isHi ? 'राहु काल (अशुभ)' : 'Rahu Kaal (राहु काल)';
    if (dom.adviceRahuKaal) dom.adviceRahuKaal.textContent = isHi ? 'शुभ कार्य आरंभ न करें' : 'Avoid starting auspicious deeds';
    if (dom.labelAbhijit) dom.labelAbhijit.textContent = isHi ? 'अभिजीत मुहूर्त (अति शुभ)' : 'Abhijit Muhurat (अभिजीत)';
    if (dom.adviceAbhijit) dom.adviceAbhijit.textContent = isHi ? 'सर्व कार्य सिद्धि का सर्वश्रेष्ठ समय' : 'Supreme victory window for all actions';
    if (dom.labelBrahma) dom.labelBrahma.textContent = isHi ? 'ब्रह्म मुहूर्त' : 'Brahma Muhurat (ब्रह्म मुहूर्त)';
    if (dom.adviceBrahma) dom.adviceBrahma.textContent = isHi ? 'ध्यान व योग साधना हेतु सर्वोत्तम' : 'Optimal for meditation & sadhana';
    if (dom.labelYamaganda) dom.labelYamaganda.textContent = isHi ? 'यमगण्ड काल' : 'Yamaganda (यमगण्ड)';
    if (dom.adviceYamaganda) dom.adviceYamaganda.textContent = isHi ? 'यात्रा व वित्तीय कार्य टालें' : 'Inauspicious journey period';
    if (dom.labelAmrit) dom.labelAmrit.textContent = isHi ? 'अमृत काल' : 'Amrit Kaal (अमृत काल)';
    if (dom.adviceAmrit) dom.adviceAmrit.textContent = isHi ? 'अमृत तुल्य शुभ फलदायी समय' : 'Nectar time for success & ceremonies';
    if (dom.labelGodhuli) dom.labelGodhuli.textContent = isHi ? 'गोधूलि मुहूर्त' : 'Godhuli (गोधूलि मुहूर्त)';
    if (dom.adviceGodhuli) dom.adviceGodhuli.textContent = isHi ? 'संध्याकालीन शुभ काल' : 'Evening twilight auspiciousness';
    if (dom.labelVikramSamvat) dom.labelVikramSamvat.textContent = isHi ? 'विक्रम संवत' : 'Vikram Samvat';
    if (dom.labelShakaSamvat) dom.labelShakaSamvat.textContent = isHi ? 'शक संवत' : 'Shaka Samvat';
    if (dom.labelHinduMonth) dom.labelHinduMonth.textContent = isHi ? 'मास (महीना)' : 'Lunar Month (Masa)';
    if (dom.labelRitu) dom.labelRitu.textContent = isHi ? 'ऋतु' : 'Season (Ritu)';
    if (dom.labelSunSign) dom.labelSunSign.textContent = isHi ? 'सूर्य राशि (सौर)' : 'Sun Sign (Surya)';
    if (dom.labelMoonSign) dom.labelMoonSign.textContent = isHi ? 'चन्द्र राशि' : 'Moon Sign (Chandra)';

    // Date & Samvat Badges
    if (dom.cosmicDateDisplay) dom.cosmicDateDisplay.textContent = panchang.dateStr || (panchang.gregorianDateFormatted && panchang.gregorianDateFormatted[lang]) || '';
    if (dom.cosmicSamvatDisplay) dom.cosmicSamvatDisplay.textContent = (panchang.samvat && panchang.samvat.display && panchang.samvat.display[lang]) || `Vikram ${panchang.samvat?.vikram} · Shaka ${panchang.samvat?.shaka}`;

    // Tithi Card
    if (dom.panchangPakshaTag) dom.panchangPakshaTag.textContent = panchang.tithi?.paksha || 'Shukla Paksha';
    if (dom.panchangTithiName) dom.panchangTithiName.textContent = panchang.tithi?.name || 'Pratipada';
    if (dom.panchangTithiEnds) dom.panchangTithiEnds.textContent = (isHi ? 'समाप्ति: ' : 'Ends at: ') + (panchang.tithi?.endTime || panchang.tithi?.endsAt || '--:--');
    if (dom.panchangTithiDesc) dom.panchangTithiDesc.textContent = isHi ? 'चंद्र-सूर्य कोणीय स्थिति पर आधारित शुद्ध वैदिक तिथि गणना।' : 'Precision lunar-solar astronomical phase computation.';

    // 4 Limbs Grid
    if (dom.panchangVaar) dom.panchangVaar.textContent = panchang.vaar?.name || '--';
    if (dom.panchangVaarDeity) dom.panchangVaarDeity.textContent = (isHi ? 'स्वामी: ' : 'Lord: ') + (panchang.vaar?.deity || panchang.vaar?.planet || '--');

    if (dom.panchangNakshatra) dom.panchangNakshatra.textContent = panchang.nakshatra?.name || '--';
    if (dom.panchangNakshatraPada) dom.panchangNakshatraPada.textContent = (isHi ? 'पाद ' : 'Pada ') + (panchang.nakshatra?.pada || '1') + ' · ' + (isHi ? 'स्वामी: ' : 'Lord: ') + (panchang.nakshatra?.lord || '--');

    if (dom.panchangYoga) dom.panchangYoga.textContent = typeof panchang.yoga === 'object' ? panchang.yoga.name : (panchang.yoga || '--');
    if (dom.panchangYogaQuality) dom.panchangYogaQuality.textContent = typeof panchang.yoga === 'object' ? panchang.yoga.quality : (isHi ? 'शुभ योग' : 'Auspicious Transit');

    if (dom.panchangKarana) dom.panchangKarana.textContent = typeof panchang.karana === 'object' ? panchang.karana.name : (panchang.karana || '--');
    if (dom.panchangKaranaSub) dom.panchangKaranaSub.textContent = typeof panchang.karana === 'object' ? panchang.karana.type : (isHi ? 'सक्रिय करण' : 'Active Half');

    // Dynamic Muhurats
    const getMuhuratDisplay = (m) => typeof m === 'object' ? m.display : (m || '--:--');
    if (dom.panchangRahuTime) dom.panchangRahuTime.textContent = getMuhuratDisplay(panchang.muhurats?.rahuKaal);
    if (dom.panchangAbhijitTime) dom.panchangAbhijitTime.textContent = getMuhuratDisplay(panchang.muhurats?.abhijit);
    if (dom.panchangBrahmaTime) dom.panchangBrahmaTime.textContent = getMuhuratDisplay(panchang.muhurats?.brahma || panchang.muhurats?.brahmaMuhurat);
    if (dom.panchangYamaTime) dom.panchangYamaTime.textContent = getMuhuratDisplay(panchang.muhurats?.yamaganda);
    if (dom.panchangAmritTime) dom.panchangAmritTime.textContent = getMuhuratDisplay(panchang.muhurats?.amrit || panchang.muhurats?.amritKaal);
    if (dom.panchangGodhuliTime) dom.panchangGodhuliTime.textContent = getMuhuratDisplay(panchang.muhurats?.godhuli);

    // Active Highlights for Rahu & Abhijit
    if (dom.rahuKaalCard) {
        dom.rahuKaalCard.classList.toggle('active-warning', !!panchang.muhurats?.isRahuActive);
    }
    if (dom.abhijitCard) {
        dom.abhijitCard.classList.toggle('active-victory', !!panchang.muhurats?.isAbhijitActive);
    }

    // Samvat Specifications Grid
    if (dom.panchangVikramVal) dom.panchangVikramVal.textContent = panchang.samvat?.vikram || '2083';
    if (dom.panchangShakaVal) dom.panchangShakaVal.textContent = panchang.samvat?.shaka || '1948';
    if (dom.panchangMonthVal) dom.panchangMonthVal.textContent = panchang.samvat?.month || panchang.samvat?.masa || '--';
    if (dom.panchangRituVal) dom.panchangRituVal.textContent = panchang.samvat?.ritu || '--';
    if (dom.panchangSunSign) dom.panchangSunSign.textContent = panchang.celestial?.sunSign || panchang.sunSign || '--';
    if (dom.panchangMoonSign) dom.panchangMoonSign.textContent = panchang.celestial?.moonSign || panchang.moonSign || '--';
}

function renderHoroscope() {
    if (!window.CosmicHoroscope) return;
    const lang = state.cosmic.horoscopeLang || state.cosmic.lang || 'en';
    const timeframe = state.cosmic.horoscopeTimeframe || 'daily';
    const sign = state.cosmic.horoscopeSign || 'aries';
    const isHi = lang === 'hi';

    const reading = window.CosmicHoroscope.getReading(sign, timeframe, lang);
    if (!reading) return;

    // Synchronize Language Switcher UI
    if (dom.mainCosmicLangSwitch) {
        dom.mainCosmicLangSwitch.querySelectorAll('.lang-pill-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    // Timeframe Buttons Active State & Labels
    const tfButtons = [
        { id: 'tfBtnDaily', tf: 'daily', labelEn: 'Daily', labelHi: 'दैनिक' },
        { id: 'tfBtnWeekly', tf: 'weekly', labelEn: 'Weekly', labelHi: 'साप्ताहिक' },
        { id: 'tfBtnMonthly', tf: 'monthly', labelEn: 'Monthly', labelHi: 'मासिक' },
        { id: 'tfBtnYearly', tf: 'yearly', labelEn: 'Yearly', labelHi: 'वार्षिक' }
    ];

    tfButtons.forEach(item => {
        const btn = dom[item.id];
        if (btn) {
            btn.classList.toggle('active', item.tf === timeframe);
            const labelEl = btn.querySelector('.tf-btn-label');
            if (labelEl) labelEl.textContent = isHi ? item.labelHi : item.labelEn;
        }
    });

    if (dom.horoscopeHintText) {
        dom.horoscopeHintText.textContent = isHi ? 'अपनी राशि चुनने के लिए नीचे किसी भी राशि पर क्लिक करें' : 'Click any zodiac sign below to pick your reading';
    }

    // Populate or Update 12 Zodiac Carousel Chips
    if (dom.zodiacSignsContainer) {
        const signs = window.CosmicHoroscope.ZODIAC_SIGNS || window.CosmicHoroscope.getAllSigns();
        dom.zodiacSignsContainer.innerHTML = signs.map(s => {
            const isActive = s.id === sign;
            const signName = isHi ? s.name.hi : s.name.en;
            const signElement = isHi ? s.element.hi : s.element.en;
            return `
                <button class="zodiac-chip-btn ${isActive ? 'active' : ''}" type="button" data-sign="${s.id}" title="${s.name.en} (${s.name.hi})">
                    <span class="zodiac-chip-glyph">${s.glyph}</span>
                    <span class="zodiac-chip-name">${signName}</span>
                    <span class="zodiac-chip-element">${signElement}</span>
                </button>
            `;
        }).join('');

        dom.zodiacSignsContainer.querySelectorAll('.zodiac-chip-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                state.cosmic.horoscopeSign = btn.dataset.sign;
                saveJson(STORAGE_KEYS.cosmic, state.cosmic);
                renderHoroscope();
            });
        });
    }

    // Static Section Headings and Labels
    if (dom.labelHarmony) dom.labelHarmony.textContent = isHi ? 'दिव्य अनुकूलता' : 'Celestial Harmony';
    if (dom.labelLuckyNum) dom.labelLuckyNum.textContent = isHi ? 'शुभ अंक' : 'Lucky No.';
    if (dom.labelLuckyColor) dom.labelLuckyColor.textContent = isHi ? 'शुभ रंग' : 'Color';
    if (dom.labelRulingPlanet) dom.labelRulingPlanet.textContent = isHi ? 'स्वामी ग्रह' : 'Ruling Planet';
    if (dom.labelElement) dom.labelElement.textContent = isHi ? 'तत्व' : 'Element';
    if (dom.labelCompat) dom.labelCompat.textContent = isHi ? 'शुभ अनुकूलता' : 'Compatibility';
    if (dom.labelGemstone) dom.labelGemstone.textContent = isHi ? 'शुभ रत्न' : 'Gemstone';

    if (dom.labelGeneralPred) dom.labelGeneralPred.textContent = isHi ? 'सामान्य अवलोकन' : 'Cosmic Overview';
    if (dom.labelCareerPred) dom.labelCareerPred.textContent = isHi ? 'करियर एवं धन' : 'Career & Wealth';
    if (dom.labelLovePred) dom.labelLovePred.textContent = isHi ? 'प्रेम एवं संबंध' : 'Love & Relationships';
    if (dom.labelHealthPred) dom.labelHealthPred.textContent = isHi ? 'स्वास्थ्य एवं ऊर्जा' : 'Health & Vitality';

    // Reading Values
    if (dom.hrSignGlyph) dom.hrSignGlyph.textContent = reading.glyph;
    if (dom.hrSignName) dom.hrSignName.textContent = isHi ? `${reading.name} (${reading.sign?.name?.en})` : `${reading.name} (${reading.sign?.name?.hi})`;
    if (dom.hrSignDates) dom.hrSignDates.textContent = reading.dates;
    if (dom.hrHarmonyScore) dom.hrHarmonyScore.textContent = `${reading.harmony || reading.harmonyScore}%`;

    if (dom.hrElementBadge) dom.hrElementBadge.textContent = reading.element;
    if (dom.hrPlanetBadge) dom.hrPlanetBadge.textContent = reading.rulingPlanet || reading.planet;

    if (dom.hrLuckyNum) dom.hrLuckyNum.textContent = reading.luckyNumber;
    if (dom.hrLuckyColor) dom.hrLuckyColor.textContent = reading.luckyColor;
    if (dom.hrPlanet) dom.hrPlanet.textContent = reading.rulingPlanet || reading.planet;
    if (dom.hrElement) dom.hrElement.textContent = reading.element;
    if (dom.hrCompatibleSigns) dom.hrCompatibleSigns.textContent = reading.compatibility || reading.compatibleSign;
    if (dom.hrGemstone) dom.hrGemstone.textContent = reading.gemstone;

    if (dom.hrOverviewText) dom.hrOverviewText.textContent = reading.overview || reading.general;
    if (dom.hrCareerText) dom.hrCareerText.textContent = reading.career;
    if (dom.hrLoveText) dom.hrLoveText.textContent = reading.love;
    if (dom.hrHealthText) dom.hrHealthText.textContent = reading.health;
}

function initCosmicHub() {
    // Nav Pills (Panchang / Horoscope)
    dom.cosmicNavPanchang?.addEventListener('click', () => switchCosmicHubTab('panchang'));
    dom.cosmicNavHoroscope?.addEventListener('click', () => switchCosmicHubTab('horoscope'));

    // Header Quick Buttons
    dom.headerPanchangBtn?.addEventListener('click', () => {
        switchCosmicHubTab('panchang');
        dom.cosmicHubSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    dom.headerHoroscopeBtn?.addEventListener('click', () => {
        switchCosmicHubTab('horoscope');
        dom.cosmicHubSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Dual Language Switcher in Cosmic Hub
    if (dom.mainCosmicLangSwitch) {
        dom.mainCosmicLangSwitch.querySelectorAll('.lang-pill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                state.cosmic.lang = lang;
                state.cosmic.panchangLang = lang;
                state.cosmic.horoscopeLang = lang;
                saveJson(STORAGE_KEYS.cosmic, state.cosmic);
                renderPanchang();
                renderHoroscope();
            });
        });
    }

    // Horoscope Timeframe Switcher
    const timeframes = ['daily', 'weekly', 'monthly', 'yearly'];
    timeframes.forEach(tf => {
        const btnId = 'tfBtn' + tf.charAt(0).toUpperCase() + tf.slice(1);
        dom[btnId]?.addEventListener('click', () => {
            state.cosmic.horoscopeTimeframe = tf;
            saveJson(STORAGE_KEYS.cosmic, state.cosmic);
            renderHoroscope();
        });
    });

    // Render immediately on load
    switchCosmicHubTab(state.cosmic.activeTab || 'panchang');
    renderPanchang();
    renderHoroscope();
}

function initGeolocation() {
    detectUserLocation(false);
}

document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    hideLoadingScreen();
    initClock();
    initSettings();
    initCosmicHub();
    initSearch();
    initWorldClockSearch();
    initGlobalShortcuts();
    initGeolocation();

    clearInterval(state.weatherRefreshTimer);
    state.weatherRefreshTimer = setInterval(() => {
        if (state.location) loadWeather(state.location);
    }, 12 * 60 * 1000);
});
