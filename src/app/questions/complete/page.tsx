'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

export default function CompletePage() {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [userInfo, setUserInfo] = useState<{ name: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedInfo = localStorage.getItem('userInfo');
      if (savedInfo) {
        setUserInfo(JSON.parse(savedInfo));
      }

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <main className='h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col'>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={200}
        recycle={false}
        colors={['#94a3b8', '#cbd5e1', '#e2e8f0', '#f1f5f9', '#ffffff']}
      />

      <div className='relative w-full h-[35vh] flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 mt-16'>
        <Image src='/images/poster_graffiti_revised.png' alt='파티 이미지' fill sizes='100vw' className='object-contain' priority />
      </div>

      <div className='flex-1 w-full max-w-2xl mx-auto p-6 flex flex-col items-center justify-center text-center'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='space-y-6'>
          <h2 className='text-2xl font-bold text-white mb-4 font-["DXTypeB"]'>
            {userInfo?.name ? `${userInfo.name}님,` : ''} <br />
            초대장 작성이 완료되었습니다!
          </h2>
          <p className='text-xl text-gray-300 leading-relaxed font-["Pretendard"]'>
            소중한 시간을 내어 <br />
            응답해 주셔서 감사합니다.
            <br />
            파티에서 즐거운 시간
            <br />
            보내시길 기대하고 있습니다.
          </p>
        </motion.div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 p-4'>
        <div className='w-full max-w-2xl mx-auto'>
          <motion.button
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='w-full px-6 py-3 bg-slate-900 rounded-full text-white font-medium hover:bg-slate-800 transition-all duration-200 border border-white/30'
          >
            처음으로
          </motion.button>
        </div>
      </div>
    </main>
  );
}
