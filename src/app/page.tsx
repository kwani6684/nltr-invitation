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
      <div className='relative w-full h-[70vh] flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800'>
        <Image src='/images/poster_graffiti_revised.png' alt='파티 이미지' fill sizes='100vw' className='object-contain' priority />
      </div>

      {/* 제목 섹션 */}
      <div className='w-full py-8 px-4 bg-gradient-to-b from-gray-800 to-gray-900'>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            type: 'spring',
            stiffness: 100,
          }}
          className='text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center'
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
      <div className='relative w-full bg-gradient-to-b from-gray-900 to-black px-4 pb-32 pt-8'>
        <div className='max-w-2xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className='space-y-12'
          >
            <motion.div className='space-y-16 text-xl text-gray-300 leading-loose font-["Pretendard"] max-w-2xl mx-auto'>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center tracking-wide whitespace-pre-line'
              >
                타인과의 만남에는 <br />
                비일상이 전제되어 있습니다.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center space-y-6 whitespace-pre-line'
              >
                '부분으로 나누다' 라는 뜻의 라틴어 partiri는 오늘날 '파티'라는 단어로 남아 있습니다. 부분으로 나누어진 삶을 살던 우리는, 각자가 지닌
                삶의 부분을 나누고 싶게 되었습니다. 가장 비일상적인 방식으로 말이죠.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center space-y-6 whitespace-pre-line'
              >
                처음 듣는 음악, 처음 보는 공간과 사람들, 처음 경험하는 대화. 생각하지 못했던 접촉 속에서 혼자 조각내 묻어뒀던 꿈과 열정이 고개를 다시
                들지도 모릅니다. 그런 일이 일어날 수 있도록, 새로운 가능성이 가득한 파티를 만들어보았습니다.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center space-y-6 whitespace-pre-line'
              >
                모자이크는 파편화된 부분 부분이 모여 아름다운 작품이 됩니다. 저희가 초대한 여러분은 각자만의 색을 선명하게 가지고 있습니다. 여러분의
                색을 조각조각 모아 잊지 못할 저녁을 만들고자 합니다.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center font-semibold tracking-wide whitespace-pre-line text-3xl md:text-4xl font-["DXTypeB"] font-extrabold text-white drop-shadow-lg'
              >
                NTLR 파티에 오신 것을
                <br />
                환영합니다.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className='fixed bottom-8 left-0 right-0 flex justify-center z-50'
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/questions/info')}
          className='px-8 py-4 bg-slate-900 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 relative before:absolute before:inset-0 before:rounded-full before:border-2 before:border-white/50 before:animate-[ping_3s_ease-in-out_infinite] before:opacity-70'
        >
          초대장 내용 입력하기
        </motion.button>
      </motion.div>
    </main>
  );
}
