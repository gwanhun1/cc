# 💞 커플 일정 공유 및 기록 서비스

> **커플들이 함께하는 일정을 공유하고, 수행 후 사진으로 기록하여 달력에 추억을 저장할 수 있는 서비스**  
> Material-UI의 캘린더를 커스터마이징하여 일정과 사진을 추가할 수 있도록 확장했습니다.

## 🌟 프로젝트 개요

- **일정 공유 및 기록**
  - 커플들이 일정과 To-Do 리스트를 공유하고 사진으로 기록하여 시각적으로 추억을 저장하는 서비스.
- **캘린더 커스터마이징**
  - Material-UI 캘린더를 커스터마이징해 일정 제목 및 사진 추가 기능 구현.
- **연동된 To-Do 리스트**
  - To-Do 리스트와 캘린더를 연동하여 일정 완료 후 사진 기록 및 저장 가능.

## 🛠️ 담당 기능

- **Atomic 디자인 패턴 적용**
  - 반복되는 레이아웃과 UI를 컴포넌트 단위로 분리하여 **재사용성** 및 **유지보수성**을 향상.
- **Recoil을 활용한 전역 데이터 관리**
  - 날짜 데이터를 Recoil로 관리하여 **페이지 간 데이터 일관성** 유지.
- **이미지 로딩 속도 최적화**
  - Firebase에서 이미지를 불러오는 속도를 개선하기 위해 저장 시 이미지 압축을 적용.
- **반응형 웹 제작**
  - 다양한 디바이스(폰, 태블릿, PC)에서 적절히 동작하도록 UI/UX 최적화.
- **Vercel 자동 배포**
  - Vercel을 통해 배포 프로세스를 자동화하고, 개발/운영 효율성을 극대화.

## 🚀 사용 기술

- **Frontend:** TypeScript, React, Styled-Components, Material-UI
- **State Management:** Recoil
- **Backend:** Axios, Firebase
- **배포:** Vercel

## 🔧 트러블슈팅

### 이미지 로딩 속도 최적화

#### 문제 상황

- Firebase에서 이미지를 렌더링할 때 지연이 발생하여 사용자 경험 저하.

#### 해결 방법

1. **렌더링 방식 변경**
   - 기존: `div`의 `backgroundImage` 속성을 사용하여 이미지 배치 제어.
   - 변경: `<img>` 태그로 변경해 브라우저 최적화와 렌더링 성능 개선.
     - **이점**:
       - 브라우저가 **이미지 로딩을 더 높은 우선순위**로 처리.
       - **레이어 처리**를 단순화해 렌더링 최적화.
       - HTML 표준 요소로 **더 빠른 로딩 시작**.
   - `background-size`, `background-position`의 제어 필요성을 `<img>` 태그의 CSS 스타일로 대체.
2. **이미지 파일 압축**
   - 저장 시 압축 알고리즘을 적용해 파일 크기를 최소화하며 품질 저하를 방지.
   - 로딩 시간이 평균 40% 단축됨.

## 📁 폴더 구조

```
root
├─ package.json
├─ package-lock.json
├─ vite.config.js
├─ .eslintrc
├─ .prettierrc
├─ firebase.json
├─ tsconfig.json
├─ Router.jsx
├─ public
├─ src
│  ├─ App.tsx
│  ├─ index.tsx
│  ├─ features
│  │  └─ pages
│  ├─ components
│  │  ├─ auth
│  │  ├─ common
│  │  ├─ layout
│  │  └─ home
│  ├─ hooks
│  ├─ layout
│  ├─ pages
│  ├─ recoil
│  ├─ style
│  ├─ types
│  ├─ utils
│  └─ assets
└─ README.md
```

#### `폴더구조`

- components - 컴포넌트 모음(재사용 o)
- components/pages 페이지 내 컴포넌트 모음
- hooks - 리액트 구성 훅 모음(재사용 o)
- hooks - 훅 모음
- layouts - 기본적인 틀 제공
- features - 각 서비스 모음
- pages - 각 페이지 모음
- Router - 라우터 설정 모음
- recoil - 리코일
- types - type 정의 모음
- utils - 유틸리티 모음

<br /><br />

## 📊 데이터 시각화 및 주요 화면

### 📅 일정 공유 및 기록

- 커플들이 함께하는 일정을 캘린더에 저장하고 사진으로 추억을 남길 수 있는 기능.
- Material-UI 캘린더를 활용하여 사용자 친화적인 UI 제공.

| 이미지                                                                                                   | 제목            | 설명                                   |
| -------------------------------------------------------------------------------------------------------- | --------------- | -------------------------------------- |
| <img src="https://github.com/user-attachments/assets/9063b1a8-9beb-4c01-b4d5-75da38128f36" width="400"/> | 로그인          | 사용자 로그인 화면, 회원가입 기능 제공 |
| <img src="https://github.com/user-attachments/assets/e80a39e8-459d-4c42-837e-3297e0d71fc9" width="400"/> | 메인페이지      | 투두리스트와 캘린더 메인 화면          |
| <img src="https://github.com/user-attachments/assets/77f93593-ea08-4a3d-9c06-ed5544f3403c" width="400"/> | 일정 페이지     | 특정 날짜의 일정 세부정보를 확인 가능  |
| <img src="https://github.com/user-attachments/assets/cedfa478-cbe0-4963-a210-d902f8b9c3b9" width="400"/> | 캘린더 페이지   | 사진과 일정을 관리하는 캘린더          |
| <img src="https://github.com/user-attachments/assets/8db2fc85-6b8a-44b6-a1a3-b2342891c51a" width="400"/> | 사진 추가       | 추억을 기록하기 위해 사진을 업로드     |
| <img src="https://github.com/user-attachments/assets/f6559851-ac56-47e6-91f5-62e11e3d9551" width="400"/> | 5가지 테마 선택 | 다양한 테마로 페이지 스타일 변경 가능  |
| <img src="https://github.com/user-attachments/assets/9ef637f6-c03b-4a84-a7a1-c79e8b9c51b4" width="400"/> | 반응형 페이지   | 모바일, 태블릿, PC 환경에 적응 가능    |

## 📌 주요 성과

1. **이미지 렌더링 속도 개선**
   - Firebase 이미지 로딩 속도를 평균 40% 단축.
   - 최적화된 렌더링 방식 도입으로 사용자 경험 향상.
2. **Atomic 디자인 패턴 도입**
   - 컴포넌트 재사용성을 극대화하여 유지보수 시간 절감.
3. **반응형 UI 제작**
   - 다양한 디바이스에서 일관된 사용자 경험 제공.

---

## 🔗 참고 링크

- **GitHub Repository:** [커플 일정 공유 및 기록 서비스](https://github.com/gwanhun1/cc)

---
