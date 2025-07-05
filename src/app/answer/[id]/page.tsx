'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getSurveyById, SurveyData, SurveyResponse } from '@/lib/surveyService';

export default function AnswerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [surveyData, setSurveyData] = useState<{ id: string; data: SurveyData } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSurveyData() {
      if (!id || typeof id !== 'string') {
        setError('유효하지 않은 설문 ID입니다.');
        setLoading(false);
        return;
      }

      try {
        const survey = await getSurveyById(id);
        if (!survey) {
          setError('해당 ID의 설문 데이터를 찾을 수 없습니다.');
        } else {
          setSurveyData(survey);
        }
      } catch (err) {
        console.error('설문 데이터 로딩 실패:', err);
        setError('설문 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchSurveyData();
  }, [id]);

  const handleGoBack = () => {
    router.push('/answer');
  };

  // 응답 정렬 (질문 ID 순)
  const sortedResponses = surveyData?.data?.responses?.sort((a, b) => parseInt(a.questionId) - parseInt(b.questionId)) || [];

  // 로딩 상태
  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500'></div>
        <p className="mt-4 text-gray-300 font-['Pretendard']">응답 데이터 불러오는 중...</p>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center px-4'>
        <div className='p-6 bg-red-900/30 border border-red-700 rounded-lg max-w-md w-full'>
          <h2 className="text-xl text-red-300 font-bold mb-4 font-['Karla']">오류 발생</h2>
          <p className="text-red-200 mb-6 font-['Pretendard']">{error}</p>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-['Pretendard']"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col'>
      <div className='w-full max-w-3xl mx-auto px-6 py-10 mt-12'>
        {/* 헤더 */}
        <div className='mb-8 flex items-center justify-between'>
          <motion.button
            onClick={handleGoBack}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            className='flex items-center text-gray-400 hover:text-white'
          >
            <svg className='w-5 h-5 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            <span className="font-['Pretendard']">돌아가기</span>
          </motion.button>
        </div>

        {/* 사용자 정보 및 응답 데이터 */}
        {surveyData && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* 사용자 정보 */}
            <div className='mb-8'>
              <h1 className="text-2xl font-bold text-white mb-2 font-['Karla']">{surveyData.data.userInfo.name}님의 응답</h1>
              <p className="text-gray-400 font-['Pretendard'] text-sm">
                제출 일시: {surveyData.data.surveyMeta.submittedAt.toDate().toLocaleString('ko-KR')}
              </p>
            </div>

            {/* 응답 목록 */}
            <div className='space-y-6'>
              {sortedResponses.map((response: SurveyResponse, index: number) => (
                <motion.div
                  key={response.questionId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className='bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-5 border border-white/10'
                >
                  <h3 className="text-gray-300 font-['Pretendard'] mb-3">
                    <span className='text-blue-400 mr-2'>{parseInt(response.questionId)}.</span>
                    {response.question}
                  </h3>

                  <p className="text-white font-['Pretendard'] bg-black/30 p-3 rounded">{response.answer}</p>
                </motion.div>
              ))}
            </div>

            {/* 파티 이미지 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className='mt-12 mb-8 relative w-full h-[30vh] flex items-center justify-center'
            >
              <Image src='/images/poster_graffiti_revised.png' alt='파티 이미지' fill sizes='100vw' className='object-contain' />
            </motion.div>

            {/* 파티 정보 표시 (축약) */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className='text-center space-y-4 mb-8'>
              <h3 className="text-xl font-bold text-white font-['Karla']">🎉 NTLR 파티 정보</h3>
              <p className="text-lg text-gray-300 font-['Pretendard']">2025년 7월 19일 19시 | 을지로 공간후</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
