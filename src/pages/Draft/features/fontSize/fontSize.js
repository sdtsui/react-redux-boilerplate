import {
  EditorState,
  Modifier,
} from 'draft-js';
import { mapSelectedCharacters } from '../../core';

export const prefix = 'FONT_SIZE_';
export const FONT_SIZE_8PX = `${prefix}8px`;
export const FONT_SIZE_9PX = `${prefix}9px`;
export const FONT_SIZE_10PX = `${prefix}10px`;
export const FONT_SIZE_12PX = `${prefix}12px`;
export const FONT_SIZE_14PX = `${prefix}14px`;
export const FONT_SIZE_16PX = `${prefix}16px`;
export const FONT_SIZE_18PX = `${prefix}18px`;
export const FONT_SIZE_20PX = `${prefix}20px`;
export const FONT_SIZE_22PX = `${prefix}22px`;
export const FONT_SIZE_24PX = `${prefix}24px`;
export const FONT_SIZE_36PX = `${prefix}36px`;
export const FONT_SIZE_48PX = `${prefix}48px`;
export const FONT_SIZE_72PX = `${prefix}72px`;
export const fontSizes = [
  FONT_SIZE_8PX,
  FONT_SIZE_9PX,
  FONT_SIZE_10PX,
  FONT_SIZE_12PX,
  FONT_SIZE_14PX,
  FONT_SIZE_16PX,
  FONT_SIZE_18PX,
  FONT_SIZE_20PX,
  FONT_SIZE_22PX,
  FONT_SIZE_24PX,
  FONT_SIZE_36PX,
  FONT_SIZE_48PX,
  FONT_SIZE_72PX,
];

export const addFontSizeStyle = (editorState, style) => {
  const newContentState = Modifier.applyInlineStyle(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    style
  );
  return EditorState.push(editorState, newContentState, 'change-inline-style');
};

export const filterFontSizeStyles = char => {
  const charStyles = char.get('style');
  const filteredStyles = charStyles.filter(style => !style.startsWith(prefix));
  return char.set('style', filteredStyles);
};

export const removeFontSizeStyles = mapSelectedCharacters(filterFontSizeStyles);

export const toggleFontSizeStyle = (editorState, style) => {
  const editorStateWithoutColorStyles = removeFontSizeStyles(editorState);
  const currentInlineStyles = editorState.getCurrentInlineStyle();

  if (!currentInlineStyles.has(style)) {
    return addFontSizeStyle(editorStateWithoutColorStyles, style);
  }

  return editorStateWithoutColorStyles;
};

// Used by the draft-js editor to pick up color styles and and return a new
// css object. This opens the window to an unlimited amount of colors.
export const customStyleFn = style => {
  if (!style.size) {
    return {};
  }

  const fontSizeStyle = style.filter(value => value.startsWith(prefix)).first();
  if (fontSizeStyle) {
    const fontSize = fontSizeStyle.replace(prefix, '');
    return { fontSize };
  }
  return {};
};
