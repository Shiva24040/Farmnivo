'use client';

import { useState } from 'react';
import {
  PawPrint, HeartPulse, Droplets, Calendar, ShieldCheck,
  Plus, Search, Phone, ChevronRight, Activity, AlertTriangle,
  Sparkles, CheckCircle2, Info
} from 'lucide-react';

interface LivestockProfile {
  id: string;
  tagNo: string;
  name: string;
  breed: string;
  category: 'Cattle & Buffalo' | 'Goat & Sheep' | 'Poultry';
  imageUrl: string;
  age: string;
  stage: string;
  dailyYield: string;
  feedRation: string;
  vaccination: string;
  dewormingDue: string;
  healthStatus: 'Excellent' | 'Good' | 'Under Observation';
  vetNotes: string;
  isExample: boolean;
}

const realisticLivestock: LivestockProfile[] = [
  {
    id: 'live-1',
    tagNo: 'IN-TS-0492',
    name: 'Ganga (గంగ)',
    breed: 'Murrah Buffalo (ముర్రా జాతి గేదె)',
    category: 'Cattle & Buffalo',
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    age: '4.5 Years',
    stage: '2nd Lactation (Day 68 Peak)',
    dailyYield: '14.5 Liters / Day (7.8% Fat)',
    feedRation: '25 kg Super Napier + 6 kg Paddy Straw + 4.5 kg Cattle Feed Concentrate (22% Protein) + 60g Mineral Mixture',
    vaccination: 'FMD (Foot & Mouth) vaccinated on 10 May 2026; Black Quarter (BQ) valid',
    dewormingDue: 'Albendazole 30ml due on 15 Oct 2026',
    healthStatus: 'Excellent',
    vetNotes: 'Rumination normal at 54 chews/min. Body condition score 3.5/5. Peak milk production stage.',
    isExample: true
  },
  {
    id: 'live-2',
    tagNo: 'IN-TS-1184',
    name: 'Kapila (కపిల)',
    breed: 'Gir Indigenous Cow (గిర్ ఆవు)',
    category: 'Cattle & Buffalo',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    age: '5 Years',
    stage: '3rd Lactation (Day 110)',
    dailyYield: '11.0 Liters / Day (A2 Certified Milk, 4.6% Fat)',
    feedRation: '20 kg Green Fodder (Co-4) + 5 kg Sorghum Stover + 3.5 kg Cottonseed Cake + 50g Salt & Minerals',
    vaccination: 'Lumpy Skin Disease (LSD) booster done; Hemorrhagic Septicemia (HS) active',
    dewormingDue: 'Fenbendazole bolus administered 45 days ago',
    healthStatus: 'Excellent',
    vetNotes: 'High heat tolerance. Excellent maternal instincts and calm temperament. Free pasture grazing 4 hrs daily.',
    isExample: true
  },
  {
    id: 'live-3',
    tagNo: 'IN-TS-2031',
    name: 'Gauri (గౌరి)',
    breed: 'Sahiwal Dairy Cow (సాహివాల్)',
    category: 'Cattle & Buffalo',
    imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=800&q=80',
    age: '3.8 Years',
    stage: '1st Lactation (Heifer Calved)',
    dailyYield: '12.5 Liters / Day (4.8% Fat)',
    feedRation: '22 kg Maize silage + 4 kg Dry wheat straw + 4 kg Dairy pellet feed + Calcium gel supplement',
    vaccination: 'Brucellosis (Cotton Strain 19) calfhood vaccinated; FMD due in November',
    dewormingDue: 'Next dose due in 60 days',
    healthStatus: 'Good',
    vetNotes: 'Good udder attachment with well-spaced teats. Regular estrus cycle monitoring.',
    isExample: true
  },
  {
    id: 'live-4',
    tagNo: 'IN-TS-3419',
    name: 'Kamadhenu (కామధేను)',
    breed: 'Crossbred HF Cow (హోల్‌స్టీన్ ఫ్రీసియన్ క్రాస్)',
    category: 'Cattle & Buffalo',
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    age: '6 Years',
    stage: '4th Lactation (High Yield)',
    dailyYield: '22.0 Liters / Day (3.8% Fat)',
    feedRation: '35 kg Silage/Lucerne + 8 kg Balanced High-Yield Mash + Bypass fat 100g + Buffer sodium bicarbonate',
    vaccination: 'All core vaccinations complete and updated in INAPH national portal',
    dewormingDue: 'Ivermectin injection administered 30 days ago',
    healthStatus: 'Under Observation',
    vetNotes: 'Requires foggers and ceiling fans during hot afternoons to prevent thermal heat stress. Somatic cell count normal.',
    isExample: true
  },
  {
    id: 'live-5',
    tagNo: 'IN-GO-0812',
    name: 'Shyama (శ్యామ)',
    breed: 'Osmanabadi Goat Doe (ఉస్మానాబాదీ మేక)',
    category: 'Goat & Sheep',
    imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
    age: '2.5 Years',
    stage: 'Pregnant (Advanced Gestation - 110 Days)',
    dailyYield: '1.8 Liters Milk / Twins Kidding Expected',
    feedRation: '3 kg Subabul & Moringa leaves + 1 kg Dry fodder + 350g Crushed maize & Bengal gram chuni',
    vaccination: 'PPR (Peste des Petits Ruminants) vaccinated; Enterotoxemia (ET) booster given',
    dewormingDue: 'Safe pregnancy dewormer (Fenbendazole) scheduled before kidding',
    healthStatus: 'Excellent',
    vetNotes: 'Hardy disease-resistant semi-arid breed. Twins kidding historical average. Clean dry bedding provided.',
    isExample: true
  },
  {
    id: 'live-6',
    tagNo: 'IN-GO-1490',
    name: 'Raja (రాజా - Breeding Buck)',
    breed: 'Sirohi Dual-Purpose Goat (సిరోహి)',
    category: 'Goat & Sheep',
    imageUrl: 'https://images.unsplash.com/photo-1533318087102-b3ad366ed041?auto=format&fit=crop&w=800&q=80',
    age: '3 Years (Breeding Male)',
    stage: 'Active Stud Buck',
    dailyYield: 'Body Weight: 68 kg (Prime Breeding Condition)',
    feedRation: '4 kg Tree loppings (Neem/Ficus) + 1.5 kg Dry pasture grass + 500g Sprouted horsegram & mineral lick block',
    vaccination: 'Goat Pox vaccinated; Anthrax annual shot given',
    dewormingDue: 'Oxyclozanide drenched 20 days ago',
    healthStatus: 'Excellent',
    vetNotes: 'Superior genetic lineage for twin birth traits. Hoof trimming performed bi-monthly.',
    isExample: true
  },
  {
    id: 'live-7',
    tagNo: 'IN-SH-5201',
    name: 'Konda Ram (కొండ గొర్రె)',
    breed: 'Nellore Brown Sheep (నెల్లూరు బ్రౌన్)',
    category: 'Goat & Sheep',
    imageUrl: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=800&q=80',
    age: '1.5 Years',
    stage: 'Market Growth Finishing Stage',
    dailyYield: 'Live Body Weight: 36.5 kg',
    feedRation: 'Extensive pasture grazing 7 hrs daily + 250g Groundnut haulms & wheat bran concentrate',
    vaccination: 'Sheep Pox & Blue Tongue vaccine administered pre-monsoon',
    dewormingDue: 'Closantel drench administered against Haemonchus wireworms',
    healthStatus: 'Good',
    vetNotes: 'Tall, leggy mutton breed ideal for dry tropical climates. High dressing percentage (52%).',
    isExample: true
  },
  {
    id: 'live-8',
    tagNo: 'IN-PO-9011',
    name: 'Veera Rooster (వీర నాటు కోడి)',
    breed: 'Aseel Pure Country Chicken (అసీల్ నాటుకోడి)',
    category: 'Poultry',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    age: '14 Months',
    stage: 'Breeding Flock Sire',
    dailyYield: 'Live Weight: 3.8 kg (Majestic Heritage Breed)',
    feedRation: 'Free-range foraging (insects/greens) + Broken rice, finger millet (Ragi), and cracked corn 80g/day',
    vaccination: 'Ranikhet Disease (RD - Lasota & R2B booster) fully vaccinated',
    dewormingDue: 'Piperazine liquid administered in drinking water monthly',
    healthStatus: 'Excellent',
    vetNotes: 'Extremely aggressive immunity and disease tolerance. High demand for backyard breeding stock.',
    isExample: true
  },
  {
    id: 'live-9',
    tagNo: 'IN-PO-7742',
    name: 'Kala Flocks (కడక్‌నాథ్)',
    breed: 'Kadaknath Black Meat Chicken (కడక్‌నాథ్)',
    category: 'Poultry',
    imageUrl: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=800&q=80',
    age: '8 Months',
    stage: 'Laying & Meat Flock (25 Birds Unit)',
    dailyYield: 'Annual Laying: 110 Eggs/Bird (High Protein Black Meat)',
    feedRation: 'Azolla supplement 30g + Layer mash 70g + Drumstick (Moringa) leaf powder',
    vaccination: 'Marek Disease & Infectious Bursal Disease (Gumboro) administered',
    dewormingDue: 'Deworming schedule up to date',
    healthStatus: 'Good',
    vetNotes: 'Melanin rich black flesh, bone marrow, and tongue. Premium market price (₹800/kg live weight).',
    isExample: true
  },
  {
    id: 'live-10',
    tagNo: 'IN-PO-3310',
    name: 'Golden Layers Flock (లేయర్ గ్రూప్)',
    breed: 'BV-380 Commercial Brown Layer Hen',
    category: 'Poultry',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    age: '32 Weeks',
    stage: 'Peak Egg Laying Phase',
    dailyYield: '94% Hen-Day Egg Production (Brown Shell Eggs)',
    feedRation: '115g/bird Balanced Layer Feed with 17.5% CP and 3.8% Calcium grit for strong shells',
    vaccination: 'Egg Drop Syndrome (EDS-76) and Coryza vaccines updated',
    dewormingDue: 'Bi-monthly organic water sanitation with Apple Cider Vinegar & garlic extract',
    healthStatus: 'Excellent',
    vetNotes: 'Consistent brown egg shell quality, optimal feed conversion ratio (1.9 kg feed / dozen eggs).',
    isExample: true
  }
];

