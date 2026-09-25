import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CITIES: Record<string, { lat: number; lon: number; name: string }> = {
  'hyderabad': { lat: 17.3850, lon: 78.4867, name: 'Hyderabad, Telangana, India' },
  'delhi': { lat: 28.6139, lon: 77.2090, name: 'New Delhi, Delhi, India' },
  'new delhi': { lat: 28.6139, lon: 77.2090, name: 'New Delhi, Delhi, India' },
  'mumbai': { lat: 19.0760, lon: 72.8777, name: 'Mumbai, Maharashtra, India' },
  'bengaluru': { lat: 12.9716, lon: 77.5946, name: 'Bengaluru, Karnataka, India' },
  'bangalore': { lat: 12.9716, lon: 77.5946, name: 'Bengaluru, Karnataka, India' },
  'chennai': { lat: 13.0827, lon: 80.2707, name: 'Chennai, Tamil Nadu, India' },
  'kolkata': { lat: 22.5726, lon: 88.3639, name: 'Kolkata, West Bengal, India' },
  'pune': { lat: 18.5204, lon: 73.8567, name: 'Pune, Maharashtra, India' },
  'jaipur': { lat: 26.9124, lon: 75.7873, name: 'Jaipur, Rajasthan, India' },
  'lucknow': { lat: 26.8467, lon: 80.9462, name: 'Lucknow, Uttar Pradesh, India' },
  'ahmedabad': { lat: 23.0225, lon: 72.5714, name: 'Ahmedabad, Gujarat, India' },
  'chandigarh': { lat: 30.7333, lon: 76.7794, name: 'Chandigarh, India' },
  'bhopal': { lat: 23.2599, lon: 77.4126, name: 'Bhopal, Madhya Pradesh, India' },
  'patna': { lat: 25.5941, lon: 85.1376, name: 'Patna, Bihar, India' },
  'warangal': { lat: 17.9689, lon: 79.5941, name: 'Warangal, Telangana, India' },
  'guntur': { lat: 16.3067, lon: 80.4365, name: 'Guntur, Andhra Pradesh, India' },
  'vijayawada': { lat: 16.5062, lon: 80.6480, name: 'Vijayawada, Andhra Pradesh, India' },
  'visakhapatnam': { lat: 17.6868, lon: 83.2185, name: 'Visakhapatnam, Andhra Pradesh, India' },
  'vizag': { lat: 17.6868, lon: 83.2185, name: 'Visakhapatnam, Andhra Pradesh, India' },
  'karimnagar': { lat: 18.4386, lon: 79.1288, name: 'Karimnagar, Telangana, India' },
  'nizamabad': { lat: 18.6725, lon: 78.0940, name: 'Nizamabad, Telangana, India' },
  'khammam': { lat: 17.2473, lon: 80.1514, name: 'Khammam, Telangana, India' },
  'kurnool': { lat: 15.8281, lon: 78.0373, name: 'Kurnool, Andhra Pradesh, India' },
  'tirupati': { lat: 13.6288, lon: 79.4192, name: 'Tirupati, Andhra Pradesh, India' },
  'rajahmundry': { lat: 17.0005, lon: 81.8040, name: 'Rajahmundry, Andhra Pradesh, India' },
  'nellore': { lat: 14.4426, lon: 79.9865, name: 'Nellore, Andhra Pradesh, India' },
  'kadapa': { lat: 14.4673, lon: 78.8242, name: 'Kadapa, Andhra Pradesh, India' },
  'anantapur': { lat: 14.6819, lon: 77.6006, name: 'Anantapur, Andhra Pradesh, India' },
  'nalgonda': { lat: 17.0577, lon: 79.2684, name: 'Nalgonda, Telangana, India' },
  'suryapet': { lat: 17.1439, lon: 79.6239, name: 'Suryapet, Telangana, India' },
  'siddipet': { lat: 18.1018, lon: 78.8520, name: 'Siddipet, Telangana, India' },
  'mahabubnagar': { lat: 16.7488, lon: 77.9840, name: 'Mahabubnagar, Telangana, India' },
  'bapatla': { lat: 15.9042, lon: 80.4674, name: 'Bapatla, Andhra Pradesh, India' },
  'tenali': { lat: 16.2437, lon: 80.6400, name: 'Tenali, Andhra Pradesh, India' }
};

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const latParam = params.get('lat');
  const lonParam = params.get('lon');
  const location = params.get('location') || 'Hyderabad';

  let latitude = 17.3850;
  let longitude = 78.4867;
  let resolved = location;

  const hasCoords = latParam !== null && lonParam !== null && latParam.trim() !== '' && lonParam.trim() !== '' && !isNaN(Number(latParam)) && !isNaN(Number(lonParam));

  if (hasCoords) {
    latitude = Number(latParam);
    longitude = Number(lonParam);
  } else {
    const clean = location.split(/[,/-]/)[0].trim().toLowerCase() || location.toLowerCase();
    if (CITIES[clean]) {
      latitude = CITIES[clean].lat;
      longitude = CITIES[clean].lon;
      resolved = CITIES[clean].name;
    } else {
      try {
        const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(clean)}&count=5&language=en&format=json`, {
          cache: 'no-store',
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) RythuNestham/1.0' },
          signal: AbortSignal.timeout(4000)
        });
        if (geo.ok) {
          const g = await geo.json();
          const r = g.results?.find((x: any) => x.country_code === 'IN' || x.country === 'India') || g.results?.[0];
          if (r) {
            latitude = Number(r.latitude);
            longitude = Number(r.longitude);
            resolved = [r.name, r.admin1, r.country].filter(Boolean).join(', ');
          }
        }
      } catch (e) {
        console.error('Geocoding error:', e);
      }
    }
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&hourly=temperature_2m,precipitation_probability,precipitation,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto&forecast_days=7`;
  const weather = await fetch(url, {
    cache: 'no-store',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) RythuNestham/1.0' }
  });
  if (!weather.ok) return NextResponse.json({ error: 'Weather provider unavailable' }, { status: 503 });
  const data = await weather.json();

  return NextResponse.json({
    location: resolved,
    coordinates: { latitude, longitude },
    provider: 'Open-Meteo',
    updatedAt: new Date().toISOString(),
    current: data.current,
    daily: data.daily
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache'
    }
  });
}
