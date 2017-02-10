import { expect } from 'chai';
import { EditorState, SelectionState } from 'draft-js';
import {
  addClassNameToData,
  removeClassNameFromData,
  toggleClassName,
  firstSelectedBlockHasTecClassName,
} from './applyBlockStyle';

describe.only('ApplyClassName tests', () => {


  describe('addClassNameToData', () => {
    it('should add a classname to the block data', () => {
      addClassNameToData(editorState, 'tec');
    });

    describe('removeClassNameFromData', () => {
      it('should remove a classname from the block data', () => {

      });
    });

    describe('toggleClassName', () => {
      it('should toggle a classname', () => {

      });
    });

    describe('firstSelectedBlockHasTecClassName', () => {
      it('should check if the selected block has a tec className', () => {

      });
    });

  });
});
