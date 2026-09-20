import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export type User={id:string,name:string,email:string,passwordHash:string,role:'farmer'|'expert'|'admin',createdAt:string};
export type Session={id:string,userId:string,tokenHash:string,expiresAt:string};
export type Farm={id:string,userId?:string,name:string,area:number,unit:string,location:string,soil:string,irrigation:string,createdAt:string};
export type Crop={id:string,farmId:string,name:string,area:number,status:string,sowingDate?:string,notes?:string,createdAt:string};
export type Item={id:string,userId?:string,title:string,category:string,price:number,location:string,condition:string,description?:string,createdAt:string};
export type Post={id:string,userId?:string,author:string,body:string,category:string,likes:number,comments:string[],createdAt:string};
export type Animal={id:string,userId?:string,type:string,breed:string,age:number,health:string,notes?:string,createdAt:string};
export type Reel={id:string,userId?:string,title:string,category:string,views:number,description?:string,videoUrl?:string,createdAt:string};
export type Service={id:string,title:string,category:string,location:string,description:string,contact:string};
export type Scheme={id:string,name:string,state:string,category:string,summary:string,source:string};
export type Notification={id:string,userId?:string,title:string,body:string,type:string,read:boolean,createdAt:string};
export type DB={users:User[];sessions:Session[];farms:Farm[];crops:Crop[];machinery:Item[];marketplace:Item[];posts:Post[];animals:Animal[];reels:Reel[];services:Service[];schemes:Scheme[];notifications:Notification[]};

const dataDir=path.join(process.cwd(),'.data');
const dataFile=path.join(dataDir,'farmnivo.json');
const id=()=>crypto.randomUUID();
const now=()=>new Date().toISOString();
export const hashPassword=(password:string)=>crypto.createHash('sha256').update(`${process.env.AUTH_SECRET||'farmnivo-dev-secret'}:${password}`).digest('hex');
export const hashToken=(token:string)=>crypto.createHash('sha256').update(token).digest('hex');

const seed=():DB=>{
  const demoUserId=id();
  const farmId=id();
  return {
    users:[{id:demoUserId,name:'Demo Farmer',email:'farmer@farmnivo.local',passwordHash:hashPassword('demo1234'),role:'farmer',createdAt:now()}],sessions:[],
    farms:[{id:farmId,userId:demoUserId,name:'Demo Green Farm',area:4,unit:'acres',location:'Telangana',soil:'Red soil',irrigation:'Drip',createdAt:now()}],
    crops:[{id:id(),farmId,name:'Tomato',area:2,status:'Growing',sowingDate:'2026-08-15',notes:'Demo crop record',createdAt:now()}],
    machinery:[
      {id:id(),userId:demoUserId,title:'Mahindra 575 DI Tractor',category:'Tractor',price:520000,location:'Hyderabad',condition:'Used',description:'Well-maintained tractor listing for demonstration.',createdAt:now()},
      {id:id(),title:'Rotavator 6 ft',category:'Implement',price:85000,location:'Nalgonda',condition:'New',description:'Six-foot rotavator demo listing.',createdAt:now()}
    ],
    marketplace:[
      {id:id(),userId:demoUserId,title:'Fresh Tomatoes',category:'Produce',price:28,location:'Hyderabad',condition:'Fresh',description:'Farmer produce listing. Price is demo data.',createdAt:now()},
      {id:id(),title:'Drip Irrigation Kit',category:'Tools',price:14500,location:'Yadadri',condition:'New',description:'Demo agricultural tool listing.',createdAt:now()}
    ],
    posts:[{id:id(),userId:demoUserId,author:'Demo Farmer',body:'What is a good irrigation schedule for tomato? Share your field experience.',category:'Crop Problems',likes:12,comments:['Check soil moisture before irrigating.'],createdAt:now()}],
    animals:[{id:id(),userId:demoUserId,type:'Cow',breed:'Gir',age:4,health:'Healthy',notes:'Routine vaccination record can be added.',createdAt:now()}],
    reels:[{id:id(),userId:demoUserId,title:'Drip irrigation setup for tomatoes',category:'Irrigation',views:1280,description:'Demo reel card.',createdAt:now()},{id:id(),title:'How I maintain my tractor',category:'Machinery',views:940,description:'Demo reel card.',createdAt:now()}],
    services:[
      {id:id(),title:'Tractor & machinery repair',category:'Repair',location:'Hyderabad & nearby',description:'Find verified repair providers and request a callback.',contact:'Provider directory'},
      {id:id(),title:'Irrigation installation',category:'Irrigation',location:'Telangana',description:'Drip and sprinkler installation services.',contact:'Provider directory'},
      {id:id(),title:'Farm labour',category:'Labour',location:'District based',description:'Post a farm labour requirement.',contact:'Request service'},
      {id:id(),title:'Veterinary services',category:'Animal health',location:'District based',description:'Locate veterinary support and animal-care providers.',contact:'Request service'}
    ],
    schemes:[
      {id:id(),name:'PM-KISAN',state:'India',category:'Income support',summary:'Official-source-ready scheme record. Verify current eligibility and application status on the government portal.',source:'https://pmkisan.gov.in/'},
      {id:id(),name:'PMFBY',state:'India',category:'Crop insurance',summary:'Official-source-ready crop insurance record. Verify notified crops, area and current season terms.',source:'https://pmfby.gov.in/'},
      {id:id(),name:'State agriculture programs',state:'Telangana',category:'State support',summary:'Use the official Telangana agriculture sources for current programs and eligibility.',source:'https://agri.telangana.gov.in/'}
    ],
    notifications:[{id:id(),userId:demoUserId,title:'Welcome to FarmNivo',body:'Your demo farm workspace is ready. Add crops, livestock and listings to explore the platform.',type:'system',read:false,createdAt:now()}]
  };
};

