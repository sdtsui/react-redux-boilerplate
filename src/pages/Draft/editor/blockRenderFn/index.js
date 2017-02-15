import MediaComponent from './components/MediaComponent';
import { ATOMIC } from '../../core/types/block';

const blockRendererFn = contentBlock => {
  const type = contentBlock.getType();
  if (type === ATOMIC) {
    return {
      component: MediaComponent,
      editable: false,
      props: {},
    };
  }
  return null;
};

export default blockRendererFn;
