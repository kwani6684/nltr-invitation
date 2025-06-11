'use client';

import { Question } from '@/types/question';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface QuestionFormProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  hideButtons?: boolean;
}

export default function QuestionForm({ question, value, onChange, onNext, onPrev, isFirst, isLast, hideButtons }: QuestionFormProps) {
  const [otherValue, setOtherValue] = useState('');

  const handleChange = (selectedValue: string, inputValue = '') => {
    if (selectedValue === '기타') {
      onChange(`기타: ${inputValue}`);
      setOtherValue(inputValue);
    } else {
      onChange(selectedValue);
      setOtherValue('');
    }
  };

  useEffect(() => {
    if (value.startsWith('기타: ')) {
      setOtherValue(value.replace('기타: ', ''));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onNext();
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className='w-full max-w-2xl mx-auto p-6'>
      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className='space-y-4'>
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className='text-2xl font-bold text-white mb-6'>
            {question.question}
          </motion.h2>

          {question.type === 'text' ? (
            <motion.textarea
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={question.placeholder}
              className='w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[120px] font-["Pretendard"]'
            />
          ) : (
            <div className='grid grid-cols-2 gap-4'>
              {question.options?.map((option) => (
                <motion.div key={option} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className='flex items-center'>
                  <input
                    type='radio'
                    id={option}
                    name='answer'
                    value={option}
                    checked={option === '기타' ? value.startsWith('기타: ') : value === option}
                    onChange={(e) => handleChange(e.target.value)}
                    className='w-5 h-5 text-slate-500 bg-gray-800 border-gray-700 focus:ring-0 cursor-pointer'
                  />
                  <label
                    htmlFor={option}
                    className='ml-3 text-lg text-gray-200 cursor-pointer hover:text-white transition-colors font-["Pretendard"]'
                  >
                    {option}
                  </label>
                </motion.div>
              ))}
              {value.startsWith('기타: ') && (
                <div className='col-span-2'>
                  <motion.textarea
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    value={otherValue}
                    onChange={(e) => handleChange('기타', e.target.value)}
                    placeholder='기타 내용을 입력해주세요'
                    className='w-full mt-2 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-["Pretendard"]'
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </form>

      {!hideButtons && (
        <div className='fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 p-4'>
          <div className='w-full max-w-2xl mx-auto flex gap-4'>
            <motion.button
              type='button'
              onClick={onPrev}
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
              onClick={handleSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex-1 px-6 py-3 bg-slate-900 rounded-full text-white font-medium hover:bg-slate-800 transition-all duration-200 border border-white/30'
            >
              {isLast ? '제출하기' : '다음'}
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
