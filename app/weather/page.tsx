'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  MapPin,
  Crosshair,
  MoreVertical,
  Search,
  RefreshCw,
  Wind,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight,
  TrendingUp,
  BarChart2,
  Layers,
  ThermometerSun
} from 'lucide-react';

const QUICK_CITIES = [
  'Hyderabad',
  'Delhi',
  'Mumbai',
  'Bengaluru',
  'Chennai',
  'Kolkata',
  'Warangal',
  'Vijayawada',
  'Guntur',
  'Visakhapatnam',
  'Tirupati',
  'Nizamabad',
  'Karimnagar',
  'Pune',
  'Jaipur',
  'Chandigarh',
  'Lucknow',
  'Patna'
];

function getWeatherInfo(code: number) {
  switch (code) {
    case 0:
      return { label: 'Clear sky', icon: 'sunny' };
    case 1:
      return { label: 'Mainly clear', icon: 'partly-cloudy' };
    case 2:
      return { label: 'Partly cloudy', icon: 'partly-cloudy' };
    case 3:
      return { label: 'Cloudy', icon: 'cloudy' };
    case 45:
    case 48:
      return { label: 'Fog', icon: 'fog' };
    case 51:
    case 53:
    case 55:
      return { label: 'Drizzle', icon: 'drizzle' };
    case 56:
    case 57:
      return { label: 'Freezing drizzle', icon: 'drizzle' };
    case 61:
    case 63:
    case 65:
      return { label: 'Rain', icon: 'rain' };
    case 71:
    case 73:
    case 75:
      return { label: 'Snow fall', icon: 'snow' };
    case 80:
    case 81:
    case 82:
      return { label: 'Rain showers', icon: 'rain' };
    case 95:
    case 96:
    case 99:
      return { label: 'Thunderstorm', icon: 'thunderstorm' };
    default:
      return { label: 'Cloudy', icon: 'cloudy' };
  }
}

function WeatherIcon({ type, size = 42 }: { type: string; size?: number }) {
  if (type === 'sunny' || type === 'clear') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ flexShrink: 0 }}>
        <defs>
          <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb300" />
            <stop offset="80%" stopColor="#f57c00" />
            <stop offset="100%" stopColor="#e65100" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="16" fill="url(#sunGrad)" />
        <g stroke="#f57c00" strokeWidth="3" strokeLinecap="round">
          <line x1="32" y1="6" x2="32" y2="11" />
          <line x1="32" y1="53" x2="32" y2="58" />
          <line x1="6" y1="32" x2="11" y2="32" />
          <line x1="53" y1="32" x2="58" y2="32" />
          <line x1="13.5" y1="13.5" x2="17.5" y2="17.5" />
          <line x1="46.5" y1="46.5" x2="50.5" y2="50.5" />
          <line x1="13.5" y1="50.5" x2="17.5" y2="46.5" />
          <line x1="46.5" y1="17.5" x2="50.5" y2="13.5" />
        </g>
      </svg>
    );
  }

  if (type === 'partly-cloudy') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="cloudGradPC" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#c5cbd2" />
          </linearGradient>
          <radialGradient id="sunGradPC" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb300" />
            <stop offset="100%" stopColor="#f57c00" />
          </radialGradient>
          <filter id="pcShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.18" />
          </filter>
        </defs>
        <circle cx="27" cy="25" r="13" fill="url(#sunGradPC)" />
        <path
          d="M48 45H22C17.03 45 13 40.97 13 36C13 31.42 16.42 27.64 20.89 27.07C22.42 20.32 28.46 15.2 35.7 15.2C44.02 15.2 50.84 21.6 51.5 29.8C55.45 30.85 58.4 34.45 58.4 38.8C58.4 44.1 54.1 45 48 45Z"
          fill="url(#cloudGradPC)"
          filter="url(#pcShadow)"
        />
      </svg>
    );
  }

  if (type === 'rain' || type === 'showers' || type === 'drizzle') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="cloudGradRain" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>
        <path
          d="M46 35H20C15.58 35 12 31.42 12 27C12 22.83 15.2 19.41 19.27 19.04C20.68 13.29 25.86 9 32 9C39.2 9 45.11 14.42 45.89 21.38C49.38 22.36 52 25.55 52 29.4C52 34.15 48.15 35 46 35Z"
          fill="url(#cloudGradRain)"
        />
        <g stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round">
          <line x1="20" y1="41" x2="16" y2="51" />
          <line x1="29" y1="41" x2="25" y2="51" />
          <line x1="38" y1="41" x2="34" y2="51" />
        </g>
      </svg>
    );
  }

  if (type === 'thunderstorm') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="cloudGradTS" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>
        <path
          d="M46 34H20C15.58 34 12 30.42 12 26C12 21.83 15.2 18.41 19.27 18.04C20.68 12.29 25.86 8 32 8C39.2 8 45.11 13.42 45.89 20.38C49.38 21.36 52 24.55 52 28.4C52 33.15 48.15 34 46 34Z"
          fill="url(#cloudGradTS)"
        />
        <polygon points="31,35 25,45 30,45 26,55 37,43 32,43" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id="cloudGreyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d5dbe1" />
          <stop offset="100%" stopColor="#9aa0a6" />
        </linearGradient>
        <filter id="cloudShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000" floodOpacity="0.14" />
        </filter>
      </defs>
      <path
        d="M48 44H20C14.48 44 10 39.52 10 34C10 28.8 13.98 24.52 19.07 24.05C20.66 17.15 26.84 12 34.2 12C42.87 12 49.97 18.83 50.38 27.41C54.67 28.32 58 32.15 58 36.8C58 42.1 53.62 44 48 44Z"
        fill="url(#cloudGreyGrad)"
        filter="url(#cloudShadow)"
      />
    </svg>
  );
}

