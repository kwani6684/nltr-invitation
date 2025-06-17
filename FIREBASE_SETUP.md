# 🔥 Firebase 설정 가이드

## 1. Firebase 프로젝트 생성

### 1.1 Firebase 콘솔 접속

1. [Firebase 콘솔](https://console.firebase.google.com/)에 접속
2. Google 계정으로 로그인

### 1.2 새 프로젝트 생성

1. **"프로젝트 추가"** 버튼 클릭
2. 프로젝트 이름 입력 (예: `ntlr-invitation`)
3. Google Analytics 설정 (선택사항, 추천: 사용 안함)
4. **"프로젝트 만들기"** 클릭

## 2. Firestore 데이터베이스 설정

### 2.1 Firestore 생성

1. 왼쪽 메뉴에서 **"Firestore Database"** 클릭
2. **"데이터베이스 만들기"** 클릭
3. **"테스트 모드에서 시작"** 선택
4. 위치 선택: `asia-northeast3` (서울) 권장
5. **"완료"** 클릭

### 2.2 보안 규칙 설정 (중요!)

1. Firestore Database 페이지에서 **"규칙"** 탭 클릭
2. 다음 규칙으로 변경:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // 테스트용 - 모든 쓰기 허용 (읽기는 제한)
    match /surveys/{document} {
      allow write: if true;
      allow read: if false; // 개인정보 보호
    }
  }
}
```

3. **"게시"** 버튼 클릭

## 3. 웹 앱 등록

### 3.1 앱 추가

1. 프로젝트 개요 페이지에서 **웹 아이콘** (`</>`) 클릭
2. 앱 닉네임 입력 (예: `ntlr-invitation-web`)
3. Firebase Hosting 설정은 건너뛰기
4. **"앱 등록"** 클릭

### 3.2 Firebase SDK 구성 복사

Firebase SDK 구성 정보가 다음과 같이 표시됩니다:

```javascript
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789',
  appId: 'your-app-id',
};
```

이 정보를 복사해두세요.

## 4. 환경 변수 설정

### 4.1 .env.local 파일 생성

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 다음 내용을 입력:

```bash
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

⚠️ **중요**: `your-project-id`, `your-api-key` 등을 실제 Firebase 설정값으로 교체하세요.

### 4.2 .gitignore 확인

`.env.local` 파일이 Git에 커밋되지 않도록 `.gitignore`에 포함되어 있는지 확인:

```
# Environment variables
.env.local
```

## 5. 테스트

### 5.1 개발 서버 실행

```bash
npm run dev
```

### 5.2 설문 응답 테스트

1. `http://localhost:3000`에 접속
2. 이름 입력 후 설문 진행
3. 완료 페이지에서 저장 상태 확인

### 5.3 Firebase 콘솔에서 데이터 확인

1. Firebase 콘솔의 Firestore Database로 이동
2. `surveys` 컬렉션에 데이터가 저장되었는지 확인

## 6. 문제 해결

### 6.1 "Missing or insufficient permissions" 오류

- Firestore 보안 규칙이 올바르게 설정되었는지 확인
- 위의 2.2 단계를 다시 확인

### 6.2 "Firebase config is missing" 오류

- `.env.local` 파일이 올바르게 생성되었는지 확인
- 모든 환경 변수가 `NEXT_PUBLIC_` 접두사를 가지는지 확인
- 개발 서버를 재시작 (`Ctrl+C` 후 `npm run dev`)

### 6.3 네트워크 오류

- 인터넷 연결 확인
- Firebase 프로젝트가 활성화되어 있는지 확인

## 7. 데이터 구조

저장되는 데이터 구조 (중복 제거됨):

```json
{
  "userInfo": {
    "name": "사용자 이름"
  },
  "surveyMeta": {
    "totalQuestions": 10,
    "completedQuestions": 10,
    "startedAt": "2025-01-XX XX:XX:XX",
    "submittedAt": "2025-01-XX XX:XX:XX",
    "userAgent": "Mozilla/5.0..."
  },
  "responses": [
    {
      "questionId": "1",
      "question": "가장 싫어하는 음악 장르는?",
      "answer": "사용자 응답",
      "type": "text",
      "answeredAt": "2025-01-XX XX:XX:XX"
    }
  ]
}
```

## 8. 보안 고려사항

### 프로덕션 환경에서는 더 엄격한 보안 규칙 적용:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /surveys/{surveyId} {
      // 새 문서 생성만 허용 (수정/삭제 불가)
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

---

📞 **문제가 지속되면**: Firebase 콘솔에서 프로젝트 설정을 다시 확인하거나 새 프로젝트를 생성해보세요.
