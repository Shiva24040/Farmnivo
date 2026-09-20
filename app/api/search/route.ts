import {NextResponse} from 'next/server';
import {db} from '../../../lib/store';
export async function GET(req:Request){const q=new URL(req.url).searchParams.get('q')?.toLowerCase().trim()||'';const all=[...db.machinery.map(x=>({...x,type:'machinery'})),...db.marketplace.map(x=>({...x,type:'marketplace'})),...db.reels.map(x=>({...x,type:'reel'})),...db.posts.map(x=>({...x,type:'community'}))];return NextResponse.json({results:q?all.filter(x=>JSON.stringify(x).toLowerCase().includes(q)).slice(0,20):[]})}
