const namePattern = '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$';

module.exports =
{
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  rules: {
    // ------------------------------------------------------ CSS

    /*
      * Stylelint CSS Rules Reference: https://stylelint.io/user-guide/rules/list
    */

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
    'keyframe-declaration-no-important': null,

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
    'at-rule-no-unknown': null,

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
    'function-disallowed-list': [],
    'function-url-no-scheme-relative': true,
    'function-url-scheme-disallowed-list': [],
    'function-url-scheme-whitelist': null,
    'function-whitelist': null,

    // Keyframes
    'keyframes-name-pattern': '',

    // Number
    'number-max-precision': 4,

    // Time
    'time-min-milliseconds': 100,

    // Unit
    'unit-disallowed-list': [],
    'unit-whitelist': null,

    // Shorthand property
    'shorthand-property-no-redundant-values': true,

    // Value
    'value-no-vendor-prefix': true,

    // Custom property
    'custom-property-pattern': '',

    // Property
    'property-disallowed-list': [],
    'property-no-vendor-prefix': true,
    'property-whitelist': null,

    // Declaration
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-no-important': null,
    'declaration-property-unit-disallowed-list': {},
    'declaration-property-unit-whitelist': null,
    'declaration-property-value-disallowed-list': {
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
    'selector-attribute-operator-disallowed-list': [],
    'selector-attribute-operator-whitelist': null,
    'selector-class-pattern': [
      '^[a-z0-9\\-]+$',
      {
        message:
          'Selector should be written in lowercase with hyphens (selector-class-pattern)',
      },
    ],
    'selector-combinator-disallowed-list': [],
    'selector-combinator-whitelist': null,
    'selector-id-pattern': '',
    'selector-max-attribute': 1,
    'selector-max-class': null,
    'selector-max-combinators': null,
    'selector-max-compound-selectors': null,
    'selector-max-empty-lines': 0,
    'selector-max-id': 2,
    'selector-max-pseudo-class': null,
    'selector-max-specificity': null,
    'selector-max-type': null,
    'selector-max-universal': 2,
    'selector-nested-pattern': '',
    'selector-no-qualifying-type': null,
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-disallowed-list': [],
    'selector-pseudo-class-whitelist': null,
    'selector-pseudo-element-disallowed-list': [],
    'selector-pseudo-element-whitelist': null,

    // Media feature
    'media-feature-name-disallowed-list': [],
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-name-value-whitelist': null,
    'media-feature-name-whitelist': null,

    // Custom media
    'custom-media-pattern': '',

    // At-rule
    'at-rule-disallowed-list': [],
    'at-rule-no-vendor-prefix': true,
    'at-rule-property-required-list': {},
    'at-rule-whitelist': null,

    // Comment
    'comment-word-disallowed-list': [],

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
        except: ['after-single-line-comment', 'first-nested'],
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
        except: ['blockless-after-same-name-blockless', 'first-nested'],
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

    // ------------------------------------------------------ SCSS

    /*
      * Stylelint SCSS Rules Reference: https://github.com/kristerkari/stylelint-scss
    */

    // @-each
    'scss/at-each-key-value-single-line': true,

    // @-else
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    'scss/at-else-empty-line-before': 'never',
    'scss/at-else-if-parentheses-space-before': 'always',

    // @-extend
    'scss/at-extend-no-missing-placeholder': true,

    // @-function
    'scss/at-function-named-arguments': 'always',
    'scss/at-function-parentheses-space-before': 'always',
    'scss/at-function-pattern': namePattern,

    // @-if
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'scss/at-if-no-null': true,

    // @-import
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension': 'never',
    'scss/at-import-partial-extension-blacklist': ['scss'],
    'scss/at-import-partial-extension-whitelist': null,

    // @-mixin
    'scss/at-mixin-argumentless-call-parentheses': null,
    'scss/at-mixin-named-arguments': 'always',
    'scss/at-mixin-parentheses-space-before': 'always',
    'scss/at-mixin-pattern': namePattern,

    // @-rule
    'scss/at-rule-conditional-no-parentheses': null,
    'scss/at-rule-no-unknown': true,

    // $-variable
    'scss/dollar-variable-colon-newline-after': null,
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-default': null,
    'scss/dollar-variable-empty-line-after': [
      'always',
      {
        except: ['last-nested', 'before-dollar-variable'],
        ignore: ['inside-single-line-block'],
      },
    ],
    'scss/dollar-variable-empty-line-before': null,
    'scss/dollar-variable-first-in-block': null,
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/dollar-variable-pattern': namePattern,

    // %-placeholder
    'scss/percent-placeholder-pattern': namePattern,

    // //-comment
    'scss/double-slash-comment-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'inside-block'],
        ignore: ['between-comments', 'stylelint-commands', 'inside-block'],
      },
    ],
    'scss/double-slash-comment-inline': [
      'never',
      {
        ignore: ['stylelint-commands'],
      },
    ],
    'scss/double-slash-comment-whitespace-inside': 'always',

    // Comment
    'scss/comment-no-loud': true,

    // Declaration
    'scss/declaration-nested-properties': 'never',
    'scss/declaration-nested-properties-no-divided-groups': true,

    // Dimension
    'scss/dimension-no-non-numeric-values': null,

    // Function
    'scss/function-color-relative': null,
    'scss/function-quote-no-quoted-strings-inside': null,
    'scss/function-unquote-no-unquoted-strings-inside': null,

    // Map
    'scss/map-keys-quotes': null,

    // Media feature
    'scss/media-feature-value-dollar-variable': null,

    // Operator
    'scss/operator-no-newline-after': true,
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,

    // Partial
    'scss/partial-no-import': true,

    // Selector
    'scss/selector-nest-combinators': null,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/selector-no-union-class-name': true,

    // General / Sheet
    'scss/no-dollar-variables': null,
    'scss/no-duplicate-dollar-variables': true,
    'scss/no-duplicate-mixins': true,
    'scss/no-global-function-names': true,

    // ------------------------------------------------------ Order

    /*
      * Stylelint Order Rules Reference: https://github.com/hudochenkov/stylelint-order
    */

    'order/order': [
      [
        'custom-properties',
        'dollar-variables',
        {
          type: 'at-rule',
          name: 'extend',
        },
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: false,
        },
        'declarations',
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: true,
        },
        'rules',
      ],
    ],
    'order/properties-order': [],
    'order/properties-alphabetical-order': true,
  },
};
