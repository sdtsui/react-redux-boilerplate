import { alignmentStyleFn } from '../../features/alignment';

const blockStyleFn = contentBlock => {
  let classNames = [];

  // alignment implementation
  const alignmentClassNames = alignmentStyleFn(contentBlock);
  if (alignmentClassNames) {
    classNames.push(classNames.concat(alignmentClassNames));
  }
  return classNames.join(' ');
};

export default blockStyleFn;
