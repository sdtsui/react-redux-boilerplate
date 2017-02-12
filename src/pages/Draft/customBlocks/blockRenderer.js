import MediaComponent from './MediaComponent';

const blockRenderer = contentBlock => {
  const type = contentBlock.getType();
  console.log('want to render atomic block');
  if (type === 'atomic') {
    console.log('Rendering atomic block');
    return {
      component: MediaComponent,
      editable: false,
      props: {
        src: 'http://i.imgur.com/zxy9hLn.jpg',
      },
    };
  }
  return null;
};

export default blockRenderer;
