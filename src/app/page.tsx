'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QUESTIONS } from '@/types/question';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [inputValue, setInputValue] = useState('');

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;

  const handleNext = () => {
    if (inputValue.trim()) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: inputValue,
      }));
      setInputValue('');
      if (!isLastQuestion) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setInputValue(answers[QUESTIONS[currentQuestionIndex - 1].id] || '');
    }
  };

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-black'>
      {/* 이미지 섹션 */}
      <div className='relative w-full h-[70vh] flex items-center justify-center bg-black'>
        <Image src='/images/poster_graffiti_revised.png' alt='파티 이미지' fill sizes='100vw' className='object-contain' priority />
      </div>

      {/* 제목 섹션 */}
      <div className='w-full py-12 px-4 bg-gradient-to-b from-black to-gray-900'>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            type: 'spring',
            stiffness: 100,
          }}
          className='text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg text-center'
        >
          송전탑: 남산파워티뢰침
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            type: 'spring',
            stiffness: 100,
          }}
          className='text-2xl md:text-3xl font-semibold text-gray-200 mt-4 text-center drop-shadow'
        >
          남파티
        </motion.h2>
      </div>

      {/* 설명/버튼 섹션 */}
      <div className='relative w-full bg-gradient-to-b from-gray-900 to-black px-4 pb-8 pt-12'>
        <div className='max-w-2xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            <h2 className='text-4xl font-bold text-gray-100 text-center'>특별한 순간을 함께 나누세요</h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className='text-lg text-gray-300 leading-relaxed text-center'
            >
              우리의 특별한 순간을 더욱 특별하게 만들어줄 초대장을 만들어보세요.
              <br />
              간단한 질문들에 답하시면 아름다운 초대장이 완성됩니다.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className='flex justify-center'
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/questions/1')}
                className='px-8 py-4 bg-gradient-to-r from-gray-800 to-black text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700'
              >
                초대장 내용 입력하기
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
