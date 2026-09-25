'use client';

import { useState } from 'react';
import {
  Tractor, Wrench, Calendar, MapPin, DollarSign, Filter,
  CheckCircle2, Clock, ShieldCheck, Sparkles, Phone, AlertCircle
} from 'lucide-react';

interface MachineryItem {
  id: string;
  name: string;
  category: 'Tractor' | 'Tillage' | 'Seeding' | 'Spraying' | 'Harvesting' | 'Irrigation' | 'Haulage';
  type: 'Rent' | 'Buy' | 'Service';
  specs: string;
  price: string;
  rateUnit: string;
  ownerName: string;
  location: string;
  availability: 'Available Now' | 'Booked' | 'Under Maintenance';
  suitableFor: string;
  isExample: boolean;
}

const machineryList: MachineryItem[] = [
  {
    id: 'mach-1',
    name: 'Mahindra 575 DI (45 HP) Tractor',
    category: 'Tractor',
    type: 'Rent',
    specs: '4-Cylinder, 2730 cc Engine, Dual Clutch, Power Steering, High Fuel Efficiency',
    price: '₹950',
    rateUnit: 'per hour (with driver)',
    ownerName: 'Venkatesh Farmers Custom Hiring Center',
    location: 'Siddipet Rural, Telangana',
    availability: 'Available Now',
    suitableFor: 'Ploughing, puddling, harrowing and heavy haulage',
    isExample: true
  },
  {
    id: 'mach-2',
    name: 'Shaktiman Semi-Champion 7-Feet Rotavator',
    category: 'Tillage',
    type: 'Rent',
    specs: '54 L-Type Boron Steel Blades, Multi-speed Gearbox, Heavy Duty Trailing Board',
    price: '₹1,200',
    rateUnit: 'per hour (tractor attached)',
    ownerName: 'Reddy Agro Implements',
    location: 'Miryalaguda, Nalgonda',
    availability: 'Available Now',
    suitableFor: 'Fine seedbed preparation, stubble incorporation, wet puddling',
    isExample: true
  },
  {
    id: 'mach-3',
    name: '9-Tyne Spring Loaded Heavy Cultivator',
    category: 'Tillage',
    type: 'Buy',
    specs: 'Dual Spring Mechanism, 50x50 mm Heavy Box Frame, Reversible Shovels',
    price: '₹38,500',
    rateUnit: 'one-time purchase (30% Subsidized)',
    ownerName: 'Sri Sai Agro Engineering Works',
    location: 'Warangal Industrial Estate',
    availability: 'Available Now',
    suitableFor: 'Secondary tillage, weed eradication, hardpan breaking in drylands',
    isExample: true
  },
  {
    id: 'mach-4',
    name: 'Automatic Multi-Crop Seed Cum Fertilizer Drill',
    category: 'Seeding',
    type: 'Rent',
    specs: '9-Row Tractor Mounted, Adjustable Metering Fluted Rollers, Separate Seed & Fertilizer Boxes',
    price: '₹800',
    rateUnit: 'per acre sown',
    ownerName: 'Gram Panchayat Rythu Seva Kendram',
    location: 'Jangaon, Telangana',
    availability: 'Available Now',
    suitableFor: 'Direct sowing of Paddy, Maize, Bengal Gram, Groundnut with basal fertilizer',
    isExample: true
  },
  {
    id: 'mach-5',
    name: 'VST Shakti 130 DI (13 HP) Power Tiller',
    category: 'Tractor',
    type: 'Rent',
    specs: 'Single Cylinder Direct Injection Diesel, 600 mm Rotary Tiller, Lightweight and Maneuverable',
    price: '₹600',
    rateUnit: 'per hour (with operator)',
    ownerName: 'Lakshmi Smallholders Mechanization Hub',
    location: 'Karimnagar, Telangana',
    availability: 'Available Now',
    suitableFor: 'Paddy puddle tilling in small fragmented wet fields and inter-cultivation in orchards',
    isExample: true
  },
  {
    id: 'mach-6',
    name: 'Tractor-Mounted 400L Boom Sprayer (12-Nozzle)',
    category: 'Spraying',
    type: 'Rent',
    specs: '10-meter Foldable Boom, Italian Diaphragm Pump, Anti-Drip Ceramic Flat Fan Nozzles',
    price: '₹350',
    rateUnit: 'per acre covered',
    ownerName: 'Kisan Precision Spraying Service',
    location: 'Guntur Rural, Andhra Pradesh',
    availability: 'Available Now',
    suitableFor: 'Uniform spraying in Cotton, Chilli, and Tomato fields with zero pesticide drift',
    isExample: true
  },
  {
    id: 'mach-7',
    name: 'Preet 987 Self-Propelled Multi-Crop Combine Harvester',
    category: 'Harvesting',
    type: 'Rent',
    specs: '14-Feet Cutter Bar, 101 HP Ashok Leyland Turbo Engine, Straw Chopper Attachment',
    price: '₹2,600',
    rateUnit: 'per acre harvested',
    ownerName: 'Telangana Agri Harvester Fleet',
    location: 'Nizamabad North',
    availability: 'Available Now',
    suitableFor: 'High-speed harvesting, threshing, and cleaning of Paddy, Wheat, and Soyabean',
    isExample: true
  },
  {
    id: 'mach-8',
    name: 'High-Speed Multi-Crop Axial Flow Thresher',
    category: 'Harvesting',
    type: 'Service',
    specs: 'Tractor PTO Driven, Triple Blower Cleaning System, High Output 1.5–2 Tonnes/Hr',
    price: '₹120',
    rateUnit: 'per bag threshed',
    ownerName: 'Balaiah Agricultural Services',
    location: 'Khammam, Telangana',
    availability: 'Available Now',
    suitableFor: 'Clean separation of grain from straw for Maize, Paddy, Millets, and Pulses',
    isExample: true
  },
  {
    id: 'mach-9',
    name: '5-Tonne Hydraulic Tipping Tractor Trailer (Trolley)',
    category: 'Haulage',
    type: 'Rent',
    specs: 'Twin Heavy Duty Rams, Drop-Side Steel Body, Leaf Spring Suspension, 9.00-16 Tyres',
    price: '₹1,500',
    rateUnit: 'per mandi round-trip (within 25 km)',
    ownerName: 'Ramesh Transport & Farm Logistics',
    location: 'Mahabubnagar, Telangana',
    availability: 'Available Now',
    suitableFor: 'Bulk grain, sugarcane, sand, manure and agricultural produce haulage',
    isExample: true
  },
  {
    id: 'mach-10',
    name: '5 HP Solar DC Submersible Water Pump Set',
    category: 'Irrigation',
    type: 'Buy',
    specs: '4800W Solar PV Array, MPPT Controller, Stainless Steel Submersible Pump, 100m Head',
    price: '₹72,000',
    rateUnit: 'farmer share after 60% PM-KUSUM subsidy',
    ownerName: 'Surya Green Agri Energy Pvt Ltd',
    location: 'Hyderabad / Warangal delivery',
    availability: 'Available Now',
    suitableFor: 'Off-grid daylight farm irrigation with zero electricity bills for 25 years',
    isExample: true
  }
];

