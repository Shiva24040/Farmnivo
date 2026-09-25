'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowRight, BrainCircuit, CloudRain, Droplets, Gauge, Leaf, Lightbulb, RefreshCw, Thermometer, Wifi, Wind, Zap, Waves, ShieldCheck, AlertTriangle } from 'lucide-react';

type Sensor = { key: string; label: string; value: number; unit: string; min: number; max: number; status: 'good' | 'watch' | 'action' };
type Point = { time: string; moisture: number; temperature: number; humidity: number; ph: number; light: number };
type IoTData = { mode: string; updatedAt: string; sensors: Sensor[]; history: Point[]; insights: string[] };

const icons: Record<string, any> = { moisture: Droplets, temperature: Thermometer, humidity: Waves, ph: Leaf, light: Zap, rainfall: CloudRain, tank: Gauge, air: Wind };

function Sparkline({ data, field }: { data: Point[]; field: keyof Point }) {
  const values = data.map((p) => Number(p[field]));
  const min = Math.min(...values); const max = Math.max(...values); const range = max - min || 1;
  const points = values.map((v, i) => `${(i / (values.length - 1)) * 100},${92 - ((v - min) / range) * 78}`).join(' ');
  return <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="iot-sparkline" aria-label={`${String(field)} trend`}><polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /></svg>;
}

function statusLabel(status: Sensor['status']) { return status === 'good' ? 'Optimal' : status === 'watch' ? 'Watch' : 'Action needed'; }