function load():DB{
  try{if(fs.existsSync(dataFile)) return JSON.parse(fs.readFileSync(dataFile,'utf8')) as DB;}catch{}
  const initial=seed();
  try{fs.mkdirSync(dataDir,{recursive:true});fs.writeFileSync(dataFile,JSON.stringify(initial,null,2));}catch{}
  return initial;
}
export const db:DB=(()=>{const base=seed();const current=load() as Partial<DB>;for(const k of Object.keys(base) as (keyof DB)[]){if(!Array.isArray((current as any)[k])) (current as any)[k]=(base as any)[k];}return current as DB;})();
export function persist(){try{fs.mkdirSync(dataDir,{recursive:true});fs.writeFileSync(dataFile,JSON.stringify(db,null,2));}catch{/* read-only hosted filesystem */}}
export function add<K extends keyof DB>(key:K,value:any){const item={id:id(),...value} as any;(db[key] as any[]).push(item);persist();return item}
export function remove<K extends keyof DB>(key:K,itemId:string){const list=db[key] as any[];const index=list.findIndex(x=>x.id===itemId);if(index<0)return false;list.splice(index,1);persist();return true}
export function getUserByEmail(email:string){return db.users.find(u=>u.email.toLowerCase()===email.toLowerCase())}
export function getUserById(userId:string){return db.users.find(u=>u.id===userId)}
export function createSession(userId:string){const raw=crypto.randomBytes(32).toString('hex');add('sessions',{userId,tokenHash:hashToken(raw),expiresAt:new Date(Date.now()+1000*60*60*24*14).toISOString()});return raw}
export function getUserFromToken(raw:string|undefined){if(!raw)return null;const session=db.sessions.find(s=>s.tokenHash===hashToken(raw)&&new Date(s.expiresAt)>new Date());return session?getUserById(session.userId)||null:null}
export function clearSession(raw:string|undefined){if(!raw)return;const i=db.sessions.findIndex(s=>s.tokenHash===hashToken(raw));if(i>=0){db.sessions.splice(i,1);persist()}}
