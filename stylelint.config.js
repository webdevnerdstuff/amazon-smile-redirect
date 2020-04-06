module.exports =
{
  extends: 'stylelint-config-sass-guidelines',
  rules: {
    // ---------------------------- Possible errors
    // Color
    'color-no-invalid-hex': true,

    // Font family
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,

    // Function
    'function-calc-no-invalid': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,

    // String
    'string-no-newline': true,

    // Unit
    'unit-no-unknown': true,

    // Property
    'property-no-unknown': true,

    // Keyframe declaration
    'keyframe-declaration-no-important': true,

    // Declaration block
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,

    // Block
    'block-no-empty': true,

    // Selector
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-element-no-unknown': true,
    'selector-type-no-unknown': true,

    // Media feature
    'media-feature-name-no-unknown': true,

    // At-rule
    'at-rule-no-unknown': true,

    // Comment
    'comment-no-empty': true,

    // General / Sheet
    'no-descending-specificity': true,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,

    // ---------------------------- Limit language features
    // Color
    'color-named': 'never',
    'color-no-hex': null,

    // Function
    'function-blacklist': [],
    'function-url-no-scheme-relative': true,
    'function-url-scheme-blacklist': [],
    'function-url-scheme-whitelist': null,
    'function-whitelist': null,

    // Keyframes
    'keyframes-name-pattern': '',

    // Number
    'number-max-precision': 4,

    // Time
    'time-min-milliseconds': 100,

    // Unit
    'unit-blacklist': [],
    'unit-whitelist': null,

    // Shorthand property
    'shorthand-property-no-redundant-values': true,

    // Value
    'value-no-vendor-prefix': true,

    // Custom property
    'custom-property-pattern': '',

    // Property
    'property-blacklist': [],
    'property-no-vendor-prefix': true,
    'property-whitelist': null,

    // Declaration
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-no-important': true,
    'declaration-property-unit-blacklist': {},
    'declaration-property-unit-whitelist': null,
    'declaration-property-value-blacklist': {
      border: ['none'],
      'border-top': ['none'],
      'border-right': ['none'],
      'border-bottom': ['none'],
      'border-left': ['none'],
    },
    'declaration-property-value-whitelist': null,

    // Declaration block
    'declaration-block-single-line-max-declarations': 1,

    // Selector
    'selector-attribute-operator-blacklist': [],
    'selector-attribute-operator-whitelist': null,
    'selector-class-pattern': [
      '^[a-z0-9\\-]+$',
      {
        message:
          'Selector should be written in lowercase with hyphens (selector-class-pattern)',
      },
    ],
    'selector-combinator-blacklist': [],
    'selector-combinator-whitelist': null,
    'selector-id-pattern': '',
    'selector-max-attribute': 1,
    'selector-max-class': 1,
    'selector-max-combinators': null,
    'selector-max-compound-selectors': null,
    'selector-max-empty-lines': 0,
    'selector-max-id': 2,
    'selector-max-pseudo-class': null,
    'selector-max-specificity': null,
    'selector-max-type': null,
    'selector-max-universal': 2,
    'selector-nested-pattern': '',
    'selector-no-qualifying-type': true,
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-blacklist': [],
    'selector-pseudo-class-whitelist': null,
    'selector-pseudo-element-blacklist': [],
    'selector-pseudo-element-whitelist': null,

    // Media feature
    'media-feature-name-blacklist': [],
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-name-value-whitelist': null,
    'media-feature-name-whitelist': null,

    // Custom media
    'custom-media-pattern': '',

    // At-rule
    'at-rule-blacklist': [],
    'at-rule-no-vendor-prefix': true,
    'at-rule-property-requirelist': {},
    'at-rule-whitelist': null,

    // Comment
    'comment-word-blacklist': [],

    // General / Sheet
    'max-nesting-depth': 7,
    'no-unknown-animations': true,

    // ---------------------------- Stylistic issues
    // Color
    'color-hex-case': 'lower',
    'color-hex-length': 'short',

    // Font family
    'font-family-name-quotes': 'always-where-required',

    // Font weight
    'font-weight-notation': null,

    // Function
    'function-comma-newline-after': null,
    'function-comma-newline-before': 'always-multi-line',
    'function-comma-space-after': 'always',
    'function-comma-space-before': 'never',
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': 'never-multi-line',
    'function-parentheses-space-inside': 'never',
    'function-url-quotes': 'always',
    'function-whitespace-after': 'always',

    // Number
    'number-leading-zero': 'never',
    'number-no-trailing-zeros': true,

    // String
    'string-quotes': 'single',

    // Length
    'length-zero-no-unit': true,

    // Unit
    'unit-case': 'lower',

    // Value
    'value-keyword-case': 'lower',

    // Value list
    'value-list-comma-newline-after': 'never-multi-line',
    'value-list-comma-newline-before': 'never-multi-line',
    'value-list-comma-space-after': 'always',
    'value-list-comma-space-before': 'never',
    'value-list-max-empty-lines': 0,

    // Custom property
    'custom-property-empty-line-before': 'never',

    // Property
    'property-case': 'lower',

    // Declaration
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-colon-newline-after': null,
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': 'never',

    // Declaration block
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',

    // Block
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always',
    'block-closing-brace-space-after': 'always-single-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-newline-after': 'always',
    'block-opening-brace-newline-before': 'never-single-line',
    'block-opening-brace-space-after': 'never-single-line',
    'block-opening-brace-space-before': 'always',

    // Selector
    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-quotes': 'always',
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-descendant-combinator-no-non-space': true,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-type-case': 'lower',

    // Selector list
    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-newline-before': 'never-multi-line',
    'selector-list-comma-space-after': 'never-single-line',
    'selector-list-comma-space-before': 'never',

    // Rule
    'rule-empty-line-before': [
      'always',
      {
        except: ['after-single-line-comment'],
        ignore: ['after-comment'],
      },
    ],

    // Media feature
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-case': 'lower',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'never',

    // Media query list
    'media-query-list-comma-newline-after': 'always-multi-line',
    'media-query-list-comma-newline-before': 'never-multi-line',
    'media-query-list-comma-space-after': 'always',
    'media-query-list-comma-space-before': 'never',

    // At-rule
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['after-same-name'],
        ignore: ['after-comment'],
      },
    ],
    'at-rule-name-case': 'lower',
    'at-rule-name-newline-after': 'always-multi-line',
    'at-rule-name-space-after': 'always',
    'at-rule-semicolon-newline-after': 'always',
    'at-rule-semicolon-space-before': 'never',

    // Comment
    'comment-empty-line-before': 'always',
    'comment-whitespace-inside': 'always',

    // General / Sheet
    indentation: 'tab',
    linebreaks: 'unix',
    'max-empty-lines': 1,
    'max-line-length': null,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'no-empty-first-line': true,
    'unicode-bom': 'never',


    // 'order/order': [
    //   [
    //     'custom-properties',
    //     'dollar-variables',
    //     {
    //       type: 'at-rule',
    //       name: 'extend',
    //     },
    //     {
    //       type: 'at-rule',
    //       name: 'include',
    //       hasBlock: false,
    //     },
    //     'declarations',
    //     {
    //       type: 'at-rule',
    //       name: 'include',
    //       hasBlock: true,
    //     },
    //     'rules',
    //   ],
    // ],
    // 'order/properties-alphabetical-order': true,


    // 'scss/at-extend-no-missing-placeholder': true,
    // 'scss/at-function-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    // 'scss/at-import-no-partial-leading-underscore': true,
    // 'scss/at-import-partial-extension-blacklist': ['scss'],
    // 'scss/at-mixin-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    // 'scss/at-rule-no-unknown': true,
    // 'scss/dollar-variable-colon-space-after': 'always',
    // 'scss/dollar-variable-colon-space-before': 'never',
    // 'scss/dollar-variable-pattern': '^[_]?[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    // 'scss/percent-placeholder-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    // 'scss/selector-no-redundant-nesting-selector': true,
  },
};
