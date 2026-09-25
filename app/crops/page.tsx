'use client';

import { useEffect, useState } from 'react';
import {
  Sprout, Calendar, LandPlot, Droplets, HeartPulse, CheckSquare,
  AlertCircle, Plus, ChevronRight, Layers, Leaf, MapPin, Eye,
  Clock, ShieldAlert, Sparkles
} from 'lucide-react';

interface CropRecord {
  id: string;
  name: string;
  variety: string;
  area: string;
  sowingDate: string;
  stage: string;
  irrigationStatus: string;
  soil: string;
  health: 'Excellent' | 'Good' | 'Fair' | 'Critical';
  expectedHarvest: string;
  notes: string;
  tasks: string[];
  isSample?: boolean;
}

const realisticExamples: CropRecord[] = [
  {
    id: 'crop-1',
    name: 'Paddy / Rice (వరి)',
    variety: 'BPT 5204 (Samba Mahsuri)',
    area: '4.5 Acres',
    sowingDate: '15 July 2026',
    stage: 'Panicle Initiation (75 Days)',
    irrigationStatus: 'Maintain 3–5 cm water layer (Flooded)',
    soil: 'Heavy Clay Black Cotton Soil (pH 7.2)',
    health: 'Good',
    expectedHarvest: '25 November 2026',
    notes: 'Apply second dose of MOP (Potash) 25 kg/acre. Drain water for 3 days to promote root aeration.',
    tasks: ['Monitor for stem borer moths', 'Foliar spray of 13-0-45 at boot leaf stage'],
    isSample: true
  },
  {
    id: 'crop-2',
    name: 'Bt Cotton (ప్రత్తి)',
    variety: 'RCH 659 BG II',
    area: '3.0 Acres',
    sowingDate: '25 June 2026',
    stage: 'Peak Flowering & Boll Formation',
    irrigationStatus: 'Drip Irrigation (Every 3 days, 2 hrs)',
    soil: 'Deep Black Regur Soil with high CEC',
    health: 'Good',
    expectedHarvest: '10 December 2026 (First Picking)',
    notes: 'Maintain pheromone traps at 5 traps/acre. Spray boron 1g/L to prevent square dropping.',
    tasks: ['Install pink bollworm delta traps', 'Apply 19-19-19 water-soluble fertigation'],
    isSample: true
  },
  {
    id: 'crop-3',
    name: 'Chilli (మిరప)',
    variety: 'Teja (Guntur Sannam - S4)',
    area: '2.0 Acres',
    sowingDate: '10 August 2026',
    stage: 'Vegetative & Active Branching',
    irrigationStatus: 'Drip fertigation alternate days',
    soil: 'Red Sandy Loam with good organic matter',
    health: 'Fair',
    expectedHarvest: '15 January 2027',
    notes: 'Minor upward curl detected in corner rows. Blue sticky traps installed for thrips control.',
    tasks: ['Spray Neem Azadirachtin 10,000 ppm', 'Weeding between raised mulch beds'],
    isSample: true
  },
  {
    id: 'crop-4',
    name: 'Tomato (టమాట)',
    variety: 'US 440 Hybrid',
    area: '1.5 Acres',
    sowingDate: '01 August 2026',
    stage: 'Fruit Setting & Early Bulking',
    irrigationStatus: 'Drip system running 1.5 hrs daily',
    soil: 'Well-drained Loamy Soil (pH 6.5)',
    health: 'Excellent',
    expectedHarvest: '20 October 2026 (Continuous)',
    notes: 'Staking completed with bamboo trellis. Excellent fruit set with uniform red ripening expected.',
    tasks: ['Calcium nitrate spray to prevent Blossom End Rot', 'Prune basal suckers'],
    isSample: true
  },
  {
    id: 'crop-5',
    name: 'Maize / Corn (మొక్కజొన్న)',
    variety: 'DKC 9108 (Bayer DeKalb)',
    area: '5.0 Acres',
    sowingDate: '20 June 2026',
    stage: 'Silking & Tasseling Stage',
    irrigationStatus: 'Furrow Irrigation (Crucial Stage)',
    soil: 'Red Loam Soil, neutral pH',
    health: 'Good',
    expectedHarvest: '05 October 2026',
    notes: 'Ensure soil does not dry out during silking. No moisture stress allowed for full kernel set.',
    tasks: ['Inspect central whorls for FAW', 'Top-dress final 30 kg Urea per acre'],
    isSample: true
  },
  {
    id: 'crop-6',
    name: 'Groundnut (వేరుశనగ)',
    variety: 'K-6 (Kadiri-6)',
    area: '2.5 Acres',
    sowingDate: '05 July 2026',
    stage: 'Peg Penetration & Pod Development',
    irrigationStatus: 'Sprinkler Irrigation (Every 5 days)',
    soil: 'Light Sandy Loam (Friable for pegging)',
    health: 'Good',
    expectedHarvest: '25 October 2026',
    notes: 'Apply Gypsum @ 200 kg/acre near root zone for pod filling and calcium uptake.',
    tasks: ['Earthing up around plants', 'Monitor for leaf miner and Tikka spots'],
    isSample: true
  },
  {
    id: 'crop-7',
    name: 'Sugarcane (చెరకు)',
    variety: 'Co 86032 (Nayana)',
    area: '4.0 Acres',
    sowingDate: '15 February 2026',
    stage: 'Grand Growth Phase (Cane Elongation)',
    irrigationStatus: 'Alternate Furrow Irrigation (Weekly)',
    soil: 'Deep Alluvial Heavy Clay',
    health: 'Excellent',
    expectedHarvest: '10 January 2027',
    notes: 'Wrap cane trash around stalks to prevent lodging during monsoon wind gusts.',
    tasks: ['Earthing up and trash mulching', 'Check for early shoot borer'],
    isSample: true
  },
  {
    id: 'crop-8',
    name: 'Mango Orchard (మామిడి)',
    variety: 'Banganapalli & Dasheri (Grafted)',
    area: '6.0 Acres (300 Trees)',
    sowingDate: 'Established 2018 (6-year Orchard)',
    stage: 'Post-Monsoon Vegetative Flush',
    irrigationStatus: 'Micro-basin drip ring system',
    soil: 'Red Gravely Laterite Soil with sub-surface drainage',
    health: 'Good',
    expectedHarvest: 'May 2027 Season',
    notes: 'Prune dead wood and water sprouts. Plan for paclobutrazol (Cultar) application in October for synchronized bloom.',
    tasks: ['Clear basin weeds around tree trunks', 'Apply 50 kg Farm Yard Manure (FYM) per tree'],
    isSample: true
  },
  {
    id: 'crop-9',
    name: 'Banana Plantation (అరటి)',
    variety: 'Grand Naine (Tissue Culture G9)',
    area: '2.0 Acres (2000 Plants)',
    sowingDate: '10 March 2026',
    stage: 'Bunch Emergence & Shooting',
    irrigationStatus: 'Drip fertigation 4 hrs daily',
    soil: 'Fertile Riverine Loam with high organic carbon',
    health: 'Excellent',
    expectedHarvest: '15 December 2026',
    notes: 'Propping done with casuarina poles to prevent tree lodging under bunch weight. Denaveling done.',
    tasks: ['Cover bunches with blue poly sleeves', 'Potassium sulphate fertigation (0-0-50)'],
    isSample: true
  },
  {
    id: 'crop-10',
    name: 'Mixed Vegetables Farm (కూరగాయలు)',
    variety: 'Brinjal, Bhendi & Ridge Gourd intercropped',
    area: '1.2 Acres',
    sowingDate: '15 July 2026',
    stage: 'Harvesting & Continuous Fruiting',
    irrigationStatus: 'Sub-surface drip with silver mulch',
    soil: 'Composted Sandy Clay Loam',
    health: 'Good',
    expectedHarvest: 'Weekly Pickings (Twice a week)',
    notes: 'Harvesting 120 kg Bhendi and 180 kg Brinjal weekly for direct Rythu Bazar sale.',
    tasks: ['Clean yellow sticky sheets', 'Bi-weekly vermicompost tea drenching'],
    isSample: true
  }
];

