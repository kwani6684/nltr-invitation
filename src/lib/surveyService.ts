import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { QUESTIONS } from '@/types/question';

// 사용자 기본 정보 타입 (현재는 이름만 수집)
export interface UserInfo {
  name: string;
}

// 설문 응답 타입
export interface SurveyResponse {
  questionId: string;
  question: string; // 질문 내용도 저장 (데이터 분석 용이성)
  answer: string;
  type: 'text' | 'radio'; // 질문 타입
  answeredAt?: Timestamp; // 응답 시간
}

// 전체 설문 데이터 타입 - 단순화된 구조
export interface SurveyData {
  // 기본 정보
  userInfo: UserInfo;

  // 설문 메타 정보
  surveyMeta: {
    totalQuestions: number;
    completedQuestions: number;
    startedAt: Timestamp;
    submittedAt: Timestamp;
    userAgent?: string; // 디버깅용
  };

  // 응답 데이터 - 배열 형태로 단일 저장
  responses: SurveyResponse[];
}

// 설문 데이터를 Firestore에 저장하는 함수 - 중복 제거
export const saveSurveyData = async (userInfo: UserInfo, responses: SurveyResponse[]) => {
  try {
    // 현재 시간
    const now = Timestamp.now();

    // 응답에 시간 정보 추가
    const responsesWithTime = responses.map((response) => ({
      ...response,
      answeredAt: now,
    }));

    const surveyData: SurveyData = {
      userInfo,
      surveyMeta: {
        totalQuestions: 10, // QUESTIONS 배열 길이
        completedQuestions: responses.length,
        startedAt: getStartTime(), // 시작 시간 가져오기
        submittedAt: now,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      },
      responses: responsesWithTime,
    };

    // Firestore에 저장 - 자동 ID 생성
    const docRef = await addDoc(collection(db, 'surveys'), surveyData);

    console.log('✅ 설문 데이터 저장 완료:', docRef.id);
    console.log('📊 저장된 응답 수:', responses.length);
    console.log('📋 저장된 데이터:', surveyData);

    return docRef.id;
  } catch (error: unknown) {
    console.error('❌ 설문 데이터 저장 실패:', error);

    // 구체적인 에러 메시지 제공
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        throw new Error('Firebase 보안 규칙을 확인해주세요. 쓰기 권한이 필요합니다.');
      } else if (error.message.includes('unavailable')) {
        throw new Error('네트워크 연결을 확인해주세요.');
      } else if (error.message.includes('unauthenticated')) {
        throw new Error('Firebase 설정을 확인해주세요.');
      }
    }

    throw error;
  }
};

// 시작 시간을 localStorage에서 가져오거나 현재 시간으로 설정
const getStartTime = (): Timestamp => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('surveyStartTime');
    if (stored) {
      return Timestamp.fromMillis(parseInt(stored));
    }
    // 시작 시간이 없으면 현재 시간으로 설정하고 저장
    const startTime = Date.now();
    localStorage.setItem('surveyStartTime', startTime.toString());
    return Timestamp.fromMillis(startTime);
  }
  return Timestamp.now();
};

// 개별 질문 응답을 임시 저장하는 함수 (로컬스토리지 활용)
export const saveQuestionResponse = (questionId: string, answer: string) => {
  if (typeof window !== 'undefined') {
    const responses = getStoredResponses();
    const existingIndex = responses.findIndex((r) => r.questionId === questionId);

    if (existingIndex >= 0) {
      responses[existingIndex].answer = answer;
    } else {
      responses.push({ questionId, answer, question: '', type: 'text' });
    }

    localStorage.setItem('surveyResponses', JSON.stringify(responses));
  }
};

// 저장된 응답들을 가져오는 함수
export const getStoredResponses = (): SurveyResponse[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('surveyResponses');
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

// 저장된 사용자 정보를 가져오는 함수
export const getStoredUserInfo = (): UserInfo | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('userInfo');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};

// 기존 localStorage answers 데이터를 SurveyResponse 형태로 변환하는 함수
export const convertAnswersToResponses = (): SurveyResponse[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('answers');
    if (stored) {
      const answers = JSON.parse(stored);

      return Object.entries(answers).map(([questionId, answer]) => {
        const question = QUESTIONS.find((q) => q.id === parseInt(questionId));
        return {
          questionId,
          answer: answer as string,
          question: question?.question || '',
          type: question?.type || 'text',
        };
      });
    }
  }
  return [];
};

// 모든 임시 데이터를 삭제하는 함수
export const clearStoredData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('surveyResponses');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('answers'); // 기존 answers도 삭제
    localStorage.removeItem('surveyStartTime'); // 시작 시간도 삭제
    console.log('🗑️ 로컬 데이터 정리 완료');
  }
};
