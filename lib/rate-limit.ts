type Entry={count:number;reset:number}; const store=new Map<string,Entry>();
export function rateLimit(key:string,limit=30,windowMs=60_000){const now=Date.now();const old=store.get(key);if(!old||old.reset<=now){store.set(key,{count:1,reset:now+windowMs});return {ok:true,remaining:limit-1};}old.count++;return {ok:old.count<=limit,remaining:Math.max(0,limit-old.count)};}
