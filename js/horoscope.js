/**
 * WeatherOS Dual-Language Cosmic Horoscope Engine (राशिफल)
 * Complete astrological predictions for All 12 Zodiac Signs
 * Timeframes: Daily, Weekly, Monthly, Yearly
 * Languages: English & हिन्दी (Hindi)
 */

(function () {
    'use strict';

    const ZODIAC_SIGNS = [
        {
            id: 'aries',
            glyph: '♈',
            name: { en: 'Aries', hi: 'मेष' },
            dates: { en: 'Mar 21 - Apr 19', hi: '21 मार्च - 19 अप्रैल' },
            element: { en: 'Fire', hi: 'अग्नि तत्व' },
            planet: { en: 'Mars (Mangal)', hi: 'मंगल देव' },
            modality: { en: 'Cardinal', hi: 'चर (Cardinal)' },
            gemstone: { en: 'Red Coral (Moonga)', hi: 'लाल मूंगा' },
            luckyColors: { en: ['Crimson Red', 'Saffron', 'Golden Yellow'], hi: ['गहरा लाल', 'केसरिया', 'सुनहरा पीला'] },
            luckyNumbers: [9, 1, 18, 27],
            compatible: { en: 'Leo, Sagittarius, Gemini', hi: 'सिंह, धनु, मिथुन' }
        },
        {
            id: 'taurus',
            glyph: '♉',
            name: { en: 'Taurus', hi: 'वृषभ' },
            dates: { en: 'Apr 20 - May 20', hi: '20 अप्रैल - 20 मई' },
            element: { en: 'Earth', hi: 'पृथ्वी तत्व' },
            planet: { en: 'Venus (Shukra)', hi: 'शुक्र देव' },
            modality: { en: 'Fixed', hi: 'स्थिर (Fixed)' },
            gemstone: { en: 'Diamond / White Sapphire', hi: 'हीरा / श्वेत पुखराज' },
            luckyColors: { en: ['Emerald Green', 'Pastel Pink', 'Cream'], hi: ['पन्ना हरा', 'गुलाबी', 'दूधिया सफेद'] },
            luckyNumbers: [6, 5, 15, 24],
            compatible: { en: 'Virgo, Capricorn, Cancer', hi: 'कन्या, मकर, कर्क' }
        },
        {
            id: 'gemini',
            glyph: '♊',
            name: { en: 'Gemini', hi: 'मिथुन' },
            dates: { en: 'May 21 - Jun 20', hi: '21 मई - 20 जून' },
            element: { en: 'Air', hi: 'वायु तत्व' },
            planet: { en: 'Mercury (Budha)', hi: 'बुध देव' },
            modality: { en: 'Mutable', hi: 'द्विस्वभाव (Mutable)' },
            gemstone: { en: 'Emerald (Panna)', hi: 'हरा पन्ना' },
            luckyColors: { en: ['Bright Yellow', 'Mint Green', 'Sky Blue'], hi: ['चमकीला पीला', 'तोतिया हरा', 'आसमानी नीला'] },
            luckyNumbers: [5, 3, 14, 23],
            compatible: { en: 'Libra, Aquarius, Aries', hi: 'तुला, कुंभ, मेष' }
        },
        {
            id: 'cancer',
            glyph: '♋',
            name: { en: 'Cancer', hi: 'कर्क' },
            dates: { en: 'Jun 21 - Jul 22', hi: '21 जून - 22 जुलाई' },
            element: { en: 'Water', hi: 'जल तत्व' },
            planet: { en: 'Moon (Chandra)', hi: 'चंद्रमा' },
            modality: { en: 'Cardinal', hi: 'चर (Cardinal)' },
            gemstone: { en: 'Natural Pearl (Moti)', hi: 'सच्चा मोती' },
            luckyColors: { en: ['Silver White', 'Sea Green', 'Pearl Gray'], hi: ['चांदी जैसा सफेद', 'समुद्री हरा', 'मोती सफेद'] },
            luckyNumbers: [2, 7, 11, 20],
            compatible: { en: 'Scorpio, Pisces, Taurus', hi: 'वृश्चिक, मीन, वृषभ' }
        },
        {
            id: 'leo',
            glyph: '♌',
            name: { en: 'Leo', hi: 'सिंह' },
            dates: { en: 'Jul 23 - Aug 22', hi: '23 जुलाई - 22 अगस्त' },
            element: { en: 'Fire', hi: 'अग्नि तत्व' },
            planet: { en: 'Sun (Surya)', hi: 'भगवान सूर्य' },
            modality: { en: 'Fixed', hi: 'स्थिर (Fixed)' },
            gemstone: { en: 'Ruby (Manikya)', hi: 'माणिक्य (रूबी)' },
            luckyColors: { en: ['Solar Gold', 'Royal Orange', 'Purple'], hi: ['स्वर्ण पीला', 'नारंगी', 'शाही बैंगनी'] },
            luckyNumbers: [1, 4, 10, 19],
            compatible: { en: 'Aries, Sagittarius, Libra', hi: 'मेष, धनु, तुला' }
        },
        {
            id: 'virgo',
            glyph: '♍',
            name: { en: 'Virgo', hi: 'कन्या' },
            dates: { en: 'Aug 23 - Sep 22', hi: '23 अगस्त - 22 सितंबर' },
            element: { en: 'Earth', hi: 'पृथ्वी तत्व' },
            planet: { en: 'Mercury (Budha)', hi: 'बुध देव' },
            modality: { en: 'Mutable', hi: 'द्विस्वभाव (Mutable)' },
            gemstone: { en: 'Green Tourmaline / Emerald', hi: 'पन्ना / हरा जेड' },
            luckyColors: { en: ['Olive Green', 'Warm Beige', 'Navy Blue'], hi: ['जैतूनी हरा', 'हल्का बादामी', 'नेवी ब्लू'] },
            luckyNumbers: [5, 3, 14, 32],
            compatible: { en: 'Taurus, Capricorn, Scorpio', hi: 'वृषभ, मकर, वृश्चिक' }
        },
        {
            id: 'libra',
            glyph: '♎',
            name: { en: 'Libra', hi: 'तुला' },
            dates: { en: 'Sep 23 - Oct 22', hi: '23 सितंबर - 22 अक्टूबर' },
            element: { en: 'Air', hi: 'वायु तत्व' },
            planet: { en: 'Venus (Shukra)', hi: 'शुक्र देव' },
            modality: { en: 'Cardinal', hi: 'चर (Cardinal)' },
            gemstone: { en: 'Opal / Blue Sapphire', hi: 'ओपल / श्वेत जरकन' },
            luckyColors: { en: ['Pastel Blue', 'Rose Quartz', 'Lavender'], hi: ['हल्का नीला', 'गुलाबी', 'लैवेंडर'] },
            luckyNumbers: [6, 7, 15, 24],
            compatible: { en: 'Gemini, Aquarius, Leo', hi: 'मिथुन, कुंभ, सिंह' }
        },
        {
            id: 'scorpio',
            glyph: '♏',
            name: { en: 'Scorpio', hi: 'वृश्चिक' },
            dates: { en: 'Oct 23 - Nov 21', hi: '23 अक्टूबर - 21 नवंबर' },
            element: { en: 'Water', hi: 'जल तत्व' },
            planet: { en: 'Mars & Ketu', hi: 'मंगल एवं केतु' },
            modality: { en: 'Fixed', hi: 'स्थिर (Fixed)' },
            gemstone: { en: 'Red Coral / Cats Eye', hi: 'त्रिकोणीय मूंगा / लहसुनिया' },
            luckyColors: { en: ['Deep Maroon', 'Black Obsidian', 'Scarlet'], hi: ['गहरा महरून', 'रक्त लाल', 'चॉकलेटी'] },
            luckyNumbers: [9, 8, 18, 27],
            compatible: { en: 'Cancer, Pisces, Virgo', hi: 'कर्क, मीन, कन्या' }
        },
        {
            id: 'sagittarius',
            glyph: '♐',
            name: { en: 'Sagittarius', hi: 'धनु' },
            dates: { en: 'Nov 22 - Dec 21', hi: '22 नवंबर - 21 दिसंबर' },
            element: { en: 'Fire', hi: 'अग्नि तत्व' },
            planet: { en: 'Jupiter (Brihaspati)', hi: 'देवगुरु बृहस्पति' },
            modality: { en: 'Mutable', hi: 'द्विस्वभाव (Mutable)' },
            gemstone: { en: 'Yellow Sapphire (Pukhraj)', hi: 'पीला पुखराज' },
            luckyColors: { en: ['Canary Yellow', 'Royal Purple', 'Turquoise'], hi: ['हल्दी पीला', 'केसरिया', 'फिरोजी'] },
            luckyNumbers: [3, 9, 12, 21],
            compatible: { en: 'Aries, Leo, Aquarius', hi: 'मेष, सिंह, कुंभ' }
        },
        {
            id: 'capricorn',
            glyph: '♑',
            name: { en: 'Capricorn', hi: 'मकर' },
            dates: { en: 'Dec 22 - Jan 19', hi: '22 दिसंबर - 19 जनवरी' },
            element: { en: 'Earth', hi: 'पृथ्वी तत्व' },
            planet: { en: 'Saturn (Shani)', hi: 'शनि देव' },
            modality: { en: 'Cardinal', hi: 'चर (Cardinal)' },
            gemstone: { en: 'Blue Sapphire (Neelam)', hi: 'नीलम (इंद्रनील)' },
            luckyColors: { en: ['Charcoal Gray', 'Midnight Blue', 'Forest Green'], hi: ['गहरा स्लेटी', 'नीला', 'जामुनी'] },
            luckyNumbers: [8, 4, 17, 26],
            compatible: { en: 'Taurus, Virgo, Pisces', hi: 'वृषभ, कन्या, मीन' }
        },
        {
            id: 'aquarius',
            glyph: '♒',
            name: { en: 'Aquarius', hi: 'कुंभ' },
            dates: { en: 'Jan 20 - Feb 18', hi: '20 जनवरी - 18 फरवरी' },
            element: { en: 'Air', hi: 'वायु तत्व' },
            planet: { en: 'Saturn & Rahu', hi: 'शनि एवं राहु' },
            modality: { en: 'Fixed', hi: 'स्थिर (Fixed)' },
            gemstone: { en: 'Gomed / Blue Sapphire', hi: 'गोमेद / नीलम' },
            luckyColors: { en: ['Electric Blue', 'Aquamarine', 'Silver'], hi: ['चमकीला नीला', 'आसमानी', 'चांदी जैसा'] },
            luckyNumbers: [4, 7, 13, 22],
            compatible: { en: 'Gemini, Libra, Sagittarius', hi: 'मिथुन, तुला, धनु' }
        },
        {
            id: 'pisces',
            glyph: '♓',
            name: { en: 'Pisces', hi: 'मीन' },
            dates: { en: 'Feb 19 - Mar 20', hi: '19 फरवरी - 20 मार्च' },
            element: { en: 'Water', hi: 'जल तत्व' },
            planet: { en: 'Jupiter (Brihaspati)', hi: 'देवगुरु बृहस्पति' },
            modality: { en: 'Mutable', hi: 'द्विस्वभाव (Mutable)' },
            gemstone: { en: 'Yellow Topaz / Pearl', hi: 'पुखराज / पीताम्बरी' },
            luckyColors: { en: ['Seafoam Green', 'Lavender', 'Golden Yellow'], hi: ['हल्का हरा', 'बैंगनी', 'पीला'] },
            luckyNumbers: [3, 7, 12, 21],
            compatible: { en: 'Cancer, Scorpio, Capricorn', hi: 'कर्क, वृश्चिक, मकर' }
        }
    ];

    // Authentic, Deep Astrological Readings Library (Bilingual)
    const PREDICTIONS = {
        aries: {
            daily: {
                en: {
                    overview: "The planetary alignment fuels your natural ambition today. Mars injects intense vitality into your projects. Trust your instincts when swift decisions are needed, but exercise restraint against impulsive expenditure.",
                    career: "Professional negotiations lean heavily in your favor. A pending initiative gains positive traction under current solar aspects.",
                    love: "Passionate exchanges bring warmth to relationships. Singles may encounter an intriguing connection during an intellectual pursuit.",
                    health: "High physical stamina. Channel excess energy into vigorous exercise or high-focus creative output."
                },
                hi: {
                    overview: "आज का दिन आपके भीतर असीम ऊर्जा और आत्मविश्वास का संचार करेगा। पराक्रम भाव में मंगल की दृष्टि आपके रुके कार्यों में गति लाएगी। जल्दबाजी में धन का व्यय करने से बचें और बड़ों की सलाह लें।",
                    career: "कार्यक्षेत्र में आपके नेतृत्व कौशल की सराहना होगी। सहकर्मियों का भरपूर सहयोग मिलेगा और नई व्यावसायिक योजनाएं आकार लेंगी।",
                    love: "प्रेम संबंधों में मधुरता बढ़ेगी। जीवनसाथी के साथ सामंजस्य बेहतरीन रहेगा और शाम को सुखद समय बिताने का अवसर मिलेगा।",
                    health: "शारीरिक ऊर्जा उच्च रहेगी। प्राणायाम व नियमित व्यायाम से मानसिक तनाव दूर होगा।"
                }
            },
            weekly: {
                en: {
                    overview: "A transformative week ahead. Midweek lunar transits urge you to consolidate finances and formalize strategic partnerships. Your persistence overcomes a lingering bureaucratic hurdle.",
                    career: "Expect recognition from seniors. A long-awaited project greenlight arrives by Thursday.",
                    love: "Honest communication resolves past misunderstandings. A joyful celebration with loved ones is indicated on the weekend.",
                    health: "Watch your hydration levels and maintain proper sleep hygiene as physical demands peak."
                },
                hi: {
                    overview: "यह सप्ताह आपके लिए आर्थिक और पारिवारिक दृष्टि से उन्नति कारक रहेगा। सप्ताह के मध्य में चंद्रमा का अनुकूल गोचर नई योजनाओं में सफलता दिलाएगा। भाग्य का साथ मिलने से मन प्रसन्न रहेगा।",
                    career: "व्यापार में नया अनुबंध प्राप्त हो सकता है। नौकरीपेशा जातकों को पदोन्नति या नई जिम्मेदारी मिलने के शुभ संकेत हैं।",
                    love: "पारिवारिक जीवन में सुख-शांति बनी रहेगी। अविवाहितों के लिए शुभ विवाह प्रस्ताव आ सकते हैं।",
                    health: "स्वास्थ्य उत्तम रहेगा। हालांकि खानपान में संयम रखें और मौसमी बदलावों से सावधान रहें।"
                }
            },
            monthly: {
                en: {
                    overview: "The month initiates a grand cycle of career expansion and personal authority. Planetary combinations favor investments in property, skills development, and collaborative ventures.",
                    career: "Strategic networking unlocks influential doorways. Ensure contract details are meticulously reviewed.",
                    love: "Deep mutual understanding strengthens emotional foundations. Travel with a partner creates lasting memories.",
                    health: "Consistent routine enhances vitality. Good time for seasonal detoxification."
                },
                hi: {
                    overview: "इस माह ग्रहों की स्थिति आपके भाग्य को चमकाने वाली है। पूर्व में किए गए कठिन परिश्रम का अब भरपूर फल मिलने वाला है। सामाजिक मान-सम्मान में वृद्धि होगी और आर्थिक स्थिति मजबूत होगी।",
                    career: "कार्यक्षेत्र में आपका प्रभाव बढ़ेगा। नई साझेदारियों से लाभ होगा और आर्थिक मामलों में सफलता प्राप्त होगी।",
                    love: "दांपत्य जीवन में प्रेम व सौहार्द बढ़ेगा। घर-परिवार में किसी मांगलिक कार्य का आयोजन संभव है।",
                    health: "मानसिक शांति बनी रहेगी। पुरानी किसी स्वास्थ्य समस्या से राहत मिलने के प्रबल योग हैं।"
                }
            },
            yearly: {
                en: {
                    overview: "A defining breakthrough year. Jupiter's benevolent transit bestows career elevation, spiritual growth, and financial stability. You will break free from limiting patterns and step into self-mastery.",
                    career: "Major professional milestone achieved. High yield on previous strategic investments.",
                    love: "Harmony and commitment flourish. Ideal year for deepening marital bonds or initiating sacred unions.",
                    health: "Overall robust vitality. Prioritize mental calmness through mindfulness and physical conditioning."
                },
                hi: {
                    overview: "यह वर्ष आपके जीवन का एक स्वर्णिम अध्याय सिद्ध होगा। देवगुरु बृहस्पति की शुभ कृपा से आपके मान-सम्मान, पद-प्रतिष्ठा और धन-धान्य में निरंतर वृद्धि होगी। सभी अटके कार्य पूर्ण होंगे।",
                    career: "करियर में ऐतिहासिक छलांग लगेगी। विदेश यात्रा या उच्च पद प्राप्ति के प्रबल अवसर निर्मित होंगे।",
                    love: "पारिवारिक संबंध अत्यंत प्रगाढ़ होंगे। संतान पक्ष से शुभ समाचार मिलेगा और दांपत्य जीवन आनंदमय रहेगा।",
                    health: "स्वास्थ्य में अभूतपूर्व सुधार होगा। आध्यात्मिक गतिविधियों से मानसिक बल प्राप्त होगा।"
                }
            }
        },
        taurus: {
            daily: {
                en: {
                    overview: "Venus radiates serenity over your domestic sector today. A measured and practical approach unlocks lucrative clarity. Trust your methodical instincts in commercial affairs.",
                    career: "Attention to detail prevents an oversight. Your reliability earns strong trust from leadership.",
                    love: "Sensual and affectionate vibrations. An intimate conversation deepens shared values.",
                    health: "Ground yourself with wholesome nutrition and calm evening stretching."
                },
                hi: {
                    overview: "आज आपका मन अत्यंत शांत और प्रफुल्लित रहेगा। शुक्र का शुभ प्रभाव आपके व्यक्तित्व में आकर्षण बढ़ाएगा। आर्थिक मामलों में लिया गया विवेकपूर्ण निर्णय भविष्य में बड़ा लाभ देगा।",
                    career: "व्यापार में स्थायित्व रहेगा। कार्यस्थल पर आपकी कार्यशैली से अधिकारी प्रसन्न रहेंगे। नए प्रोजेक्ट का दायित्व मिल सकता है।",
                    love: "दांपत्य जीवन में मिठास घुलेगी। साथी की भावनाओं का आदर करें, प्रेम संबंधों में प्रगाढ़ता आएगी।",
                    health: "गले और श्वास संबंधी सावधानी रखें। हल्का व सुपाच्य भोजन ग्रहण करें।"
                }
            },
            weekly: {
                en: {
                    overview: "Financial foresight rewards you handsomely this week. Long-term property or security investments find steady support. Keep patience during brief midweek scheduling shifts.",
                    career: "Creative solutions impress key clients. Solid progress on artistic or administrative undertakings.",
                    love: "Cosmic energies foster emotional security and warm family reunions over the weekend.",
                    health: "Focus on posture and neck relaxation during prolonged screen exposure."
                },
                hi: {
                    overview: "सप्ताह आपके लिए आर्थिक स्थिरता और पारिवारिक समृद्धि लेकर आया है। भूमि, भवन या वाहन क्रय करने की योजनाएं गति पकड़ेंगी। मित्रों के सहयोग से कठिन कार्य भी सहजता से पूर्ण होंगे।",
                    career: "आजीविका के नए स्रोत खुलेंगे। कार्यक्षेत्र में आपकी प्रतिष्ठा बढ़ेगी और विरोधी परास्त होंगे।",
                    love: "परिवार में उत्सव का वातावरण रहेगा। प्रियजन के साथ बिताए पल मन को संतुष्टि प्रदान करेंगे।",
                    health: "नियमित दिनचर्या का पालन करें। भरपूर नींद लेना आपके लिए लाभकारी रहेगा।"
                }
            },
            monthly: {
                en: {
                    overview: "An enriching month of aesthetic refinement, financial growth, and deeper social bonds. Venus elevates your creative expression, making this an ideal window for portfolio upgrades.",
                    career: "Steady, uninterrupted ascendance. Excellent month for negotiating salary or contract terms.",
                    love: "Heart-centered stability. Mutual commitment reaches a fulfilling plateau.",
                    health: "Vitality is balanced. Enjoy time in natural green environments."
                },
                hi: {
                    overview: "यह माह भौतिक सुख-सुविधाओं और धन लाभ से परिपूर्ण रहेगा। रचनात्मक कार्यों में आपकी रुचि बढ़ेगी। समाज में प्रतिष्ठा और यश की प्राप्ति होगी। धन संचय करने में सफल रहेंगे।",
                    career: "व्यवसाय में अप्रत्याशित लाभ के योग हैं। नौकरी में स्थानांतरण या पदोन्नति का मार्ग प्रशस्त होगा।",
                    love: "प्रेम प्रसंगों में विश्वास और समर्पण बढ़ेगा। वैवाहिक जीवन में नई उमंग का संचार होगा।",
                    health: "शारीरिक ऊर्जा बनी रहेगी। योग और ध्यान से मानसिक शांति और एकाग्रता में वृद्धि होगी।"
                }
            },
            yearly: {
                en: {
                    overview: "A foundation-building year of enduring prosperity. The stars bestow durable wealth accumulation, land acquisition opportunities, and profound emotional grounding throughout the seasons.",
                    career: "Architect of your own destiny: significant advancement and solid institutional respect.",
                    love: "Steadfast loyalty, warm home celebrations, and auspicious family expansion.",
                    health: "Robust constitution. Maintain disciplined moderation in diet."
                },
                hi: {
                    overview: "यह वर्ष आपके लिए दीर्घकालिक समृद्धि और स्थिरता का काल रहेगा। आपकी दृढ़ इच्छाशक्ति और परिश्रम से सभी आर्थिक लक्ष्य पूरे होंगे। अचल संपत्ति की प्राप्ति के प्रबल योग हैं।",
                    career: "करियर में स्थायी उन्नति होगी। आपके कार्यों को व्यापक मान्यता मिलेगी और नए उद्यम सफल होंगे।",
                    love: "गृहस्थ जीवन में सुख, शांति और सौभाग्य का वास रहेगा। मांगलिक आयोजनों से घर में उल्लास रहेगा।",
                    health: "स्वास्थ्य सामान्यतः बहुत उत्तम रहेगा। खान-पान में सात्विकता बनाए रखें।"
                }
            }
        },
        gemini: {
            daily: {
                en: {
                    overview: "Mercury stimulates your cognitive brilliance today. Conversations spark innovative ideas, and your articulate eloquence clears away ambiguities in both work and personal circles.",
                    career: "Brisk communication delivers rapid results. Excellent day for pitches, content creation, and software work.",
                    love: "Playful wit and mental connection reignite romance. An impromptu message brings a smile.",
                    health: "High nervous energy: practice breathwork or a brisk walk to ground the mind."
                },
                hi: {
                    overview: "आज आपकी बुद्धिमत्ता और वाकपटुता का लोहा सब मानेंगे। बुध देव की कृपा से बौद्धिक कार्यों में भारी सफलता मिलेगी। नए संपर्कों से लाभ होगा और मन में सकारात्मक विचार प्रवाहित होंगे।",
                    career: "संवाद और मीडिया से जुड़े कार्यों में विशेष सफलता मिलेगी। व्यापारिक सौदों में लाभ होगा।",
                    love: "जीवनसाथी के साथ वैचारिक तालमेल बहुत बढ़िया रहेगा। किसी पुराने मित्र से सुखद भेंट हो सकती है।",
                    health: "मानसिक रूप से ऊर्जावान महसूस करेंगे। अत्यधिक स्क्रीन टाइम से बचें और आंखों को आराम दें।"
                }
            },
            weekly: {
                en: {
                    overview: "A vibrant, fast-paced week filled with intellectual breakthroughs. Multiple avenues of inquiry open up, requiring you to filter distractions and focus on top-tier milestones.",
                    career: "Key presentations yield stellar acclaim. A cross-functional project moves forward swiftly.",
                    love: "Stimulating dialogues bring you closer to someone special. Weekend travel brings delight.",
                    health: "Schedule downtime away from digital screens to recharge mental circuits."
                },
                hi: {
                    overview: "यह सप्ताह नए अवसरों और शुभ समाचारों से भरा रहेगा। आपकी बहुमुखी प्रतिभा कार्यक्षेत्र में निखरेगी। यात्राओं के सुखद परिणाम मिलेंगे और आर्थिक स्थिति में सुधार होगा।",
                    career: "नई योजनाओं पर कार्य शुरू करने का उपयुक्त समय है। प्रतिस्पर्धी आपके आगे नतमस्तक होंगे।",
                    love: "प्रेम संबंधों में नया उत्साह देखने को मिलेगा। परिवार के साथ सामंजस्य बेहतरीन रहेगा।",
                    health: "स्वास्थ्य अच्छा रहेगा, परंतु अनियमित खान-पान से बचें। ध्यान लगाने से मानसिक शांति मिलेगी।"
                }
            },
            monthly: {
                en: {
                    overview: "Communication, commerce, and creative publishing peak this month. Your analytical agility turns complex obstacles into profitable stepping stones. Great month for learning.",
                    career: "Expansion into new domains. Your versatile problem-solving is universally sought after.",
                    love: "Flirtatious charisma at an all-time high. Meaningful conversations reveal deep common ground.",
                    health: "Balance active intellect with sound physical rest to sustain your momentum."
                },
                hi: {
                    overview: "यह माह आपके लिए ज्ञान, संचार और व्यापारिक विस्तार का रहेगा। आपके निर्णय सटीक साबित होंगे और समाज में आपकी साख बढ़ेगी। आर्थिक दृष्टि से माह अत्यंत लाभकारी रहेगा।",
                    career: "व्यापार में नए ग्राहकों का आगमन होगा। नौकरी में महत्वपूर्ण प्रोजेक्ट का नेतृत्व आपको सौंपा जा सकता है।",
                    love: "दांपत्य जीवन सुखद रहेगा। आपसी समझबूझ से किसी पुरानी गलतफहमी का निवारण होगा।",
                    health: "ऊर्जा का स्तर अच्छा रहेगा। नियमित व्यायाम से ताजगी और स्फूर्ति बनी रहेगी।"
                }
            },
            yearly: {
                en: {
                    overview: "A landmark year of intellectual prominence, diverse income streams, and expanding influence. You will conquer new horizons, publish key works, and establish influential alliances.",
                    career: "Multi-disciplinary triumph. Recognition on regional and global platforms.",
                    love: "Intellectual camaraderie blooms into profound, lifelong partnership and emotional synergy.",
                    health: "Nervous system thrives when balanced with yoga and nature retreats."
                },
                hi: {
                    overview: "यह वर्ष आपके भाग्य को नई ऊंचाइयों पर ले जाएगा। ज्ञान, विज्ञान, संचार एवं व्यापार के क्षेत्र में अभूतपूर्व प्रगति होगी। आय के नए स्रोत बनेंगे और धन आगमन सुगम होगा।",
                    career: "करियर में महत्वपूर्ण पद और प्रतिष्ठा की प्राप्ति होगी। आपके द्वारा किए गए शोध या नवाचार सफल होंगे।",
                    love: "पारिवारिक जीवन में मधुरता और सामंजस्य रहेगा। मांगलिक कार्यों के योग बनेंगे।",
                    health: "स्वास्थ्य उत्तम रहेगा। सकारात्मक दृष्टिकोण और योग साधना से दीर्घायु की प्राप्ति होगी।"
                }
            }
        },
        cancer: {
            daily: {
                en: {
                    overview: "The Moon illuminates your intuitive sanctuary today. Trust gut instincts in household matters and interpersonal dynamics. Creating order in your environment restores serene emotional equilibrium.",
                    career: "Your empathy and patience resolve a delicate team dispute. Solid financial prudence protects resources.",
                    love: "Tender, nurturing moments strengthen intimate bonds. A cozy home evening feels sublime.",
                    health: "Digestive well-being is closely tied to calm emotions. Savor warm herbal teas."
                },
                hi: {
                    overview: "आज चंद्रमा का प्रभाव आपकी संवेदनशीलता और अंतर्ज्ञान को बढ़ाएगा। परिवार के प्रति आपका समर्पण सराहनीय रहेगा। आर्थिक मामलों में सतर्कता बरतें और भावुकता में आकर कोई बड़ा निर्णय न लें।",
                    career: "कार्यक्षेत्र में आपकी कर्तव्यनिष्ठा रंग लाएगी। वरिष्ठ अधिकारियों का मार्गदर्शन उपयोगी साबित होगा।",
                    love: "दांपत्य संबंधों में प्रेम और विश्वास बढ़ेगा। साथी आपकी भावनाओं की कद्र करेगा।",
                    health: "पेट और पाचन का ध्यान रखें। सात्विक आहार और शीतल जल का सेवन हितकर रहेगा।"
                }
            },
            weekly: {
                en: {
                    overview: "A deeply nourishing week centered on domestic harmony, property enhancements, and emotional recharge. Financial returns from past savings provide comforting security.",
                    career: "Consolidation over rapid expansion: refine existing projects to flawless standard.",
                    love: "A heartfelt conversation melts away lingering barriers. Family bonds radiate warmth.",
                    health: "Gentle aquatic activities like swimming or soothing baths promote deep cellular renewal."
                },
                hi: {
                    overview: "यह सप्ताह मानसिक शांति और पारिवारिक सुख का रहेगा। घर-परिवार में मांगलिक कार्यों की रूपरेखा बनेगी। पैतृक संपत्ति से लाभ के योग बन रहे हैं और मन प्रसन्न रहेगा।",
                    career: "व्यापार में नियमित लाभ बना रहेगा। नौकरीपेशा जातकों को कार्यस्थल पर सुकून का वातावरण मिलेगा।",
                    love: "प्रेम संबंधों में प्रगाढ़ता आएगी। जीवनसाथी के साथ तीर्थ यात्रा या मनोरंजक यात्रा का योग है।",
                    health: "स्वास्थ्य स्थिर रहेगा। मौसमी ठंड से बचाव रखें और योग-प्राणायाम नियमित करें।"
                }
            },
            monthly: {
                en: {
                    overview: "Emotional clarity and strategic sanctuary define this month. You will successfully secure assets, deepen your closest relationships, and build a protective foundation for future endeavors.",
                    career: "Recognition for steadfast dependability. Wise handling of institutional budgets.",
                    love: "Soulful connections flourish. Warm hospitality creates delightful social gatherings.",
                    health: "Nourish your emotional core with meditation and restorative sleep."
                },
                hi: {
                    overview: "इस माह आपका ध्यान घर, परिवार और संचित धन को बढ़ाने में रहेगा। माता-पिता का आशीर्वाद प्राप्त होगा और आध्यात्मिक कार्यों में रुचि बढ़ेगी। आर्थिक स्थिति सुदृढ़ होगी।",
                    career: "कार्यक्षेत्र में आपके अनुभव का सम्मान होगा। नए अनुबंधों से भविष्य में निरंतर लाभ होगा।",
                    love: "दांपत्य जीवन में परस्पर विश्वास और सहयोग बढ़ेगा। परिवार में सुखद समाचार मिलेगा।",
                    health: "मानसिक शांति बनी रहेगी। जल का पर्याप्त सेवन करें और सकारात्मक वातावरण में रहें।"
                }
            },
            yearly: {
                en: {
                    overview: "A transformative year of emotional mastery, familial bliss, and generational wealth building. You will anchor your legacy and transform your sanctuary into a beacon of prosperity.",
                    career: "Steadfast leadership in mission-driven ventures. Secure institutional backing.",
                    love: "Unconditional warmth, deep soul-mate connection, and flourishing family celebrations.",
                    health: "Holistic wellness: mind, body, and spirit align in harmonious vitality."
                },
                hi: {
                    overview: "यह वर्ष आपके लिए सर्वांगीण सुख और आत्मिक शांति का वर्ष रहेगा। चंद्र देव की कृपा से आपके जीवन में खुशहाली और ऐश्वर्य का वास होगा। भूमि, वाहन और भवन के योग बनेंगे।",
                    career: "करियर में स्थिरता और सम्मान मिलेगा। सेवा क्षेत्र या जनसंपर्क से जुड़े जातकों को बड़ी उपलब्धि मिलेगी।",
                    love: "पारिवारिक जीवन में अद्वितीय सामंजस्य रहेगा। संतान सुख की प्राप्ति के प्रबल संकेत हैं।",
                    health: "स्वास्थ्य में निरंतर सुधार होगा। मानसिक प्रसन्नता से सभी रोग दूर रहेंगे।"
                }
            }
        },
        leo: {
            daily: {
                en: {
                    overview: "The Sun radiates sovereign charisma through your aura today. Your creative vitality captivates those around you. Take bold, dignified strides toward your primary objective.",
                    career: "Natural executive presence commands authority in meetings. A presentation exceeds expectations.",
                    love: "Warm generosity and radiant romance. Express appreciation openly to ignite joyful passion.",
                    health: "Cardiovascular energy is buoyant. Enjoy active movement with open-air sunshine."
                },
                hi: {
                    overview: "आज सूर्य देव की कृपा से आपके चेहरे पर तेज और व्यक्तित्व में अद्भुत सम्मोहन रहेगा। आपके पराक्रम और आत्मविश्वास के आगे विरोधी शांत रहेंगे। कोई बड़ी मनोकामना आज पूर्ण हो सकती है।",
                    career: "कार्यक्षेत्र में आपका दबदबा रहेगा। उच्चाधिकारी आपके कार्य से अत्यंत प्रभावित होंगे। पदोन्नति की चर्चा संभव है।",
                    love: "प्रेम संबंधों में नई ऊर्जा का संचार होगा। जीवनसाथी आपके सम्मान में वृद्धि करेगा।",
                    health: "हृदय और नेत्रों का ध्यान रखें। सूर्य नमस्कार करने से दिनभर स्फूर्ति बनी रहेगी।"
                }
            },
            weekly: {
                en: {
                    overview: "A glorious week of professional ascendancy and creative recognition. Your leadership commands admiration. A strategic opportunity arrives through influential mentors.",
                    career: "Pioneering ideas win vital funding. High visibility delivers substantial public appreciation.",
                    love: "Regal celebrations and romantic gestures illuminate the weekend with elegance.",
                    health: "Maintain consistent cardiovascular workouts to balance your radiant fire."
                },
                hi: {
                    overview: "यह सप्ताह आपके लिए यश, कीर्ति और विजय का रहेगा। प्रशासनिक और राजकीय कार्यों में अप्रत्याशित सफलता मिलेगी। आपके नेतृत्व में किए गए सभी कार्य सफल होंगे।",
                    career: "व्यापार में अप्रत्याशित मुनाफा होगा। नौकरी में नई पदवी या अधिकार क्षेत्र में विस्तार होगा।",
                    love: "दांपत्य जीवन में आदर और अनुराग रहेगा। सामाजिक कार्यक्रमों में आप आकर्षण का केंद्र बनेंगे।",
                    health: "ऊर्जा का स्तर बहुत ऊंचा रहेगा। खान-पान में तली-भुनी चीजों से परहेज करें।"
                }
            },
            monthly: {
                en: {
                    overview: "A month bathed in solar abundance. Your creative ventures, public presence, and investment ventures all surge forward with magnetic power. Step onto center stage with confidence.",
                    career: "Major career victory. High-profile project delivers prestige and lasting rewards.",
                    love: "Magnetic allure draws admirers. Deep, loyal affection anchors your primary partnership.",
                    health: "Vibrant solar energy sustains high performance. Keep hydrated."
                },
                hi: {
                    overview: "यह माह आपके जीवन में नई खुशियां और उपलब्धियां लेकर आएगा। सूर्य का अनुकूल प्रभाव आपके सभी कष्टों का निवारण करेगा। धन लाभ के साथ-साथ समाज में प्रतिष्ठा बढ़ेगी।",
                    career: "कारोबार में बड़े निवेशकों का साथ मिलेगा। सरकारी नौकरी की तैयारी कर रहे जातकों को शुभ समाचार मिलेगा।",
                    love: "प्रेम जीवन में रोमांच और समर्पण रहेगा। वैवाहिक जीवन सुखमय और आनंददायक रहेगा।",
                    health: "स्वास्थ्य उत्तम रहेगा। नियमित दिनचर्या और योग से शारीरिक शक्ति में वृद्धि होगी।"
                }
            },
            yearly: {
                en: {
                    overview: "Your royal era of peak manifestation. Jupiter and the Sun combine to deliver monumental career elevation, artistic acclaim, and generous financial windfalls across all quarters.",
                    career: "Sovereign achievement: executive leadership, industry dominance, and widespread renown.",
                    love: "Ennobling, loyal love that stands as an inspirational standard of mutual devotion.",
                    health: "Radiant, robust constitution backed by vibrant physical conditioning."
                },
                hi: {
                    overview: "यह वर्ष आपके भाग्य का ऐतिहासिक स्वर्णिम काल रहेगा। सूर्य और बृहस्पति की युति आपके जीवन में राजयोग का निर्माण करेगी। आपके सभी सपने साकार होने की दिशा में बढ़ेंगे।",
                    career: "करियर में शीर्ष पद की प्राप्ति होगी। व्यापार का विस्तार राष्ट्रीय और अंतरराष्ट्रीय स्तर पर होगा।",
                    love: "पारिवारिक जीवन में वैभव और सुख-शांति रहेगी। शुभ कार्यों पर धन का सदुपयोग होगा।",
                    health: "स्वास्थ्य श्रेष्ठ रहेगा। आत्मबल मजबूत होने से सभी बाधाओं को आसानी से पार कर लेंगे।"
                }
            }
        },
        virgo: {
            daily: {
                en: {
                    overview: "Methodical precision is your superpower today. Mercury sharpens your analytical eye, allowing you to untangle complex systems and optimize productivity with unmatched efficiency.",
                    career: "Exemplary craftsmanship sets an industry benchmark. An auditing or editing task is finished flawlessly.",
                    love: "Thoughtful practical gestures speak louder than dramatic declarations. Helpfulness is appreciated.",
                    health: "Optimal time for clean dietary choices and mindful ergonomic adjustments at your desk."
                },
                hi: {
                    overview: "आज आपकी सूक्ष्म दृष्टि और कार्यकुशलता से सभी उलझे मामले सुलझेंगे। बुध का प्रभाव आपकी कार्यप्रणाली को व्यवस्थित करेगा। तार्किक निर्णयों से लाभ होगा और बचत में वृद्धि होगी।",
                    career: "दस्तावेजी और वित्तीय कार्यों में बड़ी सफलता मिलेगी। आपके काम की गुणवत्ता की प्रशंसा होगी।",
                    love: "जीवनसाथी का सहयोगी स्वभाव मन को शांति देगा। व्यावहारिक बातों से संबंध मजबूत होंगे।",
                    health: "पेट की संवेदनशीलता का ध्यान रखें। संतुलित और प्राकृतिक आहार का सेवन करें।"
                }
            },
            weekly: {
                en: {
                    overview: "A week of strategic organization, system optimization, and tangible commercial headway. Your discernment prevents unnecessary waste and channels resources toward maximum ROI.",
                    career: "Streamlining operations boosts team throughput. Praise from executive stakeholders.",
                    love: "Quiet quality time provides gentle comfort. Mutual understanding deepens effortlessly.",
                    health: "Gentle walks in fresh air soothe mental overactivity."
                },
                hi: {
                    overview: "यह सप्ताह आपके लिए योजनाबद्ध प्रगति का रहेगा। कार्यस्थल पर आपकी सूझबूझ से बड़ा संकट टल जाएगा। आर्थिक योजनाओं में सफलता मिलेगी और कर्ज से मुक्ति के मार्ग प्रशस्त होंगे।",
                    career: "व्यापार में नई तकनीक का प्रयोग लाभदायक रहेगा। नौकरी में वरिष्ठों का पूरा भरोसा रहेगा।",
                    love: "परिवार के साथ समय बिताने से सुकून मिलेगा। प्रियजन के साथ किसी जरूरी विषय पर सहमति बनेगी।",
                    health: "स्वास्थ्य में सुधार होगा। योग और प्राणायाम से मानसिक थकावट दूर होगी।"
                }
            },
            monthly: {
                en: {
                    overview: "An immaculate month of mastery, professional acclaim, and health rejuvenation. You will establish disciplined routines that yield compounded rewards across finance and wellness.",
                    career: "Promotions and high-trust assignments. Your reputation for flawless delivery is solidified.",
                    love: "Devoted, sincere companionship. Meaningful shared goals bring deep fulfillment.",
                    health: "Holistic health improvements take hold. High stamina and clear mental focus."
                },
                hi: {
                    overview: "इस माह आपके पुरुषार्थ और बुद्धिमत्ता से सभी रुके कार्य संपन्न होंगे। आर्थिक क्षेत्र में अप्रत्याशित प्रगति देखने को मिलेगी। आपकी योजनाएं सटीक निशाने पर लगेंगी।",
                    career: "व्यापारिक यात्राएं सफल रहेंगी। नौकरी में पदोन्नति और वेतन वृद्धि के प्रबल योग हैं।",
                    love: "दांपत्य जीवन में परस्पर विश्वास और सहयोग बढ़ेगा। परिवार का वातावरण खुशनुमा रहेगा।",
                    health: "शारीरिक और मानसिक स्वास्थ्य उत्तम रहेगा। नियमित व्यायाम से स्फूर्ति बनी रहेगी।"
                }
            },
            yearly: {
                en: {
                    overview: "A pinnacle year of artisanal mastery, financial autonomy, and scholarly or operational triumph. Your meticulous labor blossoms into an empire of trusted expertise and secure wealth.",
                    career: "Distinguished authority in your specialization. Unimpeachable professional legacy.",
                    love: "Enduring, tender devotion that weathers every season with quiet, unshakeable grace.",
                    health: "Vibrant cellular harmony built on balanced living and mindful nutritional science."
                },
                hi: {
                    overview: "यह वर्ष आपके लिए ज्ञान, धन और प्रतिष्ठा की त्रिवेणी लेकर आया है। आपके द्वारा किए गए सभी प्रयास सफल होंगे और जीवन में स्थायित्व आएगा। आर्थिक रूप से आप अत्यंत सशक्त बनेंगे।",
                    career: "करियर में ऐतिहासिक सफलता मिलेगी। आपके विशेषज्ञता वाले क्षेत्र में आपका दबदबा रहेगा।",
                    love: "पारिवारिक जीवन में सुख-शांति का वातावरण रहेगा। घर में नए सदस्य के आगमन का योग है।",
                    health: "दीर्घकालिक रोगों से मुक्ति मिलेगी। स्वास्थ्य का स्तर अत्यंत संतोषजनक रहेगा।"
                }
            }
        },
        libra: {
            daily: {
                en: {
                    overview: "Venus brings exquisite aesthetic harmony and diplomatic grace into your sphere today. You naturally attract cooperative allies and mediate complex disputes with balanced elegance.",
                    career: "Collaborative projects flourish under your gentle guidance. Favorable contracts negotiated smoothly.",
                    love: "Harmonious romantic vibrations. An artistic outing or candlelit dinner sparks deep affection.",
                    health: "Maintain kidney and hydration balance. Practice gentle spinal alignments."
                },
                hi: {
                    overview: "आज आपका मन सौंदर्य, कला और सौहार्द से ओतप्रोत रहेगा। शुक्र का शुभ गोचर आपके संबंधों में मिठास घोलेगा। सामाजिक जीवन में आपकी लोकप्रियता बढ़ेगी और नए मित्र बनेंगे।",
                    career: "साझेदारी के कार्यों में विशेष लाभ होगा। व्यापारिक बातचीत आपके पक्ष में समाप्त होगी।",
                    love: "प्रेम जीवन अत्यंत सुखद और रोमांटिक रहेगा। जीवनसाथी के साथ सामंजस्य बेहतरीन रहेगा।",
                    health: "स्वास्थ्य अच्छा रहेगा। पानी का पर्याप्त सेवन करें और तनाव से दूर रहें।"
                }
            },
            weekly: {
                en: {
                    overview: "A balanced, progressive week highlighting artistic synergy, commercial fairness, and flourishing partnerships. Your innate sense of equity unlocks mutual goodwill.",
                    career: "Win-win negotiations set an exemplary standard. Creative design work reaches its pinnacle.",
                    love: "Deep romantic intimacy and joyful social invitations fill your weekend calendar.",
                    health: "Gentle Pilates or balance-focused yoga helps center core stability."
                },
                hi: {
                    overview: "यह सप्ताह आपके लिए सुख, ऐश्वर्य और संतुलन लेकर आया है। कानूनी या विवादित मामलों में आपके पक्ष में फैसला हो सकता है। आर्थिक स्थिति में उल्लेखनीय सुधार होगा।",
                    career: "व्यापार में नए अवसरों की प्राप्ति होगी। कला, फैशन या न्याय क्षेत्र से जुड़े लोगों को बड़ा लाभ होगा।",
                    love: "दांपत्य जीवन में मधुरता और समर्पण रहेगा। परिवार में खुशियों का माहौल रहेगा।",
                    health: "शारीरिक रूप से स्वस्थ महसूस करेंगे। नियमित दिनचर्या और संतुलित भोजन का ध्यान रखें।"
                }
            },
            monthly: {
                en: {
                    overview: "A season of aesthetic ascendancy, relationship milestones, and financial balance. Venus showers your social and professional networks with magnetic favor.",
                    career: "High-value joint ventures come together seamlessly. Your diplomatic reputation shines.",
                    love: "Celebrations of commitment. Romantic bonds deepen with exquisite shared experiences.",
                    health: "Balanced wellness regimen keeps skin radiant and vitality strong."
                },
                hi: {
                    overview: "इस माह आपके जीवन में प्रेम, धन और वैभव का सुंदर समन्वय देखने को मिलेगा। आपकी कार्यशैली से लोग आकर्षित होंगे। सामाजिक और पारिवारिक जीवन में संतुलन बना रहेगा।",
                    career: "कार्यक्षेत्र में आपके सुझावों का स्वागत होगा। नई व्यावसायिक योजनाओं में सफलता मिलेगी।",
                    love: "प्रेम प्रसंगों में प्रगाढ़ता आएगी। अविवाहितों के लिए सुंदर संबंध तय हो सकते हैं।",
                    health: "स्वास्थ्य उत्तम रहेगा। ध्यान और संगीत से मानसिक शांति की अनुभूति होगी।"
                }
            },
            yearly: {
                en: {
                    overview: "A magnificent year of harmonic equilibrium, celebrated partnerships, and refined material prosperity. You will master the sacred art of balance, attracting peace and abundance.",
                    career: "Master negotiator and esteemed partner: executive alliances of extraordinary influence.",
                    love: "Unrivaled romantic fulfillment, enduring matrimonial bliss, and shared joy.",
                    health: "Harmonious mind-body alignment sustained by conscious lifestyle choices."
                },
                hi: {
                    overview: "यह वर्ष आपके लिए सुख, सौभाग्य और मान-प्रतिष्ठा का महावर्ष रहेगा। शुक्र और गुरु की कृपा से जीवन के सभी क्षेत्रों में अनुकूल परिणाम प्राप्त होंगे। धन-धान्य में निरंतर वृद्धि होगी।",
                    career: "करियर में महत्वपूर्ण मुकाम हासिल करेंगे। अंतरराष्ट्रीय संपर्कों से लाभ होगा।",
                    love: "गृहस्थ जीवन में आनंद और खुशहाली रहेगी। जीवनसाथी के साथ तालमेल अद्वितीय रहेगा।",
                    health: "स्वास्थ्य का स्तर बहुत बढ़िया रहेगा। आंतरिक शांति और आनंद की प्राप्ति होगी।"
                }
            }
        },
        scorpio: {
            daily: {
                en: {
                    overview: "Deep perceptive power and penetrative focus define your day. Mars and Ketu empower you to see beneath the surface and execute transformative financial or technical breakthroughs.",
                    career: "In-depth investigation reveals a hidden strategic advantage. Unwavering willpower secures results.",
                    love: "Passionate intensity and emotional truth. Raw authenticity strengthens trust.",
                    health: "Regenerative power is at its peak. Sweating through sauna or intensive workout detoxifies."
                },
                hi: {
                    overview: "आज आपकी अंतर्दृष्टि अत्यंत तीव्र रहेगी। गुप्त विद्याओं या गूढ़ विषयों में आपकी रुचि बढ़ेगी। अपनी कार्ययोजनाओं को गोपनीय रखकर कार्य करें, निश्चित रूप से बड़ी सफलता प्राप्त होगी।",
                    career: "कार्यक्षेत्र में आपके गहरे ज्ञान की प्रशंसा होगी। शोध या तकनीकी कार्यों में अप्रत्याशित सफलता मिलेगी।",
                    love: "प्रेम संबंधों में प्रगाढ़ता और समर्पण रहेगा। जीवनसाथी के साथ भावनात्मक जुड़ाव गहरा होगा।",
                    health: "ऊर्जा का स्तर ऊंचा रहेगा। क्रोध और उत्तेजना से बचें तथा प्राणायाम करें।"
                }
            },
            weekly: {
                en: {
                    overview: "A week of profound renewal and strategic leverage. You easily navigate complex financial contracts and remove stagnant influences from your path with surgical precision.",
                    career: "Decisive moves secure critical market share. Behind-the-scenes mastery bears fruit.",
                    love: "Deep intimacy transcends words. Sincere emotional vulnerability is met with loyalty.",
                    health: "Prioritize deep regenerative sleep and mindful boundary setting."
                },
                hi: {
                    overview: "यह सप्ताह आपके लिए परिवर्तनकारी रहेगा। पूर्व में अटके हुए धन की वापसी हो सकती है। विरोधियों की चालें विफल होंगी और आप अपने लक्ष्य की ओर दृढ़ता से आगे बढ़ेंगे।",
                    career: "व्यापार में गुप्त स्रोतों से लाभ होगा। नौकरी में महत्वपूर्ण प्रोजेक्ट का जिम्मा मिलेगा।",
                    love: "पारिवारिक जीवन में सामंजस्य रहेगा। साथी का भावनात्मक सहयोग आपको संबल प्रदान करेगा।",
                    health: "स्वास्थ्य में सुधार होगा। नियमित ध्यान से मानसिक शांति और एकाग्रता बढ़ेगी।"
                }
            },
            monthly: {
                en: {
                    overview: "A powerhouse month of self-transcendence, financial restructuring, and magnetic sovereignty. Your fearless intuition guides you past traps and into lucrative terrain.",
                    career: "Breakthrough in high-stakes negotiations. Your tactical vision earns deep respect.",
                    love: "Magnetic romance with intense magnetic chemistry. A rebirth of passionate devotion.",
                    health: "Strong restorative capability. Excellent time for functional fitness gains."
                },
                hi: {
                    overview: "इस माह आपकी कार्यकुशलता और साहसिक निर्णयों से आर्थिक लाभ के नए द्वार खुलेंगे। आपका आत्मबल चरम पर रहेगा और आप किसी भी चुनौती का डटकर सामना करेंगे।",
                    career: "व्यवसाय में बड़ा निवेश लाभदायी रहेगा। नौकरी में उच्च पद प्राप्ति के प्रबल योग हैं।",
                    love: "दांपत्य जीवन में गहरा प्रेम और समर्पण बना रहेगा। आपसी समझबूझ से घर में शांति रहेगी।",
                    health: "शारीरिक शक्ति बनी रहेगी। नियमित दिनचर्या का पालन करें और स्वस्थ रहें।"
                }
            },
            yearly: {
                en: {
                    overview: "A legendary year of phoenix-like metamorphosis, immense financial empowerment, and unstoppable personal gravity. You will ascend to undisputed mastery over your domain.",
                    career: "Empire building: strategic investments, high-yield assets, and institutional authority.",
                    love: "Profound, transcendent love that binds souls in unbreakable mutual devotion.",
                    health: "Invulnerable resilience forged through disciplined regeneration and mindful vitality."
                },
                hi: {
                    overview: "यह वर्ष आपके जीवन का कायाकल्प करने वाला सिद्ध होगा। आप सभी पुराने अवरोधों को तोड़कर नई ऊंचाइयों को स्पर्श करेंगे। धन, संपत्ति और मान-सम्मान में अपार वृद्धि होगी।",
                    career: "करियर में ऐतिहासिक मुकाम हासिल करेंगे। आपके नेतृत्व में संस्था या व्यापार नई ऊंचाइयों पर पहुंचेगा।",
                    love: "पारिवारिक जीवन में सुख-शांति और ऐश्वर्य रहेगा। संतान की ओर से गौरवशाली उपलब्धि मिलेगी।",
                    health: "स्वास्थ्य बहुत सुदृढ़ रहेगा। आंतरिक शक्ति और आत्मविश्वास से भरपूर रहेंगे।"
                }
            }
        },
        sagittarius: {
            daily: {
                en: {
                    overview: "Jupiter expands your horizon with optimism and philosophical breadth today. Auspicious connections, scholarly pursuits, and visionary planning bring bountiful satisfaction.",
                    career: "Broad conceptual thinking inspires colleagues. A cross-border or foreign initiative advances.",
                    love: "Adventurous camaraderie fuels romance. Shared philosophical humor sparks joy.",
                    health: "High enthusiasm. Channel vitality into expansive outdoor walking or sports."
                },
                hi: {
                    overview: "आज देवगुरु बृहस्पति की कृपा से आपका भाग्य चमक उठेगा। सकारात्मक विचारों से मन प्रफुल्लित रहेगा। धार्मिक व सामाजिक कार्यों में रुचि बढ़ेगी और नए ज्ञान की प्राप्ति होगी।",
                    career: "कार्यक्षेत्र में आपकी दूरगामी सोच की सराहना होगी। विदेशी या दूरस्थ संपर्कों से लाभ होगा।",
                    love: "जीवनसाथी के साथ संबंध सौहार्दपूर्ण रहेंगे। किसी यात्रा या धार्मिक कार्यक्रम की योजना बनेगी।",
                    health: "शारीरिक ऊर्जा भरपूर रहेगी। लिवर और खानपान का ध्यान रखें, सात्विक भोजन करें।"
                }
            },
            weekly: {
                en: {
                    overview: "A bountiful week of expansion, cross-cultural discoveries, and higher educational breakthroughs. Your visionary perspective inspires everyone around you to aim higher.",
                    career: "Publishing, legal, and international affairs move with celestial speed. Success in presentations.",
                    love: "Spontaneous road trips or shared intellectual explorations revitalize connection.",
                    health: "Stretch your hip flexors and maintain outdoor cardio for vibrant stamina."
                },
                hi: {
                    overview: "यह सप्ताह आपके लिए ज्ञान और आर्थिक समृद्धि का रहेगा। रुके हुए कार्य सहजता से पूर्ण होंगे। उच्च शिक्षा या प्रतियोगी परीक्षाओं से जुड़े लोगों को सुखद परिणाम मिलेंगे।",
                    career: "व्यापार में विस्तार की योजनाएं सफल होंगी। नौकरी में पदोन्नति के साथ आय में वृद्धि होगी।",
                    love: "पारिवारिक माहौल बहुत खुशनुमा रहेगा। घर के वरिष्ठ सदस्यों का आशीर्वाद प्राप्त होगा।",
                    health: "स्वास्थ्य अच्छा रहेगा। सुबह की ताजी हवा में टहलना आपके लिए अत्यंत लाभकारी होगा।"
                }
            },
            monthly: {
                en: {
                    overview: "A jubilant month of broad horizons, academic triumph, and international prosperity. Jupiter showers your path with lucky synchronicities and enlightened guidance.",
                    career: "Major expansion of reach. Your thought leadership gains substantial following.",
                    love: "Joyous adventures and laughter. Sincere mutual growth anchors partnership.",
                    health: "Strong immune resilience. Thrive on exploratory outdoor recreation."
                },
                hi: {
                    overview: "इस माह आपका भाग्योदय निश्चित है। आपकी आशावादिता और लगन से सभी कठिनाइयां दूर होंगी। सामाजिक प्रतिष्ठा में वृद्धि होगी और तीर्थ यात्रा का शुभ अवसर मिलेगा।",
                    career: "कारोबार में बड़े लाभ के योग बन रहे हैं। नए उद्यमों में किया गया निवेश भविष्य में फलदायी होगा।",
                    love: "दांपत्य जीवन में सुख, शांति और सौभाग्य रहेगा। संतान पक्ष से शुभ समाचार मिलेगा।",
                    health: "स्वास्थ्य उत्तम रहेगा। सकारात्मक सोच और ध्यान से आत्मिक शांति बनी रहेगी।"
                }
            },
            yearly: {
                en: {
                    overview: "A celestial jubilee of global reach, profound wisdom, and boundless opportunity. Jupiter elevates your status, making this a pivotal year of international acclaim and spiritual growth.",
                    career: "Universal expansion: international ventures, acclaimed publications, and wide renown.",
                    love: "Expansive, joyous union built on philosophical kinship, truth, and boundless delight.",
                    health: "Robust constitution empowered by nature immersion and athletic vitality."
                },
                hi: {
                    overview: "यह वर्ष आपके लिए भाग्योदय और सर्वतोमुखी प्रगति का वर्ष रहेगा। गुरु की कृपा से जीवन के प्रत्येक क्षेत्र में सफलता और समृद्धि प्राप्त होगी। आपकी ख्याति दूर-दूर तक फैलेगी।",
                    career: "करियर में सर्वोच्च पद और यश की प्राप्ति होगी। अंतरराष्ट्रीय मंचों पर आपके कार्यों को सराहा जाएगा।",
                    love: "पारिवारिक जीवन में सुख-समृद्धि का वास रहेगा। मांगलिक आयोजनों से घर में उल्लास रहेगा।",
                    health: "स्वास्थ्य बहुत अच्छा रहेगा। आध्यात्मिक साधना और योग से दीर्घायु की प्राप्ति होगी।"
                }
            }
        },
        capricorn: {
            daily: {
                en: {
                    overview: "Saturn lends supreme discipline and pragmatic mastery to your endeavors today. You build with generational foresight, transforming structural diligence into lasting wealth.",
                    career: "Executive decisions yield rock-solid security. Leadership looks to your steady judgment.",
                    love: "Quiet loyalty and unwavering commitment. Supporting a partner's goal speaks volumes.",
                    health: "Maintain joint mobility and bone strength through proper posture and calcium nutrition."
                },
                hi: {
                    overview: "आज शनि देव की कृपा से आपकी कार्यक्षमता और अनुशासन शिखर पर रहेंगे। आपकी धैर्यवान और व्यावहारिक सोच से बड़े काम संपन्न होंगे। आर्थिक मामलों में दूरदर्शिता से लाभ होगा।",
                    career: "कार्यक्षेत्र में आपकी विश्वसनीयता और मेहनत की दाद दी जाएगी। वरिष्ठों का पूरा समर्थन मिलेगा।",
                    love: "दांपत्य जीवन में स्थायित्व और आदर रहेगा। जीवनसाथी के प्रति आपकी निष्ठा संबंध को मजबूत करेगी।",
                    health: "घुटनों और जोड़ों का ध्यान रखें। हल्का व्यायाम और स्ट्रेचिंग लाभकारी रहेगी।"
                }
            },
            weekly: {
                en: {
                    overview: "A week of solid structural gains, administrative triumphs, and durable asset growth. Your relentless persistence dissolves institutional resistance.",
                    career: "Decisive advancement up the corporate or organizational ladder. Contracts finalized.",
                    love: "Reliable companionship and thoughtful domestic improvements create serene contentment.",
                    health: "Take deliberate breaks from work to prevent muscle stiffness."
                },
                hi: {
                    overview: "यह सप्ताह आपके लिए कर्मठता और सफलता का रहेगा। आपके द्वारा किए गए पुराने प्रयासों का फल मिलना शुरू होगा। आर्थिक स्थिति सुदृढ़ होगी और नए निवेश के अवसर मिलेंगे।",
                    career: "व्यापार में स्थिरता और लाभ बढ़ेगा। नौकरीपेशा जातकों को नई जिम्मेदारियां मिलेंगी।",
                    love: "परिवार के साथ समय बिताने से सुकून मिलेगा। घर में किसी बुजुर्ग के स्वास्थ्य में सुधार होगा।",
                    health: "स्वास्थ्य सामान्य रहेगा। अत्यधिक कार्यभार से बचें और समय पर विश्राम करें।"
                }
            },
            monthly: {
                en: {
                    overview: "A monumental month of career pinnacle, executive authority, and sovereign wealth building. Saturn's patient alignment rewards your years of steadfast labor.",
                    career: "Major milestone reached. You command authority in your chosen sector with dignity.",
                    love: "Unshakeable devotion. Mutual respect forms an impenetrable bond.",
                    health: "Build stamina with strength conditioning and mindful recovery rituals."
                },
                hi: {
                    overview: "इस माह आपकी प्रतिष्ठा और आर्थिक समृद्धि में भारी इजाफा होगा। शनि देव का प्रभाव आपके सभी कर्मों का उत्तम फल प्रदान करेगा। समाज में आपका प्रभाव और दबदबा बढ़ेगा।",
                    career: "करियर में महत्वपूर्ण पदोन्नति के योग हैं। सरकारी या प्रशासनिक कार्यों में सफलता मिलेगी।",
                    love: "वैवाहिक जीवन में सामंजस्य और प्रेम रहेगा। परिवार की जिम्मेदारियों का बखूबी निर्वहन करेंगे।",
                    health: "स्वास्थ्य उत्तम रहेगा। नियमित योग और अनुशासन से ऊर्जा का स्तर बना रहेगा।"
                }
            },
            yearly: {
                en: {
                    overview: "Your apex year of architectural achievement, institutional legacy, and sovereign prosperity. The summit is reached: your enduring discipline bears bountiful, generational fruit.",
                    career: "Pinnacle of executive leadership: landmark governance, lasting enterprise, and prestige.",
                    love: "A bedrock of steadfast love, regal family pride, and joyful generational milestone celebrations.",
                    health: "Ironclad vitality sustained through structured discipline and mindful pacing."
                },
                hi: {
                    overview: "यह वर्ष आपके जीवन का सबसे महत्वपूर्ण और उपलब्धि कारक वर्ष सिद्ध होगा। आपकी वर्षों की तपस्या और परिश्रम का फल अब सम्मान और धन के रूप में प्राप्त होगा।",
                    career: "करियर में सर्वोच्च शिखर की प्राप्ति होगी। आपके नाम का डंका बजेगा और नए उपक्रम सफल होंगे।",
                    love: "पारिवारिक जीवन में सुख, शांति और समृद्धि का वास रहेगा। सभी सदस्य आपका आदर करेंगे।",
                    health: "स्वास्थ्य श्रेष्ठ रहेगा। आत्मबल मजबूत होने से शारीरिक और मानसिक स्फूर्ति बनी रहेगी।"
                }
            }
        },
        aquarius: {
            daily: {
                en: {
                    overview: "Visionary brilliance and humanitarian inspiration electrify your frequency today. Saturn and Uranus foster inventive solutions, making this an ideal time for technological or collective breakthroughs.",
                    career: "Ahead-of-the-curve ideas disrupt stagnation. Colleagues rally around your innovative roadmap.",
                    love: "Intellectual connection sparks romantic chemistry. An authentic, open-hearted talk liberates.",
                    health: "Improve circulation with brisk movement. Hydrate your nervous system."
                },
                hi: {
                    overview: "आज आपकी मौलिक सोच और नवीन विचार समाज को नई दिशा देंगे। शनि और राहु का प्रभाव आपके तकनीकी और वैज्ञानिक कौशल को निखारेगा। मित्रों का भरपूर सहयोग प्राप्त होगा।",
                    career: "नवाचार और तकनीकी कार्यों में बड़ी सफलता मिलेगी। नए प्रोजेक्ट में आपका दृष्टिकोण सराहा जाएगा।",
                    love: "प्रेम संबंधों में नयापन और ताजगी रहेगी। जीवनसाथी के साथ बौद्धिक चर्चाएं मन को भाएंगी।",
                    health: "रक्त संचार और पैरों का ध्यान रखें। नियमित प्राणायाम से मानसिक तनाव दूर होगा।"
                }
            },
            weekly: {
                en: {
                    overview: "An unconventional, brilliantly productive week. Collaborative networks bring cutting-edge proposals to fruition. Your forward-looking foresight proves utterly prescient.",
                    career: "Breakthrough in digital, scientific, or social projects. Influential peers endorse your vision.",
                    love: "Unconventional romance and exhilarating freedom within committed partnership.",
                    health: "Ground your high mental frequency with grounding earth walks and sound therapy."
                },
                hi: {
                    overview: "यह सप्ताह आपके लिए नई संभावनाओं और मित्रों के सहयोग का रहेगा। सामूहिक कार्यों में आपकी नेतृत्व क्षमता चमकेगी। आय के नए आधुनिक स्रोत विकसित होंगे।",
                    career: "व्यापार में नए प्रयोग सफल रहेंगे। नौकरी में आपकी रचनात्मकता से कार्य सुगम बनेंगे।",
                    love: "पारिवारिक जीवन में स्वतंत्रता और परस्पर आदर रहेगा। संबंधों में नई ऊर्जा का संचार होगा।",
                    health: "स्वास्थ्य अच्छा रहेगा। ध्यान लगाने से मानसिक एकाग्रता और शांति में वृद्धि होगी।"
                }
            },
            monthly: {
                en: {
                    overview: "A transformative month of visionary innovation, network expansion, and philanthropic leadership. You will champion future-forward ideas that garner enthusiastic support.",
                    career: "Rapid acceleration of community or digital initiatives. Prestigious collaborations formed.",
                    love: "Soul-level resonance with an independent, visionary partner. Authentic affection thrives.",
                    health: "High mental acuity. Balance intense intellectual output with restorative nature breaks."
                },
                hi: {
                    overview: "इस माह आपके क्रांतिकारी विचार और योजनाएं सफलता की नई इबारत लिखेंगी। समाज में आपके प्रभाव का विस्तार होगा और महत्वपूर्ण लोगों से संबंध बनेंगे। आर्थिक स्थिति मजबूत होगी।",
                    career: "तकनीक, शोध और मीडिया से जुड़े लोगों को बड़ा लाभ होगा। नए अनुबंधों पर हस्ताक्षर होंगे।",
                    love: "दांपत्य जीवन में सुखद समझदारी रहेगी। जीवनसाथी आपकी महत्वाकांक्षाओं का समर्थन करेगा।",
                    health: "स्वास्थ्य सामान्यतः बहुत अच्छा रहेगा। स्क्रीन टाइम सीमित करें और पर्याप्त नींद लें।"
                }
            },
            yearly: {
                en: {
                    overview: "A quantum leap year of revolutionary innovation, global network influence, and vanguard mastery. You will shape the cultural or technological zeitgeist and inspire generations.",
                    career: "Epoch-defining inventions: visionary platform launches and pioneering industry impact.",
                    love: "Transcendent, free-spirited devotion rooted in deep mutual respect, truth, and wonder.",
                    health: "Radiant, high-vibrational stamina harmonized through holistic and modern modalities."
                },
                hi: {
                    overview: "यह वर्ष आपके जीवन का एक ऐतिहासिक और युगांतरकारी वर्ष साबित होगा। आपके नवाचार और सामाजिक योगदान को वैश्विक स्तर पर सराहना मिलेगी। धन और यश की अपार वर्षा होगी।",
                    career: "करियर में अभूतपूर्व छलांग लगेगी। आपके द्वारा किए गए प्रयोग नए आयाम स्थापित करेंगे।",
                    love: "पारिवारिक और दांपत्य जीवन में आनंद और खुशहाली रहेगी। मित्र और परिजन आपका साथ देंगे।",
                    health: "स्वास्थ्य उत्तम रहेगा। सकारात्मक दृष्टिकोण से हर क्षेत्र में सफलता मिलेगी।"
                }
            }
        },
        pisces: {
            daily: {
                en: {
                    overview: "Jupiter and Neptune infuse your consciousness with profound artistic imagination and spiritual depth today. Your empathetic intuition reads subtle currents that others miss completely.",
                    career: "Creative and compassionate professions thrive. Your artistic instinct unlocks an inspired solution.",
                    love: "Poetic, tender romance. An unspoken soul-to-soul understanding warms the heart.",
                    health: "Rest your feet and hydrate deeply. Music and water meditation bring instant rejuvenation."
                },
                hi: {
                    overview: "आज आपकी कल्पनाशीलता, संवेदनशीलता और आध्यात्मिक चेतना चरम पर रहेगी। देवगुरु बृहस्पति की कृपा से अंतर्मन में शांति और आनंद रहेगा। जरूरतमंदों की मदद करने से आत्मिक संतोष मिलेगा।",
                    career: "रचनात्मक और कलात्मक क्षेत्रों में आपकी प्रतिभा का डंका बजेगा। वित्तीय मामलों में सुधार होगा।",
                    love: "प्रेम संबंधों में असीम समर्पण और कोमलता रहेगी। साथी के साथ दिल की बातें साझा करेंगे।",
                    health: "पैरों और तलवों का ध्यान रखें। गुनगुने पानी से स्नान और ध्यान से मानसिक शांति मिलेगी।"
                }
            },
            weekly: {
                en: {
                    overview: "A magically synchronistic week. Artistic flow, spiritual epiphanies, and empathetic diplomacy open doors that cold logic could not unlock. Wealth arrives through benevolent channels.",
                    career: "Creative mastery earns widespread applause. Harmonious cooperation on all fronts.",
                    love: "Fairytale romance and transcendent emotional intimacy illuminate your week.",
                    health: "Swim or immerse in hydrotherapy to cleanse and rejuvenate your subtle energy field."
                },
                hi: {
                    overview: "यह सप्ताह आपके लिए दैवीय कृपा और आध्यात्मिक शांति का रहेगा। रुके हुए कार्यों में अप्रत्याशित प्रगति होगी। दान-पुण्य और धर्म-कर्म में मन लगेगा जिससे यश मिलेगा।",
                    career: "कला, लेखन, संगीत और शिक्षण क्षेत्र के जातकों को बड़ी सफलता मिलेगी। नए प्रोजेक्ट मिलेंगे।",
                    love: "दांपत्य जीवन में गहरा प्रेम और शांति बनी रहेगी। परिवार में शुभ प्रसंगों की योजना बनेगी।",
                    health: "स्वास्थ्य स्थिर रहेगा। नियमित योग और सकारात्मक चिंतन से सभी विकार दूर होंगे।"
                }
            },
            monthly: {
                en: {
                    overview: "A transcendent month of creative fruition, spiritual enlightenment, and compassionate abundance. Your dreams crystallize into tangible reality under Jupiter's generous gaze.",
                    career: "Masterpiece unveiled. Acclaim for humanitarian or deeply creative contributions.",
                    love: "Unconditional love and soulmate connection. Emotional vulnerability is revered and cherished.",
                    health: "Luminous vitality when surrounded by inspiring art, sacred music, and pristine waters."
                },
                hi: {
                    overview: "इस माह आपके जीवन में सुख, शांति और समृद्धि की गंगा बहेगी। आपकी आध्यात्मिक साधना और सेवा का फल प्राप्त होगा। आर्थिक मामलों में कोई बड़ा शुभ समाचार मिल सकता है।",
                    career: "व्यापार में नए साझेदार जुड़ेंगे। नौकरीपेशा जातकों को सुखद पदोन्नति का अवसर प्राप्त होगा।",
                    love: "प्रेम प्रसंगों में मधुरता रहेगी। वैवाहिक जीवन में नई उमंग और खुशहाली का संचार होगा।",
                    health: "स्वास्थ्य बहुत अच्छा रहेगा। प्राकृतिक वातावरण में समय बिताने से ताजगी मिलेगी।"
                }
            },
            yearly: {
                en: {
                    overview: "A mystical, crowned year of artistic apotheosis, spiritual bliss, and bountiful material grace. Jupiter orchestrates serendipitous miracles, making this your most inspired epoch.",
                    career: "Legendary creative legacy: international exhibitions, sacred works, and heartfelt acclaim.",
                    love: "Transcendental soulmate union that mirrors the boundless ocean of divine love.",
                    health: "Sublime energetic radiance grounded in meditation, compassion, and natural waters."
                },
                hi: {
                    overview: "यह वर्ष आपके लिए आत्मिक शांति, ऐश्वर्य और सर्वतोमुखी विजय का वर्ष रहेगा। गुरु की अमृत दृष्टि आपके सभी कष्टों को हर लेगी और जीवन को खुशियों से भर देगी।",
                    career: "करियर में ऐतिहासिक उपलब्धि हासिल होगी। आपके कार्यों को समाज में सर्वोच्च सम्मान मिलेगा।",
                    love: "पारिवारिक जीवन स्वर्ग समान आनंददायक रहेगा। घर में मांगलिक उत्सवों की झड़ी लगेगी।",
                    health: "स्वास्थ्य उत्तम रहेगा। आंतरिक प्रसन्नता और योग से आप सदैव ऊर्जावान बने रहेंगे।"
                }
            }
        }
    };

    class CosmicHoroscopeEngine {
        constructor() {
            this.currentLanguage = 'en'; // 'en' | 'hi'
            this.currentTimeframe = 'daily'; // 'daily' | 'weekly' | 'monthly' | 'yearly'
            this.currentSign = 'aries';
        }

        setLanguage(lang) {
            if (lang === 'hi' || lang === 'en') {
                this.currentLanguage = lang;
            }
        }

        setTimeframe(timeframe) {
            if (['daily', 'weekly', 'monthly', 'yearly'].includes(timeframe)) {
                this.currentTimeframe = timeframe;
            }
        }

        setSign(signId) {
            const found = ZODIAC_SIGNS.find(s => s.id === signId);
            if (found) {
                this.currentSign = signId;
            }
        }

        getAllSigns() {
            return ZODIAC_SIGNS;
        }

        getSignInfo(signId = this.currentSign) {
            return ZODIAC_SIGNS.find(s => s.id === signId) || ZODIAC_SIGNS[0];
        }

        getReading(signId = this.currentSign, timeframe = this.currentTimeframe, lang = this.currentLanguage) {
            const signData = PREDICTIONS[signId] || PREDICTIONS.aries;
            const tfData = signData[timeframe] || signData.daily;
            const content = tfData[lang] || tfData.en;
            const meta = this.getSignInfo(signId);

            // Compute dynamic astrological energy score based on sign & day of month
            const today = new Date();
            const seed = (signId.charCodeAt(0) * 17 + today.getDate() * 31 + today.getMonth() * 7) % 19;
            const harmonyScore = 82 + seed; // 82% to 100%

            return {
                sign: meta,
                timeframe,
                lang,
                content,
                harmonyScore,
                harmony: harmonyScore,
                glyph: meta.glyph,
                name: meta.name[lang] || meta.name.en,
                dates: meta.dates[lang] || meta.dates.en,
                element: meta.element[lang] || meta.element.en,
                rulingPlanet: meta.planet[lang] || meta.planet.en,
                planet: meta.planet[lang] || meta.planet.en,
                gemstone: meta.gemstone[lang] || meta.gemstone.en,
                compatibility: meta.compatible[lang] || meta.compatible.en,
                compatibleSign: meta.compatible[lang] || meta.compatible.en,
                luckyNumber: meta.luckyNumbers[seed % meta.luckyNumbers.length],
                luckyColor: meta.luckyColors[lang][seed % meta.luckyColors[lang].length],
                overview: content.overview,
                general: content.overview,
                career: content.career,
                love: content.love,
                health: content.health
            };
        }
    }

    // Attach to global window
    const horoscopeInstance = new CosmicHoroscopeEngine();
    horoscopeInstance.ZODIAC_SIGNS = ZODIAC_SIGNS;
    window.CosmicHoroscope = horoscopeInstance;
})();
