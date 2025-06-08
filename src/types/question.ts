export interface Question {
  id: number;
  text: string;
  placeholder?: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '당신의 이름은 무엇인가요?',
    placeholder: '이름을 입력해주세요',
  },
  {
    id: 2,
    text: '당신의 나이는 어떻게 되나요?',
    placeholder: '나이를 입력해주세요',
  },
  {
    id: 3,
    text: '당신의 직업은 무엇인가요?',
    placeholder: '직업을 입력해주세요',
  },
  {
    id: 4,
    text: '당신의 취미는 무엇인가요?',
    placeholder: '취미를 입력해주세요',
  },
  {
    id: 5,
    text: '당신이 좋아하는 음식은 무엇인가요?',
    placeholder: '좋아하는 음식을 입력해주세요',
  },
  {
    id: 6,
    text: '당신이 좋아하는 영화는 무엇인가요?',
    placeholder: '좋아하는 영화를 입력해주세요',
  },
  {
    id: 7,
    text: '당신이 좋아하는 음악은 무엇인가요?',
    placeholder: '좋아하는 음악을 입력해주세요',
  },
  {
    id: 8,
    text: '당신이 좋아하는 여행지는 어디인가요?',
    placeholder: '좋아하는 여행지를 입력해주세요',
  },
  {
    id: 9,
    text: '당신의 꿈은 무엇인가요?',
    placeholder: '꿈을 입력해주세요',
  },
  {
    id: 10,
    text: '당신의 장점은 무엇인가요?',
    placeholder: '장점을 입력해주세요',
  },
  {
    id: 11,
    text: '당신의 단점은 무엇인가요?',
    placeholder: '단점을 입력해주세요',
  },
  {
    id: 12,
    text: '당신이 가장 행복했던 순간은 언제인가요?',
    placeholder: '행복했던 순간을 입력해주세요',
  },
  {
    id: 13,
    text: '당신이 가장 슬펐던 순간은 언제인가요?',
    placeholder: '슬펐던 순간을 입력해주세요',
  },
  {
    id: 14,
    text: '당신이 가장 감사한 사람은 누구인가요?',
    placeholder: '감사한 사람을 입력해주세요',
  },
  {
    id: 15,
    text: '당신의 인생 좌우명은 무엇인가요?',
    placeholder: '인생 좌우명을 입력해주세요',
  },
];
