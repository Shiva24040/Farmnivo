'use client';

import { useState } from 'react';
import {
  ShoppingCart, Tag, MapPin, Search, Plus, Filter,
  Phone, CheckCircle2, DollarSign, Package, Sparkles
} from 'lucide-react';

interface Listing {
  id: string;
  type: 'Sell' | 'Buy';
  title: string;
  category: 'Crops & Grain' | 'Vegetables & Fruits' | 'Seeds' | 'Fertilizers & Bio' | 'Tools & Inputs';
  quantity: string;
  price: string;
  sellerName: string;
  location: string;
  quality: string;
  phone: string;
  isExample: boolean;
}

const marketplaceItems: Listing[] = [
  {
    id: 'list-1',
    type: 'Sell',
    title: 'Paddy BPT 5204 (Samba Mahsuri) - Farm Gate Stock',
    category: 'Crops & Grain',
    quantity: '150 Bags (75 kg each / 11.2 Tonnes)',
    price: '₹2,450 / Bag',
    sellerName: 'K. Srinivasa Rao (Direct Farmer)',
    location: 'Miryalaguda, Nalgonda, Telangana',
    quality: 'Moisture 13%, Cleaned, No discolored grains',
    phone: '9849102345',
    isExample: true
  },
  {
    id: 'list-2',
    type: 'Sell',
    title: 'First Picking Bt Cotton (Shubham Seed)',
    category: 'Crops & Grain',
    quantity: '25 Quintals',
    price: '₹7,600 / Quintal',
    sellerName: 'Rameshwar Reddy',
    location: 'Warangal Rural, Telangana',
    quality: 'Clean white staple, low trash content (<3%), 29mm fiber',
    phone: '9701234567',
    isExample: true
  },
  {
    id: 'list-3',
    type: 'Sell',
    title: 'Fresh Farmgate Tomatoes & Ladyfinger (Bhendi)',
    category: 'Vegetables & Fruits',
    quantity: '50 Crates Tomatoes + 20 Bags Bhendi daily',
    price: '₹28 / kg wholesale',
    sellerName: 'Mallaiah Organic Farm',
    location: 'Shamshabad, Rangareddy',
    quality: 'Harvested early morning, pesticide-residue tested',
    phone: '9988776655',
    isExample: true
  },
  {
    id: 'list-4',
    type: 'Sell',
    title: 'Teja Dry Red Chilli (Stemless / AC Cold Storage)',
    category: 'Crops & Grain',
    quantity: '40 Bags (40 kg each / 1.6 Tonnes)',
    price: '₹19,200 / Quintal',
    sellerName: 'Gopi Krishna (Farmer Producer Group)',
    location: 'Khammam, Telangana',
    quality: 'Deep dark red color, pungent SHU > 50,000, 10% moisture',
    phone: '9440112233',
    isExample: true
  },
  {
    id: 'list-5',
    type: 'Sell',
    title: 'Export Grade Banganapalli Mangoes (Carbide Free)',
    category: 'Vegetables & Fruits',
    quantity: '3 Tonnes (Available in Crates)',
    price: '₹65 / kg',
    sellerName: 'Sita Rama Raju Orchard',
    location: 'Nuzvid, Eluru District, AP',
    quality: 'Naturally tree-ripened, 350-450g average fruit weight',
    phone: '9866123456',
    isExample: true
  },
  {
    id: 'list-6',
    type: 'Sell',
    title: 'Yellow Hybrid Maize Grain (Animal Feed Grade)',
    category: 'Crops & Grain',
    quantity: '80 Quintals',
    price: '₹2,280 / Quintal',
    sellerName: 'Anjaiah Farmer',
    location: 'Nizamabad, Telangana',
    quality: 'Moisture 13.5%, high test weight, no aflatoxin',
    phone: '9703456789',
    isExample: true
  },
  {
    id: 'list-7',
    type: 'Sell',
    title: 'Kadiri-6 Dried Groundnut Pods',
    category: 'Crops & Grain',
    quantity: '35 Quintals',
    price: '₹6,900 / Quintal',
    sellerName: 'Narasimha Swamy',
    location: 'Kadiri, Anantapur, AP',
    quality: 'Sun-dried pods, 72% shelling turnout, 48% oil content',
    phone: '9959123450',
    isExample: true
  },
  {
    id: 'list-8',
    type: 'Buy',
    title: 'Seeking Certified Paddy Seeds MTU 1010 & RNR 15048',
    category: 'Seeds',
    quantity: 'Required 20 Bags (30kg each) for upcoming Rabi sowing',
    price: 'Target ₹1,100 / Bag',
    sellerName: 'Bhadradri Progressive Farmers Club',
    location: 'Kothagudem, Telangana',
    quality: 'Germination > 90%, Foundation or Certified tag required',
    phone: '9490123456',
    isExample: true
  },
  {
    id: 'list-9',
    type: 'Buy',
    title: 'Looking for 5 Tonnes Pure Enriched Vermicompost & Neem Cake',
    category: 'Fertilizers & Bio',
    quantity: '5 Tonnes in 50kg HDPE bags with delivery',
    price: 'Target ₹6 / kg vermicompost',
    sellerName: 'Green Earth Natural Farms',
    location: 'Medak, Telangana',
    quality: 'Moisture 20%, 100% cow dung base, no plastic residues',
    phone: '9177123890',
    isExample: true
  },
  {
    id: 'list-10',
    type: 'Buy',
    title: 'Wanted 10 Units 12V 16L Dual-Motor Battery Knapsack Sprayers',
    category: 'Tools & Inputs',
    quantity: '10 Sprayer Sets for collective farm labor team',
    price: 'Budget ₹2,200 / Unit',
    sellerName: 'Rythu Sangham Cooperative',
    location: 'Mahabubnagar, Telangana',
    quality: 'Lithium or Lead-Acid 12Ah battery with brass lance',
    phone: '9848123999',
    isExample: true
  }
];

