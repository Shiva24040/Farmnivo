'use client';

import { useState } from 'react';
import {
  GraduationCap, BookOpen, CheckCircle2, Clock, PlayCircle,
  Award, Sparkles, ChevronRight, CheckSquare, Layers, UserCheck
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  category: string;
  duration: string;
  summary: string;
  keyTakeaways: string[];
  fieldAction: string;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Soil Health, Testing & Land Preparation',
    category: 'Soil Agronomy',
    duration: '18 Mins',
    summary: 'Master the science of deep summer ploughing, green manuring (Dhaincha/Sunn hemp), composite soil sampling techniques, and interpreting Soil Health Cards.',
    keyTakeaways: [
      'Take 8-10 zig-zag V-shape core samples at 15cm root depth.',
      'Incorporate 10 tonnes well-decomposed FYM or compost per hectare.',
      'Summer deep ploughing kills pupae of cotton bollworms and soil pathogens.'
    ],
    fieldAction: 'Submit soil samples to local KVK before Rabi pre-sowing season.'
  },
  {
    id: 2,
    title: 'Paddy / Rice: From Nursery to Bumper Harvest',
    category: 'Crop Science',
    duration: '24 Mins',
    summary: 'A complete step-by-step masterclass on raised nursery bed management, 21-day seedling transplantation, SRI technique, and alternate wetting & drying (AWD).',
    keyTakeaways: [
      'Treat seed with Carbendazim (2g/kg) and Azospirillum biofertilizer.',
      'Transplant 2-3 seedlings per hill at 20x15 cm spacing.',
      'Maintain 2–3 cm water layer during critical tillering and panicle initiation.'
    ],
    fieldAction: 'Install perforated AWD field water tube to reduce irrigation by 30%.'
  },
  {
    id: 3,
    title: 'Cotton Pest Management & Pink Bollworm Control',
    category: 'Crop Protection',
    duration: '22 Mins',
    summary: 'Understand the lifecycle of Pectinophora gossypiella, ETL monitoring via delta pheromone traps, refuge row planting, and mating disruption techniques.',
    keyTakeaways: [
      'Install 4-5 pheromone traps per acre at 45 days after sowing.',
      'Never spray pyrethroids early in the season to protect beneficial predators.',
      'Spray Chlorantraniliprole 18.5% SC when trap catch exceeds 8 moths/day.'
    ],
    fieldAction: 'Inspect 20 green bolls weekly across field diagonals for entry boreholes.'
  },
  {
    id: 4,
    title: 'Precision Drip Irrigation & Fertigation Mastery',
    category: 'Water Management',
    duration: '20 Mins',
    summary: 'Design, pressure regulation, emitter maintenance, acid flushing protocols, and stage-specific water-soluble fertilizer dosing (WSF).',
    keyTakeaways: [
      'Maintain 1.0 to 1.2 kg/cm² operating pressure at lateral tail ends.',
      'Follow the 4-stage fertigation rule (clean water -> fertilizer -> flush clean).',
      'Never mix Calcium Nitrate with Sulphates or Phosphates in the same tank.'
    ],
    fieldAction: 'Perform monthly dilute acid flush (pH 4.0) to clear emitter salt scale.'
  },
  {
    id: 5,
    title: 'Balanced NPK & Micronutrient Management',
    category: 'Plant Nutrition',
    duration: '25 Mins',
    summary: 'Overcoming hidden hunger in crops through the 4R Nutrient Stewardship (Right source, Right rate, Right time, Right place) and zinc/boron foliar supplementation.',
    keyTakeaways: [
      'Apply 100% Phosphorus and Potash as basal; split Nitrogen into 3 equal doses.',
      'Neem-coated urea slows nitrification, reducing volatilization and leaching.',
      'Correct Khaira disease in paddy with Zinc Sulphate (25 kg/ha) or Zn-EDTA spray.'
    ],
    fieldAction: 'Calculate exact 50kg bag requirement using the Rythu Nestham NPK Calculator.'
  },
  {
    id: 6,
    title: 'Integrated Pest & Disease Management (IPM)',
    category: 'Crop Protection',
    duration: '26 Mins',
    summary: 'Combining biological controls (Trichoderma, Beauveria, Trichogramma cards), yellow/blue sticky traps, neem extracts, and responsible chemical rotation.',
    keyTakeaways: [
      'Use 20 yellow sticky sheets per acre for whiteflies and aphids.',
      'Apply Trichoderma viride enriched FYM to control root rot and wilt pathogens.',
      'Rotate chemical pesticide modes of action (IRAC groups) to prevent resistance.'
    ],
    fieldAction: 'Install sticky traps at canopy level and spray neem oil (10,000 ppm) preventively.'
  },
  {
    id: 7,
    title: 'Tractor & Agricultural Machinery Operation & Safety',
    category: 'Mechanization',
    duration: '20 Mins',
    summary: 'Matching tractor horsepower to implements (rotavator, reversible MB plough, subsoiler), daily 10-point checkups, and PTO shaft safety protocols.',
    keyTakeaways: [
      'Always clean air cleaner bowl and check engine oil dipstick daily before field work.',
      'Ensure tyre pressure is set to 12-14 PSI for field traction and 20-22 PSI for road haulage.',
      'Never engage PTO or attach implements with the tractor engine running.'
    ],
    fieldAction: 'Perform 50-hour greasing of universal joints and cultivator springs.'
  },
  {
    id: 8,
    title: 'Scientific Dairy Farming: Buffalo & Cow Care',
    category: 'Livestock & Dairy',
    duration: '28 Mins',
    summary: 'High-fat milk production, clean milk protocols, balanced total mixed rations (TMR), estrus synchronization, and calf management in Murrah and Gir breeds.',
    keyTakeaways: [
      'Feed 2/3rd green fodder (Super Napier/Maize) and 1/3rd dry roughage.',
      'Supplement 1 kg concentrate feed for every 2.5 kg of milk produced.',
      'Wash teats with potassium permanganate solution before and after milking to stop mastitis.'
    ],
    fieldAction: 'Administer annual FMD and HS vaccinations before the monsoon season.'
  },
  {
    id: 9,
    title: 'Post-Harvest Loss Reduction, Storage & Mandi Trading',
    category: 'Post-Harvest & Market',
    duration: '22 Mins',
    summary: 'Grain drying to safe moisture thresholds, hermetic storage bags, warehouse receipt financing (eNWR), and getting maximum modal rates on eNAM portals.',
    keyTakeaways: [
      'Dry paddy down to 13-14% moisture and chilli to 10% to prevent fungal aflatoxins.',
      'Use multi-layer hermetic bags (PICS bags) for pesticide-free seed storage.',
      'Check daily mandi modal prices on the Rythu Nestham Market Prices tab before selling.'
    ],
    fieldAction: 'Store grain lots in WDRA-registered warehouses to avail 7% pledge loans.'
  },
  {
    id: 10,
    title: 'Farm Finance, PM-KISAN, Crop Insurance & Subsidies',
    category: 'Agri Business & Welfare',
    duration: '25 Mins',
    summary: 'Enrolling in PM-KISAN eKYC, filing PMFBY crop insurance claims within 72 hours of unseasonal rains, and obtaining 4% KCC agricultural credit.',
    keyTakeaways: [
      'Report localized crop loss due to hailstorm or waterlogging on PMFBY App within 72 hours.',
      'Repay KCC seasonal crop loans within 12 months to earn the 3% prompt repayment rebate.',
      'Apply for 50-80% farm machinery subsidies through the central SMAM portal.'
    ],
    fieldAction: 'Check eligibility for Central & State schemes in our Government Schemes module.'
  }
];

