import MediaComponent from './components/MediaComponent';
import Layout1 from '../../features/customComponents/Layout1/index';
import { ATOMIC, LAYOUT } from '../../core/types/block';

const blockRendererFn = (
  setModal,
  updateEditorState,
  getEditorState,
  toggleReadOnly,
  readOnly,
) => contentBlock => {
  const type = contentBlock.getType();
  if (type === ATOMIC) {
    return {
      component: MediaComponent,
      editable: false,
      props: {},
    };
  }

  if (type === LAYOUT) {
    console.log('rendering layout');
    return {
      component: Layout1,
      editable: true,
      props: {
        setModal,
        updateEditorState,
        getEditorState,
        toggleReadOnly,
        readOnly,
      },
    };
  }

  return null;
};

export default blockRendererFn;