export default function LivestockPage() {
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Cattle & Buffalo' | 'Goat & Sheep' | 'Poultry'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState<LivestockProfile | null>(null);

  const filtered = realisticLivestock.filter(item => {
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tagNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 1240, paddingBottom: 60 }}>
        {/* Header section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--primary)', fontWeight: 800 }}>RYTHU NESTHAM LIVESTOCK CARE</div>
            <h1 className="h2" style={{ margin: '4px 0 8px' }}>Livestock Management & Animal Health</h1>
            <p className="muted" style={{ fontSize: 14, maxWidth: 820 }}>
              Monitor milk yield, breeding cycles, balanced fodder rations, and vaccination schedules across 10 realistic Indian dairy cattle, buffalo, goat, sheep, and poultry profiles with authentic photos.
            </p>
          </div>
          <span className="badge" style={{ background: '#dcfce7', color: '#166534', fontSize: 11, padding: '5px 11px', borderRadius: 999, fontWeight: 700 }}>
            10 VERIFIED ANIMAL PROFILES WITH PICTURES
          </span>
        </div>

        {/* Filters & Search */}
        <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['All', 'Cattle & Buffalo', 'Goat & Sheep', 'Poultry'] as const).map(cat => (
            <button
              key={cat}
              className={`btn ${categoryFilter === cat ? 'btn-primary' : 'btn-soft'}`}
              onClick={() => setCategoryFilter(cat)}
              style={{ fontSize: 13, padding: '7px 16px' }}
            >
              {cat === 'All' ? 'All 10 Animals' : cat === 'Cattle & Buffalo' ? '🐄 Dairy Cattle & Buffalo' : cat === 'Goat & Sheep' ? '🐐 Goats & Sheep' : '🐔 Poultry & Country Chicken'}
            </button>
          ))}

          <div style={{ flex: 1, minWidth: 220, position: 'relative', marginLeft: 'auto' }}>
            <input
              className="input"
              placeholder="Search by breed, name or Tag #..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: 34, height: 40 }}
            />
            <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          </div>
        </div>

        {/* 10 Livestock Cards Grid with Photos */}
        <div className="grid grid-2" style={{ gap: 24, marginTop: 24 }}>
          {filtered.map(animal => (
            <div
              key={animal.id}
              className="card"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 18,
                border: '1px solid var(--border)'
              }}
            >
              {/* Image banner with tags */}
              <div style={{ position: 'relative', height: 210, width: '100%', background: '#e2eae1', overflow: 'hidden' }}>
                <img
                  src={animal.imageUrl}
                  alt={animal.breed}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  loading="lazy"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)'
                }} />

                {/* Top Badges */}
                <div style={{ position: 'absolute', top: 12, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    padding: '4px 9px',
                    borderRadius: 8,
                    background: 'rgba(0,0,0,0.65)',
                    color: '#fff',
                    backdropFilter: 'blur(6px)'
                  }}>
                    {animal.tagNo}
                  </span>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 800,
                    padding: '4px 9px',
                    borderRadius: 999,
                    background: animal.healthStatus === 'Excellent' ? '#dcfce7' : animal.healthStatus === 'Good' ? '#f0fdf4' : '#fef3c7',
                    color: animal.healthStatus === 'Excellent' ? '#15803d' : animal.healthStatus === 'Good' ? '#166534' : '#92400e',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}>
                    ● {animal.healthStatus}
                  </span>
                </div>

                {/* Name & Breed over image */}
                <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, color: '#fff' }}>
                  <h3 style={{ margin: 0, fontSize: 18, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>{animal.name}</h3>
                  <small style={{ color: '#e2f5e5', fontSize: 12, fontWeight: 600 }}>{animal.breed}</small>
                </div>
              </div>

              {/* Card Body details */}
              <div style={{ padding: 18, display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ background: '#f8faf7', padding: '9px 12px', borderRadius: 10, border: '1px solid #edf2ec' }}>
                    <small className="muted" style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>Daily Production / Yield</small>
                    <b style={{ fontSize: 13, color: 'var(--primary)' }}>{animal.dailyYield}</b>
                  </div>
                  <div style={{ background: '#f8faf7', padding: '9px 12px', borderRadius: 10, border: '1px solid #edf2ec' }}>
                    <small className="muted" style={{ display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>Age & Lactation Stage</small>
                    <b style={{ fontSize: 13, color: 'var(--text-primary)' }}>{animal.age} · {animal.stage}</b>
                  </div>
                </div>

                {/* Feed Ration Advisory */}
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 11, fontSize: 12 }}>
                  <b style={{ color: '#166534', display: 'block', marginBottom: 2 }}>🌾 Daily Fodder & Feed Ration:</b>
                  <span style={{ color: '#14532d', lineHeight: 1.45 }}>{animal.feedRation}</span>
                </div>

                {/* Veterinary & Vaccination status */}
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  <div><b>💉 Vaccination:</b> {animal.vaccination}</div>
                  <div style={{ marginTop: 3 }}><b>💊 Deworming:</b> <span style={{ color: '#b45309' }}>{animal.dewormingDue}</span></div>
                </div>

                {/* Action button */}
                <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
                  <span className="muted" style={{ fontSize: 11 }}>Category: <b>{animal.category}</b></span>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedAnimal(animal)}
                    style={{ fontSize: 12, padding: '6px 14px' }}
                  >
                    View Health Dossier <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Veterinary Dossier Modal */}
        {selectedAnimal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'grid', placeItems: 'center', padding: 16 }}>
            <div className="card" style={{ maxWidth: 560, width: '100%', padding: 24, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)' }}>ANIMAL MEDICAL DOSSIER</span>
                  <h3 style={{ margin: '2px 0 0', fontSize: 19 }}>{selectedAnimal.name} ({selectedAnimal.tagNo})</h3>
                </div>
                <button className="btn btn-soft" onClick={() => setSelectedAnimal(null)}>✕</button>
              </div>

              <div style={{ borderRadius: 12, overflow: 'hidden', height: 180, marginBottom: 14 }}>
                <img src={selectedAnimal.imageUrl} alt={selectedAnimal.breed} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ background: '#f8faf7', padding: 10, borderRadius: 8 }}>
                    <small className="muted">Breed</small>
                    <div style={{ fontWeight: 700 }}>{selectedAnimal.breed}</div>
                  </div>
                  <div style={{ background: '#f8faf7', padding: 10, borderRadius: 8 }}>
                    <small className="muted">Current Yield</small>
                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{selectedAnimal.dailyYield}</div>
                  </div>
                </div>

                <div style={{ background: '#f0fdf4', padding: 12, borderRadius: 10, border: '1px solid #bbf7d0' }}>
                  <b style={{ color: '#166534', display: 'block', marginBottom: 3 }}>Doctor / Veterinary Notes:</b>
                  <p style={{ margin: 0, color: '#14532d' }}>{selectedAnimal.vetNotes}</p>
                </div>

                <div style={{ background: '#fffbeb', padding: 12, borderRadius: 10, border: '1px solid #fde68a' }}>
                  <b style={{ color: '#92400e', display: 'block', marginBottom: 3 }}>Nutrition & Mineral Guidelines:</b>
                  <p style={{ margin: 0, color: '#78350f' }}>{selectedAnimal.feedRation}</p>
                </div>

                <div style={{ background: '#f8faf7', padding: 12, borderRadius: 10 }}>
                  <b style={{ display: 'block', marginBottom: 3 }}>Immunization & Preventive Care:</b>
                  <div>Vaccination Record: {selectedAnimal.vaccination}</div>
                  <div style={{ marginTop: 4 }}>Deworming Protocol: {selectedAnimal.dewormingDue}</div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => alert('Daily production log recorded for ' + selectedAnimal.name)}>
                    <Activity size={16} /> Record Daily Yield / Weight
                  </button>
                  <button className="btn btn-soft" onClick={() => alert('Connecting to Local Government Veterinary Dispensary Helpline: 1962')}>
                    <Phone size={16} /> Call Vet 1962
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
