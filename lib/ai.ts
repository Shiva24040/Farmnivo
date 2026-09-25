import { z } from 'zod';

type Message = { role: 'user' | 'assistant' | 'system'; content: string };

type Source = { title?: string; url?: string };

function providerConfig() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('AI_PROVIDER_NOT_CONFIGURED');
  const base = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  return {
    key,
    base,
    model: process.env.OPENAI_MODEL || 'gpt-5.4-mini',
    visionModel: process.env.OPENAI_VISION_MODEL || process.env.OPENAI_MODEL || 'gpt-5.4-mini',
  };
}

function extractOutput(data: any) {
  return String(data.output_text || data.output?.flatMap((x: any) => Array.isArray(x.content) ? x.content : []).map((x: any) => x.text || '').join('') || '').trim();
}

function extractSources(data: any): Source[] {
  const out: Source[] = [];
  for (const item of data.output || []) {
    for (const c of item.content || []) {
      for (const a of c.annotations || []) {
        if (a.type === 'url_citation' && a.url_citation?.url) out.push({ title: a.url_citation.title, url: a.url_citation.url });
      }
    }
  }
  return [...new Map(out.map(s => [s.url, s])).values()].slice(0, 8);
}

async function responses(body: Record<string, unknown>) {
  const { key, base } = providerConfig();
  const res = await fetch(`${base}/responses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    const e = new Error(`AI_PROVIDER_${res.status}`);
    (e as any).detail = detail;
    throw e;
  }
  return res.json();
}

const AGRI_SYSTEM = `You are Rythu Nestham AI, a multilingual agriculture assistant for Indian farmers.
Answer in the user's language when clear (especially Telugu, Hindi or English). Give practical, understandable guidance.
Use farmer context when supplied. Never invent current weather, mandi prices, government schemes, laws or other live facts.
For current information, use the web search tool when enabled. Clearly separate current sourced information from general agronomy.
For crop/animal health, explain uncertainty and recommend a qualified local agriculture/veterinary expert for serious cases.
Never claim an image-based assessment is a confirmed diagnosis. Do not provide unsafe pesticide dosage instructions; refer to the product label and local agricultural guidance.
Do not request or expose passwords, API keys or other secrets.`;

function shouldSearch(text: string) {
  return /(today|current|latest|live|price|prices|mandi|market rate|scheme|subsidy|government|weather|forecast|news|eligib|2026|2025)/i.test(text);
}

export async function generateAgriResponse(messages: Message[], farmContext?: unknown) {
  const { model } = providerConfig();
  const latestUserText = [...messages].reverse().find(m => m.role === 'user')?.content || '';
  const useSearch = process.env.OPENAI_WEB_SEARCH !== 'false' && shouldSearch(latestUserText);
  const context = farmContext ? `\nFarmer context: ${JSON.stringify(farmContext).slice(0, 12000)}` : '';
  const data = await responses({
    model,
    input: [{ role: 'system', content: AGRI_SYSTEM + context }, ...messages],
    ...(useSearch ? { tools: [{ type: 'web_search' }] } : {}),
  });
  const answer = extractOutput(data);
  if (!answer) throw new Error('AI_EMPTY_RESPONSE');
  return { answer, sources: extractSources(data), searched: useSearch };
}

const diagnosisSchema = {
  type: 'object', additionalProperties: false,
  properties: {
    summary: { type: 'string' },
    observations: { type: 'array', items: { type: 'string' } },
    possibleCauses: { type: 'array', items: { type: 'string' } },
    confidence: { type: 'string', enum: ['low', 'medium', 'high'] },
    nextChecks: { type: 'array', items: { type: 'string' } },
    actions: { type: 'array', items: { type: 'string' } },
    warning: { type: 'string' },
  },
  required: ['summary', 'observations', 'possibleCauses', 'confidence', 'nextChecks', 'actions', 'warning'],
} as const;

export async function analyzeCropImage(dataUrl: string, question?: string) {
  const { visionModel } = providerConfig();
  const prompt = `Analyze this crop/plant image as an agricultural assistant. Return only the requested structured result.\nUser note: ${question || 'No additional note.'}`;
  const data = await responses({
    model: visionModel,
    input: [{ role: 'user', content: [{ type: 'input_text', text: AGRI_SYSTEM + '\n' + prompt }, { type: 'input_image', image_url: dataUrl }] }],
    text: { format: { type: 'json_schema', name: 'crop_diagnosis', strict: true, schema: diagnosisSchema } },
  });
  const raw = extractOutput(data);
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { throw new Error('AI_INVALID_STRUCTURED_RESPONSE'); }
  return { diagnosis: z.object({
    summary: z.string(), observations: z.array(z.string()), possibleCauses: z.array(z.string()),
    confidence: z.enum(['low','medium','high']), nextChecks: z.array(z.string()), actions: z.array(z.string()), warning: z.string(),
  }).parse(parsed) };
}

const insightSchema = {
  type: 'object', additionalProperties: false,
  properties: {
    headline: { type: 'string' },
    priority: { type: 'string', enum: ['low', 'medium', 'high'] },
    actions: { type: 'array', items: { type: 'string' } },
    explanation: { type: 'string' },
  },
  required: ['headline', 'priority', 'actions', 'explanation'],
} as const;

export async function generateFarmInsight(context: unknown) {
  const { model } = providerConfig();
  const data = await responses({
    model,
    input: [{ role: 'system', content: AGRI_SYSTEM + '\nCreate a short farm-management insight from the supplied data. Do not invent measurements.' }, { role: 'user', content: JSON.stringify(context).slice(0, 14000) }],
    text: { format: { type: 'json_schema', name: 'farm_insight', strict: true, schema: insightSchema } },
  });
  return { insight: z.object({ headline:z.string(), priority:z.enum(['low','medium','high']), actions:z.array(z.string()), explanation:z.string() }).parse(JSON.parse(extractOutput(data))) };
}

export async function explainWithWebSearch(query: string, context = '') {
  const { model } = providerConfig();
  const data = await responses({
    model,
    tools: [{ type: 'web_search', filters: { allowed_domains: ['myscheme.gov.in', 'pmkisan.gov.in', 'agricoop.gov.in', 'agriwelfare.gov.in', 'telangana.gov.in', 'tg.nic.in'] } }],
    input: [{ role: 'system', content: AGRI_SYSTEM + '\nUse authoritative Indian government sources where possible. Return concise, source-grounded information and state if eligibility depends on location or current rules.' }, { role: 'user', content: query + (context ? `\nContext: ${context}` : '') }],
  });
  return { answer: extractOutput(data), sources: extractSources(data), searched: true };
}
