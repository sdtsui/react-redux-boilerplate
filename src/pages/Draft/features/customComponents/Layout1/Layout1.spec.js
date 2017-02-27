import { expect } from 'chai';
import { EditorState, ContentState } from 'draft-js';
import { insertNewBlock } from './Layout1';

describe.only('handleEnterKey', () => {
  const contentState = ContentState.createFromText('block1;block2', ';');
  const editorState = EditorState.createWithContent(contentState);

  it('Should create 2 new blocks', () => {
    const newEditorState = insertNewBlock(editorState);
    const blockMap = newEditorState.getCurrentContent().getBlockMap().toList();
    expect(blockMap.size).to.equal(4);
  });

  it('Should create 2 new blocks', () => {
    const newEditorState = insertNewBlock(editorState);
    const newContentState = newEditorState.getCurrentContent();
    const lastKey = newContentState.getLastBlock().getKey();
    const expectedSelectionKey = newContentState.getBlockBefore(lastKey).getKey();
    const startKey = newEditorState.getSelection().getStartKey();
    expect(startKey).to.equal(expectedSelectionKey);
  });
});

