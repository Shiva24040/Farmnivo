type Message={role:'user'|'assistant'|'system';content:string};

function localAgriAnswer(question:string,farmContext?:any){
  const q=question.toLowerCase();
  const farm=farmContext?.name?` for ${farmContext.name}`:'';
  if(q.includes('paddy')||q.includes('rice')) return `For paddy${farm}, start with soil testing and field levelling, then plan nursery/transplanting or a suitable direct-seeding method for your local season. Keep irrigation controlled rather than continuously flooding where local practice and soil permit. If you tell me your district, variety, sowing/transplanting date and water source, I can turn this into a field checklist.`;
  if(q.includes('yellow')||q.includes('tomato')) return `For yellowing tomato leaves, first check whether the yellowing starts on older or newer leaves, soil moisture, drainage, root health and recent fertilizer use. Also inspect leaf undersides for pests and look for spots or curling. Avoid adding more fertilizer until the cause is clearer. A clear close-up photo plus crop age and location would help.`;
  if(q.includes('tractor')||q.includes('machinery')) return `For machinery selection, compare acreage, soil type, implement compatibility, annual operating hours, service availability and total ownership cost—not just horsepower. Tell me your acreage, main operations and budget and I can create a comparison checklist.`;
  if(q.includes('irrigation')||q.includes('drip')) return `For irrigation, use crop stage and soil moisture to guide timing. Check emitter uniformity, filters, pressure and leaks regularly. Avoid fixed schedules that ignore rainfall or soil conditions. Tell me the crop, soil, irrigation system and field area for a more specific plan.`;
  return `I can help with crops, soil, irrigation, pests, diseases, machinery, livestock, farm business and farm planning${farm}. For a useful answer, tell me the crop or livestock, location, age/stage, soil or housing conditions and the exact problem or goal.`;
}

export async function generateAgriResponse(messages:Message[],farmContext?:unknown){
  const key=process.env.OPENAI_API_KEY;
  const demo=process.env.DEMO_MODE==='true';
  const q=messages.filter(m=>m.role==='user').at(-1)?.content||'';
  if(!key||demo)return localAgriAnswer(q,farmContext);
  const base=(process.env.AI_BASE_URL||'https://api.openai.com/v1').replace(/\/$/,'');
  const model=process.env.OPENAI_MODEL||'gpt-5-mini';
  const system=`You are AgriCopilot, a conversational agriculture assistant inside FarmNivo. Prioritize practical crop, soil, irrigation, plant nutrition, pests, diseases, machinery, livestock, farm business, post-harvest, sustainability and farm planning guidance. Use supplied farmer context when useful. Ask concise follow-up questions when important details are missing. Never claim an image or symptom diagnosis is certain. For pesticides or chemicals, emphasize product labels and local agricultural guidance and do not prescribe unsafe dosage. Do not invent live prices, weather, laws or schemes. Clearly say when live data is unavailable.`;
  const context=farmContext?`\nFarmer context: ${JSON.stringify(farmContext)}`:'';
  const res=await fetch(`${base}/responses`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${key}`},body:JSON.stringify({model,input:[{role:'system',content:system+context},...messages]})});
  if(!res.ok){const detail=await res.text().catch(()=> '');const e=new Error(`AI_PROVIDER_${res.status}`);(e as any).detail=detail;throw e;}
  const data=await res.json();
  const text=data.output_text||data.output?.flatMap((x:any)=>Array.isArray(x.content)?x.content:[]).map((x:any)=>x.text||'').join('')||'';
  return text.trim()||localAgriAnswer(q,farmContext);
}

export async function analyzeCropImage(dataUrl:string,question?:string){
  const key=process.env.OPENAI_API_KEY;
  if(!key||process.env.DEMO_MODE==='true') return `Demo Crop Doctor result\n\nVisible-image analysis is running in demo mode. I cannot make a reliable diagnosis without the vision provider. Check leaf colour/pattern, spots, curling, pest presence, soil moisture, drainage and recent fertilizer or pesticide use. ${question?`Your note: ${question}`:''}\n\nFor a real analysis, configure a supported vision-capable API provider and upload a clear image of the affected plant part.`;
  const base=(process.env.AI_BASE_URL||'https://api.openai.com/v1').replace(/\/$/,'');
  const model=process.env.OPENAI_VISION_MODEL||process.env.OPENAI_MODEL||'gpt-5-mini';
  const prompt=`Analyze this crop/plant image as an agricultural assistant. Give (1) visible observations, (2) possible causes with uncertainty, (3) what to check next, (4) low-risk practical next steps, and (5) when to contact a local agriculture expert. Do not claim certainty and do not prescribe pesticide dosage. User note: ${question||'No additional note.'}`;
  const res=await fetch(`${base}/responses`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${key}`},body:JSON.stringify({model,input:[{role:'user',content:[{type:'input_text',text:prompt},{type:'input_image',image_url:dataUrl}]}]})});
  if(!res.ok)throw new Error(`VISION_PROVIDER_${res.status}`);
  const data=await res.json();
  return (data.output_text||data.output?.flatMap((x:any)=>Array.isArray(x.content)?x.content:[]).map((x:any)=>x.text||'').join('')||'No analysis received.').trim();
}
