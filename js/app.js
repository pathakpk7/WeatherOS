const STORAGE_KEYS = {
    settings: 'weatherOSSettings',
    recentSearches: 'weatherOSRecentSearches',
    worldClocks: 'weatherOSWorldClocks'
};

const DEFAULT_LOCATION = {
    name: 'New York',
    country: 'United States',
    lat: 40.7128,
    lon: -74.006,
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
    glassBlur: 10,
    ambientSounds: false
};

const DEFAULT_CLOCKS = [
    { name: 'London', timezone: 'Europe/London' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' }
];

const COUNTRY_CHOICES = {
    IN: { query: 'New Delhi', name: 'India' },
    GB: { query: 'London', name: 'United Kingdom' },
    US: { query: 'Washington', name: 'United States' },
    JP: { query: 'Tokyo', name: 'Japan' },
    AU: { query: 'Canberra', name: 'Australia' },
    AE: { query: 'Abu Dhabi', name: 'United Arab Emirates' },
    SG: { query: 'Singapore', name: 'Singapore' }
];

const WEATHER_CODES = {
    0: { description: 'Clear sky', icon: 'sun', background: 'clear', particle: 'stars', message: 'Perfect weather for a walk today.', accent: ['#f72585', '#ffb703'] },
    1: { description: 'Mainly clear', icon: 'sun', background: 'clear', particle: 'stars', message: 'Bright and calm outside.', accent: ['#f72585', '#4cc9f0'] },
    2: { description: 'Partly cloudy', icon: 'partly-cloudy', background: 'clouds', particle: 'dust', message: 'Clouds are drifting through, but it still feels open.', accent: ['#4361ee', '#4cc9f0'] },
    3: { description: 'Overcast', icon: 'clouds', background: 'clouds', particle: 'fog', message: 'Cloudy skies, soft light, steady weather.', accent: ['#6c757d', '#4cc9f0'] },
    45: { description: 'Foggy', icon: 'fog', background: 'fog', particle: 'fog', message: 'Foggy conditions, travel carefully.', accent: ['#adb5bd', '#7209b7'] },
    48: { description: 'Rime fog', icon: 'fog', background: 'fog', particle: 'fog', message: 'Icy fog is possible, keep visibility in mind.', accent: ['#adb5bd', '#4cc9f0'] },
    51: { description: 'Light drizzle', icon: 'rain', background: 'rain', particle: 'rain', message: 'Light drizzle, take an umbrella.', accent: ['#4cc9f0', '#4361ee'] },
    53: { description: 'Moderate drizzle', icon: 'rain', background: 'rain', particle: 'rain', message: 'Drizzle is settling in.', accent: ['#4cc9f0', '#4361ee'] },
    55: { description: 'Dense drizzle', icon: 'rain', background: 'rain', particle: 'rain', message: 'Dense drizzle outside, keep dry.', accent: ['#4cc9f0', '#3a0ca3'] },
    56: { description: 'Light freezing drizzle', icon: 'freezing-rain', background: 'rain', particle: 'snow', message: 'Freezing drizzle may make surfaces slick.', accent: ['#90e0ef', '#4361ee'] },
    57: { description: 'Dense freezing drizzle', icon: 'freezing-rain', background: 'rain', particle: 'snow', message: 'Freezing drizzle is heavy enough to slow things down.', accent: ['#90e0ef', '#3a0ca3'] },
    61: { description: 'Slight rain', icon: 'rain', background: 'rain', particle: 'rain', message: 'Rain expected, take an umbrella.', accent: ['#4cc9f0', '#4361ee'] },
    63: { description: 'Moderate rain', icon: 'rain', background: 'rain', particle: 'rain', message: 'Steady rain outside.', accent: ['#4cc9f0', '#3a0ca3'] },
    65: { description: 'Heavy rain', icon: 'heavy-rain', background: 'rain', particle: 'rain', message: 'Heavy rain, stay safe and dry.', accent: ['#4361ee', '#0f0c29'] },
    66: { description: 'Light freezing rain', icon: 'freezing-rain', background: 'rain', particle: 'snow', message: 'Freezing rain may make roads slick.', accent: ['#90e0ef', '#4361ee'] },
    67: { description: 'Heavy freezing rain', icon: 'freezing-rain', background: 'rain', particle: 'snow', message: 'Heavy freezing rain, avoid unnecessary travel.', accent: ['#90e0ef', '#3a0ca3'] },
    71: { description: 'Slight snow', icon: 'snow', background: 'snow', particle: 'snow', message: 'Light snow is falling.', accent: ['#e0fbfc', '#4cc9f0'] },
    73: { description: 'Moderate snow', icon: 'snow', background: 'snow', particle: 'snow', message: 'Snowfall in progress, stay warm.', accent: ['#e0fbfc', '#4361ee'] },
    75: { description: 'Heavy snow', icon: 'heavy-snow', background: 'snow', particle: 'snow', message: 'Heavy snowfall, keep warm and plan ahead.', accent: ['#caf0f8', '#3a0ca3'] },
    77: { description: 'Snow grains', icon: 'snow', background: 'snow', particle: 'snow', message: 'Fine snow grains are in the air.', accent: ['#e0fbfc', '#4cc9f0'] },
    80: { description: 'Slight rain showers', icon: 'rain-shower', background: 'rain', particle: 'rain', message: 'Rain showers possible.', accent: ['#4cc9f0', '#4361ee'] },
    81: { description: 'Moderate rain showers', icon: 'rain-shower', background: 'rain', particle: 'rain', message: 'Showers are moving through.', accent: ['#4cc9f0', '#3a0ca3'] },
    82: { description: 'Violent rain showers', icon: 'heavy-rain', background: 'storm', particle: 'rain', message: 'Intense rain showers, stay alert.', accent: ['#4361ee', '#0f0c29'] },
    85: { description: 'Slight snow showers', icon: 'snow-shower', background: 'snow', particle: 'snow', message: 'Snow showers expected.', accent: ['#e0fbfc', '#4361ee'] },
    86: { description: 'Heavy snow showers', icon: 'heavy-snow', background: 'snow', particle: 'snow', message: 'Heavy snow showers, take it slow.', accent: ['#caf0f8', '#3a0ca3'] },
    95: { description: 'Thunderstorm', icon: 'storm', background: 'storm', particle: 'rain', message: 'Thunderstorm warning, stay indoors if possible.', accent: ['#7209b7', '#f72585'] },
    96: { description: 'Thunderstorm with hail', icon: 'storm', background: 'storm', particle: 'rain', message: 'Storms with hail are possible.', accent: ['#7209b7', '#f72585'] },
    99: { description: 'Thunderstorm with heavy hail', icon: 'storm', background: 'storm', particle: 'rain', message: 'Severe storm conditions, stay sheltered.', accent: ['#7209b7', '#f72585'] }
};

const TIMEZONE_CHOICES = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { name: 'Mexico City', timezone: 'America/Mexico_City' },
    { name: 'Sao Paulo', timezone: 'America/Sao_Paulo' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Berlin', timezone: 'Europe/Berlin' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Mumbai', timezone: 'Asia/Kolkata' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' }
];

const state = {
    settings: loadJson(STORAGE_KEYS.settings, DEFAULT_SETTINGS),
    recentSearches: loadJson(STORAGE_KEYS.recentSearches, []),
    worldClocks: loadJson(STORAGE_KEYS.worldClocks, DEFAULT_CLOCKS),
    location: null,
    weather: null,
    airQuality: null,
    selectedSearchIndex: -1,
    particleTimer: null,
    clockTimer: null,
    worldClockTimer: null,
    weatherRefreshTimer: null,
    lastClockText: { hours: '', minutes: '', seconds: '' }
};

const dom = {};

function cacheDom() {
    [
        'loadingScreen', 'loadingProgress', 'mainContainer', 'backgroundLayer', 'particlesContainer',
        'searchToggle', 'settingsToggle', 'searchPanel', 'settingsPanel', 'closeSettings',
        'citySearch', 'clearSearch', 'searchResults', 'placeSearch', 'placeApply', 'currentPlace', 'countrySelect',
        'greeting', 'hours', 'minutes', 'seconds',
        'heroDate', 'weatherIconLarge', 'temperatureLarge', 'weatherDescription', 'feelsLike',
        'weatherMessage', 'humidity', 'humidityProgress', 'windSpeed', 'windDirection',
        'compassNeedle', 'uvIndex', 'uvFill', 'aqi', 'aqiRing', 'visibility', 'pressure',
        'sunriseTime', 'sunsetTime', 'sunIndicator', 'moonIcon', 'moonPhase', 'moonIllumination',
        'hourlyScroll', 'forecastGrid', 'worldClockGrid', 'toastContainer', 'timeFormatToggle',
        'animationsToggle', 'particlesToggle', 'auroraToggle', 'backgroundToggle', 'reduceMotionToggle',
        'ambientSoundsToggle', 'glassBlurRange', 'glassBlurValue', 'worldClockSearch', 'worldClockResults'
    ].forEach((id) => {
        dom[id] = document.getElementById(id);
    });

    dom.themeButtons = Array.from(document.querySelectorAll('.theme-btn'));
    dom.unitButtons = Array.from(document.querySelectorAll('.unit-btn'));
}

function loadJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return structuredCloneSafe(fallback);
        const parsed = JSON.parse(raw);
        if (Array.isArray(fallback)) return Array.isArray(parsed) ? parsed : structuredCloneSafe(fallback);
        return parsed && typeof parsed === 'object' ? { ...fallback, ...parsed } : structuredCloneSafe(fallback);
    } catch {
        return structuredCloneSafe(fallback);
    }
}

