import { Platform } from 'react-native';

export const COLORS = {
  night: '#041417',
  petrol: '#07272D',
  petrolSoft: '#0D3B43',
  jade: '#1E6A68',
  ivory: '#F5F0E6',
  paper: '#FFFCF6',
  sand: '#E8DECD',
  gold: '#D2B06A',
  goldSoft: '#E7CA8B',
  goldBright: '#E7CA8B',
  ink: '#0A2B31',
  muted: '#6E7E7C',
  line: '#DED5C6',
  border: '#DED5C6',
  white: '#FFFFFF',
  danger: '#B35650',
  success: '#31765D',
  black: '#000000',
};

export const RADIUS = {
  small: 14,
  medium: 22,
  large: 32,
  hero: 38,
  pill: 999,
};

export const SHADOW = Platform.select({
  ios: {
    shadowColor: '#041417',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.14,
    shadowRadius: 22,
  },
  android: { elevation: 7 },
  default: {},
});

export const TYPE = {
  display: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
  body: Platform.select({ ios: 'System', android: 'sans-serif', default: 'sans-serif' }),
};
