import { expect } from 'chai';
import { fromJS } from 'immutable';
import { EditorState, convertFromRaw, SelectionState } from 'draft-js';
import {
  addClassNameToData,
  removeClassNameFromData,
  toggleClassName,
  firstSelectedBlockHasTecClassName,
  getListsFromSelection,
} from './applyBlockStyle';

describe('ApplyClassName tests', () => {
  describe('addClassNameToData', () => {
    const contentState = {
      entityMap: {},
      blocks: [
        {
          key: '7du0s',
          text: 'hello',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
    };
    const editorState = EditorState.createWithContent(convertFromRaw(contentState));

    it('should add a classname to the block data', () => {
      const newEditorState = addClassNameToData(editorState, 'tec');
      const className = newEditorState.getCurrentContent()
                                      .getFirstBlock()
                                      .getData()
                                      .get('className');
      expect(className).to.deep.equal('tec');
    });
  });
  describe('removeClassNameFromData', () => {
    const contentState = {
      entityMap: {},
      blocks: [
        {
          key: '7du0s',
          text: 'hello',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: fromJS({ className: 'tec' }),
        },
      ],
    };
    const editorState = EditorState.createWithContent(convertFromRaw(contentState));
    it('should remove a classname from the block data', () => {
      const newEditorState = removeClassNameFromData(editorState);
      const className = newEditorState.getCurrentContent()
                                      .getFirstBlock()
                                      .getData()
                                      .get('className');
      expect(className).to.equal(undefined);
    });
  });
  describe('toggleClassName', () => {
    it('should toggle a classname', () => {
      const contentState = {
        entityMap: {},
        blocks: [
          {
            key: '7du0s',
            text: 'hello',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
      };
      const editorState = EditorState.createWithContent(convertFromRaw(contentState));
      const editorStateWithClassName = toggleClassName(editorState, 'tec');
      const toggledClassName = editorStateWithClassName.getCurrentContent().getFirstBlock().getData().get('className');
      expect(toggledClassName).to.equal('tec');
    });
    it('should untoggle a classname', () => {
      const contentState = {
        entityMap: {},
        blocks: [
          {
            key: '7du0s',
            text: 'hello',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: fromJS({ className: 'tec' }),
          },
        ],
      };
      const editorState = EditorState.createWithContent(convertFromRaw(contentState));
      const editorStateWithClassName = toggleClassName(editorState, 'tec');
      const toggledClassName = editorStateWithClassName.getCurrentContent().getFirstBlock().getData().get('className');
      expect(toggledClassName).to.equal(undefined);
    });
  });
  describe('firstSelectedBlockHasTecClassName', () => {
    it('should check if the selected block has a tec className', () => {
      const contentState = {
        entityMap: {},
        blocks: [
          {
            key: '7du0s',
            text: 'hello',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: fromJS({ className: 'tec' }),
          },
        ],
      };
      const editorState = EditorState.createWithContent(convertFromRaw(contentState));
      const hasClassName = firstSelectedBlockHasTecClassName(editorState);
      expect(hasClassName).to.equal(true);
    });
    it('should should return false if no className exists', () => {
      const contentState = {
        entityMap: {},
        blocks: [
          {
            key: '7du0s',
            text: 'hello',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
      };
      const editorState = EditorState.createWithContent(convertFromRaw(contentState));
      const hasClassName = firstSelectedBlockHasTecClassName(editorState);
      expect(hasClassName).to.equal(false);
    });
  });
  describe('getListTypeChildrenFromSelection', () => {
    const contentState = {
      entityMap: {},
      blocks: [
        {
          key: '7du11',
          text: 'hello',
          type: 'unstyled',
        },
        {
          key: '7du02',
          text: 'hello',
          type: 'unordered-list-item',
        },
        {
          key: '7dus11',
          text: 'hello',
          type: 'unstyled',
        },
        {
          key: '7du03',
          text: 'hello',
          type: 'unordered-list-item',
        },
        {
          key: '7du04',
          text: 'hello',
          type: 'unordered-list-item',
        },
        {
          key: '7adu11',
          text: 'hello',
          type: 'unstyled',
        },
      ],
    };

    const editorState = EditorState.createWithContent(convertFromRaw(contentState));
    const selection = SelectionState.createEmpty();
    it('should return an empty list', () => {
      const newSelection = selection.merge({
        anchorKey: '7du11',
        focusKey: '7du11',
      });
      const newEditorState = EditorState.acceptSelection(editorState, newSelection);
      const keys = getListsFromSelection(newEditorState);
      expect(keys).to.deep.equal([]);
    });

    xit('should get all the children list blocks if a list is selected', () => {
      const newSelection = selection.merge({
        anchorKey: '7du11',
        focusKey: '7du03',
      });
      const newEditorState = EditorState.acceptSelection(editorState, newSelection);
      const keys = getListsFromSelection(newEditorState);
      expect(keys.length).to.deep.equal(3);
    });

    xit('should get all the children list blocks if a list is selected', () => {
      const newSelection = selection.merge({
        anchorKey: '7du04',
        focusKey: '7adu11',
      });
      const newEditorState = EditorState.acceptSelection(editorState, newSelection);
      const keys = getListsFromSelection(newEditorState);
      expect(keys.length).to.deep.equal(2);
    });
    it.only('should get all the children list blocks if a list is selected', () => {
      const externalContentState = {
        entityMap: {},
        blocks: [
          {
            key: 'dl6r3',
            text: 'Why Caralluma?',
            type: 'header-one',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: 'a7d0r',
            text: 'May Help you achieve your health and wellness goals',
            type: 'unordered-list-item',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '4ahjh',
            text: 'May help you control your cravings',
            type: 'unordered-list-item',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          {
            key: '2b7a1',
            text: 'may help you manage your stress',
            type: 'unordered-list-item',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
      };
      const editorState = EditorState.createWithContent(convertFromRaw(externalContentState));

      const newSelection = selection.merge({
        anchorKey: '2b7a1',
        focusKey: '2b7a1',
      });
      const newEditorState = EditorState.acceptSelection(editorState, newSelection);
      const keys = getListsFromSelection(newEditorState);
      expect(keys).to.deep.equal(['2b7a1', '4ahjh', 'a7d0r']);
    });
  });
});
