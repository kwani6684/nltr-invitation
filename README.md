# NLTR Invitation

NLTR 파티 초대장 및 설문조사 웹사이트와 데스크탑 앱입니다.

## 🌐 웹사이트

웹 버전은 [여기](https://your-vercel-url.vercel.app)에서 이용 가능합니다.

## 💻 데스크탑 앱

더 편리한 사용을 위해 데스크탑 앱을 제공합니다:

- **macOS**: [다운로드 (.dmg)](https://github.com/YOUR_USERNAME/nltr-invitation/releases/latest/download/NLTR-Invitation-0.1.0.dmg)
- **Windows**: [다운로드 (.exe)](https://github.com/YOUR_USERNAME/nltr-invitation/releases/latest/download/NLTR-Invitation-Setup-0.1.0.exe)

### 시스템 요구사항

- macOS 10.15+ 또는 Windows 10+
- 인터넷 연결 (초기 로딩 및 데이터 동기화용)

## 🚀 개발

### 웹 개발

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 빌드
npm run build
```

### Electron 앱 개발

```bash
# 웹 개발 서버 시작 (별도 터미널)
npm run dev

# Electron 앱 실행 (개발 모드)
npm run electron-dev
```

### 배포용 빌드

```bash
# 모든 플랫폼용 빌드
npm run dist

# 특정 플랫폼용 빌드
npm run dist:mac     # macOS
npm run dist:win     # Windows
npm run dist:linux   # Linux
```

## 📦 배포

### 웹사이트 배포

- Vercel에 자동 배포됩니다.

### 데스크탑 앱 배포

1. **GitHub 태그 생성**:

   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

2. **자동 빌드**: GitHub Actions가 자동으로 macOS와 Windows용 앱을 빌드합니다.

3. **릴리스 생성**: 빌드 완료 후 GitHub Releases에 자동으로 업로드됩니다.

### 수동 배포 (필요시)

1. 로컬에서 빌드:

   ```bash
   npm run dist
   ```

2. `release/` 폴더의 파일들을 GitHub Releases에 수동 업로드

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Database**: Firebase Firestore
- **Desktop**: Electron
- **Deployment**: Vercel (웹), GitHub Releases (데스크탑)

## 📋 주요 기능

- 📱 반응형 웹 디자인
- 💻 크로스 플랫폼 데스크탑 앱
- 📝 설문조사 시스템
- 🔄 실시간 데이터 동기화
- 💾 오프라인 지원 (데스크탑 앱)
- 🎨 Beautiful UI/UX

## 🤝 기여

Pull Request와 이슈 제출을 환영합니다!

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
