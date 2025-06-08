'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { use } from 'react';
import Image from 'next/image';

const QUESTIONS = [
  {
    id: 1,
    text: '파티의 제목을 입력해주세요',
    image: '/images/question1.jpg',
    placeholder: '예: 우리의 특별한 순간',
  },
  {
    id: 2,
    text: '파티의 날짜를 입력해주세요',
    image: '/images/question2.jpg',
    placeholder: '예: 2024년 4월 20일',
  },
  {
    id: 3,
    text: '파티의 시간을 입력해주세요',
    image: '/images/question3.jpg',
    placeholder: '예: 오후 2시',
  },
  // ... 나머지 질문들
];

export default function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const currentId = parseInt(id);
  const currentQuestion = QUESTIONS[currentId - 1];
  const [answer, setAnswer] = useState('');

  const handlePrev = () => {
    if (currentId > 1) {
      router.push(`/questions/${currentId - 1}`);
    }
  };

  const handleNext = () => {
    if (currentId < QUESTIONS.length) {
      router.push(`/questions/${currentId + 1}`);
    }
  };

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4'>
      <div className='w-full max-w-2xl'>
        <div className='mb-8'>
          <div className='w-full bg-gray-800 rounded-full h-2.5 mb-2'>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentId / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
              className='h-2.5 rounded-full bg-gradient-to-r from-gray-700 to-gray-900'
            />
          </div>
          <div className='flex justify-between text-sm text-gray-400'>
            <span>질문 {currentId}</span>
            <span>총 {QUESTIONS.length}개</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-gray-900 rounded-xl shadow-lg p-8 mb-8 border border-gray-800'
        >
          <div className='aspect-video relative rounded-lg overflow-hidden mb-6'>
            <Image
              src={currentQuestion.image}
              alt={`질문 ${currentId} 이미지`}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover'
              priority
            />
          </div>

          <h2 className='text-2xl font-semibold text-gray-100 mb-4'>{currentQuestion.text}</h2>

          <input
            type='text'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className='w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-gray-600 focus:outline-none'
            placeholder={currentQuestion.placeholder}
          />
        </motion.div>

        <div className='flex justify-between gap-4'>
          <button
            onClick={handlePrev}
            disabled={currentId === 1}
            className={`flex-1 py-3 rounded-lg ${
              currentId === 1 ? 'bg-gray-800 cursor-not-allowed text-gray-600' : 'bg-gray-800 hover:bg-gray-700 text-gray-100'
            } transition-colors border border-gray-700`}
          >
            이전
          </button>
          <button
            onClick={handleNext}
            disabled={!answer.trim()}
            className={`flex-1 py-3 rounded-lg ${
              !answer.trim()
                ? 'bg-gray-800 cursor-not-allowed text-gray-600'
                : 'bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-gray-100'
            } transition-colors border border-gray-700`}
          >
            {currentId === QUESTIONS.length ? '완료' : '다음'}
          </button>
        </div>
      </div>
    </main>
  );
}
