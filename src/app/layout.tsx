import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const dxTypeB = localFont({
  src: '../../public/fonts/DXTypeB-KSCpc-EUC-H.ttf',
  variable: '--font-dx-type-b',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '초대장',
  description: '당신만의 특별한 초대장',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={dxTypeB.variable}>
      <body>{children}</body>
    </html>
  );
}