function WindArrow({ degree }: { degree: number }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        margin: '2px auto'
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          transform: `rotate(${degree - 90}deg)`,
          transition: 'transform 0.4s ease'
        }}
      >
        <path
          d="M4 12h14M12 5l7 7-7 7"
          stroke="#9aa0a6"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Spline generator for smooth graph curves
function getSplinePath(points: { x: number; y: number }[]) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function getBandAreaPath(highPts: { x: number; y: number }[], lowPts: { x: number; y: number }[]) {
  if (highPts.length < 2 || lowPts.length < 2) return '';
  const highSpline = getSplinePath(highPts);
  const revLow = [...lowPts].reverse();
  let d = highSpline + ` L ${revLow[0].x.toFixed(1)} ${revLow[0].y.toFixed(1)}`;
  for (let i = 0; i < revLow.length - 1; i++) {
    const p0 = revLow[i === 0 ? 0 : i - 1];
    const p1 = revLow[i];
    const p2 = revLow[i + 1];
    const p3 = revLow[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  d += ' Z';
  return d;
}

export default function Weather() {
  const [d, setD] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [locationInput, setLocationInput] = useState('Hyderabad');
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [activeTab, setActiveTab] = useState<'temperature' | 'precipitation' | 'wind'>('temperature');
  
  // Week Graph State
  const [weekGraphMode, setWeekGraphMode] = useState<'combined' | 'temperature' | 'rain'>('combined');
  const [viewMode, setViewMode] = useState<'graph' | 'cards'>('graph');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const fetchWeather = async (params: { location?: string; lat?: number; lon?: number }) => {
    setLoading(true);
    try {
      let url = '/api/weather?';
      if (params.lat !== undefined && params.lon !== undefined) {
        url += `lat=${params.lat}&lon=${params.lon}`;
      } else {
        url += `location=${encodeURIComponent(params.location || 'Hyderabad')}`;
      }
      const res = await fetch(url, { cache: 'no-store' });
      const data = await res.json();
      setD(data);
      if (data.location) {
        const primary = data.location.split(',')[0].trim();
        setSelectedCity(primary);
      }
    } catch (e) {
      console.error('Weather fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather({ location: 'Hyderabad' });
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationInput.trim()) return;
    setSelectedCity(locationInput.trim());
    fetchWeather({ location: locationInput.trim() });
  };

  const handleCityClick = (city: string) => {
    setLocationInput(city);
    setSelectedCity(city);
    fetchWeather({ location: city });
  };

  const handlePreciseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => {
        setLoading(false);
        alert('Could not obtain GPS location. Please check location permissions.');
      },
      { timeout: 10000 }
    );
  };

  const displayTemp = (celsius?: number) => {
    if (celsius === undefined || celsius === null) return '--';
    if (unit === 'C') return Math.round(celsius);
    return Math.round((celsius * 9) / 5 + 32);
  };

  const displayExactTemp = (celsius?: number) => {
    if (celsius === undefined || celsius === null) return '--';
    if (unit === 'C') return Number(celsius).toFixed(1);
    return ((celsius * 9) / 5 + 32).toFixed(1);
  };

  // Format current live header time
  const currentTimeString = useMemo(() => {
    const now = new Date();
    const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
    let h = now.getHours();
    const ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    if (h === 0) h = 12;
    return `${weekday}, ${h}:00 ${ampm}`;
  }, []);

  // Compute 8 hourly points
  const hourlyPoints = useMemo(() => {
    if (!d?.hourly?.time || d.hourly.time.length === 0) return [];
    const now = new Date();
    const currentIsoHour = now.toISOString().slice(0, 13);
    let startIdx = d.hourly.time.findIndex((t: string) => t >= currentIsoHour);
    if (startIdx === -1) startIdx = 0;

    const points = [];
    const step = 3;
    for (let i = 0; i < 8; i++) {
      const idx = startIdx + i * step;
      if (idx < d.hourly.time.length) {
        const timeStr = d.hourly.time[idx];
        const dt = new Date(timeStr);
        let h = dt.getHours();
        const ampm = h >= 12 ? 'pm' : 'am';
        h = h % 12;
        if (h === 0) h = 12;

        const temp = d.hourly.temperature_2m[idx];
        const rainProb = d.hourly.precipitation_probability ? d.hourly.precipitation_probability[idx] : 0;
        const windSpeed = d.hourly.wind_speed_10m ? Math.round(d.hourly.wind_speed_10m[idx]) : 0;
        const windDir = d.hourly.wind_direction_10m ? Math.round(d.hourly.wind_direction_10m[idx]) : 0;
        const code = d.hourly.weather_code ? d.hourly.weather_code[idx] : 0;

        points.push({
          timeLabel: `${h} ${ampm}`,
          temp,
          rainProb,
          windSpeed,
          windDir,
          code,
          weatherInfo: getWeatherInfo(code)
        });
      }
    }
    return points;
  }, [d]);

  // Daily points (7-8 days)
  const dailyPoints = useMemo(() => {
    if (!d?.daily?.time) return [];
    return d.daily.time.slice(0, 7).map((dateStr: string, idx: number) => {
      const dt = new Date(dateStr + 'T00:00:00');
      const dayShort = dt.toLocaleDateString('en-US', { weekday: 'short' });
      const dayFull = dt.toLocaleDateString('en-US', { weekday: 'long' });
      const dayMonth = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const code = d.daily.weather_code ? d.daily.weather_code[idx] : 1;
      const wInfo = getWeatherInfo(code);
      const maxC = d.daily.temperature_2m_max?.[idx] ?? 30;
      const minC = d.daily.temperature_2m_min?.[idx] ?? 22;
      const rainProb = d.daily.precipitation_probability_max?.[idx] ?? 0;
      const rainSum = d.daily.precipitation_sum?.[idx] ?? 0;

      return {
        index: idx,
        dateStr,
        dayShort: idx === 0 ? 'Today' : dayShort,
        dayFull,
        dayMonth,
        code,
        weatherInfo: wInfo,
        maxC,
        minC,
        rainProb,
        rainSum
      };
    });
  }, [d]);

  // Compute SVG coordinates for the 7-day Week Graph
  const graphData = useMemo(() => {
    if (!dailyPoints || dailyPoints.length === 0) return null;

    const width = 840;
    const height = 280;
    const leftMargin = 55;
    const rightMargin = 55;
    const topMargin = 55;
    const curveBottom = 165;
    const barBaseline = 250;

    const usableWidth = width - leftMargin - rightMargin;
    const n = dailyPoints.length;

    // Determine temperature bounds
    const allMax = Math.max(...dailyPoints.map((p: any) => p.maxC));
    const allMin = Math.min(...dailyPoints.map((p: any) => p.minC));
    const range = Math.max(allMax - allMin, 4);

    const highPts: { x: number; y: number }[] = [];
    const lowPts: { x: number; y: number }[] = [];
    const rainBars: any[] = [];

    dailyPoints.forEach((p: any, i: number) => {
      const x = leftMargin + (i * usableWidth) / (n - 1);
      
      // High temp Y
      const normHigh = (allMax + 1.5 - p.maxC) / (range + 3);
      const yHigh = topMargin + normHigh * 75;

      // Low temp Y
      const normLow = (allMax + 1.5 - p.minC) / (range + 3);
      const yLow = topMargin + normLow * 75;

      highPts.push({ x, y: yHigh });
      lowPts.push({ x, y: yLow });

      // Rain bar: max height 40px at barBaseline
      const barH = Math.max((p.rainProb / 100) * 45, p.rainProb > 0 ? 6 : 2);
      rainBars.push({
        x: x - 18,
        y: barBaseline - barH,
        width: 36,
        height: barH,
        rainProb: p.rainProb,
        rainSum: p.rainSum
      });
    });

    const highLinePath = getSplinePath(highPts);
    const lowLinePath = getSplinePath(lowPts);
    const bandPath = getBandAreaPath(highPts, lowPts);

    return {
      width,
      height,
      highPts,
      lowPts,
      highLinePath,
      lowLinePath,
      bandPath,
      rainBars
    };
  }, [dailyPoints]);

  const currentCondition = useMemo(() => {
    const code = d?.current?.weather_code ?? 3;
    return getWeatherInfo(code);
  }, [d]);

  const windSpeedKmh = Math.round(d?.current?.wind_speed_10m ?? 18);
  const humidityVal = d?.current?.relative_humidity_2m ?? 71;
  const precipVal = d?.current?.precipitation ?? d?.daily?.precipitation_probability_max?.[0] ?? 10;

  const activeSelectedDay = dailyPoints[selectedDayIndex] || dailyPoints[0];

  return (
    <div className="page" style={{ background: '#f8fafc', minHeight: '100vh', padding: '24px 0 60px' }}>
      <div className="container" style={{ maxWidth: 940 }}>
        {/* Top Eyebrow & Title */}
        <div style={{ marginBottom: 18 }}>
          <div className="eyebrow" style={{ color: '#1a73e8', letterSpacing: '0.08em' }}>
            Rythu Nestham Weather & Alerts
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: '4px 0 0', color: '#202124' }}>
            Live Forecast & Weekly Trends
          </h1>
        </div>

        {/* Search Bar & City Selector */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #dfe1e5',
            borderRadius: 16,
            padding: '16px 20px',
            marginBottom: 20,
            boxShadow: '0 1px 6px rgba(32,33,36,0.06)'
          }}
        >
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flex: 1,
                border: '1px solid #dfe1e5',
                borderRadius: 10,
                padding: '8px 14px',
                background: '#f8fafc'
              }}
            >
              <Search size={18} color="#5f6368" />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Search Indian city, district, or mandal..."
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: 14,
                  color: '#202124'
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                borderRadius: 10,
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <RefreshCw size={15} className={loading ? 'spin' : ''} />
              {loading ? 'Fetching...' : 'Search'}
            </button>
          </form>

          {/* Quick Indian City Chips */}
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#5f6368', marginBottom: 8 }}>
              Quick Indian Cities:
            </div>
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                maxHeight: 76,
                overflowY: 'auto'
              }}
            >
              {QUICK_CITIES.map((c) => {
                const isActive = selectedCity.toLowerCase() === c.toLowerCase();
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCityClick(c)}
                    style={{
                      border: isActive ? '1px solid #1a73e8' : '1px solid #dadce0',
                      background: isActive ? '#e8f0fe' : '#ffffff',
                      color: isActive ? '#1a73e8' : '#3c4043',
                      fontWeight: isActive ? 600 : 500,
                      borderRadius: 9999,
                      padding: '5px 12px',
                      fontSize: 13,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* GOOGLE WEATHER CURRENT CARD */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #dadce0',
            borderRadius: 18,
            padding: '24px 28px',
            boxShadow: '0 1px 6px rgba(32,33,36,0.1)',
            position: 'relative',
            marginBottom: 20
          }}
        >
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                color: '#1a73e8'
              }}
            >
              <RefreshCw size={14} className="spin" /> Updating live data...
            </div>
          )}

          {/* Location Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={20} color="#202124" />
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#202124',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {d?.location || 'Hyderabad, Telangana'}
                </span>
              </div>

              {/* Use precise location pill button */}
              <button
                type="button"
                onClick={handlePreciseLocation}
                title="Use current GPS location"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  border: '1px solid #dadce0',
                  background: '#ffffff',
                  color: '#1a73e8',
                  borderRadius: 9999,
                  padding: '5px 14px',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(60,64,67,0.08)'
                }}
              >
                <Crosshair size={14} color="#1a73e8" />
                Use precise location
              </button>
            </div>

            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#5f6368',
                padding: 4
              }}
            >
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Main Weather Display Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 20,
              marginBottom: 24
            }}
          >
            {/* Left Block: Icon + Big Temp + Metrics */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <WeatherIcon type={currentCondition.icon} size={64} />

              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontSize: 64,
                    lineHeight: 1,
                    fontWeight: 400,
                    color: '#202124',
                    fontFamily: 'Roboto, Inter, sans-serif'
                  }}
                >
                  {displayTemp(d?.current?.temperature_2m ?? 26)}
                </span>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 6,
                    marginTop: 2
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setUnit('C')}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontSize: 17,
                      fontWeight: unit === 'C' ? 700 : 400,
                      color: unit === 'C' ? '#202124' : '#70757a',
                      cursor: 'pointer'
                    }}
                  >
                    °C
                  </button>
                  <span style={{ margin: '0 3px', fontSize: 17, color: '#70757a' }}>|</span>
                  <button
                    type="button"
                    onClick={() => setUnit('F')}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontSize: 17,
                      fontWeight: unit === 'F' ? 700 : 400,
                      color: unit === 'F' ? '#202124' : '#70757a',
                      cursor: 'pointer'
                    }}
                  >
                    °F
                  </button>
                </div>
              </div>

              {/* Stacked Parameters (Precipitation, Humidity, Wind) */}
              <div
                style={{
                  marginLeft: 14,
                  fontSize: 13,
                  lineHeight: '1.6',
                  color: '#70757a',
                  borderLeft: '1px solid #f1f3f4',
                  paddingLeft: 14
                }}
              >
                <div>Precipitation: {precipVal}%</div>
                <div>Humidity: {humidityVal}%</div>
                <div>Wind: {windSpeedKmh} km/h</div>
              </div>
            </div>

            {/* Right Block: Weather, Day/Time, Condition */}
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: '#202124',
                  marginBottom: 2
                }}
              >
                Weather
              </div>
              <div style={{ fontSize: 14, color: '#70757a', marginBottom: 2 }}>
                {currentTimeString}
              </div>
              <div style={{ fontSize: 14, color: '#70757a' }}>
                {currentCondition.label}
              </div>
            </div>
          </div>

          {/* Interactive Metric Tabs for Hourly Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #e8eaed',
              marginBottom: 18
            }}
          >
            {/* Temperature Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('temperature')}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 18px',
                fontSize: 14,
                fontWeight: activeTab === 'temperature' ? 600 : 400,
                color: activeTab === 'temperature' ? '#202124' : '#70757a',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              Temperature
              {activeTab === 'temperature' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: -1,
                    left: 18,
                    right: 18,
                    height: 3,
                    background: '#fbbc04',
                    borderRadius: 2
                  }}
                />
              )}
            </button>

            <span style={{ color: '#dadce0', fontSize: 16 }}>|</span>

            {/* Precipitation Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('precipitation')}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 18px',
                fontSize: 14,
                fontWeight: activeTab === 'precipitation' ? 600 : 400,
                color: activeTab === 'precipitation' ? '#202124' : '#70757a',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              Precipitation
              {activeTab === 'precipitation' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: -1,
                    left: 18,
                    right: 18,
                    height: 3,
                    background: '#fbbc04',
                    borderRadius: 2
                  }}
                />
              )}
            </button>

            <span style={{ color: '#dadce0', fontSize: 16 }}>|</span>

            {/* Wind Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('wind')}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 18px',
                fontSize: 14,
                fontWeight: activeTab === 'wind' ? 600 : 400,
                color: activeTab === 'wind' ? '#202124' : '#70757a',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              Wind
              {activeTab === 'wind' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: -1,
                    left: 18,
                    right: 18,
                    height: 3,
                    background: '#fbbc04',
                    borderRadius: 2
                  }}
                />
              )}
            </button>
          </div>

          {/* Hourly Timeline Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              textAlign: 'center',
              padding: '6px 0 12px',
              overflowX: 'auto'
            }}
          >
            {hourlyPoints.map((pt, i) => (
              <div key={i} style={{ padding: '0 4px' }}>
                <div
                  style={{
                    fontSize: 13,
                    color: '#202124',
                    fontWeight: 400,
                    marginBottom: 6,
                    height: 20
                  }}
                >
                  {activeTab === 'wind' && `${pt.windSpeed} km/h`}
                  {activeTab === 'temperature' && `${displayTemp(pt.temp)}°`}
                  {activeTab === 'precipitation' && `${pt.rainProb}%`}
                </div>

                <div
                  style={{
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {activeTab === 'wind' && <WindArrow degree={pt.windDir} />}
                  {activeTab === 'temperature' && (
                    <WeatherIcon type={pt.weatherInfo.icon} size={28} />
                  )}
                  {activeTab === 'precipitation' && (
                    <div style={{ color: '#1a73e8', display: 'flex', alignItems: 'center' }}>
                      <Droplets size={20} />
                    </div>
                  )}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: '#70757a',
                    marginTop: 6
                  }}
                >
                  {pt.timeLabel}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* ⭐ THE 7-DAY WEEK GRAPH (TRANSFORMED FROM USER IMAGE) ⭐ */}
        {/* ---------------------------------------------------- */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #dadce0',
            borderRadius: 18,
            padding: '24px 26px',
            boxShadow: '0 1px 6px rgba(32,33,36,0.1)',
            marginBottom: 20
          }}
        >
          {/* Header of Week Graph */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 16,
              borderBottom: '1px solid #f1f3f4',
              paddingBottom: 14
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={22} color="#1a73e8" />
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#202124' }}>
                  7-Day Week Forecast Graph
                </h2>
              </div>
              <p style={{ margin: '3px 0 0', fontSize: 12, color: '#70757a' }}>
                High & Low temperature trajectories with daily precipitation probabilities
              </p>
            </div>

            {/* Mode Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Metric filter buttons */}
              <div
                style={{
                  display: 'flex',
                  background: '#f1f3f4',
                  borderRadius: 10,
                  padding: 3
                }}
              >
                <button
                  type="button"
                  onClick={() => setWeekGraphMode('combined')}
                  style={{
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: weekGraphMode === 'combined' ? 600 : 500,
                    background: weekGraphMode === 'combined' ? '#ffffff' : 'transparent',
                    color: weekGraphMode === 'combined' ? '#202124' : '#5f6368',
                    cursor: 'pointer',
                    boxShadow: weekGraphMode === 'combined' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  Combined
                </button>
                <button
                  type="button"
                  onClick={() => setWeekGraphMode('temperature')}
                  style={{
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: weekGraphMode === 'temperature' ? 600 : 500,
                    background: weekGraphMode === 'temperature' ? '#ffffff' : 'transparent',
                    color: weekGraphMode === 'temperature' ? '#202124' : '#5f6368',
                    cursor: 'pointer',
                    boxShadow: weekGraphMode === 'temperature' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  Temperature
                </button>
                <button
                  type="button"
                  onClick={() => setWeekGraphMode('rain')}
                  style={{
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: weekGraphMode === 'rain' ? 600 : 500,
                    background: weekGraphMode === 'rain' ? '#ffffff' : 'transparent',
                    color: weekGraphMode === 'rain' ? '#202124' : '#5f6368',
                    cursor: 'pointer',
                    boxShadow: weekGraphMode === 'rain' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  Rain Probability
                </button>
              </div>

              {/* View mode toggle */}
              <div
                style={{
                  display: 'flex',
                  background: '#f1f3f4',
                  borderRadius: 10,
                  padding: 3
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode('graph')}
                  style={{
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 10px',
                    fontSize: 12,
                    fontWeight: viewMode === 'graph' ? 600 : 500,
                    background: viewMode === 'graph' ? '#ffffff' : 'transparent',
                    color: viewMode === 'graph' ? '#1a73e8' : '#5f6368',
                    cursor: 'pointer',
                    boxShadow: viewMode === 'graph' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  title="Graph View"
                >
                  📈 Graph
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  style={{
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 10px',
                    fontSize: 12,
                    fontWeight: viewMode === 'cards' ? 600 : 500,
                    background: viewMode === 'cards' ? '#ffffff' : 'transparent',
                    color: viewMode === 'cards' ? '#1a73e8' : '#5f6368',
                    cursor: 'pointer',
                    boxShadow: viewMode === 'cards' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  title="Cards View"
                >
                  🗂️ Cards
                </button>
              </div>
            </div>
          </div>

          {/* GRAPH VIEW */}
          {viewMode === 'graph' && graphData && (
            <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
              <svg
                viewBox={`0 0 ${graphData.width} ${graphData.height}`}
                style={{
                  width: '100%',
                  minWidth: 700,
                  height: 'auto',
                  overflow: 'visible'
                }}
              >
                <defs>
                  {/* High Temp Gradient Line */}
                  <linearGradient id="highGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>

                  {/* Low Temp Gradient Line */}
                  <linearGradient id="lowGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>

                  {/* Temperature Band Fill */}
                  <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.08" />
                  </linearGradient>

                  {/* Rain Bar Gradient */}
                  <linearGradient id="rainBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#1a73e8" />
                  </linearGradient>
                </defs>

                {/* Day Vertical Grid & Header Columns */}
                {dailyPoints.map((p: any, i: number) => {
                  const x = graphData.highPts[i]?.x ?? 0;
                  const isSelected = selectedDayIndex === i;

                  return (
                    <g key={p.dateStr}>
                      {/* Vertical highlight band for selected day */}
                      {isSelected && (
                        <rect
                          x={x - 48}
                          y={8}
                          width={96}
                          height={graphData.height - 12}
                          rx={12}
                          fill="#f1f3f4"
                          opacity={0.8}
                        />
                      )}

                      {/* Vertical guide line */}
                      <line
                        x1={x}
                        y1={52}
                        x2={x}
                        y2={graphData.height - 25}
                        stroke="#e2e8f0"
                        strokeDasharray="3 3"
                        strokeWidth={1}
                      />

                      {/* Day Label */}
                      <text
                        x={x}
                        y={24}
                        textAnchor="middle"
                        fill="#202124"
                        fontSize={13}
                        fontWeight={isSelected ? '700' : '600'}
                      >
                        {p.dayShort}
                      </text>

                      {/* Date subtitle (e.g. 26 Sep) */}
                      <text
                        x={x}
                        y={39}
                        textAnchor="middle"
                        fill="#70757a"
                        fontSize={11}
                        fontWeight="400"
                      >
                        {p.dayMonth}
                      </text>
                    </g>
                  );
                })}

                {/* TEMPERATURE BAND FILL */}
                {(weekGraphMode === 'combined' || weekGraphMode === 'temperature') && (
                  <path d={graphData.bandPath} fill="url(#bandGrad)" />
                )}

                {/* HIGH TEMPERATURE SPLINE CURVE */}
                {(weekGraphMode === 'combined' || weekGraphMode === 'temperature') && (
                  <>
                    <path
                      d={graphData.highLinePath}
                      fill="none"
                      stroke="url(#highGrad)"
                      strokeWidth={3.5}
                      strokeLinecap="round"
                    />

                    {/* High Temp Points & Value Labels */}
                    {graphData.highPts.map((pt, i) => {
                      const p = dailyPoints[i];
                      const isSelected = selectedDayIndex === i;
                      return (
                        <g
                          key={`high-${i}`}
                          onClick={() => setSelectedDayIndex(i)}
                          style={{ cursor: 'pointer' }}
                        >
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isSelected ? 6.5 : 4.5}
                            fill="#ffffff"
                            stroke="#ea580c"
                            strokeWidth={isSelected ? 3 : 2}
                          />

                          <text
                            x={pt.x}
                            y={pt.y - 10}
                            textAnchor="middle"
                            fill="#b45309"
                            fontSize={12}
                            fontWeight={700}
                          >
                            {displayExactTemp(p.maxC)}°
                          </text>
                        </g>
                      );
                    })}
                  </>
                )}

                {/* LOW TEMPERATURE SPLINE CURVE */}
                {(weekGraphMode === 'combined' || weekGraphMode === 'temperature') && (
                  <>
                    <path
                      d={graphData.lowLinePath}
                      fill="none"
                      stroke="url(#lowGrad)"
                      strokeWidth={3}
                      strokeLinecap="round"
                    />

                    {/* Low Temp Points & Value Labels */}
                    {graphData.lowPts.map((pt, i) => {
                      const p = dailyPoints[i];
                      const isSelected = selectedDayIndex === i;
                      return (
                        <g
                          key={`low-${i}`}
                          onClick={() => setSelectedDayIndex(i)}
                          style={{ cursor: 'pointer' }}
                        >
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isSelected ? 6 : 4}
                            fill="#ffffff"
                            stroke="#0284c7"
                            strokeWidth={isSelected ? 3 : 2}
                          />

                          <text
                            x={pt.x}
                            y={pt.y + 16}
                            textAnchor="middle"
                            fill="#0369a1"
                            fontSize={12}
                            fontWeight={600}
                          >
                            {displayExactTemp(p.minC)}°
                          </text>
                        </g>
                      );
                    })}
                  </>
                )}

                {/* PRECIPITATION PROBABILITY BARS (AT BOTTOM) */}
                {(weekGraphMode === 'combined' || weekGraphMode === 'rain') && (
                  <g>
                    <line
                      x1={45}
                      y1={250}
                      x2={graphData.width - 45}
                      y2={250}
                      stroke="#cbd5e1"
                      strokeWidth={1}
                    />

                    <text x={50} y={200} fill="#64748b" fontSize={11} fontWeight={600}>
                      Rain Chance (%)
                    </text>

                    {graphData.rainBars.map((bar, i) => {
                      const p = dailyPoints[i];
                      const xCenter = bar.x + bar.width / 2;
                      const hasRain = p.rainProb > 0;

                      return (
                        <g
                          key={`rain-${i}`}
                          onClick={() => setSelectedDayIndex(i)}
                          style={{ cursor: 'pointer' }}
                        >
                          <rect
                            x={bar.x}
                            y={bar.y}
                            width={bar.width}
                            height={bar.height}
                            rx={4}
                            fill={hasRain ? 'url(#rainBarGrad)' : '#e2e8f0'}
                          />

                          <text
                            x={xCenter}
                            y={bar.y - 5}
                            textAnchor="middle"
                            fill={hasRain ? '#0284c7' : '#94a3b8'}
                            fontSize={11}
                            fontWeight={hasRain ? 700 : 500}
                          >
                            {p.rainProb}%
                          </text>

                          {p.rainSum > 0 && (
                            <text
                              x={xCenter}
                              y={264}
                              textAnchor="middle"
                              fill="#0284c7"
                              fontSize={9.5}
                              fontWeight={600}
                            >
                              {p.rainSum} mm
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                )}
              </svg>

              {/* Graph Legend */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 22,
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: '1px solid #f1f3f4',
                  fontSize: 12,
                  color: '#5f6368'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 14, height: 3, background: '#ea580c', borderRadius: 2 }} />
                  <span>Max Temp (°{unit})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 14, height: 3, background: '#0284c7', borderRadius: 2 }} />
                  <span>Min Temp (°{unit})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 10, background: '#38bdf8', borderRadius: 2 }} />
                  <span>Precipitation Probability</span>
                </div>
              </div>
            </div>
          )}

          {/* ALTERNATIVE CARDS VIEW (Cleaned up from user screenshot) */}
          {viewMode === 'cards' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 12,
                marginTop: 10
              }}
            >
              {dailyPoints.map((p: any, i: number) => {
                const isSelected = selectedDayIndex === i;
                return (
                  <div
                    key={p.dateStr}
                    onClick={() => setSelectedDayIndex(i)}
                    style={{
                      border: isSelected ? '2px solid #1a73e8' : '1px solid #e2e8f0',
                      borderRadius: 14,
                      padding: '14px 16px',
                      background: isSelected ? '#f8fafd' : '#ffffff',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 4px 12px rgba(26,115,232,0.12)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 8
                      }}
                    >
                      <b style={{ fontSize: 16, color: '#1e293b' }}>{p.dateStr}</b>
                      <span
                        style={{
                          fontSize: 12,
                          background: '#e0f2fe',
                          color: '#0369a1',
                          padding: '3px 8px',
                          borderRadius: 9999,
                          fontWeight: 600
                        }}
                      >
                        {p.dayShort}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <WeatherIcon type={p.weatherInfo.icon} size={32} />
                      <div style={{ fontSize: 14, color: '#334155' }}>
                        <span style={{ fontWeight: 700, color: '#ea580c' }}>
                          {displayExactTemp(p.maxC)}°
                        </span>
                        {' – '}
                        <span style={{ fontWeight: 600, color: '#0284c7' }}>
                          {displayExactTemp(p.minC)}°{unit}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 13,
                        color: p.rainProb > 20 ? '#0284c7' : '#64748b',
                        fontWeight: p.rainProb > 20 ? 600 : 400
                      }}
                    >
                      💧 {p.rainProb}% rain probability
                      {p.rainSum > 0 && ` (${p.rainSum} mm)`}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Selected Day Detailed Breakdown Inspector */}
          {activeSelectedDay && (
            <div
              style={{
                marginTop: 18,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <WeatherIcon type={activeSelectedDay.weatherInfo.icon} size={42} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
                    {activeSelectedDay.dayFull} ({activeSelectedDay.dateStr})
                  </div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
                    Expected Condition: <b>{activeSelectedDay.weatherInfo.label}</b>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                    Temperature Range
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginTop: 2 }}>
                    <span style={{ color: '#ea580c' }}>{displayExactTemp(activeSelectedDay.maxC)}°</span> /{' '}
                    <span style={{ color: '#0284c7' }}>{displayExactTemp(activeSelectedDay.minC)}°{unit}</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                    Rain Likelihood
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0284c7', marginTop: 2 }}>
                    {activeSelectedDay.rainProb}%{' '}
                    <small style={{ fontSize: 12, fontWeight: 500 }}>
                      ({activeSelectedDay.rainSum || 0} mm)
                    </small>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                    Farm Operations
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: activeSelectedDay.rainProb > 30 ? '#d97706' : '#16a34a', marginTop: 2 }}>
                    {activeSelectedDay.rainProb > 30 ? '⚠️ Rain watch · Postpone spraying' : '✅ Good field condition'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Agricultural Advisory Card */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #dadce0',
            borderRadius: 18,
            padding: '20px 24px',
            boxShadow: '0 1px 6px rgba(32,33,36,0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <CheckCircle2 size={20} color="#1e8e3e" />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#202124' }}>
              Rythu Nestham Agri Advisory for {d?.location?.split(',')[0] || 'Selected Location'}
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 14
            }}
          >
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: '12px 14px'
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                🌾 Spraying Window
              </div>
              <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.4 }}>
                {windSpeedKmh < 15 && precipVal < 25
                  ? `Favorable conditions (Wind: ${windSpeedKmh} km/h). Safe for pesticide and nutrient spraying.`
                  : `Caution: Wind speed is ${windSpeedKmh} km/h or rain chance is ${precipVal}%. Avoid spraying to prevent drift or wash-off.`}
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: '12px 14px'
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                💧 Irrigation Management
              </div>
              <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.4 }}>
                {precipVal > 40
                  ? `Rain expected (${precipVal}% probability). Pause scheduled drip or canal irrigation to save energy and water.`
                  : `Low rainfall likelihood. Maintain standard irrigation schedules for standing crops.`}
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: '12px 14px'
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                ☀️ Thermal & Solar Stress
              </div>
              <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.4 }}>
                {d?.current?.temperature_2m > 34
                  ? `High temperature (${d.current.temperature_2m}°C). Provide light evening irrigation or mulching to mitigate heat stress.`
                  : `Moderate temperatures. Optimal for photosynthesis and flowering stage.`}
              </div>
            </div>
          </div>

          {/* 10 Agricultural Weather Alerts & Notification Scenarios */}
          <div style={{ marginTop: 28, borderTop: '1px solid #e2e8f0', paddingTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  FARM WEATHER INTELLIGENCE · 10 ALERT & FORECAST SCENARIOS
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '2px 0 0' }}>
                  Agricultural Weather Alerts & Protective Actions
                </h3>
              </div>
              <span style={{ fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 999, background: '#fef3c7', color: '#92400e' }}>
                EXAMPLE / ADVISORY NOTIFICATIONS
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              {[
                {
                  id: 1,
                  type: 'Heavy Rain Warning',
                  severity: 'danger',
                  trigger: 'Rainfall > 65mm in 24 hours expected',
                  action: 'Clear field drainage trenches immediately. Prevent submergence of young paddy and vegetable nurseries.',
                },
                {
                  id: 2,
                  type: 'Heatwave & Thermal Warning',
                  severity: 'warn',
                  trigger: 'Max temperature > 38°C with dry westerly winds',
                  action: 'Apply light evening drip irrigation and straw mulch to reduce root zone soil temperature.',
                },
                {
                  id: 3,
                  type: 'Strong Wind / Gale Warning',
                  severity: 'warn',
                  trigger: 'Sustained winds > 35 km/h with gusts',
                  action: 'Provide bamboo staking for Banana plants and Sugarcane clumps to prevent lodging.',
                },
                {
                  id: 4,
                  type: '7-Day Rainfall Forecast',
                  severity: 'info',
                  trigger: 'Monsoon active: 45–60mm aggregate rain across 7 days',
                  action: 'Favorable for rainfed Kharif sowing (Groundnut, Cotton, Soybean). Ensure seed treatment.',
                },
                {
                  id: 5,
                  type: 'Diurnal Temperature Range Forecast',
                  severity: 'info',
                  trigger: 'Day max 32°C, Night min 21°C (Differential 11°C)',
                  action: 'Optimal physiological temperature range for paddy tillering and maize vegetative growth.',
                },
                {
                  id: 6,
                  type: 'High Humidity & Fungal Alert',
                  severity: 'danger',
                  trigger: 'Relative humidity > 85% for 48 consecutive hours',
                  action: 'High risk of Early Blight in Tomato and Blast in Paddy. Keep prophylactic fungicide ready.',
                },
                {
                  id: 7,
                  type: 'Winter Cold Wave & Frost Warning',
                  severity: 'warn',
                  trigger: 'Night temperature falling below 8°C in interior tracts',
                  action: 'Provide evening flood irrigation or generate smoke screens along orchard windward borders.',
                },
                {
                  id: 8,
                  type: 'Severe Thunderstorm & Lightning Alert',
                  severity: 'danger',
                  trigger: 'Convective cloud buildup with lightning discharges',
                  action: 'Move cattle away from tall trees and open electrical poles into secure enclosed sheds.',
                },
                {
                  id: 9,
                  type: 'Smart Irrigation Recommendation',
                  severity: 'favorable',
                  trigger: 'No precipitation forecast + soil moisture dropping',
                  action: 'Irrigate Field 1 for 1.5 hours in late afternoon to maintain optimal root zone moisture.',
                },
                {
                  id: 10,
                  type: 'Pesticide Spray-Window Suitability',
                  severity: 'favorable',
                  trigger: 'Wind speed 6–10 km/h, rain chance < 15%, no dew',
                  action: 'Golden spray window between 8:00 AM and 11:00 AM. Minimal droplet drift or rain wash-off.',
                },
              ].map((alert) => (
                <div
                  key={alert.id}
                  style={{
                    background: '#f8fafc',
                    border: alert.severity === 'danger' ? '1px solid #fecaca' : alert.severity === 'warn' ? '1px solid #fed7aa' : '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <b style={{ fontSize: 13, color: '#0f172a' }}>{alert.id}. {alert.type}</b>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: 999,
                        background: alert.severity === 'danger' ? '#fee2e2' : alert.severity === 'warn' ? '#fef3c7' : alert.severity === 'favorable' ? '#dcfce7' : '#e0f2fe',
                        color: alert.severity === 'danger' ? '#991b1b' : alert.severity === 'warn' ? '#92400e' : alert.severity === 'favorable' ? '#166534' : '#0369a1',
                      }}
                    >
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <small style={{ color: '#64748b', fontSize: 11 }}>Trigger: {alert.trigger}</small>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#334155', lineHeight: 1.4, background: '#ffffff', padding: '6px 8px', borderRadius: 8, border: '1px solid #edf2f7' }}>
                    <b>Action:</b> {alert.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
