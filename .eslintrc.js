module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
    "plugin:flowtype/recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "plugins": [
    "react",
    "flowtype"
  ],
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "arrow-body-style": [
      "error",
      "always"
    ],
    "new-cap": [
      "error",
      {
        // Add immutableJs types here
        "capIsNewExceptions": [
          "Map",
          "List",
        ]
      }
    ],
    "react/forbid-prop-types": 0,
  }
};