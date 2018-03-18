module.exports = {
  extends: `stylelint-config-recommended`,
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [`extends`]
      }
    ],
    "no-descending-specificity": null,
    "font-family-no-missing-generic-family-keyword": null,
    "block-no-empty": null,
    "unit-whitelist": [`em`, `rem`, `s`, `px`, `%`, `deg`]
  }
};
