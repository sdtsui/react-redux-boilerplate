const blockStyles = {
  HEADER_ONE: 'header-one',
  HEADER_TWO: 'header-two',
  HEADER_THREE: 'header-three',
  HEADER_FOUR: 'header-four',
  HEADER_FIVE: 'header-five',
  HEADER_SIX: 'header-six',
  BLOCKQUOTE: 'blockquote',
  UL: 'unordered-list-item',
  OL: 'ordered-list-item',
  CODE_BLOCK: 'code-block',
  UNSTYLED: 'unstyled',
};

const BLOCK_TYPES = [
  { label: 'H1', style: blockStyles.HEADER_ONE },
  { label: 'H2', style: blockStyles.HEADER_TWO },
  { label: 'H3', style: blockStyles.HEADER_THREE },
  { label: 'H4', style: blockStyles.HEADER_FOUR },
  { label: 'H5', style: blockStyles.HEADER_FIVE },
  { label: 'H6', style: blockStyles.HEADER_SIX },
  { label: 'Blockquote', style: blockStyles.BLOCKQUOTE },
  { label: 'UL', style: blockStyles.UL },
  { label: 'OL', style: blockStyles.OL },
  { label: 'Code Block', style: blockStyles.CODE_BLOCK },
];

export  {
  blockStyles,
  BLOCK_TYPES
};