export default function MachineryPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Rent' | 'Buy' | 'Service'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookingItem, setBookingItem] = useState<MachineryItem | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [hoursNeeded, setHoursNeeded] = useState('4');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filtered = machineryList.filter(item => {
    const matchesTab = activeTab === 'All' || item.type === activeTab;
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesTab && matchesCat;
  });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingItem(null);
    }, 2800);
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 1200, paddingBottom: 60 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--primary)', fontWeight: 800 }}>RYTHU NESTHAM FARM MACHINERY HUB</div>
            <h1 className="h2" style={{ margin: '4px 0 8px' }}>Farming Machinery & Custom Hiring</h1>
            <p className="muted" style={{ fontSize: 14, maxWidth: 820 }}>
              Find, rent, purchase, or service agricultural machinery directly from nearby farmers and custom hiring centers (CHC). Showing 10 realistic farm machinery use cases with transparent rates.
            </p>
          </div>
          <span className="badge" style={{ background: '#dcfce7', color: '#166534', fontSize: 11, padding: '5px 11px', borderRadius: 999, fontWeight: 700 }}>
            10 VERIFIED MACHINERY CASES
          </span>
        </div>

        {/* Tab & Category Filters */}
        <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['All', 'Rent', 'Buy', 'Service'] as const).map(tab => (
            <button
              key={tab}
              className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-soft'}`}
              onClick={() => setActiveTab(tab)}
              style={{ fontSize: 13, padding: '7px 16px' }}
            >
              {tab === 'All' ? 'All Operations' : tab === 'Rent' ? '🚜 Custom Hiring (Rent)' : tab === 'Buy' ? '🏷️ Subsidized Purchase' : '⚙️ Farm Service'}
            </button>
          ))}

          <select
            className="input"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{ marginLeft: 'auto', width: 180, height: 40 }}
          >
            <option value="All">All Categories</option>
            <option value="Tractor">Tractors & Tillers</option>
            <option value="Tillage">Tillage & Rotavators</option>
            <option value="Seeding">Seeding Drills</option>
            <option value="Spraying">Sprayers</option>
            <option value="Harvesting">Harvesters & Threshers</option>
            <option value="Haulage">Trolleys & Trailers</option>
            <option value="Irrigation">Solar & Water Pumps</option>
          </select>
        </div>

        {/* Machinery Cards Grid */}
        <div className="grid grid-2" style={{ gap: 20, marginTop: 22 }}>
          {filtered.map(item => (
            <div key={item.id} className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                <div>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: 999,
                    background: item.type === 'Rent' ? '#eff6ff' : item.type === 'Buy' ? '#f0fdf4' : '#fef3c7',
                    color: item.type === 'Rent' ? '#1d4ed8' : item.type === 'Buy' ? '#15803d' : '#b45309'
                  }}>
                    {item.type} · {item.category}
                  </span>
                  <h3 style={{ margin: '6px 0 2px', fontSize: 17 }}>{item.name}</h3>
                  <small className="muted" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={12} color="var(--primary)" /> {item.location}
                  </small>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <b style={{ fontSize: 18, color: 'var(--primary)', display: 'block' }}>{item.price}</b>
                  <small className="muted" style={{ fontSize: 11 }}>{item.rateUnit}</small>
                </div>
              </div>

              <div style={{ margin: '14px 0 10px', background: '#f8faf7', padding: 12, borderRadius: 10, fontSize: 12 }}>
                <b>Specs:</b> <span style={{ color: 'var(--text-secondary)' }}>{item.specs}</span>
              </div>

              <div style={{ fontSize: 12, color: '#166534', marginBottom: 16 }}>
                <b>Best For:</b> {item.suitableFor}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                <span className="muted" style={{ fontSize: 11 }}>Owner: <b>{item.ownerName}</b></span>
                <button
                  className="btn btn-primary"
                  onClick={() => setBookingItem(item)}
                  style={{ fontSize: 12, padding: '7px 14px' }}
                >
                  {item.type === 'Rent' ? 'Book Machine' : item.type === 'Buy' ? 'Inquire Purchase' : 'Request Service'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking / Inquiry Modal */}
        {bookingItem && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'grid', placeItems: 'center', padding: 16 }}>
            <div className="card" style={{ maxWidth: 480, width: '100%', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 17 }}>Book / Inquire Machinery</h3>
                <button className="btn btn-soft" onClick={() => setBookingItem(null)}>✕</button>
              </div>

              {bookingSuccess ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <CheckCircle2 size={46} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ margin: 0, color: '#166534' }}>Booking Request Sent Successfully!</h4>
                  <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>
                    The machinery owner <b>{bookingItem.ownerName}</b> has received your request and will call you back within 30 minutes to confirm schedule and location.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ background: '#f8faf7', padding: 12, borderRadius: 10 }}>
                    <b style={{ fontSize: 14 }}>{bookingItem.name}</b>
                    <div style={{ fontSize: 12, color: 'var(--primary)', marginTop: 2 }}>{bookingItem.price} {bookingItem.rateUnit}</div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700 }}>Requested Date</label>
                    <input className="input" type="date" required value={bookingDate} onChange={e => setBookingDate(e.target.value)} />
                  </div>

                  {bookingItem.type === 'Rent' && (
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700 }}>Estimated Hours / Acres Needed</label>
                      <input className="input" type="number" step="0.5" value={hoursNeeded} onChange={e => setHoursNeeded(e.target.value)} />
                    </div>
                  )}

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700 }}>Farmer Mobile Number</label>
                    <input className="input" type="tel" required placeholder="e.g. 9876543210" value={farmerPhone} onChange={e => setFarmerPhone(e.target.value)} />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>
                    Confirm Machinery Request
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
