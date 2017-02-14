const blockStyleFn = contentBlock => {
  const type = contentBlock.getType();
  const blockData = contentBlock.getData();
  let classNames = [];

  if (blockData.has('className')) {
    classNames.push(blockData.get('className'));
  }

  return classNames.join(' ');
};

export default blockStyleFn;
