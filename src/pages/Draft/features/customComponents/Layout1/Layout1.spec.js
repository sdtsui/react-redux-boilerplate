import { expect } from 'chai';
import { EditorState, ContentState } from 'draft-js';
import { contentStateLogger } from '../../../core';
import { insertNewBlock, addNewLine } from './Layout1';

describe.only('handleEnterKey', () => {
  const contentState = ContentState.createFromText('block1;block2', ';');
  const editorState = EditorState.createWithContent(contentState);

  it('should insert a new block', () => {
    const newEditorState = insertNewBlock(editorState);
    contentStateLogger(newEditorState);
  });
});

