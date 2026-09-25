import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma';
import { currentUser } from '../../../lib/auth';

const schema = z.object({
  fieldId: z.string().max(80).default('main'),
  moisture: z.number().optional(),
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  ph: z.number().optional(),
  light: z.number().optional(),
  rainfall: z.number().optional(),
  tank: z.number().optional(),
  air: z.number().optional()
});

function status(value: number, min: number, max: number) {
  return value >= min && value <= max ? 'good' : value >= min * 0.8 && value <= max * 1.2 ? 'watch' : 'action';
}

const simulatedSensors = [
  { key: 'moisture', label: 'Soil Moisture', value: 42, unit: '%', min: 40, max: 60, status: 'watch' as const, isSimulated: true },
  { key: 'temperature', label: 'Soil Temperature', value: 28.6, unit: '°C', min: 20, max: 32, status: 'good' as const, isSimulated: true },
  { key: 'air_temp', label: 'Air Temperature', value: 31.2, unit: '°C', min: 20, max: 36, status: 'good' as const, isSimulated: true },
  { key: 'humidity', label: 'Relative Humidity', value: 67, unit: '%', min: 50, max: 70, status: 'good' as const, isSimulated: true },
  { key: 'ph', label: 'Soil pH Level', value: 6.8, unit: '', min: 6.0, max: 7.5, status: 'good' as const, isSimulated: true },
  { key: 'tank', label: 'Water Tank Storage', value: 81, unit: '%', min: 30, max: 100, status: 'good' as const, isSimulated: true },
  { key: 'rainfall', label: 'Rain Sensor (Today)', value: 4.2, unit: 'mm', min: 0, max: 30, status: 'good' as const, isSimulated: true },
  { key: 'irrigation', label: 'Irrigation Status', value: 1, unit: 'Drip Active', min: 0, max: 1, status: 'good' as const, isSimulated: true },
  { key: 'greenhouse', label: 'Greenhouse Temp', value: 26.5, unit: '°C', min: 20, max: 30, status: 'good' as const, isSimulated: true },
  { key: 'pump', label: 'Solar Pump Status', value: 1, unit: 'Running (5HP)', min: 0, max: 1, status: 'good' as const, isSimulated: true }
];

export async function GET() {
  const u = await currentUser();

  if (!u) {
    return NextResponse.json({
      mode: 'simulated',
      updatedAt: new Date().toISOString(),
      sensors: simulatedSensors,
      history: [
        { time: '04:00', moisture: 46, temperature: 24.2, humidity: 75, ph: 6.8, light: 500 },
        { time: '08:00', moisture: 44, temperature: 27.0, humidity: 70, ph: 6.8, light: 15000 },
        { time: '12:00', moisture: 42, temperature: 31.5, humidity: 62, ph: 6.8, light: 45000 },
        { time: '16:00', moisture: 42, temperature: 29.8, humidity: 66, ph: 6.8, light: 25000 },
        { time: '20:00', moisture: 42, temperature: 27.5, humidity: 69, ph: 6.8, light: 1000 }
      ],
      insights: [
        'SIMULATED SENSOR DATA: Connect your field hardware gateway to stream live telemetry.',
        'Irrigation Advisory: Field 1 soil moisture is 42%. Recommended to run drip irrigation for 45 minutes this evening.'
      ]
    });
  }

  let rows: any[] = [];
  try {
    rows = await (prisma as any).ioTReading.findMany({
      where: { userId: u.id },
      orderBy: { createdAt: 'desc' },
      take: 24
    });
  } catch (err) {
    console.warn('IoT database query failed, using simulated data:', err);
  }

  if (!rows.length) {
    return NextResponse.json({
      mode: 'waiting',
      updatedAt: new Date().toISOString(),
      sensors: simulatedSensors,
      history: [],
      insights: [
        'SIMULATED SENSOR DATA: No gateway hardware has sent readings yet for your farm.',
        'Post sensor payloads with your secret x-iot-token to activate live telemetry.'
      ]
    });
  }

  const latest = rows[0];
  const sensors = [
    ['moisture', 'Soil moisture', latest.moisture, '%', 20, 60],
    ['temperature', 'Temperature', latest.temperature, '°C', 18, 35],
    ['humidity', 'Humidity', latest.humidity, '%', 35, 85],
    ['ph', 'Soil pH', latest.ph, '', 5.5, 8],
    ['light', 'Light', latest.light, 'lux', 1000, 60000]
  ].filter(x => x[2] != null).map(([key, label, value, unit, min, max]) => ({
    key,
    label,
    value: Number(value),
    unit: String(unit).trim(),
    min: Number(min),
    max: Number(max),
    status: status(Number(value), Number(min), Number(max)),
    isSimulated: false
  }));

  const history = [...rows].reverse().map(r => ({
    time: r.createdAt.toISOString(),
    moisture: r.moisture ?? 0,
    temperature: r.temperature ?? 0,
    humidity: r.humidity ?? 0,
    ph: r.ph ?? 0,
    light: r.light ?? 0
  }));

  return NextResponse.json({
    mode: 'live',
    updatedAt: latest.createdAt,
    sensors,
    history,
    insights: [
      'LIVE SENSOR DATA: Telemetry received from your registered farm gateway.',
      'Use Rythu Dost for automated irrigation and fertigation task recommendations.'
    ]
  });
}

export async function POST(req: Request) {
  const token = req.headers.get('x-iot-token');
  if (!process.env.IOT_INGEST_TOKEN || token !== process.env.IOT_INGEST_TOKEN) {
    return NextResponse.json({ error: 'Invalid IoT ingest token' }, { status: 401 });
  }

  try {
    const b = schema.parse(await req.json());
    const userId = process.env.IOT_DEFAULT_USER_ID;
    if (!userId) return NextResponse.json({ error: 'IOT_DEFAULT_USER_ID is not configured' }, { status: 503 });

    const row = await (prisma as any).ioTReading.create({
      data: { ...b, userId }
    });
    return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid sensor payload' }, { status: 400 });
  }
}
