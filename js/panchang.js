/**
 * WeatherOS Vedic Panchang Engine (वैदिक पंचांग)
 * High-accuracy astronomical calculations for Indian Vedic Almanac
 * Supports Dual Language: English & हिन्दी (Hindi)
 */

(function () {
    'use strict';

    const TITHI_NAMES = {
        en: [
            'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
            'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
            'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'
        ],
        hi: [
            'प्रतिपदा (पड़वा)', 'द्वितीया (दूज)', 'तृतीया (तीज)', 'चतुर्थी (चौथ)', 'पंचमी',
            'षष्ठी (छठ)', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
            'एकादशी (ग्यारस)', 'द्वादशी (बारस)', 'त्रयोदशी (तेरस)', 'चतुर्दशी (चौदस)', 'पूर्णिमा'
        ]
    };

    const AMAVASYA_NAME = {
        en: 'Amavasya (New Moon)',
        hi: 'अमावस्या (दर्श/सर्वपितृ)'
    };

    const PAKSHA_NAMES = {
        en: { shukla: 'Shukla Paksha (Waxing)', krishna: 'Krishna Paksha (Waning)' },
        hi: { shukla: 'शुक्ल पक्ष (सुदी)', krishna: 'कृष्ण पक्ष (बदी)' }
    };

    const VAAR_DATA = {
        en: [
            { name: 'Ravivaar (Sunday)', deity: 'Surya (Sun God)', planet: 'Sun', energy: 'Royal, Vitality' },
            { name: 'Somvaar (Monday)', deity: 'Shiva / Chandra', planet: 'Moon', energy: 'Peace, Nurturing' },
            { name: 'Mangalvaar (Tuesday)', deity: 'Hanuman / Mangala', planet: 'Mars', energy: 'Courage, Power' },
            { name: 'Budhvaar (Wednesday)', deity: 'Ganesha / Budha', planet: 'Mercury', energy: 'Intellect, Commerce' },
            { name: 'Guruvaar (Thursday)', deity: 'Brihaspati / Vishnu', planet: 'Jupiter', energy: 'Wisdom, Dharma' },
            { name: 'Shukravaar (Friday)', deity: 'Lakshmi / Shukra', planet: 'Venus', energy: 'Art, Prosperity' },
            { name: 'Shanivaar (Saturday)', deity: 'Shani Dev', planet: 'Saturn', energy: 'Discipline, Karma' }
        ],
        hi: [
            { name: 'रविवार', deity: 'सूर्य देव', planet: 'सूर्य', energy: 'तेज, आत्मविश्वास एवं आरोग्यता' },
            { name: 'सोमवार', deity: 'भगवान शिव / चंद्र', planet: 'चंद्रमा', energy: 'शांति, मन की शीतलता एवं भक्ति' },
            { name: 'मंगलवार', deity: 'हनुमान जी / मंगल', planet: 'मंगल', energy: 'पराक्रम, शौर्य एवं शक्ति' },
            { name: 'बुधवार', deity: 'गणेश जी / बुध देव', planet: 'बुध', energy: 'बुद्धि, वाणी एवं व्यापारिक लाभ' },
            { name: 'गुरुवार', deity: 'बृहस्पति / श्री हरि', planet: 'गुरु', energy: 'ज्ञान, धर्म एवं गुरु कृपा' },
            { name: 'शुक्रवार', deity: 'महालक्ष्मी / शुक्र', planet: 'शुक्र', energy: 'सुख, ऐश्वर्य एवं आकर्षण' },
            { name: 'शनिवार', deity: 'शनि देव / भैरव', planet: 'शनि', energy: 'न्याय, कर्म एवं धैर्य' }
        ]
    };

    const NAKSHATRAS = {
        en: [
            { name: 'Ashwini', lord: 'Ketu', symbol: 'Horse Head' },
            { name: 'Bharani', lord: 'Venus', symbol: 'Yoni' },
            { name: 'Krittika', lord: 'Sun', symbol: 'Razor/Flame' },
            { name: 'Rohini', lord: 'Moon', symbol: 'Chariot/Cart' },
            { name: 'Mrigashira', lord: 'Mars', symbol: 'Deer Head' },
            { name: 'Ardra', lord: 'Rahu', symbol: 'Teardrop' },
            { name: 'Punarvasu', lord: 'Jupiter', symbol: 'Bow & Quiver' },
            { name: 'Pushya', lord: 'Saturn', symbol: 'Cow Udder/Flower' },
            { name: 'Ashlesha', lord: 'Mercury', symbol: 'Serpent' },
            { name: 'Magha', lord: 'Ketu', symbol: 'Throne' },
            { name: 'Purva Phalguni', lord: 'Venus', symbol: 'Front Hammock' },
            { name: 'Uttara Phalguni', lord: 'Sun', symbol: 'Back Hammock' },
            { name: 'Hasta', lord: 'Moon', symbol: 'Open Hand' },
            { name: 'Chitra', lord: 'Mars', symbol: 'Bright Jewel' },
            { name: 'Swati', lord: 'Rahu', symbol: 'Coral/Young Plant' },
            { name: 'Vishakha', lord: 'Jupiter', symbol: 'Triumphal Arch' },
            { name: 'Anuradha', lord: 'Saturn', symbol: 'Lotus Flower' },
            { name: 'Jyeshtha', lord: 'Mercury', symbol: 'Amulet/Earring' },
            { name: 'Mula', lord: 'Ketu', symbol: 'Tied Bunch of Roots' },
            { name: 'Purva Ashadha', lord: 'Venus', symbol: 'Elephant Tusk' },
            { name: 'Uttara Ashadha', lord: 'Sun', symbol: 'Small Bed' },
            { name: 'Shravana', lord: 'Moon', symbol: 'Ear / Three Footprints' },
            { name: 'Dhanishta', lord: 'Mars', symbol: 'Mridangam Drum' },
            { name: 'Shatabhisha', lord: 'Rahu', symbol: '100 Healers/Circle' },
            { name: 'Purva Bhadrapada', lord: 'Jupiter', symbol: 'Front of Funeral Bed' },
            { name: 'Uttara Bhadrapada', lord: 'Saturn', symbol: 'Back of Funeral Bed' },
            { name: 'Revati', lord: 'Mercury', symbol: 'Fish / Drum' }
        ],
        hi: [
            { name: 'अश्विनी', lord: 'केतु', symbol: 'अश्व मुख (घोड़े का सिर)' },
            { name: 'भरणी', lord: 'शुक्र', symbol: 'योनि / पालना' },
            { name: 'कृत्तिका', lord: 'सूर्य', symbol: 'अग्नि शिखा / छुरा' },
            { name: 'रोहिणी', lord: 'चंद्रमा', symbol: 'रथ / गाड़ी' },
            { name: 'मृगशिरा', lord: 'मंगल', symbol: 'हिरण का सिर' },
            { name: 'आर्द्रा', lord: 'राहु', symbol: 'आंसू की बूंद' },
            { name: 'पुनर्वसु', lord: 'बृहस्पति', symbol: 'धनुष-बाण' },
            { name: 'पुष्य', lord: 'शनि', symbol: 'कमल / गाय का थन' },
            { name: 'आश्लेषा', lord: 'बुध', symbol: 'सर्प (कुंडलित)' },
            { name: 'मघा', lord: 'केतु', symbol: 'राज सिंहासन' },
            { name: 'पूर्वा फाल्गुनी', lord: 'शुक्र', symbol: 'झूला / शय्या' },
            { name: 'उत्तरा फाल्गुनी', lord: 'सूर्य', symbol: 'पलंग के पिछले पाये' },
            { name: 'हस्त', lord: 'चंद्रमा', symbol: 'हाथ का पंजा' },
            { name: 'चित्रा', lord: 'मंगल', symbol: 'चमकता मणि / मोती' },
            { name: 'स्वाति', lord: 'राहु', symbol: 'मूंगा / कोपल' },
            { name: 'विशाखा', lord: 'बृहस्पति', symbol: 'तोरण द्वार' },
            { name: 'अनुराधा', lord: 'शनि', symbol: 'कमल का फूल' },
            { name: 'ज्येष्ठा', lord: 'बुध', symbol: 'कुंडल / ताबीज' },
            { name: 'मूल', lord: 'केतु', symbol: 'जड़ों का गुच्छा' },
            { name: 'पूर्वाषाढ़ा', lord: 'शुक्र', symbol: 'हाथी दांत / पंखा' },
            { name: 'उत्तराषाढ़ा', lord: 'सूर्य', symbol: 'छोटा मंच / तख्त' },
            { name: 'श्रवण', lord: 'चंद्रमा', symbol: 'त्रिशूल / कान' },
            { name: 'धनिष्ठा', lord: 'मंगल', symbol: 'मृदंग / बांसुरी' },
            { name: 'शतभिषा', lord: 'राहु', symbol: 'सौ औषधियों का चक्र' },
            { name: 'पूर्वाभाद्रपद', lord: 'बृहस्पति', symbol: 'दो मुखी मनुष्य / तलवार' },
            { name: 'उत्तराभाद्रपद', lord: 'शनि', symbol: 'गहरा सागर / शेषनाग' },
            { name: 'रेवती', lord: 'बुध', symbol: 'मछली का जोड़ा' }
        ]
    };

    const YOGAS = {
        en: [
            'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
            'Atiganda', 'Sukarma', 'Dhriti', 'Shoola', 'Ganda',
            'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
            'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
            'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
            'Indra', 'Vaidhriti'
        ],
        hi: [
            'विष्कुम्भ (अशुभ)', 'प्रीति (शुभ)', 'आयुष्मान (अति शुभ)', 'सौभाग्य (मंगलकारी)', 'शोभन (शुभ)',
            'अतिगण्ड (अशुभ)', 'सुकर्मा (शुभ)', 'धृति (शुभ)', 'शूल (कष्टकारी)', 'गण्ड (अशुभ)',
            'वृद्धि (शुभ)', 'ध्रुव (स्थिर)', 'व्याघात (अशुभ)', 'हर्षण (प्रसन्नता)', 'वज्र (कठिन)',
            'सिद्धि (सफलता)', 'व्यतीपात (महादोष)', 'वरीयान (शुभ)', 'परिघ (मध्यम)', 'शिव (अति शुभ)',
            'सिद्ध (कार्य सिद्धि)', 'साध्य (शुभ)', 'शुभ (कल्याणकारी)', 'शुक्ल (उज्ज्वल)', 'ब्रह्म (ज्ञानवर्धक)',
            'इन्द्र (विजयी)', 'वैधृति (अशुभ)'
        ]
    };

    const KARANAS = {
        en: [
            'Bava (Tiger)', 'Balava (Leopard)', 'Kaulava (Pig)', 'Taitila (Donkey)',
            'Gara (Elephant)', 'Vanija (Ox)', 'Vishti / Bhadra (Inauspicious)',
            'Shakuni (Bird)', 'Chatushpada (Four-legged)', 'Naga (Snake)', 'Kintughna (Worm)'
        ],
        hi: [
            'बव (शुभ)', 'बालव (शुभ)', 'कौलव (शुभ)', 'तैतिल (मध्यम)',
            'गर (स्थिर)', 'वणिज (व्यापारिक)', 'विष्टि / भद्रा (अशुभ - वर्जित कार्य)',
            'शकुनि (स्थिर)', 'चतुष्पाद (पशु कार्य)', 'नाग (सर्प)', 'किंस्तुघ्न (शुभ कार्य)'
        ]
    };

    const HINDU_MONTHS = {
        en: ['Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashwina', 'Kartika', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'],
        hi: ['चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ़', 'श्रावण (सावन)', 'भाद्रपद (भादो)', 'आश्विन (क्वार)', 'कार्तिक', 'मार्गशीर्ष (अगहन)', 'पौष (पूस)', 'माघ', 'फाल्गुन']
    };

    const RITU_DATA = {
        en: [
            { name: 'Vasant (Spring)', months: 'Chaitra - Vaishakha' },
            { name: 'Grishma (Summer)', months: 'Jyeshtha - Ashadha' },
            { name: 'Varsha (Monsoon)', months: 'Shravana - Bhadrapada' },
            { name: 'Sharad (Autumn)', months: 'Ashwina - Kartika' },
            { name: 'Hemant (Pre-Winter)', months: 'Margashirsha - Pausha' },
            { name: 'Shishir (Winter)', months: 'Magha - Phalguna' }
        ],
        hi: [
            { name: 'वसन्त ऋतु', months: 'चैत्र - वैशाख' },
            { name: 'ग्रीष्म ऋतु', months: 'ज्येष्ठ - आषाढ़' },
            { name: 'वर्षा ऋतु', months: 'श्रावण - भाद्रपद' },
            { name: 'शरद ऋतु', months: 'आश्विन - कार्तिक' },
            { name: 'हेमन्त ऋतु', months: 'मार्गशीर्ष - पौष' },
            { name: 'शिशिर (शीत) ऋतु', months: 'माघ - फाल्गुन' }
        ]
    };

    // Rahu Kaal Ashtama Bhaga table (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat)
    // 1-based part index (1..8) of day period
    const RAHU_KAAL_PARTS = [8, 2, 7, 5, 6, 4, 3];
    const YAMAGANDA_PARTS = [5, 4, 3, 2, 1, 7, 6];
    const GULIKA_PARTS = [7, 6, 5, 4, 3, 2, 1];

    class VedicPanchangEngine {
        constructor() {
            this.currentLanguage = 'en'; // 'en' | 'hi'
        }

        setLanguage(lang) {
            if (lang === 'hi' || lang === 'en') {
                this.currentLanguage = lang;
            }
        }

        // Format a Date object to "HH:MM AM/PM" or 24H based on preferences
        formatTime(date, use24h = true) {
            if (!date || isNaN(date.getTime())) return '--:--';
            let h = date.getHours();
            const m = String(date.getMinutes()).padStart(2, '0');
            if (use24h) {
                return `${String(h).padStart(2, '0')}:${m}`;
            }
            const ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            return `${h}:${m} ${ampm}`;
        }

        // Astronomical Solar & Lunar Longitude Approximation
        getAstroLongitudes(date) {
            // Days since J2000.0 (2000-Jan-01 12:00:00 UTC)
            const d = (date.getTime() - Date.UTC(2000, 0, 1, 12, 0, 0)) / 86400000;

            // Solar Mean Longitude L0 and Mean Anomaly M
            const L0 = (280.466 + 0.9856474 * d) % 360;
            const M = (357.529 + 0.9856003 * d) * (Math.PI / 180);
            let sunLon = (L0 + 1.915 * Math.sin(M) + 0.020 * Math.sin(2 * M) + 360) % 360;

            // Lunar Mean Longitude and Anomaly
            const Lm = (218.316 + 13.176396 * d) % 360;
            const Mm = (134.963 + 13.064993 * d) * (Math.PI / 180);
            let moonLon = (Lm + 6.289 * Math.sin(Mm) + 360) % 360;

            // Lahiri Ayanamsha (~24.1 deg for current epoch)
            const ayanamsha = 24.1;
            const siderealSun = (sunLon - ayanamsha + 360) % 360;
            const siderealMoon = (moonLon - ayanamsha + 360) % 360;

            return { sunLon, moonLon, siderealSun, siderealMoon };
        }

        // Compute Comprehensive Panchang for a given Date and Sunrise/Sunset times
        calculatePanchang(date = new Date(), sunriseDate = null, sunsetDate = null, use24h = true, targetLang = null) {
            const lang = (targetLang && (targetLang === 'hi' || targetLang === 'en')) ? targetLang : (this.currentLanguage || 'en');
            const astro = this.getAstroLongitudes(date);

            // 1. Tithi & Paksha
            let diff = (astro.moonLon - astro.sunLon + 360) % 360;
            const tithiRaw = diff / 12;
            const tithiIndex = Math.floor(tithiRaw); // 0 to 29
            const isShukla = tithiIndex < 15;
            const pakshaKey = isShukla ? 'shukla' : 'krishna';
            const pakshaName = PAKSHA_NAMES[lang][pakshaKey];
            
            const tithiNum = (tithiIndex % 15);
            let tithiName;
            if (isShukla) {
                tithiName = TITHI_NAMES[lang][tithiNum];
            } else {
                tithiName = tithiNum === 14 ? AMAVASYA_NAME[lang] : TITHI_NAMES[lang][tithiNum];
            }

            // Approximate Tithi end time (each tithi ~19 to 26 hours, avg 23.6h)
            const tithiFractionElapsed = tithiRaw - tithiIndex;
            const tithiRemainingHours = (1 - tithiFractionElapsed) * 23.6;
            const tithiEndTime = new Date(date.getTime() + tithiRemainingHours * 3600000);

            // 2. Vaar (Solar Day of Week)
            const dayOfWeek = date.getDay(); // 0 = Sun
            const vaar = VAAR_DATA[lang][dayOfWeek];

            // 3. Nakshatra (Lunar Mansion)
            const nakshatraIndex = Math.floor(astro.siderealMoon / (360 / 27)) % 27;
            const nakshatra = NAKSHATRAS[lang][nakshatraIndex];
            const pada = Math.floor((astro.siderealMoon % (360 / 27)) / (360 / 108)) + 1; // 1 to 4

            // 4. Yoga (Sum of Sidereal Sun & Moon)
            const yogaAngle = (astro.siderealSun + astro.siderealMoon + 360) % 360;
            const yogaIndex = Math.floor(yogaAngle / (360 / 27)) % 27;
            const yoga = YOGAS[lang][yogaIndex];

            // 5. Karana (Half of a Tithi = 6 degrees)
            const karanaRaw = Math.floor(diff / 6); // 0 to 59
            let karanaIndex;
            if (karanaRaw === 0) karanaIndex = 10; // Kintughna
            else if (karanaRaw >= 57) karanaIndex = karanaRaw - 50; // 57=Shakuni(7), 58=Chatushpada(8), 59=Naga(9)
            else karanaIndex = ((karanaRaw - 1) % 7); // 0..6 (Bava..Vishti)
            const karana = KARANAS[lang][karanaIndex];

            // 6. Muhurats and Auspicious/Inauspicious Timings
            // Default sunrise: 06:00, sunset: 18:00 if not provided
            const rise = sunriseDate instanceof Date && !isNaN(sunriseDate.getTime()) ? new Date(sunriseDate) : new Date(date.getFullYear(), date.getMonth(), date.getDate(), 6, 0);
            const set = sunsetDate instanceof Date && !isNaN(sunsetDate.getTime()) ? new Date(sunsetDate) : new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0);

            const dayDurationMs = Math.max(set.getTime() - rise.getTime(), 10 * 3600000);
            const partDurationMs = dayDurationMs / 8;

            // Rahu Kaal
            const rahuPart = RAHU_KAAL_PARTS[dayOfWeek];
            const rahuStart = new Date(rise.getTime() + (rahuPart - 1) * partDurationMs);
            const rahuEnd = new Date(rise.getTime() + rahuPart * partDurationMs);

            // Yamaganda
            const yamaPart = YAMAGANDA_PARTS[dayOfWeek];
            const yamaStart = new Date(rise.getTime() + (yamaPart - 1) * partDurationMs);
            const yamaEnd = new Date(rise.getTime() + yamaPart * partDurationMs);

            // Gulika Kaal
            const gulikaPart = GULIKA_PARTS[dayOfWeek];
            const gulikaStart = new Date(rise.getTime() + (gulikaPart - 1) * partDurationMs);
            const gulikaEnd = new Date(rise.getTime() + gulikaPart * partDurationMs);

            // Abhijit Muhurat (midday 48 minutes around local solar noon)
            const solarNoonTime = (rise.getTime() + set.getTime()) / 2;
            const abhijitStart = new Date(solarNoonTime - 24 * 60000);
            const abhijitEnd = new Date(solarNoonTime + 24 * 60000);

            // Brahma Muhurat (96 to 48 mins before sunrise)
            const brahmaStart = new Date(rise.getTime() - 96 * 60000);
            const brahmaEnd = new Date(rise.getTime() - 48 * 60000);

            // Godhuli Muhurat (15 mins before to 15 mins after sunset)
            const godhuliStart = new Date(set.getTime() - 15 * 60000);
            const godhuliEnd = new Date(set.getTime() + 15 * 60000);

            // Amrit Kaal (~4.5 hours after sunrise)
            const amritStart = new Date(rise.getTime() + 4.5 * 3600000);
            const amritEnd = new Date(amritStart.getTime() + 90 * 60000);

            // Check if Rahu Kaal or Abhijit is active RIGHT NOW
            const nowTime = date.getTime();
            const isRahuActive = nowTime >= rahuStart.getTime() && nowTime <= rahuEnd.getTime();
            const isAbhijitActive = nowTime >= abhijitStart.getTime() && nowTime <= abhijitEnd.getTime();

            // 7. Samvat & Calendar Eras
            const currentYear = date.getFullYear();
            const currentMonth = date.getMonth(); // 0-11
            const vikramSamvat = currentYear + (currentMonth >= 2 ? 57 : 56);
            const shakaSamvat = currentYear - (currentMonth >= 2 ? 78 : 79);

            // Hindu Lunar Month approx
            const monthIdx = (Math.floor(astro.siderealSun / 30) + 11) % 12;
            const hinduMonth = HINDU_MONTHS[lang][monthIdx];

            // Ritu (6 seasons)
            const rituIdx = Math.floor(monthIdx / 2) % 6;
            const ritu = RITU_DATA[lang][rituIdx];

            // Ayana: Uttarayana (Jan 14 - July 15) vs Dakshinayana
            const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
            const isUttarayana = dayOfYear >= 14 && dayOfYear <= 197;
            const ayana = lang === 'hi' 
                ? (isUttarayana ? 'उत्तरायण (देव काल)' : 'दक्षिणायन (पितृ काल)')
                : (isUttarayana ? 'Uttarayana (Northern Solar Transit)' : 'Dakshinayana (Southern Solar Transit)');

            // Sun & Moon Zodiac Signs (Sunsign & Moonsign)
            const ZODIAC_NAMES = {
                en: ['Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏', 'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'],
                hi: ['मेष (Aries)', 'वृषभ (Taurus)', 'मिथुन (Gemini)', 'कर्क (Cancer)', 'सिंह (Leo)', 'कन्या (Virgo)', 'तुला (Libra)', 'वृश्चिक (Scorpio)', 'धनु (Sagittarius)', 'मकर (Capricorn)', 'कुम्भ (Aquarius)', 'मीन (Pisces)']
            };
            const sunSign = ZODIAC_NAMES[lang][Math.floor(astro.siderealSun / 30) % 12];
            const moonSign = ZODIAC_NAMES[lang][Math.floor(astro.siderealMoon / 30) % 12];

            const dateStr = date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
            const rahuStr = `${this.formatTime(rahuStart, use24h)} - ${this.formatTime(rahuEnd, use24h)}`;
            const yamaStr = `${this.formatTime(yamaStart, use24h)} - ${this.formatTime(yamaEnd, use24h)}`;
            const gulikaStr = `${this.formatTime(gulikaStart, use24h)} - ${this.formatTime(gulikaEnd, use24h)}`;
            const abhijitStr = `${this.formatTime(abhijitStart, use24h)} - ${this.formatTime(abhijitEnd, use24h)}`;
            const brahmaStr = `${this.formatTime(brahmaStart, use24h)} - ${this.formatTime(brahmaEnd, use24h)}`;
            const godhuliStr = `${this.formatTime(godhuliStart, use24h)} - ${this.formatTime(godhuliEnd, use24h)}`;
            const amritStr = `${this.formatTime(amritStart, use24h)} - ${this.formatTime(amritEnd, use24h)}`;

            return {
                lang,
                dateStr,
                gregorianDateFormatted: {
                    en: date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
                    hi: date.toLocaleDateString('hi-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                },
                tithi: {
                    name: tithiName,
                    paksha: pakshaName,
                    fullTitle: `${pakshaName} · ${tithiName}`,
                    endsAt: this.formatTime(tithiEndTime, use24h),
                    endTime: this.formatTime(tithiEndTime, use24h)
                },
                vaar: {
                    name: vaar.name,
                    deity: vaar.deity,
                    planet: vaar.planet,
                    energy: vaar.energy,
                    lord: vaar.planet
                },
                nakshatra: {
                    name: nakshatra.name,
                    pada: pada,
                    lord: nakshatra.lord,
                    symbol: nakshatra.symbol,
                    fullTitle: `${nakshatra.name} (Pada ${pada})`
                },
                yoga: typeof yoga === 'object' ? yoga : { name: yoga, quality: lang === 'hi' ? 'शुभ योग' : 'Auspicious' },
                karana: typeof karana === 'object' ? karana : { name: karana, type: lang === 'hi' ? 'सक्रिय करण' : 'Active Half' },
                samvat: {
                    vikram: vikramSamvat,
                    vikramSamvat,
                    shaka: shakaSamvat,
                    shakaSamvat,
                    month: hinduMonth,
                    masa: hinduMonth,
                    ritu: ritu.name,
                    ayana: ayana,
                    display: {
                        en: `Vikram Samvat ${vikramSamvat} · Shaka ${shakaSamvat}`,
                        hi: `विक्रम संवत ${vikramSamvat} · शक संवत ${shakaSamvat}`
                    }
                },
                muhurats: {
                    rahuKaal: { display: rahuStr, isActive: isRahuActive },
                    rahuKaalText: rahuStr,
                    isRahuActive,
                    yamaganda: { display: yamaStr },
                    yamagandaText: yamaStr,
                    gulikaKaal: { display: gulikaStr },
                    abhijit: { display: abhijitStr, isActive: isAbhijitActive },
                    abhijitText: abhijitStr,
                    isAbhijitActive,
                    brahma: { display: brahmaStr },
                    brahmaText: brahmaStr,
                    brahmaMuhurat: { display: brahmaStr },
                    godhuli: { display: godhuliStr },
                    godhuliText: godhuliStr,
                    amrit: { display: amritStr },
                    amritText: amritStr,
                    amritKaal: { display: amritStr }
                },
                celestial: {
                    sunrise: this.formatTime(rise, use24h),
                    sunset: this.formatTime(set, use24h),
                    sunSign,
                    moonSign
                },
                sunSign,
                moonSign
            };
        }
    }

    // Attach to global window
    window.VedicPanchang = new VedicPanchangEngine();
})();
