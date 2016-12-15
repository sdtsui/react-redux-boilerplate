// @flow
var browserlist = require('./browserlist');

module.exports = {
  "extends": "stylelint-config-standard",
  "rules": {
    "color-named": "never",
    "font-family-name-quotes": "always-where-recommended",
    "font-weight-notation": "numeric",
    "function-url-quotes": "always",
    "number-leading-zero": "never",
    "value-keyword-case": "lower",
    "value-no-vendor-prefix": true,
    "value-list-comma-newline-before": "never-multi-line",
    "custom-property-empty-line-before": "never",
    "property-no-unknown": [
      true,
      {
        "ignoreProperties": [
          "composes"
        ]
      }
    ],
    "declaration-block-properties-order": [
      [
        {
          "order": "strict",
          "properties": [
            "visibility",
            "content"
          ]
        },
        {
          "order": "strict",
          "properties": [
            "top",
            "right",
            "position",
            "bottom",
            "left",
            "z-index",
            "flex",
            "flex-wrap",
            "flex-direction",
            "flex-flow",
            "justify-content",
            "align-items",
            "align-content",
            "order",
            "align-self",
            "flex-grow",
            "flex-shrink",
            "flex-basis",
            "float",
            "clear"
          ]
        },
        {
          "order": "strict",
          "properties": [
            "display",
            "vertical-align",
            "opacity",
            "perspective",
            "perspective-origin",
            "transform",
            "transform-origin",
            "transform-style"
          ]
        },
        {
          "order": "strict",
          "properties": [
            "overflow",
            "overflow-x",
            "overflow-y",
            "clip"
          ]
        },
        {
          "order": "strict",
          "properties": [
            "animation",
            "animation-name",
            "animation-duration",
            "animation-timing-function",
            "animation-delay",
            "animation-iteration-count",
            "animation-direction",
            "animation-fill-mode",
            "animation-play-state",
            "transition",
            "transition-property",
            "transition-duration",
            "transition-timing-function",
            "transition-delay"
          ]
        },
        {
          "order": "strict",
          "properties": [
            "margin",
            "margin-top",
            "margin-right",
            "margin-bottom",
            "margin-left",
            "box-shadow",
            "border",
            "border-top",
            "border-right",
            "border-bottom",
            "border-left",
            "border-width",
            "border-top-width",
            "border-right-width",
            "border-bottom-width",
            "border-left-width",
            "border-style",
            "border-top-style",
            "border-right-style",
            "border-bottom-style",
            "border-left-style",
            "border-color",
            "border-top-color",
            "border-right-color",
            "border-bottom-color",
            "border-left-color",
            "border-radius",
            "border-top-left-radius",
            "border-top-right-radius",
            "border-bottom-left-radius",
            "border-bottom-right-radius",
            "border-image",
            "border-top-image",
            "border-right-image",
            "border-bottom-image",
            "border-left-image",
            "box-sizing",
            "width",
            "max-width",
            "min-width",
            "height",
            "max-height",
            "min-height",
            "padding",
            "padding-top",
            "padding-right",
            "padding-bottom",
            "padding-left"
          ]
        },
        {
          "order": "strict",
          "properties": [
            "background",
            "background-color",
            "background-image",
            "background-position",
            "background-size",
            "background-repeat",
            "background-origin",
            "background-clip",
            "background-attachment",
            "cursor"
          ]
        },
        {
          "order": "strict",
          "properties": [
            "font",
            "font-style",
            "font-variant",
            "font-weight",
            "font-size",
            "line-height",
            "font-family",
            "word-spacing",
            "letter-spacing",
            "white-space",
            "white-wrap",
            "color",
            "text-align",
            "text-transform",
            "text-decoration",
            "text-align",
            "text-shadow",
            "text-transform",
            "list-style",
            "list-style-type",
            "list-style-position",
            "list-style-image"
          ]
        }
      ],
      {
        "unspecified": "bottomAlphabetical"
      }
    ],
    "declaration-block-semicolon-newline-after": "always",
    "block-no-single-line": true,
    "block-opening-brace-newline-after": "always",
    "selector-attribute-quotes": "always",
    "selector-max-specificity": "0,3,2",
    "selector-no-id": true,
    "rule-nested-empty-line-before": [
      "always-multi-line",
      {
        "except": [
          "first-nested"
        ],
        "ignore": [
          "after-comment"
        ]
      }
    ],
    "rule-non-nested-empty-line-before": [
      "always-multi-line",
      {
        "except": [
          "after-single-line-comment"
        ]
      }
    ],
    "at-rule-empty-line-before": [
      "always",
      {
        "ignore": [
          "after-comment",
          "all-nested",
          "blockless-group"
        ]
      }
    ],
    "indentation": [
      2,
      {
        "indentInsideParens": "once-at-root-twice-in-block"
      }
    ],
    "max-nesting-depth": 3,
    "no-duplicate-selectors": true,
    "no-unknown-animations": true,
    "no-unsupported-browser-features": [
      true,
      {
        "browsers": browserlist,
        "ignore": [
          "rem"
        ]
      }
    ]
  }
};
