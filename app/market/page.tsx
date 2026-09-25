'use client';

import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Minus, Search, Calendar, MapPin,
  RefreshCw, DollarSign, Filter, Sparkles, AlertCircle, ExternalLink
} from 'lucide-react';

interface MandiPrice {
  id: string;
  commodity: string;
  variety: string;
  mandi: string;
  district: string;
  state: string;
  minPrice: number;
  modalPrice: number;
  maxPrice: number;
  unit: string;
  date: string;
  trend: 'up' | 'down' | 'steady';
  trendPercent: string;
  msp?: number;
  arrivals: string;
  isExample?: boolean;
}

const mandiPrices: MandiPrice[] = [
  {
    id: 'mandi-1',
    commodity: 'Paddy / Rice (వరి)',
    variety: 'Grade A / BPT 5204',
    mandi: 'Miryalaguda Mandi',
    district: 'Nalgonda',
    state: 'Telangana',
    minPrice: 2280,
    modalPrice: 2420,
    maxPrice: 2550,
    unit: '₹ / Quintal',
    date: '25 Sep 2026',
    trend: 'up',
    trendPercent: '+2.4%',
    msp: 2320,
    arrivals: '1,450 Quintals',
    isExample: true
  },
  {
    id: 'mandi-2',
    commodity: 'Cotton (ప్రత్తి)',
    variety: 'Medium Staple (Bt)',
    mandi: 'Warangal Agricultural Market',
    district: 'Warangal',
    state: 'Telangana',
    minPrice: 7100,
    modalPrice: 7450,
    maxPrice: 7780,
    unit: '₹ / Quintal',
    date: '25 Sep 2026',
    trend: 'up',
    trendPercent: '+3.1%',
    msp: 7121,
    arrivals: '2,800 Quintals',
    isExample: true
  },
  {
    id: 'mandi-3',
    commodity: 'Red Chilli (మిరప)',
    variety: 'Teja / S4 Guntur',
    mandi: 'Khammam Mandi',
    district: 'Khammam',
    state: 'Telangana',
    minPrice: 16500,
    modalPrice: 18200,
    maxPrice: 19800,
    unit: '₹ / Quintal',
    date: '25 Sep 2026',
    trend: 'up',
    trendPercent: '+4.5%',
    arrivals: '850 Quintals',
    isExample: true
  },
  {
    id: 'mandi-4',
    commodity: 'Tomato (టమాట)',
    variety: 'Hybrid Desi / Special',
    mandi: 'Madanapalle Market Yard',
    district: 'Annamayya',
    state: 'Andhra Pradesh',
    minPrice: 1200,
    modalPrice: 1650,
    maxPrice: 2100,
    unit: '₹ / Quintal',
    date: '25 Sep 2026',
    trend: 'down',
    trendPercent: '-5.2%',
    arrivals: '3,200 Quintals',
    isExample: true
  },
  {
    id: 'mandi-5',
    commodity: 'Maize / Corn (మొక్కజొన్న)',
    variety: 'Yellow Hybrid',
    mandi: 'Nizamabad Mandi',
    district: 'Nizamabad',
    state: 'Telangana',
    minPrice: 2050,
    modalPrice: 2240,
    maxPrice: 2380,
    unit: '₹ / Quintal',
    date: '25 Sep 2026',
    trend: 'steady',
    trendPercent: '0.0%',
    msp: 2225,
    arrivals: '1,900 Quintals',
    isExample: true
  },
  {
    id: 'mandi-6',
    commodity: 'Groundnut (వేరుశనగ)',
    variety: 'Pod / With Shell',
    mandi: 'Anantapur Market Yard',
    district: 'Anantapur',
    state: 'Andhra Pradesh',
    minPrice: 6200,
    modalPrice: 6750,
    maxPrice: 7100,
    unit: '₹ / Quintal',
    date: '25 Sep 2026',
    trend: 'up',
    trendPercent: '+1.8%',
    msp: 6783,
    arrivals: '780 Quintals',
    isExample: true
  },
  {
    id: 'mandi-7',
    commodity: 'Turmeric (పసుపు)',
    variety: 'Nizamabad Finger (Selam)',
    mandi: 'Nizamabad Turmeric Yard',
    district: 'Nizamabad',
    state: 'Telangana',
    minPrice: 12800,
    modalPrice: 14200,
    maxPrice: 15600,
    unit: '₹ / Quintal',
    date: '25 Sep 2026',
    trend: 'up',
    trendPercent: '+6.2%',
    arrivals: '1,100 Quintals',
    isExample: true
  },
  {
    id: 'mandi-8',
    commodity: 'Onion (ఉల్లిపాయ)',
    variety: 'Red Medium',
    mandi: 'Lasalgaon Mandi / Kurnool',
    district: 'Nashik / Kurnool',
    state: 'Maharashtra / AP',
    minPrice: 2400,
    modalPrice: 2950,
    maxPrice: 3400,
    unit: '₹ / Quintal',
    date: '25 Sep 2026',
    trend: 'down',
    trendPercent: '-2.1%',
    arrivals: '4,500 Quintals',
    isExample: true
  },
  {
    id: 'mandi-9',
    commodity: 'Potato (బంగాళాదుంప)',
    variety: 'Kufri Jyoti',
    mandi: 'Agra Mandi',
    district: 'Agra',
    state: 'Uttar Pradesh',
    minPrice: 1450,
    modalPrice: 1720,
    maxPrice: 1950,
    unit: '₹ / Quintal',
    date: '25 Sep 2026',
    trend: 'steady',
    trendPercent: '+0.5%',
    arrivals: '6,200 Quintals',
    isExample: true
  },
  {
    id: 'mandi-10',
    commodity: 'Mango (మామిడి)',
    variety: 'Banganapalli Table Fruit',
    mandi: 'Kothapet / Gaddiannaram Fruit Mandi',
    district: 'Hyderabad / Rangareddy',
    state: 'Telangana',
    minPrice: 3500,
    modalPrice: 4200,
    maxPrice: 5400,
    unit: '₹ / Quintal',
    date: 'Seasonal Benchmark',
    trend: 'up',
    trendPercent: '+3.5%',
    arrivals: '600 Quintals',
    isExample: true
  }
];

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');

  const filteredPrices = mandiPrices.filter(p => {
    const matchesSearch =
      p.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mandi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = filterState === 'all' || p.state.toLowerCase().includes(filterState.toLowerCase());
    return matchesSearch && matchesState;
  });

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 1200, paddingBottom: 60 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--primary)', fontWeight: 800 }}>RYTHU NESTHAM MANDI INTELLIGENCE</div>
            <h1 className="h2" style={{ margin: '4px 0 8px' }}>Agricultural Market Mandi Prices</h1>
            <p className="muted" style={{ fontSize: 14, maxWidth: 820 }}>
              Live and benchmark commodity spot prices across major agricultural markets (APMC / eNAM). Showing 10 realistic Indian agricultural commodities with modal prices, minimum support prices (MSP), and daily arrivals.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="badge" style={{ background: '#fef3c7', color: '#92400e', fontSize: 11, padding: '5px 11px', borderRadius: 999, fontWeight: 700 }}>
              BENCHMARK SPOT EXAMPLES
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
            <input
              className="input"
              placeholder="Search commodity (e.g. Paddy, Cotton, Chilli) or mandi..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: 36 }}
            />
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          </div>
          <select className="input" value={filterState} onChange={e => setFilterState(e.target.value)} style={{ width: 180 }}>
            <option value="all">All States</option>
            <option value="Telangana">Telangana</option>
            <option value="Andhra">Andhra Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Uttar">Uttar Pradesh</option>
          </select>
        </div>

        {/* Price Table / Grid */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredPrices.map(item => (
            <div
              key={item.id}
              className="card"
              style={{
                padding: '18px 22px',
                display: 'grid',
                gridTemplateColumns: '1.4fr 1.2fr 1fr 1fr 1fr auto',
                gap: 16,
                alignItems: 'center'
              }}
            >
              {/* Commodity info */}
              <div>
                <b style={{ fontSize: 15, display: 'block', color: 'var(--text-primary)' }}>{item.commodity}</b>
                <small className="muted" style={{ fontSize: 12 }}>{item.variety}</small>
              </div>

              {/* Mandi & Location */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700 }}>
                  <MapPin size={14} color="var(--primary)" /> {item.mandi}
                </div>
                <small className="muted" style={{ fontSize: 11 }}>{item.district}, {item.state}</small>
              </div>

              {/* Price Range */}
              <div>
                <small className="muted" style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', fontWeight: 700 }}>Min – Max</small>
                <span style={{ fontSize: 13, fontWeight: 600 }}>₹{item.minPrice} – ₹{item.maxPrice}</span>
              </div>

              {/* Modal Price */}
              <div>
                <small className="muted" style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', fontWeight: 700 }}>Modal Rate</small>
                <b style={{ fontSize: 17, color: 'var(--primary)' }}>₹{item.modalPrice}</b>
                <small className="muted" style={{ fontSize: 10, display: 'block' }}>{item.unit}</small>
              </div>

              {/* Trend & MSP */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {item.trend === 'up' && <TrendingUp size={15} color="#16a34a" />}
                  {item.trend === 'down' && <TrendingDown size={15} color="#dc2626" />}
                  {item.trend === 'steady' && <Minus size={15} color="#6b7280" />}
                  <span style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: item.trend === 'up' ? '#16a34a' : item.trend === 'down' ? '#dc2626' : '#6b7280'
                  }}>
                    {item.trendPercent}
                  </span>
                </div>
                {item.msp && (
                  <small style={{ fontSize: 10, color: '#0369a1', display: 'block', marginTop: 2 }}>
                    Govt MSP: ₹{item.msp}
                  </small>
                )}
              </div>

              {/* Arrivals badge */}
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, background: '#f8faf7', border: '1px solid #e2eae1', padding: '4px 8px', borderRadius: 8, display: 'inline-block' }}>
                  Arrivals: <b>{item.arrivals}</b>
                </span>
                <small className="muted" style={{ display: 'block', fontSize: 10, marginTop: 4 }}>{item.date}</small>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory footer */}
        <div style={{ marginTop: 24, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <Sparkles size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.5 }}>
            <b>Mandi Trading Tip for Farmers:</b> Prices vary based on moisture content, grain purity, and daily arrivals. Always ensure produce has moisture below 14% (for Paddy/Maize) and 8% (for Cotton/Chilli) before taking goods to the market yard to secure maximum modal rates.
          </div>
        </div>
      </div>
    </div>
  );
}
