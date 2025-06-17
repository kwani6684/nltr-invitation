'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { QUESTIONS } from '@/types/question';
import QuestionForm from '@/components/QuestionForm';
import Image from 'next/image';
import { motion } from 'framer-motion';

// 사용 가능한 이미지들
const IMAGES = [
  '/images/IMG_8571.jpeg',
  '/images/IMG_9147.jpeg',
  '/images/IMG_3680.jpeg',
  '/images/IMG_4191.jpeg',
  '/images/IMG_4147.jpeg',
  '/images/IMG_3755.webp',
  '/images/IMG_2297.jpeg',
  '/images/44464B94-B9EF-443E-8EED-4799E22DD8CB.jpeg',
  '/images/poster_graffiti_revised.png',
];

export default function QuestionPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = Number(params.id);
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('answers');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // 진짜 랜덤 이미지 선택
  const [currentImage, setCurrentImage] = useState<string>('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * IMAGES.length);
    setCurrentImage(IMAGES[randomIndex]);
  }, [questionId]); // 질문이 바뀔 때마다 새로운 랜덤 이미지 선택

  const currentQuestion = QUESTIONS.find((q) => q.id === questionId);
  const isFirst = questionId === 1;
  const isLast = questionId === QUESTIONS.length;

  useEffect(() => {
    if (!currentQuestion) {
      router.push('/');
    }
  }, [currentQuestion, router]);

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  const handleNext = () => {
    // 답변이 없으면 진행하지 않음
    const currentAnswer = answers[questionId] || '';
    if (!currentAnswer.trim()) {
      return;
    }

    if (isLast) {
      router.push('/questions/complete');
      return;
    }
    router.push(`/questions/${questionId + 1}`);
  };

  const handlePrev = () => {
    if (!isFirst) {
      router.push(`/questions/${questionId - 1}`);
    }
  };

  if (!currentQuestion) return null;

  return (
    <main className='h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col'>
      {/* 프로그레스 바 */}
      <div className='fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm p-4'>
        <div className='w-full max-w-2xl mx-auto'>
          <div className='w-full bg-gray-800 rounded-full h-3 overflow-hidden'>
            <motion.div
              initial={{ width: `${((questionId - 1) / QUESTIONS.length) * 100}%` }}
              animate={{ width: `${(questionId / QUESTIONS.length) * 100}%` }}
              className='h-full rounded-full bg-gradient-to-r from-slate-700 to-slate-500 relative overflow-hidden'
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className='absolute inset-0 bg-[url("/images/poster_graffiti_revised.png")] bg-cover bg-center' />
            </motion.div>
          </div>
          <div className='flex justify-between mt-2 text-sm text-gray-400'>
            <span>질문 {questionId}</span>
            <span>총 {QUESTIONS.length}개</span>
          </div>
        </div>
      </div>

      {/* 이미지 섹션 */}
      <div className='relative w-full h-[35vh] flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 mt-16'>
        {currentImage && <Image src={currentImage} alt='파티 이미지' fill sizes='100vw' className='object-contain' priority />}
        {!currentImage && (
          <div className='w-full h-full flex items-center justify-center'>
            <div className='w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin'></div>
          </div>
        )}
      </div>

      {/* 질문 섹션 */}
      <div className='flex-1 w-full py-8 px-4 pb-24'>
        <QuestionForm
          question={currentQuestion}
          value={answers[questionId] || ''}
          onChange={(value) => setAnswers((prev) => ({ ...prev, [questionId]: value }))}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={isFirst}
          isLast={isLast}
          hideButtons
        />
      </div>

      {/* 버튼 섹션 */}
      <div className='fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 p-4'>
        <div className='w-full max-w-2xl mx-auto flex gap-4'>
          <motion.button
            type='button'
            onClick={handlePrev}
            disabled={isFirst}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 px-6 py-3 rounded-full text-white font-medium transition-all duration-200 ${
              isFirst ? 'opacity-50 cursor-not-allowed bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            이전
          </motion.button>
          <motion.button
            onClick={handleNext}
            disabled={!answers[questionId]?.trim()}
            whileHover={{ scale: answers[questionId]?.trim() ? 1.05 : 1 }}
            whileTap={{ scale: answers[questionId]?.trim() ? 0.95 : 1 }}
            className={`flex-1 px-6 py-3 rounded-full text-white font-medium transition-all duration-200 border border-white/30 ${
              answers[questionId]?.trim() ? 'bg-slate-900 hover:bg-slate-800' : 'bg-gray-700 opacity-50 cursor-not-allowed'
            }`}
          >
            {answers[questionId]?.trim() ? (isLast ? '제출하기' : '다음') : '답변 기다리는중'}
          </motion.button>
        </div>
      </div>
    </main>
  );
}
