# Couple Calendar 프로젝트

- node : v18.16.0
- npm : 9.5.1
- react : ^18.3.1
- vite : 5.4.1,

```
$ npm install - 프로젝트 설치
$ npm run dev - 프로젝트 실행
```

[http://localhost:5173](http://localhost:5173) -> 실행 주소

<br /><br />

## 프로젝트 구조

---

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

<br />

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
