import { fontSizeFn } from '../../features/fontSize/fontSize';
import { colorStyleFn } from '../../features/fontColor/fontColor';
import { fontFamilyFn } from '../../features/fontFamily/fontFamily';

const functionList = [fontSizeFn, colorStyleFn, fontFamilyFn];

/**
 * Accepts a list of functions that take css style as a parameter
 * then it reduces it and merge the css object.
 * @param style
 * @returns {*}
 */
const customStyleFn = style => {
  const result = functionList.reduce((css, fn) => {
    return { ...css, ...fn(style) };
  }, {});

  console.log('result', result);
  return result;
};

export default customStyleFn;