export default function MarketplacePage() {
  const [typeFilter, setTypeFilter] = useState<'All' | 'Sell' | 'Buy'>('All');
  const [catFilter, setCatFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderItem, setOrderItem] = useState<Listing | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [offeredQty, setOfferedQty] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filtered = marketplaceItems.filter(item => {
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesCat = catFilter === 'All' || item.category === catFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesCat && matchesSearch;
  });

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOrderItem(null);
    }, 2800);
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 1200, paddingBottom: 60 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--primary)', fontWeight: 800 }}>RYTHU NESTHAM AGRICULTURAL MARKETPLACE</div>
            <h1 className="h2" style={{ margin: '4px 0 8px' }}>Farmer Direct Buy & Sell Exchange</h1>
            <p className="muted" style={{ fontSize: 14, maxWidth: 820 }}>
              Connect directly with neighboring farmers, traders, and agri-input suppliers without middlemen. Showing 10 realistic Indian agricultural listings for grains, fruits, vegetables, certified seeds, and bio-inputs.
            </p>
          </div>
          <span className="badge" style={{ background: '#dcfce7', color: '#166534', fontSize: 11, padding: '5px 11px', borderRadius: 999, fontWeight: 700 }}>
            10 FARMER LISTINGS
          </span>
        </div>

        {/* Filter controls */}
        <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['All', 'Sell', 'Buy'] as const).map(t => (
            <button
              key={t}
              className={`btn ${typeFilter === t ? 'btn-primary' : 'btn-soft'}`}
              onClick={() => setTypeFilter(t)}
              style={{ fontSize: 13, padding: '7px 16px' }}
            >
              {t === 'All' ? 'All Trade Listings' : t === 'Sell' ? '🌾 Farmer Selling' : '🛒 Farmer Buying / Wanted'}
            </button>
          ))}

          <select
            className="input"
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
            style={{ width: 190, height: 40 }}
          >
            <option value="All">All Product Categories</option>
            <option value="Crops & Grain">Crops & Grain</option>
            <option value="Vegetables & Fruits">Vegetables & Fruits</option>
            <option value="Seeds">Certified Seeds</option>
            <option value="Fertilizers & Bio">Fertilizers & Bio</option>
            <option value="Tools & Inputs">Tools & Inputs</option>
          </select>

          <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
            <input
              className="input"
              placeholder="Search produce, seed, or location..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: 34, height: 40 }}
            />
            <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          </div>
        </div>

        {/* Listings Grid */}
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
                    background: item.type === 'Sell' ? '#f0fdf4' : '#eff6ff',
                    color: item.type === 'Sell' ? '#15803d' : '#1d4ed8'
                  }}>
                    {item.type === 'Sell' ? '🟢 SELLER OFFER' : '🔵 BUYER DEMAND'} · {item.category}
                  </span>
                  <h3 style={{ margin: '6px 0 2px', fontSize: 16 }}>{item.title}</h3>
                  <small className="muted" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={12} color="var(--primary)" /> {item.location}
                  </small>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <b style={{ fontSize: 17, color: 'var(--primary)', display: 'block' }}>{item.price}</b>
                  <small className="muted" style={{ fontSize: 11 }}>{item.quantity}</small>
                </div>
              </div>

              <div style={{ margin: '14px 0 10px', background: '#f8faf7', padding: 12, borderRadius: 10, fontSize: 12 }}>
                <b>Quality / Grade:</b> <span style={{ color: 'var(--text-secondary)' }}>{item.quality}</span>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                <span className="muted" style={{ fontSize: 11 }}>Contact: <b>{item.sellerName}</b></span>
                <button
                  className="btn btn-primary"
                  onClick={() => setOrderItem(item)}
                  style={{ fontSize: 12, padding: '7px 14px' }}
                >
                  {item.type === 'Sell' ? 'Inquire to Buy' : 'Offer My Produce'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order / Inquiry Modal */}
        {orderItem && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'grid', placeItems: 'center', padding: 16 }}>
            <div className="card" style={{ maxWidth: 480, width: '100%', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 17 }}>Trade Contact & Inquiry</h3>
                <button className="btn btn-soft" onClick={() => setOrderItem(null)}>✕</button>
              </div>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <CheckCircle2 size={46} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ margin: 0, color: '#166534' }}>Inquiry Sent to Seller!</h4>
                  <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>
                    Your contact details have been sent to <b>{orderItem.sellerName}</b> ({orderItem.phone}). You may also call directly for immediate negotiation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ background: '#f8faf7', padding: 12, borderRadius: 10 }}>
                    <b style={{ fontSize: 14 }}>{orderItem.title}</b>
                    <div style={{ fontSize: 12, color: 'var(--primary)', marginTop: 2 }}>{orderItem.price} · Available: {orderItem.quantity}</div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700 }}>Your Name *</label>
                    <input className="input" required placeholder="e.g. Ramesh Patel" value={buyerName} onChange={e => setBuyerName(e.target.value)} />
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700 }}>Your Mobile Number *</label>
                    <input className="input" type="tel" required placeholder="e.g. 9876543210" value={buyerPhone} onChange={e => setBuyerPhone(e.target.value)} />
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700 }}>Quantity Desired / Message</label>
                    <input className="input" placeholder="e.g. Need 50 bags, ready to lift tomorrow" value={offeredQty} onChange={e => setOfferedQty(e.target.value)} />
                  </div>

                  <div style={{ background: '#f0fdf4', padding: 10, borderRadius: 8, fontSize: 12, color: '#166534' }}>
                    Direct Seller Contact: <b>{orderItem.phone}</b>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: 6, justifyContent: 'center' }}>
                    Send Deal Inquiry
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