function structuredCloneSafe(value) {
    return JSON.parse(JSON.stringify(value));
}

function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function debounce(callback, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
}

function formatNumber(value, fallback = '--') {
    return Number.isFinite(value) ? Math.round(value).toString() : fallback;
}

function celsiusToDisplay(value) {
    if (!Number.isFinite(value)) return null;
    return state.settings.temperatureUnit === 'fahrenheit' ? (value * 9 / 5) + 32 : value;
}

function getTempUnit() {
    return state.settings.temperatureUnit === 'fahrenheit' ? '°F' : '°C';
}

function getWeatherMeta(code) {
    return WEATHER_CODES[Number(code)] || {
        description: 'Weather unavailable',
        icon: 'clouds',
        background: 'clouds',
        particle: 'dust',
        message: 'Weather details are temporarily unavailable.',
        accent: ['#f72585', '#4361ee']
    };
}

function hideLoadingScreen() {
    let progress = 0;
    const interval = setInterval(() => {
        progress = Math.min(100, progress + 18);
        if (dom.loadingProgress) dom.loadingProgress.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => dom.loadingScreen?.classList.add('hidden'), 180);
        }
    }, 80);
}

function apiUrl(base, params) {
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

async function fetchJson(url, options = {}) {
    if (!navigator.onLine) {
        throw new Error('You appear to be offline.');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeout || 9000);

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return await response.json();
    } finally {
        clearTimeout(timeout);
    }
}