export default function MyCrops() {
  const [crops, setCrops] = useState<CropRecord[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<CropRecord | null>(realisticExamples[0]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New crop form state
  const [name, setName] = useState('');
  const [variety, setVariety] = useState('');
  const [area, setArea] = useState('');
  const [sowingDate, setSowingDate] = useState('');
  const [stage, setStage] = useState('');
  const [irrigationStatus, setIrrigationStatus] = useState('');
  const [soil, setSoil] = useState('');
  const [expectedHarvest, setExpectedHarvest] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetch('/api/crops')
      .then(r => r.json())
      .then(d => {
        if (d.crops && d.crops.length > 0) {
          const userCrops: CropRecord[] = d.crops.map((c: any) => ({
            id: c.id,
            name: c.name,
            variety: c.variety || 'Local Hybrid',
            area: `${c.areaAcres || 1} Acres`,
            sowingDate: c.sownAt ? new Date(c.sownAt).toLocaleDateString() : 'Recent',
            stage: c.stage || 'Vegetative',
            irrigationStatus: c.status || 'Active Drip',
            soil: 'Field Farm Soil',
            health: 'Good',
            expectedHarvest: c.harvestAt ? new Date(c.harvestAt).toLocaleDateString() : 'Expected in 90 days',
            notes: c.notes || 'Farmer crop record',
            tasks: ['Soil moisture check', 'Weekly inspection'],
            isSample: false
          }));
          setCrops([...userCrops, ...realisticExamples]);
          setSelectedCrop(userCrops[0]);
        } else {
          setCrops(realisticExamples);
        }
      })
      .catch(() => setCrops(realisticExamples));
  }, []);

  const handleAddCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRecord: CropRecord = {
      id: `crop-${Date.now()}`,
      name: name.trim(),
      variety: variety.trim() || 'Hybrid',
      area: `${area || 1} Acres`,
      sowingDate: sowingDate || 'Today',
      stage: stage || 'Early Growth',
      irrigationStatus: irrigationStatus || 'Scheduled',
      soil: soil || 'Loam Soil',
      health: 'Good',
      expectedHarvest: expectedHarvest || 'In 90 days',
      notes: notes || 'New farm field planted',
      tasks: ['First weeding', 'Basal fertilizer check'],
      isSample: false
    };

    try {
      await fetch('/api/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newRecord.name,
          variety: newRecord.variety,
          areaAcres: Number(area) || 1,
          stage: newRecord.stage,
          notes: newRecord.notes
        })
      });
    } catch (err) {}

    setCrops([newRecord, ...crops]);
    setSelectedCrop(newRecord);
    setShowAddModal(false);
    setName('');
    setVariety('');
    setArea('');
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 1240, paddingBottom: 60 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--primary)', fontWeight: 800 }}>RYTHU NESTHAM CROP MANAGEMENT</div>
            <h1 className="h2" style={{ margin: '4px 0 8px' }}>My Crops & Field Portfolio</h1>
            <p className="muted" style={{ fontSize: 14, maxWidth: 800 }}>
              Track growth stages, irrigation schedules, soil parameters, and harvest timelines. Includes 10 realistic Indian crop profiles representing diverse regions and cropping systems.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} /> Add New Crop Field
          </button>
        </div>

        <div className="grid grid-2" style={{ gap: 24, marginTop: 24, alignItems: 'start' }}>
          {/* Left: Crop cards list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <b style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                Field Records ({crops.length})
              </b>
              <span className="badge" style={{ background: '#dcfce7', color: '#166534', fontSize: 11, padding: '3px 9px', borderRadius: 999 }}>
                Active Cultivation Cycle
              </span>
            </div>

            {crops.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedCrop(c)}
                style={{
                  padding: 16,
                  borderRadius: 14,
                  background: selectedCrop?.id === c.id ? '#eff6ff' : '#fff',
                  border: `1.5px solid ${selectedCrop?.id === c.id ? '#3b82f6' : 'var(--border)'}`,
                  cursor: 'pointer',
                  transition: '0.18s ease',
                  boxShadow: selectedCrop?.id === c.id ? '0 4px 14px rgba(59,130,246,0.12)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#e8f7ee', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
                      <Sprout size={18} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 15 }}>{c.name}</h4>
                      <small className="muted">{c.variety} · {c.area}</small>
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: c.isSample ? '#f1f5f9' : '#dcfce7',
                    color: c.isSample ? '#64748b' : '#15803d'
                  }}>
                    {c.isSample ? 'SAMPLE CROP' : 'MY LIVE CROP'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12, fontSize: 12 }}>
                  <div><b>Stage:</b> {c.stage}</div>
                  <div><b>Harvest:</b> {c.expectedHarvest}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Detailed Selected Crop Dossier */}
          {selectedCrop && (
            <div className="card" style={{ padding: 26, position: 'sticky', top: 90 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
                    {selectedCrop.isSample ? 'ILLUSTRATIVE CROP RECORD' : 'FARMER RECORD'}
                  </span>
                  <h2 style={{ margin: '2px 0 0', fontSize: 20 }}>{selectedCrop.name}</h2>
                  <span className="muted" style={{ fontSize: 13 }}>Variety: <b>{selectedCrop.variety}</b> · Field Area: <b>{selectedCrop.area}</b></span>
                </div>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 800,
                  background: selectedCrop.health === 'Excellent' ? '#dcfce7' : selectedCrop.health === 'Good' ? '#f0fdf4' : '#fef3c7',
                  color: selectedCrop.health === 'Excellent' ? '#15803d' : '#166534'
                }}>
                  {selectedCrop.health} Health
                </span>
              </div>

              <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ background: '#f8faf7', padding: 12, borderRadius: 12 }}>
                  <small className="muted" style={{ display: 'block', fontSize: 11, fontWeight: 700 }}>📅 SOWING DATE</small>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{selectedCrop.sowingDate}</span>
                </div>
                <div style={{ background: '#f8faf7', padding: 12, borderRadius: 12 }}>
                  <small className="muted" style={{ display: 'block', fontSize: 11, fontWeight: 700 }}>🌾 GROWTH STAGE</small>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{selectedCrop.stage}</span>
                </div>
                <div style={{ background: '#f8faf7', padding: 12, borderRadius: 12 }}>
                  <small className="muted" style={{ display: 'block', fontSize: 11, fontWeight: 700 }}>💧 IRRIGATION SCHEDULE</small>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{selectedCrop.irrigationStatus}</span>
                </div>
                <div style={{ background: '#f8faf7', padding: 12, borderRadius: 12 }}>
                  <small className="muted" style={{ display: 'block', fontSize: 11, fontWeight: 700 }}>🧪 SOIL PROFILE</small>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{selectedCrop.soil}</span>
                </div>
              </div>

              <div style={{ marginTop: 16, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 14 }}>
                <b style={{ color: '#166534', fontSize: 13, display: 'block', marginBottom: 4 }}>📋 Field Agronomist Advisory & Notes:</b>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: '#14532d' }}>{selectedCrop.notes}</p>
              </div>

              <div style={{ marginTop: 16 }}>
                <b style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Recommended Immediate Field Tasks:</b>
                <ul style={{ margin: '8px 0 0 18px', padding: 0, fontSize: 13 }}>
                  {selectedCrop.tasks.map((t, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>{t}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 18, borderTop: '1px solid var(--border)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                <span className="muted">Expected Harvest Window:</span>
                <b style={{ color: 'var(--primary)' }}>{selectedCrop.expectedHarvest}</b>
              </div>
            </div>
          )}
        </div>

        {/* Add Crop Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'grid', placeItems: 'center', padding: 16 }}>
            <div className="card" style={{ maxWidth: 540, width: '100%', padding: 24, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: 18 }}>Add New Field Crop Record</h3>
                <button className="btn btn-soft" onClick={() => setShowAddModal(false)}>✕</button>
              </div>
              <form onSubmit={handleAddCrop} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Crop Name *</label>
                  <input className="input" required placeholder="e.g. Paddy / Cotton / Tomato" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700 }}>Variety</label>
                    <input className="input" placeholder="e.g. BPT 5204 / RCH 659" value={variety} onChange={e => setVariety(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700 }}>Area (Acres)</label>
                    <input className="input" type="number" step="0.25" placeholder="e.g. 2.5" value={area} onChange={e => setArea(e.target.value)} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700 }}>Sowing Date</label>
                    <input className="input" type="date" value={sowingDate} onChange={e => setSowingDate(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700 }}>Growth Stage</label>
                    <input className="input" placeholder="e.g. Vegetative / Flowering" value={stage} onChange={e => setStage(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Irrigation Method & Status</label>
                  <input className="input" placeholder="e.g. Drip every 3 days / Flooded" value={irrigationStatus} onChange={e => setIrrigationStatus(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Soil Type</label>
                  <input className="input" placeholder="e.g. Black Cotton Soil / Red Sandy Loam" value={soil} onChange={e => setSoil(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Farmer Notes</label>
                  <textarea className="input" rows={2} placeholder="Target fertilizer dose, issues or plans..." value={notes} onChange={e => setNotes(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>
                  Save Crop Record
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
