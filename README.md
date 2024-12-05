# 💞 커플 일정 공유 및 기록 서비스

> **커플들이 함께하는 일정을 공유하고, 수행 후 사진으로 기록하여 달력에 추억을 저장할 수 있는 서비스**  
> Material-UI의 캘린더를 커스터마이징하여 일정과 사진을 추가할 수 있도록 확장했습니다.

## 🌟 프로젝트 개요

- **일정 공유 및 기록**
  - 커플들이 일정과 To-Do 리스트를 공유하고 사진으로 기록하여 시각적으로 추억을 저장하는 서비스
- **캘린더 커스터마이징**
  - Material-UI 캘린더를 커스터마이징해 일정 제목 및 사진 추가 기능 구현
- **연동된 To-Do 리스트**
  - To-Do 리스트와 캘린더를 연동하여 일정 완료 후 사진 기록 및 저장 가능

## 🛠️ 주요 기능 및 기술

### 기능
- **일정 관리**
  - 캘린더를 통한 직관적인 일정 관리
  - 날짜별 To-Do 리스트 생성 및 관리
  - 일정 완료 시 사진 업로드 기능
- **테마 커스터마이징**
  - 5가지 테마 색상 선택 가능
  - 사용자 취향에 맞는 UI 커스터마이징
- **반응형 디자인**
  - 모바일, 태블릿, 데스크톱 환경 지원
  - 디바이스별 최적화된 UI/UX 제공

### 기술 스택
- **Frontend**
  - TypeScript
  - React 18
  - Material-UI
  - Styled-Components
- **상태 관리**
  - Recoil
- **백엔드/인프라**
  - Firebase (Authentication, Firestore, Storage)
  - Vercel (배포)

## 🔧 프로젝트 구조

```
src
├─ features/           # 주요 기능별 컴포넌트
│  ├─ Calendar/       # 캘린더 관련 컴포넌트
│  └─ TodoList/       # Todo 관련 컴포넌트
├─ components/         # 공통 컴포넌트
│  ├─ auth/           # 인증 관련 컴포넌트
│  ├─ common/         # 공통 UI 컴포넌트
│  └─ layout/         # 레이아웃 컴포넌트
├─ hooks/             # 커스텀 훅
├─ recoil/            # Recoil 상태 관리
├─ style/             # 전역 스타일
└─ utils/             # 유틸리티 함수
```

## 📱 주요 화면

| 이미지                                                                                                   | 제목            | 설명                                   |
| -------------------------------------------------------------------------------------------------------- | --------------- | -------------------------------------- |
| <img src="https://github.com/user-attachments/assets/9063b1a8-9beb-4c01-b4d5-75da38128f36" width="400"/> | 로그인          | 사용자 로그인 화면, 회원가입 기능 제공 |
| <img src="https://github.com/user-attachments/assets/e80a39e8-459d-4c42-837e-3297e0d71fc9" width="400"/> | 메인페이지      | 투두리스트와 캘린더 메인 화면          |
| <img src="https://github.com/user-attachments/assets/77f93593-ea08-4a3d-9c06-ed5544f3403c" width="400"/> | 일정 페이지     | 특정 날짜의 일정 세부정보를 확인 가능  |
| <img src="https://github.com/user-attachments/assets/cedfa478-cbe0-4963-a210-d902f8b9c3b9" width="400"/> | 캘린더 페이지   | 사진과 일정을 관리하는 캘린더          |
| <img src="https://github.com/user-attachments/assets/8db2fc85-6b8a-44b6-a1a3-b2342891c51a" width="400"/> | 사진 추가       | 추억을 기록하기 위해 사진을 업로드     |
| <img src="https://github.com/user-attachments/assets/f6559851-ac56-47e6-91f5-62e11e3d9551" width="400"/> | 5가지 테마 선택 | 다양한 테마로 페이지 스타일 변경 가능  |
| <img src="https://github.com/user-attachments/assets/9ef637f6-c03b-4a84-a7a1-c79e8b9c51b4" width="400"/> | 반응형 페이지   | 모바일, 태블릿, PC 환경에 적응 가능    |

## 🔍 주요 개선사항

### 1. 타입 시스템 강화
- TypeScript 타입 정의 개선
- 날짜 관련 타입 안정성 강화 (Date 객체 → ISO 문자열)
- 컴포넌트 props 타입 체계화

### 2. 성능 최적화
- React.memo를 통한 불필요한 리렌더링 방지
- 이미지 최적화 처리
- Firebase 데이터 요청 최적화

### 3. 코드 품질 개선
- 컴포넌트 구조 개선
- 재사용 가능한 커스텀 훅 개발
- 일관된 코드 스타일 적용

## 🚀 실행 방법

1. 저장소 클론
```bash
git clone https://github.com/gwanhun1/cc.git
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

## 📌 향후 계획

- [ ] 테스트 코드 추가
- [ ] 성능 모니터링 도구 도입
- [ ] 사진 압축 알고리즘 개선
- [ ] PWA 지원 추가

## 🔗 링크

- [GitHub Repository](https://github.com/gwanhun1/cc)
- [배포 사이트](배포된 사이트 URL)