async function fetchForecast(location) {
    const url = apiUrl('https://api.open-meteo.com/v1/forecast', {
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
            'wind_direction_10m'
        ],
        hourly: ['temperature_2m', 'apparent_temperature', 'relative_humidity_2m', 'weather_code', 'visibility', 'wind_speed_10m'],
        daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset', 'uv_index_max', 'precipitation_probability_max'],
        timezone: 'auto',
        forecast_days: 7
    });

    return fetchJson(url);
}

async function fetchAirQuality(location) {
    const url = apiUrl('https://air-quality-api.open-meteo.com/v1/air-quality', {
        latitude: location.lat,
        longitude: location.lon,
        current: ['us_aqi'],
        timezone: 'auto'
    });

    try {
        return await fetchJson(url, { timeout: 7000 });
    } catch {
        return null;
    }
}

async function loadWeather(location) {
    state.location = location;
    setWeatherLoading(true);

    try {
        const [forecast, airQuality] = await Promise.all([
            fetchForecast(location),
            fetchAirQuality(location)
        ]);

        state.weather = forecast;
        state.airQuality = airQuality;
        addRecentSearch(location);
        updateCurrentPlace();
        renderWeather();
        renderForecasts();
        renderWorldClock();
        showToast(`Weather loaded for ${location.name}`, 'success');
    } catch (error) {
        console.error(error);
        renderWeatherError(error.message);
        showToast('Weather data could not be loaded. Showing the last known screen.', 'error');
    } finally {
        setWeatherLoading(false);
    }
}

function setWeatherLoading(isLoading) {
    dom.mainContainer?.classList.toggle('is-loading-weather', isLoading);
    if (isLoading && dom.weatherDescription) {
        dom.weatherDescription.textContent = 'Loading weather...';
    }
}

function renderWeatherError(message) {
    if (dom.weatherDescription) dom.weatherDescription.textContent = 'Weather unavailable';
    if (dom.weatherMessage) dom.weatherMessage.textContent = message || 'Please try again in a moment.';
}

function updateCurrentPlace() {
    if (!dom.currentPlace || !state.location) return;
    const meta = [state.location.country, `${Number(state.location.lat).toFixed(2)}, ${Number(state.location.lon).toFixed(2)}`]
        .filter(Boolean)
        .join(' · ');
    dom.currentPlace.textContent = `${state.location.name}${meta ? ` · ${meta}` : ''}`;
}

function renderWeather() {
    if (!state.weather?.current) return;

    const current = state.weather.current;
    const meta = getWeatherMeta(current.weather_code);
    const temperature = celsiusToDisplay(current.temperature_2m);
    const feelsLike = celsiusToDisplay(current.apparent_temperature);
    const humidity = current.relative_humidity_2m;
    const windSpeed = current.wind_speed_10m;
    const windDirection = current.wind_direction_10m;
    const visibilityMeters = state.weather.hourly?.visibility?.[0];
    const pressure = current.surface_pressure;
    const uv = state.weather.daily?.uv_index_max?.[0];
    const aqi = state.airQuality?.current?.us_aqi;

    setText(dom.temperatureLarge, formatNumber(temperature));
    document.querySelectorAll('.temp-unit').forEach((node) => {
        node.textContent = getTempUnit();
    });
    setText(dom.weatherDescription, meta.description);
    setText(dom.feelsLike, formatNumber(feelsLike));
    setText(dom.humidity, Number.isFinite(humidity) ? `${Math.round(humidity)}%` : '--%');
    setStyle(dom.humidityProgress, 'width', `${clamp(humidity || 0, 0, 100)}%`);
    setText(dom.windSpeed, Number.isFinite(windSpeed) ? `${Math.round(windSpeed)} km/h` : '-- km/h');
    setText(dom.windDirection, Number.isFinite(windDirection) ? getWindDirection(windDirection) : '--');
    setStyle(dom.compassNeedle, 'transform', `translate(-50%, -50%) rotate(${Number.isFinite(windDirection) ? windDirection : 0}deg)`);
    setText(dom.uvIndex, Number.isFinite(uv) ? uv.toFixed(1) : '--');
    setStyle(dom.uvFill, 'width', `${clamp((uv || 0) / 11 * 100, 0, 100)}%`);
    setText(dom.aqi, Number.isFinite(aqi) ? Math.round(aqi) : '--');
    setStyle(dom.aqiRing, 'strokeDashoffset', String(283 - clamp(aqi || 0, 0, 100) * 2.83));
    setText(dom.visibility, Number.isFinite(visibilityMeters) ? `${Math.round(visibilityMeters / 1000)} km` : '-- km');
    setText(dom.pressure, Number.isFinite(pressure) ? `${Math.round(pressure)} hPa` : '-- hPa');
    setText(dom.weatherMessage, meta.message);

    if (dom.weatherIconLarge) dom.weatherIconLarge.innerHTML = getWeatherIcon(meta.icon, 92);

    renderSun();
    renderMoon();
    updateGreeting(meta);
    updateBackground(meta);
    startParticles(meta.particle);
}

