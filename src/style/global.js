import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ':root': {
    'fontFamily': 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    'lineHeight': [{ 'unit': 'px', 'value': 1.5 }],
    'fontWeight': '400',
    'colorScheme': 'light dark',
    'color': '#444444',
    'backgroundColor': '#ffffff',
    'fontSynthesis': 'none',
    'textRendering': 'optimizeLegibility',
    'WebkitFontSmoothing': 'antialiased',
    'MozOsxFontSmoothing': 'grayscale',
    'prefers-color-scheme ligh': {
      'color': '#213547',
      'backgroundColor': '#ffffff'
    }
  },
  'a': {
    'fontWeight': '500',
    'color': '#cf364d',
    'textDecoration': 'inherit'
  },
  'a:hover': {
    'color': '#cf364d'
  },
  'body': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    // display: flex;
  place-items: center;
  justify-content: center;
    'minWidth': [{ 'unit': 'px', 'value': 320 }],
    'backgroundColor': '#efefef'
  },
  'h1': {
    'fontSize': [{ 'unit': 'em', 'value': 3.2 }],
    'lineHeight': [{ 'unit': 'px', 'value': 1.1 }]
  }
});
