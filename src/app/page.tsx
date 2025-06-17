'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

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
                <span className='font-bold text-white'>
                  모든 낯선 만남은 일상으로부터 <br /> 우리를 떼어놓습니다.
                </span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center space-y-6 whitespace-pre-line'
              >
                저희가 준비한 파티는 <br /> 이런 비일상을 함께 즐기는 시간입니다.
                <br />
                <br />
                <span className='font-bold text-white'>
                  처음 듣는 음악, 처음 보는 공간과 사람들,
                  <br />
                  처음 경험하는 대화.
                </span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center space-y-6 whitespace-pre-line'
              >
                NTLR이 준비한 비일상적인 공간에 방문해
                <br />
                혼자 묻어둘 수밖에 없었던 꿈과 열정을 <br />
                다시 꺼내볼 수 있기를 바랍니다.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center space-y-6 whitespace-pre-line'
              >
                파편화된 부분 부분이 모여 <br />
                아름다운 작품이 되는 모자이크처럼
                <br /> <br />
                저희는 여러분의 색을 조각조각 모아 <br /> 잊지 못할 저녁을 만들고자 합니다.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center tracking-wide whitespace-pre-line text-3xl md:text-4xl font-["Karla"] font-extrabold text-white drop-shadow-lg'
              >
                <span className='font-bold text-white'>NTLR 파티에 초대합니다.</span>
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
          파티 참가하기
        </motion.button>
      </motion.div>
    </main>
  );
}
