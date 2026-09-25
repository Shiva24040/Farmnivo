import Link from 'next/link';
import {
  Bot, Tractor, ShoppingBag, Video, PawPrint, Calculator, Users, CloudSun,
  ArrowRight, Sparkles, GraduationCap, LandPlot, BriefcaseBusiness, Bell,
  Search, BrainCircuit, LayoutDashboard, TrendingUp, Leaf, Wifi, Sprout,
  BadgeIndianRupee, CalendarCheck, FlaskConical, PackageOpen, WalletCards,
  ShieldCheck, UserRoundCheck, ClipboardList
} from 'lucide-react';

const features = [
  ['Dashboard', 'Your unified farmer command center.', '/dashboard', LayoutDashboard],
  ['Farm Management', 'Store farms, fields and crop context.', '/farm', LandPlot],
  ['My Crops', 'Track crop area, stage, sowing & harvest.', '/crops', Sprout],
  ['AI Crop Doctor', 'Scan & identify crop diseases with AI.', '/doctor', Sparkles],
  ['Rythu Dost', 'Your AI farming companion.', '/copilot', Bot],
  ['Weather & Alerts', '7-day forecast and farm weather alerts.', '/weather', CloudSun],
  ['Market Intelligence', 'Current mandi prices and price trends.', '/market', TrendingUp],
  ['Marketplace', 'Buy, sell and request farm products.', '/marketplace', ShoppingBag],
  ['Machinery', 'Machinery rental, sales and servicing.', '/machinery', Tractor],
  ['Livestock Care', 'Animal health, breeding and dairy records.', '/livestock', PawPrint],
  ['Farm Services', 'Find and request farm services.', '/services', BriefcaseBusiness],
  ['Government Schemes', 'Central & State agricultural subsidies.', '/schemes', BadgeIndianRupee],
  ['Farmer Community', 'Farmer discussions, queries and advice.', '/community', Users],
  ['AgriReels', 'Farmer video guides and best practices.', '/reels', Video],
  ['Farm IoT', 'Live & simulated field sensors.', '/iot', Wifi],
  ['Calculators', '10 agricultural calculation tools.', '/tools', Calculator],
  ['Farm Tasks', 'Plan and complete seasonal field work.', '/tasks', CalendarCheck],
  ['Soil & Fertility', 'Record soil tests and fertility data.', '/soil', FlaskConical],
  ['Seeds & Inputs', 'Track seeds, fertilizers and input costs.', '/inputs', PackageOpen],
  ['Finance', 'Track farm income, expenses and ledger.', '/finance', WalletCards],
  ['Insurance', 'Track crop insurance policies & claims.', '/insurance', ShieldCheck],
  ['Farming Academy', 'Learn modern agricultural practices.', '/academy', GraduationCap],
  ['Ask an Expert', 'Consult verified agronomists & vets.', '/experts', UserRoundCheck],
  ['Orders & Bookings', 'Track all requests and machinery bookings.', '/orders', ClipboardList],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="fade">
            <span className="pill">🌱 Digital Farm Operating System</span>
            <h1 className="h1">
              Everything farming.<br />
              <span style={{ color: 'var(--green)' }}>One platform.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.65 }} className="muted">
              Rythu Nestham connects farm records, AI assistance, crop intelligence, machinery, marketplace, livestock, learning, services and farmer community in one workspace.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 25, flexWrap: 'wrap' }}>
              <Link className="btn btn-primary" href="/dashboard">
                Open Dashboard <ArrowRight size={17} />
              </Link>
              <Link className="btn btn-soft" href="/copilot">
                <Bot size={17} /> Ask Rythu Dost
              </Link>
              <Link className="btn btn-soft" href="/auth">
                Create farmer account
              </Link>
            </div>
          </div>
          <div className="hero-panel fade">
            <div className="eyebrow" style={{ color: '#d7f2b7' }}>Rythu Nestham OS</div>
            <h2 style={{ fontSize: 36, margin: '15px 0' }}>Your farm, connected.</h2>
            <p style={{ color: '#e4f4e6', lineHeight: 1.6 }}>
              Build your farm profile once and reuse it across crops, AI, calculators, marketplace workflows and future data integrations.
            </p>
            <div className="rythu-sarvam-os-grid">
              <div className="os-card">
                <div className="os-icon"><BrainCircuit size={21} /></div>
                <div className="os-copy"><b>AI Intelligence</b><span>Rythu Dost + Crop Doctor</span></div>
                <span className="os-arrow">→</span>
              </div>
              <div className="os-card">
                <div className="os-icon"><Leaf size={21} /></div>
                <div className="os-copy"><b>24 Farmer Modules</b><span>Crops, market, livestock & more</span></div>
                <span className="os-arrow">→</span>
              </div>
              <div className="os-card">
                <div className="os-icon"><LayoutDashboard size={21} /></div>
                <div className="os-copy"><b>One Farmer Hub</b><span>Your farm data in one workspace</span></div>
                <span className="os-arrow">→</span>
              </div>
              <div className="os-card">
                <div className="os-icon"><TrendingUp size={21} /></div>
                <div className="os-copy"><b>Built to Grow</b><span>Ready for new tools & integrations</span></div>
                <span className="os-arrow">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">Explore Rythu Nestham</div>
          <h2 className="h2">Built around the farmer</h2>
          <div className="grid grid-4" style={{ marginTop: 22 }}>
            {features.map(([t, d, h, I]) => (
              <Link href={h as string} className="card feature" key={t as string}>
                <div className="iconbox"><I size={22} /></div>
                <h3>{t as string}</h3>
                <p className="muted">{d as string}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
