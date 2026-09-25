import './globals.css';
import { Header } from '../components/Header';
import type { Metadata } from 'next';
export const metadata: Metadata={title:'Rythu Nestham — రైతు సర్వం | रैतु सर्वं',description:'Rythu Nestham is a multilingual agriculture technology platform for farm management, AI assistance, crop intelligence, marketplace, livestock, learning and services.',icons:{icon:'/favicon.ico'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/><main>{children}</main></body></html>}
