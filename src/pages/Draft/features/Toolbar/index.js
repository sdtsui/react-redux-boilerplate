import React, { PropTypes } from 'react';
import Alignment from './Alignment';
import Colors from './Colors';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import Headings from './Headings';
import Inline from './Inline';
import Lists from './Lists';
import Media from './Media';
import Redo from './Redo';
import Save from './Save';
import './NewControls.scss';

const Toolbar = props => {
  return (
    <div className="text-editor-toolbar">
      <Headings
        toggleBlockType={props.toggleBlockType}
      />
      <FontSize
        toggleFontSize={props.toggleFontSize}
        currentFontSize={props.currentFontSize}
      />
      <FontFamily
        toggleFontFamily={props.toggleFontFamily}
        currentFontFamily={props.currentFontFamily}
      />
      {/*<Colors*/}
        {/*toggleColor={props.toggleColor}*/}
        {/*currentColor={props.currentColor}*/}
      {/*/>*/}
      <Inline
        toggleInlineStyle={props.toggleInlineStyle}
      />
      <Alignment
        toggleBlockAlignment={props.toggleBlockAlignment}
        activeBlockAlignment={props.activeBlockAlignment}
      />
      <Media
        addMedia={props.addMedia}
      />
      <Lists
        toggleBlockType={props.toggleBlockType}
      />
      <Save/>
      <Redo/>
    </div>
  );
};

Toolbar.propTypes = {
  toggleBlockType: PropTypes.func.isRequired,
  toggleBlockAlignment: PropTypes.func.isRequired,
  toggleColor: PropTypes.string.isRequired,
  toggleInlineStyle: PropTypes.func.isRequired,
  toggleFontFamily: PropTypes.func.isRequired,
  toggleFontSize: PropTypes.func.isRequired,
  activeBlockAlignment: PropTypes.string.isRequired,
  addMedia: PropTypes.func.isRequired,
  currentColor: PropTypes.string.isRequired,
  currentFontFamily: PropTypes.string.isRequired,
  currentFontSize: PropTypes.string.isRequired,
};

export default Toolbar;
