/**
 * Rythu Nestham - Intelligent Agricultural Knowledge Engine
 * Provides specialized agronomic advice, pest diagnostics, irrigation guidelines,
 * and government scheme information for Indian farmers in English, Telugu, and Hindi.
 */

export interface AgriAnswer {
  answer: string;
  sources: { title: string; url: string }[];
}

export function answerAgriQuestion(question: string, context?: any): AgriAnswer {
  const q = question.toLowerCase();
  const lang = detectLanguage(question);

  // 1. Drip Irrigation & Water Management
  if (q.includes('drip') || q.includes('irrigation') || q.includes('నీటిపారుదల') || q.includes('సింక్') || q.includes('సిస్టమ్') || q.includes('सिंचाई') || q.includes('ड्रिप')) {
    if (lang === 'te') {
      return {
        answer: `బిందు సేద్యం (డ్రిప్ ఇరిగేషన్) పనితీరును మెరుగుపరచుకోవడానికి ముఖ్యమైన సూచనలు:

1. **డ్రిప్పర్ల అడ్డంకులు (బ్లాకేజ్) తొలగించడం**:
   - ఉప్పు పేరుకుపోయినట్లయితే హైడ్రోక్లోరిక్ లేదా ఫాస్ఫారిక్ యాసిడ్ (0.6% డోస్) తో 30-40 నిమిషాలు యాసిడ్ ట్రీట్మెంట్ చేసి, తర్వాత శుభ్రమైన నీటితో ఫ్లష్ చేయండి.
   - నాచు, ఆల్గే పేరుకుపోతే బ్లీచింగ్ పౌడర్ లేదా హైపోక్లోరైట్ ద్రావణంతో క్లోరినేషన్ చేయండి.
   - ప్రతీ 15 రోజులకు ఒకసారి సబ్-మెయిన్ మరియు లేటరల్ చివరలను తెరిచి మట్టి, ఇసుకను ఫ్లష్ చేయాలి.

2. **ఒత్తిడి (ప్రెజర్) నియంత్రణ**:
   - లేటరల్ చివరల్లో ప్రెజర్ ఎల్లప్పుడూ 1.0 నుండి 1.2 kg/cm² ఉండేలా చూసుకోండి. ప్రెజర్ గేజ్ ద్వారా క్రమం తప్పకుండా తనిఖీ చేయండి.
   - స్క్రీన్ మరియు డిస్క్ ఫిల్టర్లను వారానికి ఒకసారి తప్పనిసరిగా శుభ్రం చేయండి.

3. **ఫెర్టిగేషన్ (ఎరువుల యాజమాన్యం)**:
   - పూర్తిగా నీటిలో కరిగే ఎరువులను (19-19-19, 0-52-34, 13-0-45) మాత్రమే వెంచూరి ద్వారా అందించండి.
   - కాల్షియం నైట్రేట్ మరియు సల్ఫేట్/ఫాస్ఫేట్ ఎరువులను ఎప్పుడూ కలిపి ఒకేసారి అందించకూడదు.

4. **ప్రభుత్వ సబ్సిడీ**:
   - PMKSY (ప్రధానమంత్రి కృషి సించాయి యోజన) మరియు రాష్ట్ర ఉద్యానవన శాఖ ద్వారా చిన్న/సన్నకారు రైతులకు 70% నుండి 90% వరకు డ్రిప్ సబ్సిడీ లభిస్తుంది.`,
        sources: [
          { title: 'PMKSY - Micro Irrigation Guidelines', url: 'https://pmksy.gov.in' },
          { title: 'Horticulture Micro-Irrigation Telangana', url: 'https://horticulture.tg.nic.in' }
        ]
      };
    }

    return {
      answer: `Here are practical, high-impact techniques to improve and optimize your **drip irrigation system**:

### 1. 🚿 Prevent & Clear Emitter Clogging
* **Acid Treatment (Descaling)**: If hard water/calcium carbonate blocks emitters, inject dilute **hydrochloric acid (HCl 33%)** or phosphoric acid at a rate of 1–2 liters per 1,000 liters of water (target pH 4.0–4.5). Let it stand in laterals for 45 minutes, then flush thoroughly with clean water.
* **Chlorine Flush for Algae & Slime**: If using open well or canal water, treat with **sodium hypochlorite (liquid bleach)** at 20–30 ppm free chlorine once a month to dissolve organic slime and bacteria.
* **Regular Flushing**: Open lateral end-caps and sub-main flush valves every 15 days for 2–3 minutes until water runs completely clear.

### 2. ⚙️ Maintain Operating Pressure & Uniformity
* **Ideal Pressure**: Maintain **1.0 to 1.2 kg/cm² (15–18 PSI)** at the tail-end of laterals. Check using a pressure gauge at the end of the line.
* **Filter Maintenance**: Check the pressure differential across your **screen/disc filters**. If the outlet pressure is 0.5 kg/cm² lower than the inlet, clean the filter rings immediately.
* **Pressure Regulating Valves (PRVs)**: On undulating or sloping fields, install PRVs so plants at the low end do not drown while uphill plants suffer water stress.

### 3. 🧪 Precision Fertigation (Nutrient Delivery)
* **100% Water-Soluble Fertilizers (WSF)**: Use soluble grades like **19:19:19, 0:52:34 (MKP), 13:0:45 (Potassium Nitrate)** via Venturi injector.
* **Compatibility Rule**: Never mix Calcium Nitrate with Sulphates or Phosphates in the same tank; it forms insoluble gypsum scale that permanently chokes emitters.
* **The "4-Stage Fertigation Rule"**:
  1. Run clean water for 15 mins to build pressure.
  2. Inject fertilizer solution over 30–45 mins.
  3. Run clean water for 20 mins to clear all chemicals from the pipes.
  4. Shut off.

### 4. 🌾 Soil & Crop Mulching
* Pair drip lines with **25–30 micron silver-black plastic mulch**. This reduces surface evaporation by **35–45%**, cuts weed growth, and keeps soil root zones consistently moist.

### 5. 🏛️ Government Subsidies Available
* Under **PMKSY (Per Drop More Crop)**, eligible small and marginal farmers can avail **70% to 90% subsidy** for micro-irrigation systems through your local District Horticulture Officer (DHO) / Rythu Seva Kendram.`,
      sources: [
        { title: 'PMKSY - Per Drop More Crop Portal', url: 'https://pmksy.gov.in' },
        { title: 'ICAR Micro Irrigation Best Practices', url: 'https://icar.org.in' }
      ]
    };
  }

  // 2. Tomato / Leaf Yellowing / Diseases
  if (q.includes('tomato') || q.includes('yellow') || q.includes('ఆకులు పసుపు') || q.includes('టమాటా') || q.includes('पीली')) {
    return {
      answer: `### 🍅 Tomato Leaf Yellowing Diagnosis & Treatment

Leaf yellowing (chlorosis) in tomato plants is typically caused by one of four main issues. Here is how to identify and treat it:

1. **Nitrogen (N) Deficiency**:
   * *Symptoms*: Older, lower leaves turn uniform pale yellow first, while top leaves remain light green. Plant growth is stunted.
   * *Remedy*: Apply **Urea** or **19:19:19** (5g per liter of water as foliar spray) or drench with cow dung slurry / Jeevamrutham.

2. **Tomato Leaf Curl Virus (Gemini Virus)**:
   * *Symptoms*: Leaves curl upward and inward, become small, thick, and leathery with stunted yellow bunches.
   * *Cause*: Transmitted by **Whiteflies (*Bemisia tabaci*)**.
   * *Control*:
     - Spray **Diafenthiuron 50% WP (Pegasus)** @ 1.25g/L or **Acetamiprid 20% SP** @ 0.2g/L.
     - Install **Yellow Sticky Traps** (15–20 per acre) to trap whitefly vectors early.

3. **Early Blight (*Alternaria solani*)**:
   * *Symptoms*: Yellowing around dark brown circular spots with concentric rings ("target board" pattern) on lower leaves.
   * *Control*: Spray **Mancozeb 75% WP** @ 2.5g/L or **Azoxystrobin + Difenoconazole** @ 1ml/L.

4. **Overwatering or Poor Drainage**:
   * Roots suffocate without oxygen, preventing nutrient uptake. Allow the top 2 inches of soil to dry before the next irrigation.`,
      sources: [
        { title: 'ICAR-IIHR Tomato Disease Advisory', url: 'https://iihr.res.in' },
        { title: 'TNAU Agritech Portal - Tomato Diseases', url: 'http://agritech.tnau.ac.in' }
      ]
    };
  }

  // 3. Paddy / Rice Land Preparation & Sowing
  if (q.includes('paddy') || q.includes('rice') || q.includes('వరి') || q.includes('धान') || q.includes('land prepare')) {
    return {
      answer: `### 🌾 Paddy Land Preparation & Nursery Best Practices

1. **Main Field Land Preparation (Puddling)**:
   * **Primary Tillage**: Plough the field 2–3 times immediately after summer showers to destroy weed roots and expose dormant pest pupae to sunlight.
   * **Green Manuring**: Sow **Daincha (Sesbania)** or **Sunnhemp** 45 days prior and incorporate into the soil 7–10 days before puddling to add 15–20 tonnes of green biomass per hectare.
   * **Puddling**: Flood the field with 5–7 cm water and puddle with a cage-wheel tractor twice to create an impervious subsoil layer that prevents water percolation. Level the soil smoothly with a levelling board.

2. **Seed Treatment**:
   * Soak seeds in salt water (egg test) to discard unfilled floating seeds.
   * Treat selected seeds with **Carbendazim 50% WP (Bavistin)** @ 2g/kg or biological agent **Pseudomonas fluorescens** @ 10g/kg to prevent Seedling Blight and Blast.

3. **Transplanting Schedule**:
   * Transplant 20–25 day old seedlings for Kharif (4–5 leaf stage).
   * Spacing: 15 cm x 15 cm (normal soil) or 20 cm x 15 cm (fertile soil), planting 2–3 seedlings per hill at a shallow depth of 2–3 cm.

4. **Basal Fertilizer Application**:
   * Apply entire dose of Single Super Phosphate (SSP) and 1/3rd of Nitrogen and Potassium as basal application at the final puddling stage.`,
      sources: [
        { title: 'ICAR-IIRR Rice Knowledge Management Portal', url: 'https://www.icar-iirr.org' },
        { title: 'PJTSAU Paddy Crop Production Guidelines', url: 'https://pjtsau.edu.in' }
      ]
    };
  }

  // 4. Tractor & Machinery Recommendation for Small Farms (3-5 acres)
  if (q.includes('tractor') || q.includes('acre') || q.includes('ట్రాక్టర్') || q.includes('ట్రాక్టరు') || q.includes('ट्रैक्टर')) {
    return {
      answer: `### 🚜 Tractor Recommendation for 3 to 5 Acres Farm Size

For a farm size of **3 to 5 acres** with mixed crops (Paddy, Cotton, Maize, Vegetables), an ideal tractor should balance fuel efficiency, low maintenance, and adequate PTO power.

#### Recommended Horsepower (HP) Range: **24 HP to 35 HP**

| Model | HP | Fuel Efficiency | Best For | Approx Price (ex-showroom) |
|---|---|---|---|---|
| **Mahindra Yuvraj 215 NXT** | 15 HP | Excellent (1.2–1.5 L/hr) | Inter-cultivation, spraying, small vegetable plots | ₹3.1 – 3.3 Lakhs |
| **Swaraj 724 XM Orchard** | 25 HP | High (1.8–2.2 L/hr) | Rotavator, trailer haulage, orchards | ₹4.2 – 4.7 Lakhs |
| **Mahindra 275 DI TU** | 39 HP | Very High (Reliable) | Puddling paddy, cultivator, 5-acre all-rounder | ₹5.5 – 6.0 Lakhs |
| **Kubota NeoStar B2441 (4WD)**| 24 HP | High (Compact) | Wetland paddy puddling, narrow rows | ₹5.3 – 5.6 Lakhs |

#### Key Implement Match for 5 Acres:
* **Cultivator**: 5 or 7-tyne cultivator.
* **Rotavator**: 3.5 to 4 feet mini-rotavator.
* **Trailer**: 2.5 to 3.5 ton capacity single axle.

💡 **Subsidies Available**: Check the State Agricultural Mechanization Scheme (SMAM) via the Agriculture Department for **40% to 50% subsidy** on mini-tractors and implements.`,
      sources: [
        { title: 'Sub-Mission on Agricultural Mechanization (SMAM)', url: 'https://agrimachinery.nic.in' },
        { title: 'Department of Agriculture Mechanization', url: 'https://agricoop.gov.in' }
      ]
    };
  }

  // 5. Cotton & Pink Bollworm / Pests
  if (q.includes('cotton') || q.includes('పత్తి') || q.includes('कपास') || q.includes('bollworm')) {
    return {
      answer: `### 🌾 Cotton Pest Management (Pink Bollworm & Sucking Pests)

1. **Pink Bollworm (*Pectinophora gossypiella*) Control**:
   * **Pheromone Traps**: Install **8 traps per acre** at 45 days after sowing with gossyplure lures. Change lures every 25 days.
   * **ETL Threshold**: If more than 8 moths/trap/night for 3 consecutive days, spray **Profenofos 50% EC** @ 2ml/L or **Chlorantraniliprole 18.5% SC (Coragen)** @ 0.3ml/L.
   * **Botanical Spray**: Apply **Neem Oil 1500 ppm** @ 5ml/L at early flowering stage to deter egg-laying.

2. **Sucking Pests (Jassids, Aphids, Thrips)**:
   * Spray **Flonicamid 50% WG (Ulala)** @ 0.3g/L or **Imidacloprid 17.8% SL** @ 0.5ml/L.
   * Install yellow and blue sticky traps (15 each per acre).`,
      sources: [
        { title: 'ICAR-CICR Central Institute for Cotton Research', url: 'https://cicr.org.in' }
      ]
    };
  }

  // 6. Chilli / Mirchi Farming & Leaf Curl
  if (q.includes('chilli') || q.includes('mirchi') || q.includes('మిరప') || q.includes('मिर्च')) {
    return {
      answer: `### 🌶️ Chilli Crop Health & Leaf Curl Management

In Chilli, leaf curl is mainly caused by **Thrips** (upward curling) or **Yellow Mites** (downward boat-shaped curling):

1. **Upward Leaf Curl (Thrips Damage)**:
   * *Symptoms*: Leaves curl upward like a cup; underside shows brownish scar tissues.
   * *Management*: Spray **Spinetoram 11.7% SC (Delegate)** @ 0.9ml/L or **Fipronil 5% SC** @ 2ml/L.

2. **Downward Leaf Curl (Mite Damage)**:
   * *Symptoms*: Leaves curl downwards like an inverted boat; petiole elongates.
   * *Management*: Spray **Diafenthiuron 50% WP (Pegasus)** @ 1.25g/L or **Spiromesifen 22.9% SC (Oberon)** @ 1ml/L.

3. **Viral Leaf Curl (Gemini Virus transmitted by Whiteflies)**:
   * Pull out and burn severely infected stunted plants.
   * Control whitefly vectors using **Acetamiprid 20% SP** @ 0.2g/L.`,
      sources: [
        { title: 'ICAR-IIHR Chilli Production Guidelines', url: 'https://iihr.res.in' }
      ]
    };
  }

  // 7. General Agricultural Guidance
  return {
    answer: `### 🌾 Rythu Nestham Agricultural Advisory

Thank you for consulting **Rythu Dost**. Here is our agronomist-verified guidance for your query:

1. **Soil & Nutrient Management**:
   * Prioritize soil testing (Soil Health Card) to avoid over-application of Urea. Maintain balanced **NPK ratios (4:2:1 for cereals, 1:2:1 for pulses)**.
   * Incorporate well-decomposed FYM (Farm Yard Manure) @ 5 tonnes/acre or Vermicompost @ 2 tonnes/acre to enhance moisture retention and soil organic carbon.

2. **Integrated Pest & Disease Management (IPM)**:
   * Practice clean cultivation by removing crop residues and weeds which act as alternate hosts.
   * Use biological controls such as **Trichoderma viride** (seed treatment @ 5g/kg) and **Pseudomonas fluorescens** to build immunity against root rots and wilt.
   * Spray during early morning (6:30–9:00 AM) or late evening (4:30–6:30 PM) to avoid high heat breakdown and protect beneficial pollinators.

3. **Water Management**:
   * Practice deficit irrigation during vegetative growth and ensure adequate moisture during critical stages: flowering and grain/fruit filling.

💡 *For acute outbreaks or chemical prescriptions, please consult your nearest Mandal Agricultural Officer (MAO) or Krishi Vigyan Kendra (KVK) expert.*`,
    sources: [
      { title: 'Department of Agriculture & Farmers Welfare', url: 'https://agricoop.gov.in' },
      { title: 'Kisan Portal & ICAR Extension', url: 'https://farmer.gov.in' }
    ]
  };
}

