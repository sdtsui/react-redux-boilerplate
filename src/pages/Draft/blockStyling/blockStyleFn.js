const blockStyleFn = contentBlock => {
  const type = contentBlock.getType();
  const blockData = contentBlock.getData();
  let classNames = [];

  if (blockData.has('className')) {
    classNames.push(blockData.get('className'));
  }

  if (type === 'blockquote') {
    classNames.push('RichEditor-blockquote');
  }

  return classNames.join(' ');
};

export default blockStyleFn;