function renderSun() {
    const daily = state.weather?.daily;
    if (!daily?.sunrise?.[0] || !daily?.sunset?.[0]) return;

    const sunrise = new Date(daily.sunrise[0]);
    const sunset = new Date(daily.sunset[0]);
    const now = new Date();
    const progress = clamp((now - sunrise) / (sunset - sunrise) * 100, 0, 100);

    setText(dom.sunriseTime, formatTime(sunrise));
    setText(dom.sunsetTime, formatTime(sunset));
    setStyle(dom.sunIndicator, 'left', `${progress}%`);
}

function renderMoon() {
    const phase = getMoonPhase(new Date());
    setText(dom.moonIcon, phase.icon);
    setText(dom.moonPhase, phase.name);
    setText(dom.moonIllumination, `${phase.illumination}%`);
}

function getMoonPhase(date) {
    const knownNewMoon = new Date('2000-01-06T18:14:00Z');
    const lunarCycle = 29.530588853;
    const days = (date - knownNewMoon) / 86400000;
    const age = ((days % lunarCycle) + lunarCycle) % lunarCycle;
    const index = Math.floor((age / lunarCycle) * 8 + 0.5) % 8;
    const illumination = Math.round((1 - Math.cos((age / lunarCycle) * 2 * Math.PI)) * 50);
    const phases = [
        ['New Moon', '🌑'],
        ['Waxing Crescent', '🌒'],
        ['First Quarter', '🌓'],
        ['Waxing Gibbous', '🌔'],
        ['Full Moon', '🌕'],
        ['Waning Gibbous', '🌖'],
        ['Last Quarter', '🌗'],
        ['Waning Crescent', '🌘']
    ];

    return { name: phases[index][0], icon: phases[index][1], illumination };
}

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
            code: hourly.weather_code?.[index]
        }))
        .filter((item) => item.date.getTime() >= now - 3600000)
        .slice(0, 24);

    dom.hourlyScroll.innerHTML = items.map((item) => {
        const meta = getWeatherMeta(item.code);
        const temp = celsiusToDisplay(item.temp);
        return `
            <article class="forecast-card fade-in" aria-label="${formatTime(item.date)} ${meta.description}">
                <div class="forecast-icon">${getWeatherIcon(meta.icon, 42)}</div>
                <div class="forecast-time">${formatTime(item.date)}</div>
                <div class="forecast-temp">${formatNumber(temp)}°</div>
            </article>
        `;
    }).join('');
}

function renderDailyForecast() {
    const daily = state.weather?.daily;
    if (!daily?.time?.length || !dom.forecastGrid) return;

    const items = daily.time.slice(0, 7).map((time, index) => ({
        date: new Date(`${time}T12:00:00`),
        code: daily.weather_code?.[index],
        high: daily.temperature_2m_max?.[index],
        low: daily.temperature_2m_min?.[index],
        rain: daily.precipitation_probability_max?.[index]
    }));

    dom.forecastGrid.innerHTML = items.map((item) => {
        const meta = getWeatherMeta(item.code);
        const high = celsiusToDisplay(item.high);
        const low = celsiusToDisplay(item.low);
        return `
            <article class="forecast-card slide-up" aria-label="${formatDate(item.date)} ${meta.description}">
                <div class="forecast-icon">${getWeatherIcon(meta.icon, 46)}</div>
                <div class="forecast-day">${formatDate(item.date, { weekday: 'long' })}</div>
                <div class="forecast-date">${formatDate(item.date, { month: 'short', day: 'numeric' })}</div>
                <div class="forecast-temps">
                    <span class="forecast-high">${formatNumber(high)}°</span>
                    <span class="forecast-low">${formatNumber(low)}°</span>
                </div>
                <div class="forecast-rain">${Number.isFinite(item.rain) ? `${Math.round(item.rain)}% rain` : '&nbsp;'}</div>
            </article>
        `;
    }).join('');
}

function updateClock() {
    const now = new Date();
    const hours = state.settings.timeFormat24 ? now.getHours() : now.getHours() % 12 || 12;
    const next = {
        hours: String(hours).padStart(2, '0'),
        minutes: String(now.getMinutes()).padStart(2, '0'),
        seconds: String(now.getSeconds()).padStart(2, '0')
    };

    Object.entries(next).forEach(([key, value]) => {
        if (state.lastClockText[key] !== value && dom[key]) {
            dom[key].textContent = value;
            dom[key].classList.remove('digit-pop');
            void dom[key].offsetWidth;
            dom[key].classList.add('digit-pop');
            state.lastClockText[key] = value;
        }
    });

    setText(dom.heroDate, formatDate(now, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }));
}

function initClock() {
    updateClock();
    clearInterval(state.clockTimer);
    state.clockTimer = setInterval(updateClock, 1000);
}

