'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { saveSurveyData, convertAnswersToResponses, clearStoredData } from '@/lib/surveyService';

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

export default function CompletePage() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [userInfo, setUserInfo] = useState<{ name: string } | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saving' | 'success' | 'error' | null>(null);

  // 중복 저장 방지용 ref
  const hasAttemptedSave = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedInfo = localStorage.getItem('userInfo');
      if (savedInfo && !hasAttemptedSave.current) {
        const info = JSON.parse(savedInfo);
        setUserInfo(info);

        // 중복 저장 방지 플래그 설정
        hasAttemptedSave.current = true;

        // Firebase에 데이터 저장
        saveSurveyDataToFirebase(info);
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
  }, []); // 빈 dependency array로 한 번만 실행

  const saveSurveyDataToFirebase = async (userInfo: { name: string }) => {
    try {
      setSaveStatus('saving');
      console.log('🚀 Firebase 저장 시작...');

      // localStorage에서 설문 응답 데이터 가져오기
      const responses = convertAnswersToResponses();

      if (responses.length === 0) {
        console.warn('저장할 응답 데이터가 없습니다.');
        setSaveStatus('error');
        return;
      }

      console.log('📊 저장할 응답 수:', responses.length);

      // Firebase에 저장
      const docId = await saveSurveyData(userInfo, responses);
      console.log('✅ 저장 완료 - Document ID:', docId);

      setSaveStatus('success');

      // 저장 성공 후 로컬 데이터 삭제
      setTimeout(() => {
        clearStoredData();
      }, 3000); // 3초 후 삭제
    } catch (error: unknown) {
      console.error('❌ 데이터 저장 실패:', error);
      setSaveStatus('error');

      // 사용자에게 구체적인 안내 메시지 표시
      if (error instanceof Error && error.message.includes('보안 규칙')) {
        console.error('💡 해결 방법: Firebase 콘솔에서 Firestore 보안 규칙을 테스트 모드로 설정해주세요.');
      }
    }
  };

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col'>
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

      <div className='flex-1 w-full px-6 py-8 flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-900 to-black'>
        <div className='w-full max-w-2xl mx-auto'>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='space-y-8'>
            {/* 저장 상태 표시 */}
            {saveStatus && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-lg border ${
                  saveStatus === 'saving'
                    ? 'bg-blue-900/50 border-blue-500 text-blue-200'
                    : saveStatus === 'success'
                    ? 'bg-green-900/50 border-green-500 text-green-200'
                    : 'bg-red-900/50 border-red-500 text-red-200'
                }`}
              >
                {saveStatus === 'saving' && '📤 응답을 저장하고 있습니다...'}
                {saveStatus === 'success' && '✅ 응답이 성공적으로 저장되었습니다!'}
                {saveStatus === 'error' && (
                  <div className='space-y-2'>
                    <p>❌ 응답 저장에 실패했습니다.</p>
                    <p className='text-sm opacity-80'>
                      🔧 Firebase 콘솔에서 Firestore 보안 규칙을 확인해주세요.
                      <br />
                      📱 또는 인터넷 연결을 확인해주세요.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            <div className='space-y-6'>
              <h2 className='text-2xl font-bold text-white mb-4 font-["Karla"]'>
                {userInfo?.name ? `${userInfo.name}님,` : ''} <br />
                파티에 참가할 준비가 <br /> 완료되었습니다! 🎉
              </h2>
              <p className='text-xl text-gray-300 leading-relaxed font-["Pretendard"]'>
                소중한 시간을 내어 <br />
                응답해 주셔서 감사합니다.
                <br />
                <br />
                파티에서 즐거운 시간
                <br />
                보내시길 기대하고 있습니다.
              </p>
            </div>

            {/* 파티 정보 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 border border-white/10 shadow-xl backdrop-blur-sm'
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className='text-2xl font-bold text-white mb-6 font-["Karla"]'
              >
                🎉 NTLR 파티 정보
              </motion.h3>

              <div className='space-y-6 w-full justify-center'>
                {/* 시간 정보 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className='flex items-center justify-center space-x-4'
                >
                  <div className='text-3xl'>📅</div>
                  <div className='text-left'>
                    <p className='text-white font-semibold text-lg font-["Pretendard"]'>날짜 & 시간</p>
                    <p className='text-gray-300 text-xl font-["Pretendard"]'>2025년 7월 19일 19시</p>
                  </div>
                </motion.div>

                {/* 위치 정보 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className='flex items-center justify-center space-x-4'
                >
                  <div className='text-3xl mt-1'>📍</div>
                  <div className='text-left'>
                    <p className='text-white font-semibold text-lg mb-2 font-["Pretendard"]'>위치</p>
                    <p className='text-gray-300 text-lg font-["Pretendard"]'>을지로 공간후</p>
                    <p className='text-gray-400 text-sm font-["Pretendard"] leading-relaxed'>
                      마른내로8길 3-7 덕영빌딩 3층
                      <br />
                      인현동2가 162
                    </p>
                  </div>
                </motion.div>
                <motion.a
                  href='https://naver.me/G7VO34MG'
                  target='_blank'
                  rel='noopener noreferrer'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='inline-block mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-full transition-all duration-200 font-["Pretendard"]'
                >
                  🗺️ 네이버 지도에서 보기
                </motion.a>
              </div>
            </motion.div>

            {/* NTLR 음반 소개 */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className='text-center space-y-4'>
              <p className='text-lg text-gray-300 font-["Pretendard"] leading-relaxed'>
                NTLR의 첫 프로젝트는 음반 작업이었습니다. <br />한 번 듣고 오시면 감사하겠습니다!
              </p>

              {/* 음악 스트리밍 서비스 링크 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className='flex justify-center items-center space-x-8 mt-6'
              >
                {/* YouTube Music */}
                <motion.a
                  href='https://www.youtube.com/watch?v=VtQaNAIuP00'
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg'
                >
                  <svg className='w-10 h-10 text-white' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M21.582 6.186c-.23-.86-.918-1.538-1.788-1.768C18.254 4.166 12 4.166 12 4.166s-6.254 0-7.794.252c-.87.23-1.558.908-1.788 1.768C2.166 7.708 2.166 12 2.166 12s0 4.292.252 5.814c.23.86.918 1.538 1.788 1.768C5.746 19.834 12 19.834 12 19.834s6.254 0 7.794-.252c.87-.23 1.558-.908 1.788-1.768C21.834 16.292 21.834 12 21.834 12s0-4.292-.252-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' />
                  </svg>
                </motion.a>

                {/* Spotify */}
                <motion.a
                  href='https://open.spotify.com/album/5GRIN8rsSWPse2WfGjkvNg?si=3pjzXFabSuaLoDOG1Vd1eg'
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg'
                >
                  <svg className='w-10 h-10 text-white' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.424c-.184.3-.576.396-.876.216-2.4-1.464-5.424-1.8-8.988-.984-.348.084-.696-.132-.78-.48-.084-.348.132-.696.48-.78 3.912-.9 7.224-.516 9.972 1.14.307.18.396.576.216.876v.012zm1.248-2.772c-.228.372-.72.492-1.092.264-2.748-1.692-6.936-2.184-10.188-1.188-.42.12-.864-.12-.984-.54-.12-.42.12-.864.54-.984 3.732-1.14 8.412-.6 11.46 1.356.372.228.492.72.264 1.092zm.108-2.892C15.264 8.544 8.868 8.328 5.172 9.48c-.504.156-1.044-.12-1.2-.624s.12-1.044.624-1.2c4.272-1.332 11.28-1.08 15.684 1.26.444.24.6.804.36 1.248-.24.444-.804.6-1.248.36z' />
                  </svg>
                </motion.a>

                {/* Apple Music */}
                <motion.a
                  href='https://music.apple.com/us/album/%EB%B2%88%EA%B0%9C%EC%9E%A1%EC%9D%B4-ntlr-mixtape/1797718231'
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-16 h-16 rounded-full overflow-hidden transition-all duration-200 shadow-lg relative'
                >
                  <Image src='/logo/apple.png' alt='Apple Music' fill className='object-cover' />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* 추가 메시지 */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className='text-center'>
              <p className='text-lg text-gray-300 font-["Pretendard"]'>🌟 당일 뵙겠습니다! 🌟</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
