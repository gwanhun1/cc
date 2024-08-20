import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // styles.css 또는 당신의 CSS 파일에 추가
  'fc-event': {
    'backgroundColor': 'transparent !important',
    // 배경색 제거
    'border': [{ 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': '!important' }],
    // 테두리 제거
    'color': 'inherit',
    // 텍스트 색상 유지 (필요시 조정)
    'boxShadow': [{ 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': '!important' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': '!important' }],
    // 그림자 제거
  }
});