function updateGreeting(meta = null) {
    const hour = new Date().getHours();
    let greeting = 'Good Night';
    if (hour >= 5 && hour < 12) greeting = 'Good Morning';
    if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
    if (hour >= 17 && hour < 21) greeting = 'Good Evening';

    const place = state.location?.name ? `, ${state.location.name}` : '';
    const condition = meta?.description ? ` · ${meta.description}` : '';
    setText(dom.greeting, `${greeting}${place}${condition}`);
}

function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % directions.length];
}

function formatTime(date, options = {}) {
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: !state.settings.timeFormat24,
        ...options
    });
}

function formatDate(date, options = {}) {
    return date.toLocaleDateString([], options);
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function setText(node, value) {
    if (node && node.textContent !== String(value)) node.textContent = value;
}

function setStyle(node, property, value) {
    if (node) node.style[property] = value;
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[character]));
}

function initLocation() {
    if (!navigator.geolocation) {
        loadWeather(DEFAULT_LOCATION);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            loadWeather({
                ...DEFAULT_LOCATION,
                name: 'Your Location',
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
        },
        () => loadWeather(DEFAULT_LOCATION),
        { timeout: 7000, maximumAge: 600000 }
    );
}

async function searchLocations(query) {
    const trimmed = query.trim();
    if (!trimmed) {
        renderSearchResults(state.recentSearches, true);
        return;
    }

    const coordinateMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
    if (coordinateMatch) {
        renderSearchResults([{
            name: 'Custom Coordinates',
            country: `${coordinateMatch[1]}, ${coordinateMatch[2]}`,
            lat: Number(coordinateMatch[1]),
            lon: Number(coordinateMatch[2]),
            timezone: 'auto'
        }]);
        return;
    }

    try {
        const data = await fetchJson(apiUrl('https://geocoding-api.open-meteo.com/v1/search', {
            name: trimmed,
            count: 8,
            language: 'en',
            format: 'json'
        }), { timeout: 7000 });

        const results = (data.results || []).map((item) => ({
            name: item.name,
            country: [item.admin1, item.country].filter(Boolean).join(', '),
            lat: item.latitude,
            lon: item.longitude,
            timezone: item.timezone || 'auto'
        }));
        renderSearchResults(results);
    } catch (error) {
        renderSearchMessage(error.message || 'Search failed. Try another city.');
    }
}

async function findFirstLocation(query) {
    const trimmed = query.trim();
    const coordinateMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
    if (coordinateMatch) {
        return {
            name: 'Custom Coordinates',
            country: `${coordinateMatch[1]}, ${coordinateMatch[2]}`,
            lat: Number(coordinateMatch[1]),
            lon: Number(coordinateMatch[2]),
            timezone: 'auto'
        };
    }

    const data = await fetchJson(apiUrl('https://geocoding-api.open-meteo.com/v1/search', {
        name: trimmed,
        count: 1,
        language: 'en',
        format: 'json'
    }), { timeout: 7000 });

    const item = data.results?.[0];
    if (!item) throw new Error('No matching place found.');

    return {
        name: item.name,
        country: [item.admin1, item.country].filter(Boolean).join(', '),
        lat: item.latitude,
        lon: item.longitude,
        timezone: item.timezone || 'auto'
    };
}

function renderSearchResults(results, isHistory = false) {
    state.selectedSearchIndex = -1;
    if (!dom.searchResults) return;

    if (!results.length) {
        renderSearchMessage(isHistory ? 'Recent searches will appear here.' : 'No matching cities found.');
        return;
    }

    dom.searchResults.innerHTML = `
        <div class="results-label">${isHistory ? 'Recent searches' : 'Search results'}</div>
        ${results.map((result, index) => `
            <button class="search-result" data-index="${index}" type="button">
                <span class="result-name">${escapeHtml(result.name)}</span>
                <span class="result-meta">${escapeHtml(result.country || `${result.lat.toFixed(2)}, ${result.lon.toFixed(2)}`)}</span>
            </button>
        `).join('')}
    `;

    dom.searchResults.querySelectorAll('.search-result').forEach((button) => {
        button.addEventListener('click', () => {
            const result = results[Number(button.dataset.index)];
            selectLocation(result);
        });
    });
}

function renderSearchMessage(message) {
    if (dom.searchResults) dom.searchResults.innerHTML = `<div class="empty-state">${escapeHtml(message)}</div>`;
}

function selectLocation(location) {
    dom.searchPanel?.classList.remove('open');
    if (dom.citySearch) dom.citySearch.value = '';
    if (dom.placeSearch) dom.placeSearch.value = '';
    loadWeather(location);
}

function addRecentSearch(location) {
    state.recentSearches = [
        location,
        ...state.recentSearches.filter((item) => `${item.name}-${item.lat}-${item.lon}` !== `${location.name}-${location.lat}-${location.lon}`)
    ].slice(0, 6);
    saveJson(STORAGE_KEYS.recentSearches, state.recentSearches);
}

function initSearch() {
    const debouncedSearch = debounce((event) => searchLocations(event.target.value), 300);

    dom.searchToggle?.addEventListener('click', () => {
        dom.searchPanel?.classList.toggle('open');
        dom.settingsPanel?.classList.remove('open');
        dom.citySearch?.focus();
        renderSearchResults(state.recentSearches, true);
    });

    dom.citySearch?.addEventListener('input', debouncedSearch);
    dom.citySearch?.addEventListener('keydown', handleSearchKeyboard);
    dom.clearSearch?.addEventListener('click', () => {
        dom.citySearch.value = '';
        renderSearchResults(state.recentSearches, true);
        dom.citySearch.focus();
    });
}

function initPlaceControls() {
    dom.placeApply?.addEventListener('click', () => applyPlaceFromSettings());
    dom.placeSearch?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') applyPlaceFromSettings();
    });

    dom.countrySelect?.addEventListener('change', async () => {
        const country = COUNTRY_CHOICES[dom.countrySelect.value];
        if (!country) return;

        try {
            const location = await findFirstLocation(country.query);
            location.country = country.name;
            selectLocation(location);
        } catch (error) {
            showToast(error.message || 'Country location could not be loaded.', 'error');
        }
    });
}

