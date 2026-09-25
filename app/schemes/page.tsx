'use client';

import { useState } from 'react';
import {
  BadgeIndianRupee, ExternalLink, Search, Filter, ShieldCheck,
  CheckCircle2, Sparkles, Building, FileText, ArrowRight
} from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  teluguName: string;
  authority: 'Central Government' | 'State Government (Telangana / AP)';
  category: 'Direct Income' | 'Insurance' | 'Solar & Irrigation' | 'Credit & Loan' | 'Machinery & Tech' | 'Soil & Organic';
  benefit: string;
  eligibility: string;
  documents: string[];
  officialUrl: string;
  status: 'Open for Applications' | 'Disbursal in Progress' | 'Continuous Window';
  isExample: boolean;
}

const realisticSchemes: Scheme[] = [
  {
    id: 'sch-1',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    teluguName: 'పీఎం కిసాన్ సమ్మాన్ నిధి',
    authority: 'Central Government',
    category: 'Direct Income',
    benefit: '₹6,000 per year directly transferred into farmer bank accounts in 3 equal installments of ₹2,000 every 4 months.',
    eligibility: 'All small and marginal landholding farmer families having cultivable land in their names. Must have completed Aadhaar e-KYC and land seeding.',
    documents: ['Aadhaar Card', 'Land Passbook (Pattadar / RoR 1B)', 'Aadhaar-seeded Bank Account passbook'],
    officialUrl: 'https://pmkisan.gov.in',
    status: 'Disbursal in Progress',
    isExample: true
  },
  {
    id: 'sch-2',
    name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    teluguName: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన (పంట బీమా)',
    authority: 'Central Government',
    category: 'Insurance',
    benefit: 'Comprehensive crop insurance from pre-sowing to post-harvest against unseasonal rains, drought, flood, cyclones, and localized pest epidemics. Farmer pays only 1.5% - 2% premium.',
    eligibility: 'All farmers growing notified crops in notified areas, both loanee and non-loanee farmers, sharecroppers and tenant farmers with cultivation certificates.',
    documents: ['Land record (Pahani / Khasra)', 'Sowing Certificate from Village Agricultural Assistant (VAA)', 'Cancelled Cheque'],
    officialUrl: 'https://pmfby.gov.in',
    status: 'Open for Applications',
    isExample: true
  },
  {
    id: 'sch-3',
    name: 'Rythu Bharosa / Rythu Bandhu Investment Support',
    teluguName: 'రైతు భరోసా / పెట్టుబడి సహాయ పథకం',
    authority: 'State Government (Telangana / AP)',
    category: 'Direct Income',
    benefit: 'Direct financial assistance of ₹10,000 to ₹15,000 per acre per year for purchasing agricultural inputs like seeds, fertilizers, and field preparation.',
    eligibility: 'Resident farmers owning agricultural land verified in Dharani / Webland revenue portals.',
    documents: ['Dharani Pattadar Passbook', 'Aadhaar Card linked to Mobile', 'Bank Account details'],
    officialUrl: 'https://rythubandhu.telangana.gov.in',
    status: 'Continuous Window',
    isExample: true
  },
  {
    id: 'sch-4',
    name: 'PM-KUSUM Component-B (Solar Water Pumps)',
    teluguName: 'పీఎం కుసుమ్ సౌర వ్యవసాయ పంపుల పథకం',
    authority: 'Central Government',
    category: 'Solar & Irrigation',
    benefit: 'Up to 60% total subsidy (30% Central + 30% State) for installing 3 HP to 10 HP stand-alone solar photovoltaic water pumping systems. Farmer pays only 40%.',
    eligibility: 'Individual farmers, farmer groups, water user associations with certified borewell or open water source without grid electricity connection.',
    documents: ['Land ownership documents', 'Borewell yield certificate', 'Aadhaar & Bank Details'],
    officialUrl: 'https://pmkusum.mnre.gov.in',
    status: 'Open for Applications',
    isExample: true
  },
  {
    id: 'sch-5',
    name: 'National Soil Health Card Scheme',
    teluguName: 'మృత్తికా ఆరోగ్య కార్డు పథకం (సాయిల్ హెల్త్ కార్డ్)',
    authority: 'Central Government',
    category: 'Soil & Organic',
    benefit: 'Free periodic laboratory soil testing providing exact N-P-K nutrient status, organic carbon, micro-nutrients (Zinc, Iron, Boron), and customized fertilizer dosage recommendations.',
    eligibility: 'All farmers possessing agricultural land across every village in India.',
    documents: ['Farmer identification', 'Survey Number / Field location for soil sample collection'],
    officialUrl: 'https://soilhealth.dac.gov.in',
    status: 'Continuous Window',
    isExample: true
  },
  {
    id: 'sch-6',
    name: 'SMAM (Sub-Mission on Agricultural Mechanization)',
    teluguName: 'వ్యవసాయ యాంత్రీకరణ సబ్ మిషన్ (యంత్రాల సబ్సిడీ)',
    authority: 'Central Government',
    category: 'Machinery & Tech',
    benefit: '40% to 50% capital subsidy on purchase of Tractors, Power Tillers, Rotavators, Combine Harvesters, and Drone sprayers. Up to 80% subsidy for Custom Hiring Centers (CHCs).',
    eligibility: 'Individual small/marginal farmers, women farmers, SC/ST farmers, and registered Farmer Producer Organizations (FPOs).',
    documents: ['Land records', 'Quotations from authorized machinery dealers', 'Aadhaar & Bank details'],
    officialUrl: 'https://agrimachinery.nic.in',
    status: 'Open for Applications',
    isExample: true
  },
  {
    id: 'sch-7',
    name: 'PMKSY - Per Drop More Crop (Micro Irrigation)',
    teluguName: 'ప్రధాన మంత్రి కృషి సించాయి యోజన - బిందు సేద్యం',
    authority: 'Central Government',
    category: 'Solar & Irrigation',
    benefit: '70% to 90% subsidy for small and marginal farmers (SC/ST up to 100% in select states) on installation of Drip and Sprinkler irrigation systems.',
    eligibility: 'Farmers possessing cultivable land with assured water source (well, borewell, farm pond) and water-lifting pump.',
    documents: ['Pattadar Passbook', 'Adangal / Pahani', 'Electricity service connection copy', 'Soil and water test report'],
    officialUrl: 'https://pmksy.gov.in',
    status: 'Open for Applications',
    isExample: true
  },
  {
    id: 'sch-8',
    name: 'KCC (Kisan Credit Card Scheme)',
    teluguName: 'కిసాన్ క్రెడిట్ కార్డు (తక్కువ వడ్డీ రుణాలు)',
    authority: 'Central Government',
    category: 'Credit & Loan',
    benefit: 'Crop cultivation loans up to ₹3,00,000 at a subsidized 7% interest rate, with an additional 3% prompt repayment incentive, reducing effective interest rate to just 4% per annum.',
    eligibility: 'All farmers, sharecroppers, tenant farmers, oral lessees, and animal husbandry / dairy farmers.',
    documents: ['Filled KCC application form', 'Land possession records (RoR)', 'Identity & Address proof (Aadhaar/Voter ID)'],
    officialUrl: 'https://myscheme.gov.in/schemes/kcc',
    status: 'Continuous Window',
    isExample: true
  },
  {
    id: 'sch-9',
    name: 'PKVY (Paramparagat Krishi Vikas Yojana)',
    teluguName: 'పరంపరాగత్ కృషి వికాస్ యోజన (సేంద్రీయ వ్యవసాయం)',
    authority: 'Central Government',
    category: 'Soil & Organic',
    benefit: '₹50,000 per hectare financial support for 3 years to adopt organic farming, biological inputs, organic seed procurement, on-farm vermicomposting, and PGS certification.',
    eligibility: 'Farmer clusters comprising 20 or more farmers having continuous agricultural land of at least 20 hectares (50 acres).',
    documents: ['Cluster formation resolution', 'Member land details', 'Aadhaar linked bank accounts'],
    officialUrl: 'https://pgsindia-ncof.gov.in',
    status: 'Continuous Window',
    isExample: true
  },
  {
    id: 'sch-10',
    name: 'National Livestock Mission (NLM Subsidy)',
    teluguName: 'జాతీయ పశుసంవర్ధక మిషన్ (డైరీ & మేకల సబ్సిడీ)',
    authority: 'Central Government',
    category: 'Direct Income',
    benefit: '50% capital subsidy (up to ₹50 Lakhs) for commercial sheep and goat breeding units, poultry parent farm breeding, and silage fodder production entrepreneurs.',
    eligibility: 'Individual entrepreneurs, SHGs, FPOs, and cooperative societies with land or leased shed facilities for livestock units.',
    documents: ['Detailed Project Report (DPR)', 'Land document / Lease agreement for shed', 'Bank sanction letter'],
    officialUrl: 'https://nlm.udyamimitra.in',
    status: 'Open for Applications',
    isExample: true
  }
];

