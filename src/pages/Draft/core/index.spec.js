import { expect } from 'chai';
import { fromJS } from 'immutable';
import {
  convertFromRaw,
  EditorState,
  RichUtils,
  Modifier,
  SelectionState,
} from 'draft-js';
import { changeBlockData, removeBlockData } from './';

describe('changeBlockData, removeBlockData', () => {
  describe('removeBlockData', () => {
    const block1Data = fromJS({
      alignment: 'left',
      nestedProps: {
        prop1: 'nested prop 1',
        prop2: 'nested prop 2',
      }
    });
    const block2Data = fromJS({
      alignment: 'center'
    });
    const block3Data = fromJS({
      alignment: 'right',
      background: 'green',
      color: 'red'
    });
    const contentState = {
      entityMap: {},
      blocks: [
        {
          key: "7du0s",
          text: "block 1",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: block1Data,
        },
        {
          key: "7duts",
          text: "block2",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: block2Data,
        },
        {
          key: "7du3s",
          text: "block2",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: block3Data,
        },
      ]
    };
    const editorState = EditorState.createWithContent(convertFromRaw(contentState));
    const newSelection = SelectionState.createEmpty();
    const firstBlock = editorState.getCurrentContent().getFirstBlock();
    const lastBlock = editorState.getCurrentContent().getLastBlock();
    const selection = newSelection.merge({
      anchorKey: firstBlock.getKey(),
      anchorOffset: 0,
      focusKey: lastBlock.getKey(),
      focusOffset: lastBlock.getLength(),
    });
    const editorStateWithSelection = EditorState.forceSelection(editorState, selection);

    it('should not have alignment property on first block', () => {
      const newEditorState = removeBlockData(editorStateWithSelection, ['alignment']);
      const contentState = newEditorState.getCurrentContent();
      const firstBlockData = contentState.getFirstBlock().getData().toJS();
      delete block1Data.alignment;
      expect(firstBlockData).to.deep.equal({
        nestedProps: {
          prop1: 'nested prop 1',
          prop2: 'nested prop 2'
        }
      });
    });
    it('should have no block data on second block', () => {
      const newEditorState = removeBlockData(editorStateWithSelection, ['alignment']);
      const contentState = newEditorState.getCurrentContent();
      const middleBlockData = contentState.getBlockAfter(firstBlock.getKey()).getData().toJS();
      expect(middleBlockData).to.deep.equal({});
    });
    it('should remove alignment prop and leave color and background props on third block', () => {
      const newEditorState = removeBlockData(editorStateWithSelection, ['alignment']);
      const contentState = newEditorState.getCurrentContent();
      const lastBlockData = contentState.getLastBlock().getData().toJS();
      expect(lastBlockData).to.deep.equal({ color: 'red', background: 'green' });
    });
    it('should try to remove a property that does not exist and return the original', () => {
      const newEditorState = removeBlockData(editorStateWithSelection, ['puppies', 'yorkie']);
      const contentState = newEditorState.getCurrentContent();
      const lastBlockData = contentState.getLastBlock().getData().toJS();
      expect(lastBlockData).to.deep.equal(block3Data.toJS());
    });
  });

  describe('It should add new block data', () => {
    const contentState = {
      entityMap: {},
      blocks: [
        {
          key: "7du0s",
          text: "block 1",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: fromJS({ color: 'red' }),
        },
        {
          key: "7duts",
          text: "block2",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: fromJS({
            level1: {
              level2: {
                color: 'blue',
              }
            }
          }),
        },
      ]
    };
    const editorState = EditorState.createWithContent(convertFromRaw(contentState));
    const newSelection = SelectionState.createEmpty();
    const firstBlock = editorState.getCurrentContent().getFirstBlock();
    const lastBlock = editorState.getCurrentContent().getLastBlock();
    const selection = newSelection.merge({
      anchorKey: firstBlock.getKey(),
      anchorOffset: 0,
      focusKey: lastBlock.getKey(),
      focusOffset: lastBlock.getLength(),
    });
    const editorStateWithSelection = EditorState.forceSelection(editorState, selection);

    it('merges an object', () => {
      const editorStateWithData = changeBlockData(editorStateWithSelection, { color: 'pink' });
      const firstBlockData = editorStateWithData.getCurrentContent().getFirstBlock().getData().toJS();
      expect(firstBlockData).to.deep.equal({ color: 'pink' });
    });

    it('should merge at at specified path', () => {
      const editorStateWithData = changeBlockData(editorStateWithSelection, { color: 'violet' }, ['level1', 'level2']);
      const lastBlockData = editorStateWithData.getCurrentContent().getLastBlock().getData().toJS();
      const expected = {
        level1: {
          level2: {
            color: 'violet',
          }
        }
      };
      expect(lastBlockData).to.deep.equal(expected);
    });
  });
});