async function applyPlaceFromSettings() {
    const query = dom.placeSearch?.value.trim();
    if (!query) {
        showToast('Type a city, country, or coordinates first.', 'warning');
        return;
    }

    try {
        const location = await findFirstLocation(query);
        selectLocation(location);
    } catch (error) {
        showToast(error.message || 'Place could not be loaded.', 'error');
    }
}

function handleSearchKeyboard(event) {
    const results = Array.from(dom.searchResults?.querySelectorAll('.search-result') || []);
    if (!results.length) return;

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        state.selectedSearchIndex = (state.selectedSearchIndex + 1) % results.length;
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        state.selectedSearchIndex = (state.selectedSearchIndex - 1 + results.length) % results.length;
    } else if (event.key === 'Enter' && state.selectedSearchIndex >= 0) {
        event.preventDefault();
        results[state.selectedSearchIndex].click();
    } else {
        return;
    }

    results.forEach((button, index) => button.classList.toggle('active', index === state.selectedSearchIndex));
    results[state.selectedSearchIndex]?.scrollIntoView({ block: 'nearest' });
}

function initSettings() {
    applySettings();
    syncSettingsUi();

    dom.settingsToggle?.addEventListener('click', () => {
        dom.settingsPanel?.classList.toggle('open');
        dom.searchPanel?.classList.remove('open');
    });
    dom.closeSettings?.addEventListener('click', () => dom.settingsPanel?.classList.remove('open'));

    dom.themeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            state.settings.theme = button.dataset.theme;
            commitSettings();
        });
    });

    dom.unitButtons.forEach((button) => {
        button.addEventListener('click', () => {
            state.settings.temperatureUnit = button.dataset.unit;
            commitSettings();
            renderWeather();
            renderForecasts();
        });
    });

    bindToggle(dom.timeFormatToggle, 'timeFormat24', () => {
        updateClock();
        renderForecasts();
        renderWorldClock();
    });
    bindToggle(dom.animationsToggle, 'animations');
    bindToggle(dom.particlesToggle, 'particles', () => startParticles(getWeatherMeta(state.weather?.current?.weather_code).particle));
    bindToggle(dom.auroraToggle, 'aurora');
    bindToggle(dom.backgroundToggle, 'backgroundEffects');
    bindToggle(dom.reduceMotionToggle, 'reduceMotion');
    bindToggle(dom.ambientSoundsToggle, 'ambientSounds', () => showToast('Ambient sound toggle saved. Audio assets can be connected later.', 'success'));

    dom.glassBlurRange?.addEventListener('input', () => {
        state.settings.glassBlur = Number(dom.glassBlurRange.value);
        commitSettings();
    });
}

function bindToggle(node, key, afterChange = null) {
    node?.nextElementSibling?.addEventListener('click', () => {
        node.checked = !node.checked;
        node.dispatchEvent(new Event('change', { bubbles: true }));
    });

    node?.addEventListener('change', () => {
        state.settings[key] = node.checked;
        commitSettings();
        afterChange?.();
    });
}

function commitSettings() {
    saveJson(STORAGE_KEYS.settings, state.settings);
    applySettings();
    syncSettingsUi();
}

function syncSettingsUi() {
    dom.themeButtons.forEach((button) => button.classList.toggle('active', button.dataset.theme === state.settings.theme));
    dom.unitButtons.forEach((button) => button.classList.toggle('active', button.dataset.unit === state.settings.temperatureUnit));
    if (dom.timeFormatToggle) dom.timeFormatToggle.checked = state.settings.timeFormat24;
    if (dom.animationsToggle) dom.animationsToggle.checked = state.settings.animations;
    if (dom.particlesToggle) dom.particlesToggle.checked = state.settings.particles;
    if (dom.auroraToggle) dom.auroraToggle.checked = state.settings.aurora;
    if (dom.backgroundToggle) dom.backgroundToggle.checked = state.settings.backgroundEffects;
    if (dom.reduceMotionToggle) dom.reduceMotionToggle.checked = state.settings.reduceMotion;
    if (dom.ambientSoundsToggle) dom.ambientSoundsToggle.checked = state.settings.ambientSounds;
    if (dom.glassBlurRange) dom.glassBlurRange.value = state.settings.glassBlur;
    if (dom.glassBlurValue) dom.glassBlurValue.textContent = `${state.settings.glassBlur}px`;
}

