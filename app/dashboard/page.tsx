'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowRight, Bell, Bot, Calculator, Camera, ChevronDown, ChevronRight,
  CloudRain, Droplets, Leaf, Menu, MessageCircle, Moon, Play, Search, Settings,
  ShoppingCart, Sparkles, Sun, Tractor, TrendingUp, UserCircle, Users, Wifi,
  Wind, X, Zap
} from 'lucide-react';

const nav = [
  ['Dashboard', '/dashboard', Activity, 'Farm overview & command center'],
  ['Scan Crop', '/doctor', Camera, 'AI camera crop diagnosis'],
  ['AI Crop Doctor', '/doctor', Leaf, 'Identify plant diseases & pests'],
  ['Rythu Dost', '/copilot', Bot, 'Ask your AI farming companion'],
  ['My Crops', '/crops', Leaf, 'Manage crops, stages & harvest'],
  ['Farm IoT', '/iot', Wifi, 'Live & simulated field sensors'],
  ['Weather & Alerts', '/weather', CloudRain, '7-day forecast & weather alerts'],
  ['Market Prices', '/market', TrendingUp, 'Current mandi prices & trends'],
  ['Farming Machinery', '/machinery', Tractor, 'Rent, buy & service machinery'],
  ['Buy / Sell', '/marketplace', ShoppingCart, 'Farmer crop & inputs market'],
  ['Livestock Care', '/livestock', Users, 'Manage animal health & dairy'],
  ['Calculators', '/tools', Calculator, '10 agricultural planning tools'],
  ['Government Schemes', '/schemes', MessageCircle, 'Subsidies & welfare schemes'],
  ['Farmer Community', '/community', Users, 'Farmer discussions & advice'],
  ['Farming Academy', '/academy', Play, 'Learn modern farming methods'],
];

const baseSensors = [
  { label: 'Soil Moisture', value: 42, unit: '%', optimal: 'Optimal: 40–60%', icon: Droplets, tone: 'blue' },
  { label: 'Temperature', value: 28.6, unit: '°C', optimal: 'Optimal: 20–32°C', icon: Sun, tone: 'red' },
  { label: 'Humidity', value: 67, unit: '%', optimal: 'Optimal: 50–70%', icon: Droplets, tone: 'cyan' },
  { label: 'Soil pH', value: 6.8, unit: '', optimal: 'Optimal: 6.0–7.5', icon: Leaf, tone: 'green' },
  { label: 'Light Intensity', value: 72, unit: '%', optimal: 'Optimal: 60–80%', icon: Sun, tone: 'yellow' },
  { label: 'Rainfall (Today)', value: 4.2, unit: 'mm', optimal: 'Weekly: 18.6 mm', icon: CloudRain, tone: 'blue' },
  { label: 'Water Tank Level', value: 81, unit: '%', optimal: 'Good Level', icon: Droplets, tone: 'cyan' },
  { label: 'Air Quality', value: 'Good', unit: '', optimal: 'AQI: 42', icon: Wind, tone: 'green' },
];

const insights = [
  ['Soil moisture is slightly low. Consider irrigation in next 6–8 hours.', Droplets, 'blue'],
  ['Temperature is ideal for crop growth.', Sun, 'orange'],
  ['No major disease risk detected in your crops.', Sparkles, 'green'],
  ['Good rainfall expected in next 2 days.', CloudRain, 'cyan'],
];

const alerts = [
  ['Soil Moisture Low', 'Field 1 · Soil moisture is 42%. Consider irrigation.', 'Action Needed', 'danger', Droplets],
  ['Rain Expected', 'Light rainfall (5–10 mm) expected tomorrow.', 'Favorable', 'good', CloudRain],
  ['High Temperature Alert', 'Temperature may reach 34°C tomorrow afternoon.', 'Be Prepared', 'warn', Sun],
];

