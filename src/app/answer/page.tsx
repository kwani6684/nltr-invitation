'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { searchSurveyByName } from '@/lib/surveyService';

export default function AnswerSearchPage() {
  const [name, setName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }

    try {
      setIsSearching(true);
      setError(null);

      const results = await searchSurveyByName(name);

      if (results.length === 0) {
        setError(`"${name}" 이름으로 찾을 수 있는 응답이 없습니다.`);
      } else if (results.length === 1) {
        // 결과가 하나면 바로 해당 응답 페이지로 이동
        router.push(`/answer/${results[0].id}`);
      } else {
        // 여러 결과가 있으면 첫 번째 결과로 이동 (추후 선택 기능 추가 가능)
        router.push(`/answer/${results[0].id}`);
      }
    } catch (error) {
      console.error('검색 실패:', error);
      setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center'>
      <div className='w-full max-w-md px-6 py-16 mt-16'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='w-full'>
          <h1 className='text-3xl font-bold text-white mb-8 text-center font-["Karla"]'>내 답변 찾기</h1>

          <form onSubmit={handleSearch} className='space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='name' className='block text-gray-300 font-["Pretendard"]'>
                이름을 입력하세요
              </label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-["Pretendard"]'
                placeholder='예: 홍길동'
              />
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-red-400 text-sm mt-1 font-["Pretendard"]'>
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              type='submit'
              disabled={isSearching}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className='w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-bold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed font-["Pretendard"]'
            >
              {isSearching ? '검색 중...' : '검색하기'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
