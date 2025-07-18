'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDownTrayIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

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

      {/* 데스크탑 앱 다운로드 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className='w-full bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-12 border-y border-white/10'
      >
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='flex items-center justify-center gap-3 mb-6'
          >
            <ComputerDesktopIcon className='h-8 w-8 text-blue-400' />
            <h3 className='text-2xl md:text-3xl font-bold text-white'>데스크탑 앱으로 참여하기</h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='text-gray-300 text-lg mb-8 max-w-2xl mx-auto'
          >
            더 편리한 경험을 위해 데스크탑 앱을 다운로드하여 사용하실 수 있습니다.
            <br />
            오프라인에서도 작성한 내용이 저장됩니다.
          </motion.p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <motion.a
              href='https://github.com/kwani6684/nltr-invitation/releases/latest/download/NLTR-Invitation-0.1.0.dmg'
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-3 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              <ArrowDownTrayIcon className='h-5 w-5' />
              <span className='font-semibold'>macOS용 다운로드</span>
              <span className='text-sm text-gray-300'>(.dmg)</span>
            </motion.a>

            <motion.a
              href='https://github.com/kwani6684/nltr-invitation/releases/latest/download/NLTR-Invitation-Setup-0.1.0.exe'
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              <ArrowDownTrayIcon className='h-5 w-5' />
              <span className='font-semibold'>Windows용 다운로드</span>
              <span className='text-sm text-blue-100'>(.exe)</span>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className='mt-6 text-sm text-gray-400'
          >
            <p>시스템 요구사항: macOS 10.15+ 또는 Windows 10+</p>
            <a
              href='https://github.com/kwani6684/nltr-invitation/releases'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 hover:text-blue-300 underline'
            >
              모든 릴리스 보기
            </a>
          </motion.div>
        </div>
      </motion.div>

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