function Sparkline() {
  const points = '0,180 40,168 80,184 120,146 160,162 200,130 240,142 280,124 320,132 360,96 400,112 440,90 480,105 520,72 560,94 600,82 640,108 680,92 720,116 760,86 800,104 840,78 880,96';
  return <svg viewBox="0 0 900 210" preserveAspectRatio="none" className="dash-sparkline" aria-label="Soil moisture trend"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#37bf71" stopOpacity=".28"/><stop offset="100%" stopColor="#37bf71" stopOpacity="0"/></linearGradient></defs><polygon points={`0,210 ${points} 880,210`} fill="url(#area)"/><polyline points={points} fill="none" stroke="#25ae5d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/></svg>;
}

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sensorTick, setSensorTick] = useState(0);
  const [metric, setMetric] = useState('Soil Moisture');
  const [night, setNight] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [query, setQuery] = useState('');
  const [aiInsight, setAiInsight] = useState<any>(null);

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(d => setUser(d.user)).catch(() => {});
    fetch('/api/ai/insights').then(r => r.ok ? r.json() : null).then(d => setAiInsight(d?.insight || null)).catch(() => {});
    const id = setInterval(() => setSensorTick(v => v + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const sensors = useMemo(() => baseSensors.map((s, i) => {
    if (typeof s.value !== 'number') return s;
    const wave = Math.sin((sensorTick + i) * .75) * (i === 1 ? .35 : 1.2);
    return { ...s, value: Number((s.value + wave).toFixed(i === 1 ? 1 : 0)) };
  }), [sensorTick]);

  const openSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) location.href = `/search?q=${encodeURIComponent(query.trim())}`;
  };

  const farmerGreeting = user?.name ? `Welcome back, ${user.name}! 👋` : 'Welcome to Rythu Nestham! 👋';

  return (
    <div className={`dashboard-shell ${night ? 'night' : ''}`}>
      <aside className={`dash-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="dash-brand">
          <span className="dash-logo"><Leaf size={25}/></span>
          <div>
            <b>Rythu<span>Nestham</span></b>
            <small>Smart Farming, Brighter Tomorrow</small>
          </div>
        </div>
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close sidebar"><X size={20}/></button>
        <nav className="dash-nav">
          {nav.map(([label, href, Icon, desc], i) => (
            <Link
              key={label as string}
              href={href as string}
              title={desc as string}
              className={`dash-nav-item ${i === 0 ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <Icon size={20}/>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, lineHeight: 1.25 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{label as string}</span>
                <small style={{ fontSize: 10, color: i === 0 ? '#d4f7dc' : '#9bb7a8', fontWeight: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 175 }}>{desc as string}</small>
              </div>
              {label === 'Rythu Dost' && <em style={{ marginLeft: 'auto', background: '#2563eb' }}>AI</em>}
              {label === 'Farm IoT' && <em style={{ marginLeft: 'auto' }}>New</em>}
            </Link>
          ))}
        </nav>
        <div className="upgrade-card">
          <div className="upgrade-crown">✦</div>
          <b>Rythu Nestham Pro</b>
          <p>Connect your farm data, AI and alerts in one workspace</p>
          <Link href="/auth">Upgrade <ArrowRight size={15}/></Link>
        </div>
      </aside>

      {menuOpen && <button className="sidebar-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}

      <main className="dash-main">
        <header className="dash-topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open sidebar"><Menu size={22}/></button>
          <form className="dash-search" onSubmit={openSearch}>
            <Search size={18}/>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search crops, diseases, markets, machinery, schemes..."/>
            <kbd>Ctrl K</kbd>
          </form>
          <div className="top-actions">
            <div className="dash-weather">
              <Sun size={27}/>
              <span><b>28°C</b><small>Hyderabad, TS</small></span>
            </div>
            <button className="language">EN <ChevronDown size={14}/></button>
            <Link href="/notifications" className="top-icon"><Bell size={19}/><i>3</i></Link>
            <button className="top-icon" onClick={() => setNight(v => !v)} aria-label="Toggle night mode"><Moon size={19}/></button>
            <Link href={user ? '/profile' : '/auth'} className="profile-chip">
              <UserCircle size={37}/>
              <span>
                <b>{user?.name || 'Farmer'}</b>
                <small>{user?.role ? String(user.role).toUpperCase() : 'Farmer'}</small>
              </span>
              <ChevronDown size={15}/>
            </Link>
          </div>
        </header>

        <div className="dash-content">
          <section className="dash-hero" style={{ minHeight: 350 }}>
            <div className="hero-sky"><div className="sun-orb"/><div className="hill hill-one"/><div className="hill hill-two"/><div className="field-lines"/><div className="drone">✈</div></div>
            <div className="hero-copy">
              <p className="hero-mini">SMART FARMING COMMAND CENTER</p>
              <h1>{farmerGreeting}</h1>
              <p>Let’s make farming smarter, easier and more profitable.</p>
            </div>
            <div className="copilot-mini">
              <div className="copilot-title">
                <span><Zap size={20}/></span>
                <div>
                  <b>Rythu Dost</b>
                  <small><i/> Your AI Farming Companion</small>
                </div>
              </div>
              <Link href="/copilot">Ask anything... <ArrowRight size={18}/></Link>
            </div>
            <div className="hero-actions" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              <Link href="/doctor">
                <span className="quick green"><Camera size={22}/></span>
                <b>Scan Crop</b>
                <small>Detect disease with AI</small>
              </Link>
              <Link href="/copilot">
                <span className="quick blue"><Bot size={22}/></span>
                <b>Ask Rythu Dost</b>
                <small>AI farming companion</small>
              </Link>
              <Link href="/crops">
                <span className="quick orange"><Leaf size={22}/></span>
                <b>My Crops</b>
                <small>Manage your farm</small>
              </Link>
              <Link href="/weather">
                <span className="quick purple"><CloudRain size={22}/></span>
                <b>Weather</b>
                <small>7-day forecast & alerts</small>
              </Link>
              <Link href="/market">
                <span className="quick green"><TrendingUp size={22}/></span>
                <b>Market Prices</b>
                <small>Live mandi rates</small>
              </Link>
              <Link href="/schemes">
                <span className="quick blue"><MessageCircle size={22}/></span>
                <b>Govt Schemes</b>
                <small>PM-KISAN & subsidies</small>
              </Link>
              <Link href="/machinery">
                <span className="quick orange"><Tractor size={22}/></span>
                <b>Farm Machinery</b>
                <small>Rent & service tools</small>
              </Link>
              <Link href="/marketplace">
                <span className="quick purple"><ShoppingCart size={22}/></span>
                <b>Sell Produce</b>
                <small>Buy & sell farm crops</small>
              </Link>
            </div>
          </section>

          <section className="dashboard-grid-top">
            <div className="iot-live-card glass-card">
              <div className="card-head">
                <div className="title-with-icon">
                  <span className="section-icon green-icon"><Wifi size={21}/></span>
                  <div>
                    <h2>Farm IoT Live Data</h2>
                    <span className="live-status"><i/> Live</span>
                  </div>
                </div>
                <div className="field-select">Field 1 - Main Farm <ChevronDown size={16}/></div>
              </div>
              <div className="sensor-grid">
                {sensors.map((s, i) => {
                  const Icon = s.icon;
                  const val = s.value;
                  const meter = typeof val === 'number' ? Math.max(10, Math.min(100, Number(val))) : 75;
                  return (
                    <div className={`sensor ${s.tone}`} key={s.label}>
                      <div className="sensor-row">
                        <span className="sensor-icon"><Icon size={19}/></span>
                        <span className="sensor-state">{i === 0 ? 'Watch' : i === 1 ? 'Good' : 'Normal'}</span>
                      </div>
                      <small>{s.label}</small>
                      <strong>{val}{s.unit && <em>{s.unit}</em>}</strong>
                      <div className="sensor-meter"><span style={{ width: `${meter}%` }}/></div>
                      <p>{s.optimal}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="insights-card glass-card">
              <div className="card-head">
                <div className="title-with-icon">
                  <span className="section-icon purple-icon"><Sparkles size={21}/></span>
                  <h2>AI Farm Insights</h2>
                </div>
                <span className="beta"><i/>Beta <ChevronRight size={13}/></span>
              </div>
              <div className="insight-list">
                {aiInsight ? (
                  <Link href="/copilot" className={`insight-row ${aiInsight.priority === 'high' ? 'orange' : aiInsight.priority === 'medium' ? 'blue' : 'green'}`}>
                    <span><Sparkles size={17}/></span>
                    <p><b>{aiInsight.headline}</b><br/>{aiInsight.explanation}</p>
                    <ChevronRight size={15}/>
                  </Link>
                ) : (
                  insights.map(([text, Icon, tone]) => (
                    <Link href="/copilot" className={`insight-row ${tone}`} key={text as string}>
                      <span><Icon size={17}/></span>
                      <p>{text as string}</p>
                      <ChevronRight size={15}/>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="dashboard-grid-main">
            <div className="trend-card glass-card">
              <div className="card-head">
                <div className="title-with-icon">
                  <span className="section-icon green-icon"><Activity size={21}/></span>
                  <div>
                    <h2>Sensor Trends <small>(Last 24 Hours)</small></h2>
                  </div>
                </div>
                <div className="range-tabs">
                  <button className="active">24H</button>
                  <button>7D</button>
                  <button>30D</button>
                  <button aria-label="expand">⛶</button>
                </div>
              </div>
              <div className="metric-tabs">
                {['Soil Moisture', 'Temperature', 'Humidity', 'Soil pH', 'Light'].map(m => (
                  <button key={m} className={metric === m ? 'active' : ''} onClick={() => setMetric(m)}>{m}</button>
                ))}
              </div>
              <div className="chart-wrap">
                <div className="chart-grid">
                  {[100, 80, 60, 40, 20, 0].map(n => <span key={n}>{n}%</span>)}
                </div>
                <Sparkline/>
                <div className="chart-tooltip">
                  <b>{metric === 'Soil Moisture' ? '42%' : metric === 'Temperature' ? '28.6°C' : metric === 'Humidity' ? '67%' : metric === 'Soil pH' ? '6.8' : '72%'}</b>
                  <small>10:00 AM</small>
                </div>
                <div className="chart-labels">
                  <span>12AM</span><span>4AM</span><span>8AM</span><span>12PM</span><span>4PM</span><span>8PM</span><span>12AM</span>
                </div>
              </div>
            </div>

            <div className="alerts-card glass-card">
              <div className="card-head">
                <div className="title-with-icon">
                  <span className="section-icon orange-icon"><Bell size={21}/></span>
                  <h2>Real-time Alerts <b>3</b></h2>
                </div>
                <Link href="/notifications">View All <ChevronRight size={14}/></Link>
              </div>
              <div className="alert-list">
                {alerts.map(([title, desc, badge, tone, Icon]) => (
                  <div className="alert-row" key={title as string}>
                    <span className={`alert-icon ${tone}`}><Icon size={19}/></span>
                    <div>
                      <b>{title as string}</b>
                      <p>{desc as string}</p>
                      <small>2 mins ago</small>
                    </div>
                    <em className={tone as string}>{badge as string}</em>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="recommendation glass-card">
              <div className="card-head">
                <div className="title-with-icon">
                  <span className="section-icon green-icon"><Sparkles size={21}/></span>
                  <div>
                    <h2>AI Recommendation</h2>
                    <small>Based on current sensor data and weather forecast</small>
                  </div>
                </div>
              </div>
              <div className="recommendation-body">
                <span><Droplets size={23}/></span>
                <p>It is recommended to irrigate <b>Field 1</b> within <b>6–8 hours</b> to maintain optimal soil moisture for better crop growth.</p>
                <ChevronRight size={20}/>
              </div>
            </div>

            <div className="tasks glass-card">
              <div className="card-head">
                <div className="title-with-icon">
                  <span className="section-icon yellow-icon">☷</span>
                  <h2>Today’s Farm Tasks</h2>
                </div>
                <Link href="/tasks">View All <ChevronRight size={14}/></Link>
              </div>
              <div className="task-list">
                <label><input type="checkbox"/> Check soil moisture (Field 1)<em>High</em></label>
                <label><input type="checkbox"/> Inspect crop for pests<em>Medium</em></label>
                <label><input type="checkbox"/> Water the vegetable section<em>Medium</em></label>
                <label><input type="checkbox"/> Update farm records<em>Low</em></label>
              </div>
            </div>

            <div className="live-view glass-card">
              <div className="card-head">
                <div className="title-with-icon">
                  <span className="section-icon green-icon"><Camera size={21}/></span>
                  <h2>Live Farm View</h2>
                </div>
                <Link href="/farm">View All <ChevronRight size={14}/></Link>
              </div>
              <div className="farm-video">
                <div className="video-scene"><div className="video-sun"/><div className="video-hill"/><div className="video-field"/><div className="video-play"><Play size={21} fill="currentColor"/></div></div>
                <span className="live-tag"><i/> Live</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
