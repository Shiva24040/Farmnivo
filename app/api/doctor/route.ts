import {NextResponse} from 'next/server';
import {z} from 'zod';
import {analyzeCropImage} from '../../../lib/ai';
const schema=z.object({image:z.string().startsWith('data:image/'),question:z.string().max(2000).optional()});
export async function POST(req:Request){try{const body=schema.parse(await req.json());if(body.image.length>8_000_000)return NextResponse.json({error:'Image is too large. Please choose a smaller photo.'},{status:413});return NextResponse.json({analysis:await analyzeCropImage(body.image,body.question)});}catch(e:any){if(e?.message==='AI_NOT_CONFIGURED')return NextResponse.json({error:'AI Crop Doctor needs OPENAI_API_KEY in .env.local.'},{status:503});return NextResponse.json({error:e?.message||'Crop analysis failed'},{status:500})}}