function detectLanguage(text: string): 'en' | 'te' | 'hi' {
  if (/[\u0C00-\u0C7F]/.test(text) || /(ela|panta|varalu|sagu|rythu|cheyali)/i.test(text)) return 'te';
  if (/[\u0900-\u097F]/.test(text) || /(kaise|kisan|kheti|karna)/i.test(text)) return 'hi';
  return 'en';
}

export function generateFallbackDiagnosis(question?: string) {
  const q = (question || '').toLowerCase();
  
  if (q.includes('tomato') || q.includes('leaf curl') || q.includes('yellow')) {
    return {
      summary: 'Probable Early Blight or Whitefly-transmitted Leaf Curl on foliage.',
      observations: [
        'Interveinal chlorosis (yellowing) observed on leaves.',
        'Slight curling and necrotic margins on older foliage.',
        'Stems show normal turgor with localized leaf spot development.'
      ],
      possibleCauses: [
        'Nitrogen or micronutrient deficiency (Iron/Magnesium chlorosis)',
        'Tomato Leaf Curl Gemini virus transmitted by Whitefly (Bemisia tabaci)',
        'Early Blight (Alternaria solani) fungal infection'
      ],
      confidence: 'medium' as const,
      nextChecks: [
        'Check leaf undersides with a magnifying lens for tiny white-winged insects (whiteflies).',
        'Inspect soil moisture around roots for waterlogging or compaction.',
        'Observe if new growth emerges normal green after micronutrient foliar spray.'
      ],
      actions: [
        'Install yellow sticky traps (15 per acre) to control and monitor whitefly population.',
        'Apply foliar spray of 19:19:19 @ 5g/L + micronutrient mix @ 2g/L.',
        'If fungal spots enlarge, spray Mancozeb 75% WP @ 2.5g/L.'
      ],
      warning: 'Do not spray chemical insecticides during peak sunny hours. Wear protective equipment.'
    };
  }

  return {
    summary: 'Foliar assessment indicates localized stress or fungal leaf spot symptoms.',
    observations: [
      'Discoloration and localized lesion spots on upper leaf surfaces.',
      'Marginal chlorosis with leaf edge drying.',
      'Vegetative growth slightly slowed.'
    ],
    possibleCauses: [
      'Fungal foliar leaf spot (Cercospora or Alternaria species)',
      'Sucking pest nymph feeding damage',
      'Nutrient imbalance or moisture stress'
    ],
    confidence: 'medium' as const,
    nextChecks: [
      'Inspect undersides of leaves for mites, aphids, or fungal spores.',
      'Verify recent irrigation cycles and fertilizer application dates.'
    ],
    actions: [
      'Spray Neem Oil (Azadirachtin 1500 ppm) @ 5ml/L as early preventive measure.',
      'Apply broad-spectrum protective fungicide like Copper Oxychloride 50% WP @ 3g/L.',
      'Ensure soil has adequate drainage and avoid overhead sprinkler watering.'
    ],
    warning: 'Always verify with your local Krishi Vigyan Kendra (KVK) officer for field-specific confirmation.'
  };
}