export default function AcademyPage() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const toggleComplete = (id: number) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filtered = lessons.filter(l => selectedCat === 'All' || l.category.includes(selectedCat));

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 1200, paddingBottom: 60 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--primary)', fontWeight: 800 }}>RYTHU NESTHAM FARMING ACADEMY</div>
            <h1 className="h2" style={{ margin: '4px 0 8px' }}>Practical Agronomy & Farm Masterclasses</h1>
            <p className="muted" style={{ fontSize: 14, maxWidth: 820 }}>
              Step-by-step modular learning created by agricultural scientists and progressive farmers. Explore 10 realistic Indian agricultural lessons covering soil, irrigation, pest management, dairy, and finance.
            </p>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 16px', borderRadius: 14, textAlign: 'right' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#166534', display: 'block' }}>YOUR LEARNING PROGRESS</span>
            <b style={{ fontSize: 18, color: '#14532d' }}>{completed.length} of {lessons.length} Completed</b>
          </div>
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
          {['All', 'Soil Agronomy', 'Crop Science', 'Crop Protection', 'Water Management', 'Plant Nutrition', 'Mechanization', 'Livestock', 'Market', 'Agri Business'].map(cat => (
            <button
              key={cat}
              className={`btn ${selectedCat === cat ? 'btn-primary' : 'btn-soft'}`}
              onClick={() => setSelectedCat(cat)}
              style={{ fontSize: 12, padding: '6px 14px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-2" style={{ gap: 20, marginTop: 22 }}>
          {filtered.map(lesson => {
            const isDone = completed.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className="card"
                style={{
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  border: isDone ? '1.5px solid #16a34a' : '1px solid var(--border)',
                  background: isDone ? '#fafdfa' : '#fff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: 999,
                    background: '#e0f2fe',
                    color: '#0369a1'
                  }}>
                    Lesson {lesson.id} · {lesson.category}
                  </span>
                  <small className="muted" style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700 }}>
                    <Clock size={13} /> {lesson.duration}
                  </small>
                </div>

                <h3 style={{ margin: '6px 0 6px', fontSize: 17, lineHeight: 1.35 }}>{lesson.title}</h3>
                <p className="muted" style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.45, flex: 1 }}>{lesson.summary}</p>

                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    className="btn btn-soft"
                    onClick={() => setSelectedLesson(lesson)}
                    style={{ fontSize: 12, padding: '7px 14px' }}
                  >
                    <BookOpen size={15} /> Read Lesson Guide
                  </button>

                  <button
                    className={`btn ${isDone ? 'btn-primary' : 'btn-soft'}`}
                    onClick={() => toggleComplete(lesson.id)}
                    style={{ fontSize: 12, padding: '7px 14px' }}
                  >
                    <CheckCircle2 size={15} /> {isDone ? 'Completed' : 'Mark Done'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Lesson Modal */}
        {selectedLesson && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'grid', placeItems: 'center', padding: 16 }}>
            <div className="card" style={{ maxWidth: 600, width: '100%', padding: 26, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)' }}>LESSON {selectedLesson.id} STUDY GUIDE</span>
                  <h3 style={{ margin: '2px 0 0', fontSize: 18 }}>{selectedLesson.title}</h3>
                </div>
                <button className="btn btn-soft" onClick={() => setSelectedLesson(null)}>✕</button>
              </div>

              <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-primary)' }}>{selectedLesson.summary}</p>

              <div style={{ background: '#f8faf7', padding: 16, borderRadius: 12, border: '1px solid #edf2ec', margin: '14px 0' }}>
                <b style={{ color: '#166534', fontSize: 13, display: 'block', marginBottom: 6 }}>🌾 Essential Scientific Takeaways:</b>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.55 }}>
                  {selectedLesson.keyTakeaways.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: '#eff6ff', padding: 14, borderRadius: 12, border: '1px solid #bfdbfe', marginBottom: 16 }}>
                <b style={{ color: '#1e40af', fontSize: 13, display: 'block', marginBottom: 3 }}>🚜 Recommended Field Action for Today:</b>
                <p style={{ margin: 0, fontSize: 13, color: '#1e3a8a' }}>{selectedLesson.fieldAction}</p>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => {
                    toggleComplete(selectedLesson.id);
                    setSelectedLesson(null);
                  }}
                >
                  <CheckCircle2 size={16} /> Mark Lesson as Completed
                </button>
                <button className="btn btn-soft" onClick={() => setSelectedLesson(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
