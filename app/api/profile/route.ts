import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma';
import { currentUser } from '../../../lib/auth';
export async function GET(){const u=await currentUser();return NextResponse.json({user:u?{id:u.id,name:u.name,email:u.email,role:u.role,createdAt:u.createdAt}:null});}
export async function PATCH(req:Request){const u=await currentUser();if(!u)return NextResponse.json({error:'Login required'},{status:401});const b=z.object({name:z.string().trim().min(2).max(80)}).parse(await req.json());const updated=await prisma.user.update({where:{id:u.id},data:{name:b.name}});return NextResponse.json({user:{id:updated.id,name:updated.name,email:updated.email,role:updated.role}});}
