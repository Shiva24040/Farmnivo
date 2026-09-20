import './globals.css';
import { Header } from '../components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'FarmNivo — Everything Farming. One Platform.', description: 'An agriculture super platform with AI, farm management, machinery, marketplace, community and more.' };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><Header/><main>{children}</main></body></html>;
}
