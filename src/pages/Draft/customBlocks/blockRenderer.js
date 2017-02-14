import MediaComponent from './MediaComponent';

const blockRenderer = contentBlock => {
  const type = contentBlock.getType();
  if (type === 'atomic') {
    return {
      component: MediaComponent,
      editable: false,
      props: {},
    };
  }
  return null;
};

export default blockRenderer;