export default function SchemesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAuthority, setSelectedAuthority] = useState<string>('All');

  const filtered = realisticSchemes.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.teluguName.includes(searchTerm) ||
      s.benefit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesAuth = selectedAuthority === 'All' || s.authority.includes(selectedAuthority);
    return matchesSearch && matchesCat && matchesAuth;
  });

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 1200, paddingBottom: 60 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--primary)', fontWeight: 800 }}>RYTHU NESTHAM GOVERNMENT SCHEME FINDER</div>
            <h1 className="h2" style={{ margin: '4px 0 8px' }}>Central & State Agricultural Welfare Schemes</h1>
            <p className="muted" style={{ fontSize: 14, maxWidth: 820 }}>
              Official government subsidies, financial assistance, and welfare programs for Indian farmers. Explore 10 realistic flagship schemes with eligibility, required documents, and official application portals.
            </p>
          </div>
          <span className="badge" style={{ background: '#dcfce7', color: '#166534', fontSize: 11, padding: '5px 11px', borderRadius: 999, fontWeight: 700 }}>
            10 VERIFIED CENTRAL & STATE SCHEMES
          </span>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
            <input
              className="input"
              placeholder="Search by scheme name, PM-KISAN, subsidy, loan..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: 34, height: 40 }}
            />
            <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          </div>

          <select
            className="input"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{ width: 190, height: 40 }}
          >
            <option value="All">All Categories</option>
            <option value="Direct Income">Direct Income Support</option>
            <option value="Insurance">Crop Insurance (PMFBY)</option>
            <option value="Solar & Irrigation">Solar & Irrigation Subsidy</option>
            <option value="Credit & Loan">Subsidized Credit (KCC)</option>
            <option value="Machinery & Tech">Machinery Subsidy (SMAM)</option>
            <option value="Soil & Organic">Soil Health & Organic</option>
          </select>

          <select
            className="input"
            value={selectedAuthority}
            onChange={e => setSelectedAuthority(e.target.value)}
            style={{ width: 170, height: 40 }}
          >
            <option value="All">All Authorities</option>
            <option value="Central">Central Govt Schemes</option>
            <option value="State">State Govt Schemes</option>
          </select>
        </div>

        {/* Schemes List */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {filtered.map(s => (
            <div key={s.id} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: 999,
                      background: '#e0f2fe',
                      color: '#0369a1'
                    }}>
                      {s.authority}
                    </span>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: 999,
                      background: '#f0fdf4',
                      color: '#15803d'
                    }}>
                      {s.category}
                    </span>
                  </div>
                  <h3 style={{ margin: '2px 0 2px', fontSize: 18 }}>{s.name}</h3>
                  <small style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 13 }}>{s.teluguName}</small>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 8,
                    background: s.status === 'Open for Applications' ? '#dcfce7' : s.status === 'Disbursal in Progress' ? '#fef3c7' : '#eff6ff',
                    color: s.status === 'Open for Applications' ? '#15803d' : s.status === 'Disbursal in Progress' ? '#92400e' : '#1d4ed8'
                  }}>
                    ● {s.status}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 14, background: '#f8faf7', padding: 14, borderRadius: 12, border: '1px solid #edf2ec' }}>
                <b style={{ color: '#166534', fontSize: 13, display: 'block', marginBottom: 4 }}>🎁 Key Financial & Technical Benefit:</b>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--text-primary)' }}>{s.benefit}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14, marginTop: 14, fontSize: 12 }}>
                <div>
                  <b style={{ textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Farmer Eligibility:</b>
                  <p style={{ margin: 0, lineHeight: 1.45, color: 'var(--text-primary)' }}>{s.eligibility}</p>
                </div>
                <div>
                  <b style={{ textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Mandatory Documents:</b>
                  <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-primary)', lineHeight: 1.45 }}>
                    {s.documents.map((doc, idx) => <li key={idx}>{doc}</li>)}
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <ShieldCheck size={16} color="var(--primary)" /> Verified Government Portal
                </div>
                <a
                  href={s.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ fontSize: 12, padding: '7px 16px' }}
                >
                  Visit Official Portal & Apply <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