function applySettings() {
    const body = document.body;
    body.classList.toggle('light-mode', state.settings.theme === 'light');
    body.classList.toggle('dark-mode', state.settings.theme === 'dark');
    body.classList.toggle('animations-off', !state.settings.animations || state.settings.reduceMotion);
    body.classList.toggle('particles-off', !state.settings.particles);
    body.classList.toggle('aurora-off', !state.settings.aurora);
    body.classList.toggle('background-effects-off', !state.settings.backgroundEffects);
    body.style.setProperty('--glass-blur', `${state.settings.glassBlur}px`);

    if (state.settings.theme === 'auto') updateBackground(getWeatherMeta(state.weather?.current?.weather_code));
    if (!state.settings.particles) stopParticles();
}

function updateBackground(meta) {
    if (!meta) return;
    const body = document.body;
    body.classList.remove('weather-clear', 'weather-clouds', 'weather-rain', 'weather-snow', 'weather-storm', 'weather-fog', 'theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night');

    if (state.settings.backgroundEffects) {
        body.classList.add(`weather-${meta.background}`);
    }

    if (state.settings.theme === 'auto') {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) body.classList.add('theme-morning');
        else if (hour >= 12 && hour < 17) body.classList.add('theme-afternoon');
        else if (hour >= 17 && hour < 20) body.classList.add('theme-evening');
        else body.classList.add('theme-night');
    }

    if (meta.accent) {
        body.style.setProperty('--accent-primary', meta.accent[0]);
        body.style.setProperty('--accent-secondary', meta.accent[1]);
    }
}

function startParticles(type = 'stars') {
    stopParticles();
    if (!state.settings.particles || !dom.particlesContainer) return;

    const density = window.innerWidth < 600 ? 900 : 520;
    state.particleTimer = setInterval(() => createParticle(type), density);
}

function stopParticles() {
    clearInterval(state.particleTimer);
    state.particleTimer = null;
    if (dom.particlesContainer) dom.particlesContainer.innerHTML = '';
}

function createParticle(type) {
    if (!dom.particlesContainer || document.hidden) return;
    const particle = document.createElement('span');
    particle.className = `particle particle-${type}`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.setProperty('--size', `${Math.random() * 4 + 2}px`);
    particle.style.setProperty('--drift', `${Math.random() * 80 - 40}px`);
    particle.style.setProperty('--duration', `${Math.random() * 5 + 6}s`);
    dom.particlesContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 11000);
}

function initWorldClockControls() {
    renderWorldClock();
    clearInterval(state.worldClockTimer);
    state.worldClockTimer = setInterval(renderWorldClock, 30000);

    dom.worldClockSearch?.addEventListener('input', debounce((event) => {
        const query = event.target.value.trim().toLowerCase();
        const results = TIMEZONE_CHOICES.filter((item) =>
            item.name.toLowerCase().includes(query) || item.timezone.toLowerCase().includes(query)
        ).slice(0, 6);
        renderWorldClockResults(query ? results : []);
    }, 200));
}

function renderWorldClockResults(results) {
    if (!dom.worldClockResults) return;
    dom.worldClockResults.innerHTML = results.map((item) => `
        <button class="timezone-result" type="button" data-timezone="${escapeHtml(item.timezone)}" data-name="${escapeHtml(item.name)}">
            ${escapeHtml(item.name)}<span>${escapeHtml(item.timezone)}</span>
        </button>
    `).join('');

    dom.worldClockResults.querySelectorAll('.timezone-result').forEach((button) => {
        button.addEventListener('click', () => {
            addWorldClock({ name: button.dataset.name, timezone: button.dataset.timezone });
            dom.worldClockResults.innerHTML = '';
            dom.worldClockSearch.value = '';
        });
    });
}

function addWorldClock(clock) {
    if (state.worldClocks.some((item) => item.timezone === clock.timezone)) {
        showToast('That clock is already on the board.', 'warning');
        return;
    }
    state.worldClocks = [...state.worldClocks.slice(-2), clock];
    saveJson(STORAGE_KEYS.worldClocks, state.worldClocks);
    renderWorldClock();
}

function removeWorldClock(timezone) {
    state.worldClocks = state.worldClocks.filter((item) => item.timezone !== timezone);
    saveJson(STORAGE_KEYS.worldClocks, state.worldClocks);
    renderWorldClock();
}

function renderWorldClock() {
    if (!dom.worldClockGrid) return;
    const now = new Date();

    const clocks = state.worldClocks.slice(0, 3);
    if (clocks.length !== state.worldClocks.length) {
        state.worldClocks = clocks;
        saveJson(STORAGE_KEYS.worldClocks, state.worldClocks);
    }

    dom.worldClockGrid.innerHTML = clocks.map((city) => {
        try {
            const time = now.toLocaleTimeString([], {
                timeZone: city.timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: !state.settings.timeFormat24
            });
            const date = now.toLocaleDateString([], {
                timeZone: city.timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });

            return `
                <article class="world-clock-card" aria-label="${escapeHtml(city.name)} time">
                    <button class="remove-clock" type="button" aria-label="Remove ${escapeHtml(city.name)}" data-timezone="${escapeHtml(city.timezone)}">×</button>
                    <div class="world-clock-city">${escapeHtml(city.name)}</div>
                    <div class="world-clock-time">${time}</div>
                    <div class="world-clock-date">${date}</div>
                </article>
            `;
        } catch {
            return '';
        }
    }).join('');

    dom.worldClockGrid.querySelectorAll('.remove-clock').forEach((button) => {
        button.addEventListener('click', () => removeWorldClock(button.dataset.timezone));
    });
}

