import {NextResponse} from 'next/server'; import {db,add} from '../../../lib/store'; import {z} from 'zod';
const schema=z.object({author:z.string().min(2),body:z.string().min(2).max(5000),category:z.string().min(2)});
export async function GET(){return NextResponse.json({posts:db.posts})}
export async function POST(req:Request){try{return NextResponse.json({post:add('posts',{...schema.parse(await req.json()),likes:0,comments:[]})},{status:201})}catch{return NextResponse.json({error:'Invalid community post'},{status:400})}}
