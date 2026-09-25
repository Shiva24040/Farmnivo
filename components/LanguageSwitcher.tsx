'use client';
import { useEffect, useState } from 'react';
import { Globe2 } from 'lucide-react';
import { localeNames, type Locale } from '../lib/i18n';
export function LanguageSwitcher({compact=false}:{compact?:boolean}){
 const [locale,setLocale]=useState<Locale>('en');
 useEffect(()=>{const m=document.cookie.match(/(?:^|; )rs_locale=([^;]+)/);if(m&&(m[1]==='te'||m[1]==='hi'))setLocale(m[1] as Locale);},[]);
 function change(v:Locale){setLocale(v);document.cookie=`rs_locale=${v};path=/;max-age=31536000;samesite=lax`;location.reload();}
 return <label className={`locale-switcher ${compact?'compact':''}`}><Globe2 size={16}/><select aria-label="Language" value={locale} onChange={e=>change(e.target.value as Locale)}>{(Object.keys(localeNames) as Locale[]).map(k=><option key={k} value={k}>{localeNames[k]}</option>)}</select></label>;
}
