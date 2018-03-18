module.exports = {
    "extends": ["airbnb", "prettier",
      "prettier/react",],
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": 0,
    "react/no-unused-state": 0,
    "react/jsx-no-bind": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "no-nested-ternary": 0,
    "no-console": 0,

    quotes: ["error", "backtick"]
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "serviceworker": true,
    "jquery": true,
    "jasmine": true,
    "worker": true,
  }
};