export default function FarmIoTPage() {
  const [data, setData] = useState<IoTData | null>(null);
  const [loading, setLoading] = useState(true);
  const [metric, setMetric] = useState<keyof Point>('moisture');
  const [paused, setPaused] = useState(false);

  async function load() {
    try { const r = await fetch('/api/iot', { cache: 'no-store' }); setData(await r.json()); } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);
  useEffect(() => { if (paused) return; const id = setInterval(load, 5000); return () => clearInterval(id); }, [paused]);

  const selected = useMemo(() => data?.history ?? [], [data]);
  const active = data?.sensors.find((s) => s.key === metric);
  const actionCount = data?.sensors.filter((s) => s.status === 'action').length ?? 0;
  const watchCount = data?.sensors.filter((s) => s.status === 'watch').length ?? 0;

  return <div className="page iot-page">
    <div className="container">
      <section className="iot-hero fade">
        <div>
          <div className="iot-kicker"><span className="pulse-dot" /> Rythu Nestham Smart IoT · Live Gateway</div>
          <h1 className="iot-title">Turn sensor data into <span>farm intelligence.</span></h1>
          <p className="iot-subtitle">Connect a field gateway to stream real sensor readings, visualize trends and convert telemetry into practical farming recommendations.</p>
          <div className="iot-actions"><Link href="/copilot" className="btn btn-primary"><BrainCircuit size={17}/> Ask Rythu Nestham AI <ArrowRight size={15}/></Link><button className="btn btn-soft" onClick={() => setPaused(!paused)}>{paused ? <Wifi size={17}/> : <Activity size={17}/>} {paused ? 'Resume live updates' : 'Live updates running'}</button></div>
        </div>
        <div className="iot-hero-orbit"><div className="orbit-ring ring-a"/><div className="orbit-ring ring-b"/><div className="orbit-core"><Leaf size={35}/><strong>IoT</strong><span>INTELLIGENCE</span></div></div>
      </section>

      <section className="iot-status-row fade" style={{animationDelay: '.08s'}}>
        <div className="iot-status-card"><span className="status-icon good"><ShieldCheck size={20}/></span><div><b>{data?.mode === 'live' ? 'Live telemetry online' : data?.mode === 'waiting' ? 'Waiting for sensor gateway' : 'Connecting…'}</b><span>{data ? `Updated ${new Date(data.updatedAt).toLocaleTimeString()}` : 'Loading sensor stream'}</span></div></div>
        <div className="iot-status-card"><span className="status-icon purple"><Activity size={20}/></span><div><b>24-hour history</b><span>{selected.length} readings</span></div></div>
        <div className="iot-status-card"><span className={`status-icon ${actionCount ? 'red' : 'green'}`}><AlertTriangle size={20}/></span><div><b>{actionCount} action alerts</b><span>{watchCount} sensors need watching</span></div></div>
      </section>

      <section className="iot-section fade" style={{animationDelay: '.14s'}}>
        <div className="section-head"><div><div className="eyebrow">Field 01 · Main Farm</div><h2 className="h2">Farm IoT live data</h2></div><div className="live-badge"><span className="pulse-dot"/> LIVE</div></div>
        <div className="iot-sensor-grid">
          {loading ? Array.from({length:8}).map((_,i)=><div className="sensor-card skeleton" key={i}/>) : data?.sensors.map((sensor) => { const Icon=icons[sensor.key]||Gauge; const percent=Math.max(5,Math.min(100,((sensor.value-sensor.min)/(Math.max(0.1,sensor.max-sensor.min)))*100)); return <div className={`sensor-card ${sensor.status}`} key={sensor.key}>
            <div className="sensor-top"><span className="sensor-icon"><Icon size={19}/></span><span className={`sensor-status ${sensor.status}`}>{statusLabel(sensor.status)}</span></div>
            <div className="sensor-label">{sensor.label}</div><div className="sensor-value">{sensor.value}<small>{sensor.unit}</small></div>
            <div className="meter"><span style={{width:`${percent}%`}}/></div><div className="sensor-range">Target {sensor.min}–{sensor.max}{sensor.unit}</div>
          </div> })}
        </div>
      </section>

      <section className="iot-main-grid fade" style={{animationDelay: '.2s'}}>
        <div className="iot-chart-card">
          <div className="section-head"><div><div className="eyebrow">Sensor history</div><h2 className="h2">Last 24 hours</h2></div><button className="icon-btn" onClick={load} title="Refresh data"><RefreshCw size={17}/></button></div>
          <div className="metric-tabs">{([['moisture','Soil moisture'],['temperature','Temperature'],['humidity','Humidity'],['ph','Soil pH'],['light','Light']] as const).map(([key,label])=><button key={key} className={metric===key?'active':''} onClick={()=>setMetric(key)}>{label}</button>)}</div>
          <div className="chart-shell"><div className="chart-grid-lines"><i/><i/><i/><i/></div>{selected.length>0&&<Sparkline data={selected} field={metric}/>}<div className="chart-tooltip"><span>{active?.label}</span><b>{active?.value}{active?.unit}</b><small>Now</small></div></div>
          <div className="chart-axis"><span>24h ago</span><span>18h</span><span>12h</span><span>6h</span><span>Now</span></div>
        </div>
        <aside className="iot-ai-card"><div className="ai-card-top"><div className="ai-icon"><BrainCircuit size={22}/></div><div><div className="eyebrow">Rythu Nestham intelligence</div><h2>AI sensor insights</h2></div><span className="beta-dot">● Live</span></div><div className="insight-list">{(data?.insights ?? ['Waiting for live sensor readings…']).map((x,i)=><div className="insight" key={i}><span>{i===0?<Droplets size={17}/>:i===1?<Thermometer size={17}/>:i===2?<Wind size={17}/>:<Lightbulb size={17}/>}</span><p>{x}</p><ArrowRight size={15}/></div>)}</div><Link className="ai-link" href="/copilot">Continue with AI Copilot <ArrowRight size={15}/></Link></aside>
      </section>

      <section className="iot-bottom-grid fade" style={{animationDelay: '.26s'}}>
        <div className="card iot-explain"><div className="eyebrow">Why this matters</div><h2 className="h2">Connect hardware when you are ready.</h2><p className="muted">Rythu Nestham accepts authenticated sensor-gateway readings, stores them in PostgreSQL, visualizes trends, and passes the data into the farming intelligence workflow.</p><div className="flow"><span>Sensor gateway</span><ArrowRight size={16}/><span>Data stream</span><ArrowRight size={16}/><span>Dashboard</span><ArrowRight size={16}/><span>AI insight</span></div></div>
        <div className="card"><div className="eyebrow">Gateway readiness</div><h2 className="h2">Built for your project presentation</h2><div className="check-list"><div>✓ Authenticated gateway ingestion</div><div>✓ PostgreSQL sensor history</div><div>✓ Live dashboard refresh</div><div>✓ Sensor trend visualization</div><div>✓ Farm intelligence</div><div>✓ Connects to Rythu Nestham Copilot</div></div></div>
      </section>
    </div>
  </div>;
}
