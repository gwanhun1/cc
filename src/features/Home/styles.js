import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'fc-event': {
    'backgroundColor': 'transparent !important',
    // 배경색 제거
    'border': [{ 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': '!important' }],
    // 테두리 제거
    'color': 'inherit',
    // 텍스트 색상 유지 (필요시 조정)
    'boxShadow': [{ 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': '!important' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': '!important' }],
    // 그림자 제거
  },
  'fc fc-daygrid-day-frame': {
    'maxHeight': [{ 'unit': 'px', 'value': 72 }]
  },
  'fc fc-daygrid-day-number': {
    'paddingTop': [{ 'unit': 'px', 'value': 4 }],
    'paddingRight': [{ 'unit': 'px', 'value': 4 }],
    'paddingBottom': [{ 'unit': 'px', 'value': 0 }]
  },
  'fc-event-start': {
    'marginTop': [{ 'unit': 'px', 'value': 0 }]
  },
  'fc-daygrid-event': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  }
});
