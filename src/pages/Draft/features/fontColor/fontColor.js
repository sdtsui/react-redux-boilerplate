import makeDynamicStyles from '../dynamicStyles';

export const prefix = 'FONT_COLOR_';
export const FONT_COLOR_8PX = `${prefix}red`;
export const FONT_COLOR_9PX = `${prefix}blue`;
export const FONT_COLOR_10PX = `${prefix}green`;

export const fontColors = [
  FONT_COLOR_8PX,
  FONT_COLOR_9PX,
  FONT_COLOR_10PX,
];

const color = makeDynamicStyles(prefix, 'color');

export const toggleColor = color.toggleDynamicStyles;
export const currentColor = color.currentStyle;
export const colorStyleFn = color.StyleFn;
