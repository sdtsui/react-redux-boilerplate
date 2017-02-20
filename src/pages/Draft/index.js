import React from 'react';
import { fromJS } from 'immutable';
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Toolbar from './features/Toolbar';
// core
import { fromRawContentStateToEditorState, contentStateLogger } from './core';
// features
import { toggleColor, currentColor } from './features/fontColor/index';
import { toggleFontSize, currentFontSize } from './features/fontSize/index';
import { toggleFontFamily, currentFontFamily } from './features/fontFamily/index';
import { toggleBlockAlignment, getActiveBlockAlignment } from './features/alignment';
// editor props
import blockStyleFn from './editor/blockStyleFn';
import customStyleFn from './editor/customStyleFn';
import customStyleMap from './editor/customStyleMap';
import blockRendererFn from './editor/blockRenderFn';
// css
import './core/styles/styles.scss';
import './features/alignment/styles/alignment.scss';
import './features/alignment/styles/alignment-buttons.scss';

// remove when done
const externalContentState = {
  entityMap: {
    0: {
      type: "atomic",
      mutability: "IMMUTABLE",
      data: {
        src: "https://i.ytimg.com/vi/_BwP0YnIpMs/maxresdefault.jpg",
        description: "addDescription",
        type: "image"
      }
    },
    1: {
      type: "atomic",
      mutability: "IMMUTABLE",
      data: {
        src: "https://www.youtube.com/embed/sQAtpPQMMpE",
        description: "addDescription",
        type: "video"
      }
    }
  },
  blocks: [
    {
      key: "dl6r3",
      text: "Viernes 24, de Enero de 2016",
      type: "header-five",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 28,
          style: "ITALIC"
        },
        {
          offset: 0,
          length: 28,
          style: "UNDERLINE"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "15h16",
      text: "PRPBL 5man challenge",
      type: "header-one",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 20,
          style: "ITALIC"
        },
        {
          offset: 0,
          length: 5,
          style: "FONT_COLOR_#d0021b"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "center"
      }
    },
    {
      key: "34igq",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "1gj6k",
      text: "Torneo de gotcha en Carolina Paintball field  sabado 21 de agosto ven y disfruta del mejor evento de gotcha en la Isla de Puerto Rico.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 134,
          style: "FONT_FAMILY_georgia"
        },
        {
          offset: 0,
          length: 134,
          style: "FONT_SIZE_16px"
        }
      ],
      entityRanges: [],
      data: {}
    },
    {
      key: "5djgb",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "f5dai",
      text: "Premios",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 7,
          style: "FONT_FAMILY_georgia"
        },
        {
          offset: 0,
          length: 7,
          style: "FONT_SIZE_24px"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "center"
      }
    },
    {
      key: "3qbj2",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "fon3p",
      text: "Premios 5 man Division 3 :",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 26,
          style: "FONT_FAMILY_georgia"
        },
        {
          offset: 0,
          length: 26,
          style: "BOLD"
        },
        {
          offset: 0,
          length: 26,
          style: "FONT_COLOR_#d0021b"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "6ohnh",
      text: "$500.00 + 10 cajas de pintura ",
      type: "ordered-list-item",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 30,
          style: "FONT_FAMILY_georgia"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "31nmv",
      text: "$200.00 + 3 cajas de pintura",
      type: "ordered-list-item",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 28,
          style: "FONT_FAMILY_georgia"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "9lqqu",
      text: "$100.00",
      type: "ordered-list-item",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 7,
          style: "FONT_FAMILY_georgia"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "p4f",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "4ga2m",
      text: "Premios 5 man Division 4 :",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 26,
          style: "FONT_FAMILY_georgia"
        },
        {
          offset: 0,
          length: 26,
          style: "BOLD"
        },
        {
          offset: 0,
          length: 26,
          style: "FONT_COLOR_#d0021b"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "59tsv",
      text: "$500.00 + 10 cajas de pintura ",
      type: "ordered-list-item",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 30,
          style: "FONT_FAMILY_georgia"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "5p3ve",
      text: "$200.00 + 3 cajas de pintura",
      type: "ordered-list-item",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 28,
          style: "FONT_FAMILY_georgia"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "6mne9",
      text: "$100.00",
      type: "ordered-list-item",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 7,
          style: "FONT_FAMILY_georgia"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "43htc",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "8s68r",
      text: "Premios 5 man Division 5 :",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 26,
          style: "FONT_FAMILY_georgia"
        },
        {
          offset: 0,
          length: 26,
          style: "BOLD"
        },
        {
          offset: 0,
          length: 26,
          style: "FONT_COLOR_#d0021b"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "23rbm",
      text: "$500.00 + 10 cajas de pintura ",
      type: "ordered-list-item",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 30,
          style: "FONT_FAMILY_georgia"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "e4ol0",
      text: "$200.00 + 3 cajas de pintura",
      type: "ordered-list-item",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 28,
          style: "FONT_FAMILY_georgia"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "92vnq",
      text: "$100.00",
      type: "ordered-list-item",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 7,
          style: "FONT_FAMILY_georgia"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "left"
      }
    },
    {
      key: "7986v",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "9mo4",
      text: " ",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0
        }
      ],
      data: {}
    },
    {
      key: "8f2lt",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "ap1p2",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "3rg1q",
      text: "Reglas",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 6,
          style: "FONT_FAMILY_georgia"
        },
        {
          offset: 0,
          length: 6,
          style: "FONT_SIZE_24px"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "center"
      }
    },
    {
      key: "f9lmn",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "9ph7a",
      text: "Torneo de gotcha en Carolina Paintball field  sabado 21 de agosto ven y disfruta del mejor evento de gotcha en la Isla de Puerto Rico.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 134,
          style: "FONT_FAMILY_georgia"
        },
        {
          offset: 0,
          length: 134,
          style: "FONT_SIZE_16px"
        }
      ],
      entityRanges: [],
      data: {}
    },
    {
      key: "dtbpi",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "7qdu2",
      text: " ",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 1
        }
      ],
      data: {}
    },
    {
      key: "a1ei1",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "63pp4",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "a7d0r",
      text: "Como registrarse?",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 17,
          style: "FONT_FAMILY_georgia"
        },
        {
          offset: 0,
          length: 17,
          style: "FONT_SIZE_24px"
        }
      ],
      entityRanges: [],
      data: {
        alignment: "center"
      }
    },
    {
      key: "f3bmf",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "p44q",
      text: "Para registrarse haz click en el siguiente enlace y llena el formulario.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 72,
          style: "FONT_FAMILY_georgia"
        },
        {
          offset: 0,
          length: 72,
          style: "FONT_SIZE_16px"
        }
      ],
      entityRanges: [],
      data: {}
    },
    {
      key: "d3s4e",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "4tbmu",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "6b8vu",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "eep0i",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ]
};

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
  }

  componentWillMount = () => {
    if (externalContentState) {
      this.onChange(fromRawContentStateToEditorState(externalContentState));
    }
  };

  onTab = e => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  };

  handleKeyCommand = command => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  toggleBlockAlignment = alignment => {
    const newEditorState = toggleBlockAlignment(this.state.editorState, alignment);

    return this.onChange(newEditorState);
  };

  toggleFontSize = fontSize => {
    const newEditorState = toggleFontSize(this.state.editorState, fontSize);

    return this.onChange(newEditorState);
  };

  toggleColor = color => {
    const newEditorState = toggleColor(this.state.editorState, color);

    return this.onChange(newEditorState);
  };

  toggleFontFamily = fontFamily => {
    const newEditorState = toggleFontFamily(this.state.editorState, fontFamily);

    return this.onChange(newEditorState);
  };

  addMedia = data => {
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'atomic',
      'IMMUTABLE',
      fromJS(data)
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    const editorStateWithNewBlock = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    this.onChange(editorStateWithNewBlock);
  };

  render() {
    contentStateLogger(this.state.editorState);
    const { editorState } = this.state;
    return (
      <div className="text-editor-component">
        <Toolbar
          addMedia={this.addMedia}
          activeBlockAlignment={getActiveBlockAlignment(this.state.editorState)}
          currentFontSize={currentFontSize(this.state.editorState)}
          currentFontFamily={currentFontFamily(this.state.editorState)}
          currentColor={currentColor(this.state.editorState)}
          toggleBlockType={this.toggleBlockType}
          toggleInlineStyle={this.toggleInlineStyle}
          toggleColor={this.toggleColor}
          toggleBlockAlignment={this.toggleBlockAlignment}
          toggleFontSize={this.toggleFontSize}
          toggleFontFamily={this.toggleFontFamily}
        />
        <div className="text-editor" onClick={this.focus}>
          <Editor
            blockRendererFn={blockRendererFn}
            blockStyleFn={blockStyleFn}
            customStyleMap={customStyleMap}
            customStyleFn={customStyleFn}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck
          />
        </div>
      </div>
    );
  }
}

export default RichEditor;
