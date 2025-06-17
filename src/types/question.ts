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
    question: '가장 싫어하는 음악 장르는?',
    type: 'text',
    placeholder: 'ex) 한국 힙합, 메탈, 재즈',
  },
  {
    id: 2,
    question: '가장 좋아하는 캐릭터는?',
    type: 'text',
    placeholder: 'ex) 배트맨, 하울',
  },
  {
    id: 3,
    question: '자신을 잘 나타내는 한 마디는?',
    type: 'text',
    placeholder: 'ex) 빵 좋아하는 바리스타, 엄마를 사랑하는 홈프로텍터',
  },
  {
    id: 4,
    question: '내 인생이 영화라면, 한줄평은?',
    type: 'text',
    placeholder: 'ex) 금방 흐르고 빨리 마르는 눈물',
  },
  {
    id: 5,
    question: '서울에서 가장 좋아하는 동네는?',
    type: 'text',
    placeholder: 'ex) 한남동, 서촌',
  },
  {
    id: 6,
    question: '이 파티에서 만나고 싶은 사람은?',
    type: 'radio',
    options: ['비슷한 일을 하는 사람', '사이드프로젝트를 같이 할 사람', '취미가 비슷한 사람', '웃긴 사람', '위 중에 없어요'],
  },
  {
    id: 7,
    question: '가장 기억에 남는 여행지는?',
    type: 'text',
    placeholder: 'ex) 인도 바라나시',
  },
  {
    id: 8,
    question: '되고 싶은 나이는?',
    type: 'text',
    placeholder: 'ex) 7살, 56세',
  },
  {
    id: 9,
    question: '최근에 제일 킹받았던 것',
    type: 'text',
    placeholder: 'ex) 같이 햄부기 먹는데 양파 다 빼는 친구, 남의 재채기가 나에게 튀었다',
  },
  {
    id: 10,
    question: '남들은 싫어하는데 나만 좋아하는 것은?',
    type: 'text',
    placeholder: 'ex) 주차장 냄새, 퍼진 라면',
  },
];
