import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // 기본 설정
  ':root': {
    'Color': '#cf364d',
    // 기본 색상
    'BackgroundColor': '#ffffff',
    // 기본 배경색
    'LinkColor': '#cf364d',
    // 기본 링크 색상
    'LinkHoverColor': '#747bff',
    // 링크 hover 색상
    'TodayBgColor': '#ffe8f2',
    // 오늘 날짜 배경색
    'DayHeaderBgColor': '#d0354e1a',
    // 날짜 셀 배경색
  },
  // 기본 스타일
  '*': {
    'boxSizing': 'border-box'
  },
  'html': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'fontFamily': 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    'lineHeight': [{ 'unit': 'px', 'value': 1.5 }],
    'fontWeight': '400',
    'colorScheme': 'light dark',
    'color': 'var(--color)',
    // 기본 텍스트 색상
    'backgroundColor': 'var(--background-color)',
    // 기본 배경색
    'fontSynthesis': 'none',
    'textRendering': 'optimizeLegibility',
    'WebkitFontSmoothing': 'antialiased',
    'MozOsxFontSmoothing': 'grayscale',
    'prefers-color-scheme ligh': {
      'backgroundColor': 'var(--background-color)',
      // 기본 배경색
      'color': 'var(--color)',
      // 기본 텍스트 색상
    },
    'prefers-color-scheme dar': {
      'backgroundColor': 'var(--background-color)',
      // 기본 배경색
      'color': 'var(--color)',
      // 기본 텍스트 색상
    }
  },
  'body': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'fontFamily': 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    'lineHeight': [{ 'unit': 'px', 'value': 1.5 }],
    'fontWeight': '400',
    'colorScheme': 'light dark',
    'color': 'var(--color)',
    // 기본 텍스트 색상
    'backgroundColor': 'var(--background-color)',
    // 기본 배경색
    'fontSynthesis': 'none',
    'textRendering': 'optimizeLegibility',
    'WebkitFontSmoothing': 'antialiased',
    'MozOsxFontSmoothing': 'grayscale',
    'prefers-color-scheme ligh': {
      'backgroundColor': 'var(--background-color)',
      // 기본 배경색
      'color': 'var(--color)',
      // 기본 텍스트 색상
    },
    'prefers-color-scheme dar': {
      'backgroundColor': 'var(--background-color)',
      // 기본 배경색
      'color': 'var(--color)',
      // 기본 텍스트 색상
    }
  },
  // 링크 기본 색상
  'a': {
    'fontWeight': '500',
    'textDecoration': 'inherit'
  },
  // 링크 hover 색상
  'a:hover': {
    'color': 'var(--link-hover-color)'
  },
  // h1 스타일
  'h1': {
    'fontSize': [{ 'unit': 'em', 'value': 3.2 }],
    'lineHeight': [{ 'unit': 'px', 'value': 1.1 }]
  },
  // 기본 body 스타일
  'body': {
    'minWidth': [{ 'unit': 'px', 'value': 320 }],
    'backgroundColor': 'var(--background-color)',
    // 기본 배경색
  },
  // light 테마에서 색상 설정
  'theme-light': {
    'Color': '#213547',
    // 밝은 모드 텍스트 색상
    'BackgroundColor': '#ffffff',
    // 밝은 모드 배경색
    'LinkColor': '#cf364d',
    // 기본 링크 색상
    'LinkHoverColor': '#747bff',
    // 링크 hover 색상
    'TodayBgColor': '#ffe8f2',
    // 오늘 날짜 배경색
    'DayHeaderBgColor': '#d0354e1a',
    // 날짜 셀 배경색
  },
  // dark 테마에서 색상 설정
  'theme-dark': {
    'Color': '#efefef',
    // 어두운 모드 텍스트 색상
    'BackgroundColor': '#333333',
    // 어두운 모드 배경색
    'LinkColor': '#cf364d',
    // 기본 링크 색상
    'LinkHoverColor': '#747bff',
    // 링크 hover 색상
    'TodayBgColor': '#ffe8f2',
    // 오늘 날짜 배경색
    'DayHeaderBgColor': '#d0354e1a',
    // 날짜 셀 배경색
  },
  // 각 테마에 따른 색상 적용
  'theme-red': {
    'Color': '#cf364d',
    // 빨간색 텍스트 색상
    'BackgroundColor': '#ffffff',
    // 빨간색 배경색
  },
  'theme-green': {
    'Color': '#28a745',
    // 초록색 텍스트 색상
    'BackgroundColor': '#ffffff',
    // 초록색 배경색
  },
  'theme-blue': {
    'Color': '#007bff',
    // 파란색 텍스트 색상
    'BackgroundColor': '#ffffff',
    // 파란색 배경색
  },
  'theme-black': {
    'Color': '#ffffff',
    // 흰색 텍스트 색상
    'BackgroundColor': '#333333',
    // 검정색 배경색
  },
  // media query로 light 모드, dark 모드 처리
});