function showToast(message, type = 'success') {
    if (!dom.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.textContent = message;
    dom.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4200);
}

function getWeatherIcon(type, size = 80) {
    const common = `width="${size}" height="${size}" viewBox="0 0 100 100" class="weather-icon-svg" aria-hidden="true" focusable="false"`;
    const cloud = '<ellipse cx="52" cy="52" rx="30" ry="18" fill="#dfe7ef"/><ellipse cx="38" cy="57" rx="22" ry="14" fill="#cdd8e4"/><ellipse cx="64" cy="58" rx="24" ry="15" fill="#b8c4d2"/>';

    const icons = {
        sun: `<svg ${common}><circle cx="50" cy="50" r="22" fill="#ffd166"/><g stroke="#ffd166" stroke-width="5" stroke-linecap="round"><line x1="50" y1="10" x2="50" y2="22"/><line x1="50" y1="78" x2="50" y2="90"/><line x1="10" y1="50" x2="22" y2="50"/><line x1="78" y1="50" x2="90" y2="50"/><line x1="22" y1="22" x2="30" y2="30"/><line x1="70" y1="70" x2="78" y2="78"/><line x1="22" y1="78" x2="30" y2="70"/><line x1="70" y1="30" x2="78" y2="22"/></g></svg>`,
        'partly-cloudy': `<svg ${common}><circle cx="36" cy="36" r="18" fill="#ffd166"/>${cloud}</svg>`,
        clouds: `<svg ${common}>${cloud}</svg>`,
        rain: `<svg ${common}>${cloud}<g fill="#4cc9f0"><rect x="34" y="70" width="4" height="16" rx="2"/><rect x="50" y="72" width="4" height="16" rx="2"/><rect x="66" y="70" width="4" height="16" rx="2"/></g></svg>`,
        'heavy-rain': `<svg ${common}>${cloud}<g fill="#4361ee"><rect x="28" y="68" width="5" height="22" rx="2"/><rect x="44" y="70" width="5" height="24" rx="2"/><rect x="60" y="68" width="5" height="22" rx="2"/><rect x="76" y="70" width="5" height="20" rx="2"/></g></svg>`,
        snow: `<svg ${common}>${cloud}<g fill="#ffffff" stroke="#caf0f8" stroke-width="2"><circle cx="36" cy="76" r="4"/><circle cx="52" cy="82" r="4"/><circle cx="68" cy="76" r="4"/></g></svg>`,
        'heavy-snow': `<svg ${common}>${cloud}<g fill="#ffffff" stroke="#caf0f8" stroke-width="2"><circle cx="28" cy="74" r="4"/><circle cx="44" cy="83" r="4"/><circle cx="60" cy="76" r="4"/><circle cx="76" cy="84" r="4"/></g></svg>`,
        storm: `<svg ${common}>${cloud}<polygon points="47,62 60,62 52,80 64,80 42,96 48,76 38,76" fill="#ffbe0b"/></svg>`,
        fog: `<svg ${common}>${cloud}<g stroke="#e9ecef" stroke-width="6" stroke-linecap="round"><line x1="22" y1="72" x2="78" y2="72"/><line x1="30" y1="84" x2="70" y2="84"/></g></svg>`,
        'freezing-rain': `<svg ${common}>${cloud}<g fill="#90e0ef"><rect x="38" y="70" width="4" height="14" rx="2"/><polygon points="58,70 64,84 52,84"/></g></svg>`,
        'rain-shower': `<svg ${common}><circle cx="34" cy="32" r="15" fill="#ffd166"/>${cloud}<g fill="#4cc9f0"><rect x="45" y="72" width="4" height="15" rx="2"/><rect x="62" y="70" width="4" height="16" rx="2"/></g></svg>`,
        'snow-shower': `<svg ${common}><circle cx="34" cy="32" r="15" fill="#ffd166"/>${cloud}<g fill="#ffffff" stroke="#caf0f8" stroke-width="2"><circle cx="46" cy="78" r="4"/><circle cx="64" cy="82" r="4"/></g></svg>`
    };

    return icons[type] || icons.clouds;
}

function initGlobalEvents() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            dom.searchPanel?.classList.remove('open');
            dom.settingsPanel?.classList.remove('open');
        }
    });

    window.addEventListener('online', () => {
        showToast('Back online. Refreshing weather.', 'success');
        loadWeather(state.location || DEFAULT_LOCATION);
    });
    window.addEventListener('offline', () => showToast('Offline mode: keeping the current dashboard visible.', 'warning'));
}

document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    hideLoadingScreen();
    initClock();
    initSettings();
    initSearch();
    initPlaceControls();
    initWorldClockControls();
    initGlobalEvents();
    initLocation();

    clearInterval(state.weatherRefreshTimer);
    state.weatherRefreshTimer = setInterval(() => {
        if (state.location) loadWeather(state.location);
    }, 15 * 60 * 1000);
});
