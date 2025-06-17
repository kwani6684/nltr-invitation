import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.css';
import { StagewiseToolbar } from '@stagewise/toolbar-next';
import { ReactPlugin } from '@stagewise-plugins/react';

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '초대장',
  description: '당신만의 특별한 초대장',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={karla.variable}>
      <body>
        {children}
        <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      </body>
    </html>
  );
}
