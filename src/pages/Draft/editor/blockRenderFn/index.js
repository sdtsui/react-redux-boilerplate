import MediaComponent from './components/MediaComponent';
import Layout1 from './components/Layout1';
import { ATOMIC, LAYOUT } from '../../core/types/block';

const blockRendererFn = setModal => contentBlock => {
  const type = contentBlock.getType();
  if (type === ATOMIC) {
    return {
      component: MediaComponent,
      editable: false,
      props: {},
    };
  }

  if (type === LAYOUT) {
    return {
      component: Layout1,
      editable: true,
      props: {
        setModal,
      },
    };
  }

  return null;
};

export default blockRendererFn;
