'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function InfoPage() {
  const router = useRouter();
  const [info, setInfo] = useState({
    name: '',
  });
  const [touched, setTouched] = useState({
    name: false,
  });

  const handleBlur = (field: keyof typeof info) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getErrorMessage = (field: keyof typeof info) => {
    if (!touched[field]) return '';
    if (!info[field]) {
      switch (field) {
        case 'name':
          return '이름을 입력해주세요';
        default:
          return '';
      }
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (info.name) {
      localStorage.setItem('userInfo', JSON.stringify(info));

      const startTime = Date.now();
      localStorage.setItem('surveyStartTime', startTime.toString());
      console.log('🚀 설문 시작:', new Date(startTime).toLocaleString());

      router.push('/questions/1');
    }
  };

  return (
    <main className='h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col'>
      <div className='relative w-full h-[35vh] flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 mt-16'>
        <Image src='/images/poster_graffiti_revised.png' alt='파티 이미지' fill sizes='100vw' className='object-contain' priority />
      </div>

      <div className='flex-1 w-full max-w-2xl mx-auto p-6 pb-32'>
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className='text-2xl font-bold text-white mb-8 text-center'>
          기본 정보를 입력해주세요
        </motion.h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className='space-y-2'>
            <label htmlFor='name' className='text-lg text-gray-200 font-["Pretendard"]'>
              이름
            </label>
            <input
              type='text'
              id='name'
              value={info.name}
              onChange={(e) => setInfo((prev) => ({ ...prev, name: e.target.value }))}
              onBlur={() => handleBlur('name')}
              className={`w-full p-3 bg-gray-800 text-white rounded-lg border transition-all duration-200 font-["Pretendard"] ${
                getErrorMessage('name')
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-700 focus:border-slate-500 focus:ring-slate-500'
              }`}
              placeholder='이름을 입력해주세요'
            />
            {getErrorMessage('name') && <p className='text-red-500 text-sm mt-1'>{getErrorMessage('name')}</p>}
          </motion.div>
        </form>
      </div>

      <div className='fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 p-4'>
        <div className='w-full max-w-2xl mx-auto'>
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='w-full px-6 py-3 bg-slate-900 rounded-full text-white font-medium hover:bg-slate-800 transition-all duration-200 border border-white/30'
          >
            {info.name ? '다음' : '이름을 입력해주세요'}
          </motion.button>
        </div>
      </div>
    </main>
  );
}
