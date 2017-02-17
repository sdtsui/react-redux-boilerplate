import { expect } from 'chai';
import { convertFromRaw, EditorState, SelectionState } from 'draft-js';
import generateInlineStyle from './';

const fontSize = generateInlineStyle('FONT_SIZE_', 'fontSize');

const rawContentState = {
  entityMap: {},
  blocks: [
    {
      key: 'dl6r3',
      text: 'Why Caralluma?',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 4,
          style: 'FONT_SIZE_22px',
        },
        {
          offset: 4,
          length: 4,
          style: 'FONT_SIZE_36px',
        },
        {
          offset: 8,
          length: 6,
          style: 'FONT_SIZE_16px',
        },
      ],
      entityRanges: [],
      data: {},
    },
  ],
};

describe('gets the first custom Dynamic style', () => {
  const editorState = EditorState.createWithContent(convertFromRaw(rawContentState));
  const selection = SelectionState.createEmpty();
  const firstBlock = editorState.getCurrentContent().getFirstBlock();
  const firstBlockKey = firstBlock.getKey();
  const newSelection = selection.merge({
    anchorOffset: 0,
    focusOffset: firstBlock.getLength(),
    anchorKey: firstBlockKey,
    focusKey: firstBlockKey,
  });
  const newEditorState = EditorState.acceptSelection(editorState, newSelection);
  const fontSizeStyle = fontSize.currentDynamicStyle(newEditorState);
  it('should have specified fontSize style', () => {
    expect(fontSizeStyle).to.equal('FONT_SIZE_22px');
  });
});


