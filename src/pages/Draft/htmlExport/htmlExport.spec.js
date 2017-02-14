import { expect } from 'chai';
import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { fromJS } from 'immutable';

describe('stateToHTML tests', () => {
  const rawContentState = {
    entityMap: {},
    blocks: [
      {
        key: '7du3s',
        text: 'block2',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: fromJS({ alignment: 'left' }),
      },
    ],
  };
  const editorState = EditorState.createWithContent(convertFromRaw(rawContentState));
  const contentState = editorState.getCurrentContent();
  const options = {
    blockStyleFn: block => {
      if (block.getData().get('alignment')) {
        return {
          style: {
            textAlign: block.getData().get('alignment'),
          },
        };
      }
      return {};
    },
  };

  it('should translate block data to inline styles', () => {
    const html = stateToHTML(contentState, options);
    const expected = '<p style="text-align: left">block2</p>';
    expect(html).to.equal(expected);
  });
});



