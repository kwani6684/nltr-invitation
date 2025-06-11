export interface Question {
  id: number;
  question: string;
  type: 'text' | 'radio';
  options?: string[];
  placeholder?: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: '가장 좋아하는 음악은 무엇인가요?',
    type: 'text',
    placeholder: '곡명 - 아티스트',
  },
  {
    id: 2,
    question: '가장 좋아하는 영화/드라마는 무엇인가요?',
    type: 'text',
    placeholder: '작품명과 함께 짧은 이유도 적어주세요',
  },
  {
    id: 3,
    question: '현재의 직업/직무는 무엇인가요? (대학생인 경우 단과대학 및 전공 포함)',
    type: 'text',
    placeholder: '예: UX 디자이너 / 공과대학 컴퓨터공학과',
  },
  {
    id: 4,
    question: '가장 좋아하는 유튜버 / 인플루언서 / 연예인은 누구인가요?',
    type: 'text',
    placeholder: '이름과 함께 짧은 이유도 적어주세요',
  },
  {
    id: 5,
    question: '가장 좋아하는 맛집 또는 서울에서 가장 좋아하는 동네는 어디인가요?',
    type: 'text',
    placeholder: '장소와 함께 짧은 이유도 적어주세요',
  },
  {
    id: 6,
    question: '가장 좋아하는 술은 무엇인가요?',
    type: 'radio',
    options: ['맥주', '소주', '와인', '위스키', '칵테일', '막걸리', '기타'],
  },
  {
    id: 7,
    question: '파티날 몇 시까지 놀 수 있나요?',
    type: 'radio',
    options: ['10시', '11시', '12시', '1시', '2시', '새벽까지 가능'],
  },
  {
    id: 8,
    question: '이 파티에서 얻고 싶은 것은 무엇인가요?',
    type: 'text',
    placeholder: '기대하는 것들을 자유롭게 적어주세요 (새로운 인연, 영감, 재미 등)',
  },
  {
    id: 9,
    question: '가장 가고 싶은 여행지는 어디인가요?',
    type: 'text',
    placeholder: '장소와 함께 짧은 이유도 적어주세요',
  },
  {
    id: 10,
    question: '자신이 가진 취미 중 가장 특이한 것은 무엇인가요?',
    type: 'text',
    placeholder: '특이한 취미와 함께 짧은 설명도 적어주세요',
  },
  {
    id: 11,
    question: '주변에서 불리는 별명은 무엇인가요?',
    type: 'text',
    placeholder: '별명과 함께 그렇게 불리게 된 이유도 적어주세요',
  },
  {
    id: 12,
    question: '20대 이후 바뀌기 전의 MBTI는 무엇인가요?',
    type: 'radio',
    options: ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'],
  },
  {
    id: 13,
    question: '살면서 제일 화났던 일은 무엇인가요?',
    type: 'text',
    placeholder: '당시 상황을 간단히 설명해주세요',
  },
  {
    id: 14,
    question: '가장 싫어하는 브랜드는 무엇인가요?',
    type: 'text',
    placeholder: '브랜드명과 함께 짧은 이유도 적어주세요',
  },
];
