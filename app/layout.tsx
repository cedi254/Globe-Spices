import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Globe Spices — Vier Länder. Eine Reise.',description:'Vier Gewürzmischungen, inspiriert von vier Ländern. Entdecke die World Collection von Globe Spices aus Zürich.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="de-CH"><body>{children}</body></html>}
