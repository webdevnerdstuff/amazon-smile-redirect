const namePattern = '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$';

module.exports =
{
	plugins: [
		'stylelint-order',
		'stylelint-scss',
	],
	customSyntax: "postcss-scss",
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
		'font-family-no-missing-generic-family-keyword': null,

		// Function
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
		'selector-pseudo-class-no-unknown': null,
		'selector-pseudo-element-no-unknown': [
			true,
			{
				ignorePseudoElements: ['v-deep'],
			},
		],
		'selector-type-no-unknown': true,

		// Media feature
		'media-feature-name-no-unknown': true,

		// At-rule
		'at-rule-no-unknown': null,

		// Comment
		'comment-no-empty': true,

		// General / Sheet
		'no-descending-specificity': null,
		'no-duplicate-at-import-rules': true,
		'no-duplicate-selectors': true,
		'no-empty-source': null,
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
		'function-url-scheme-allowed-list': null,
		'function-allowed-list': null,

		// Keyframes
		'keyframes-name-pattern': '',

		// Number
		'number-max-precision': 10,

		// Time
		'time-min-milliseconds': 025,

		// Unit
		'unit-disallowed-list': [],
		'unit-allowed-list': null,

		// Shorthand property
		'shorthand-property-no-redundant-values': true,

		// Value
		'value-no-vendor-prefix': true,

		// Custom property
		'custom-property-pattern': '',

		// Property
		'property-disallowed-list': [],
		'property-no-vendor-prefix': null,
		'property-allowed-list': null,

		// Declaration
		'declaration-block-no-redundant-longhand-properties': [
			true,
			{
				ignoreShorthands: ['/flex/', '/grid/'],
			},
		],
		'declaration-no-important': null,
		'declaration-property-unit-disallowed-list': {},
		'declaration-property-unit-allowed-list': null,
		'declaration-property-value-disallowed-list': {
			border: ['none'],
			'border-top': ['none'],
			'border-right': ['none'],
			'border-bottom': ['none'],
			'border-left': ['none'],
		},
		'declaration-property-value-allowed-list': null,

		// Declaration block
		'declaration-block-single-line-max-declarations': 1,

		// Selector
		'selector-attribute-operator-disallowed-list': [],
		'selector-attribute-operator-allowed-list': null,
		'selector-class-pattern': null,
		'selector-combinator-disallowed-list': [],
		'selector-combinator-allowed-list': null,
		'selector-id-pattern': '',
		'selector-max-attribute': 2,
		'selector-max-class': null,
		'selector-max-combinators': null,
		'selector-max-compound-selectors': null,
		'selector-max-empty-lines': 0,
		'selector-max-id': 8,
		'selector-max-pseudo-class': null,
		'selector-max-specificity': null,
		'selector-max-type': null,
		'selector-max-universal': 2,
		'selector-nested-pattern': '',
		'selector-no-qualifying-type': null,
		'selector-no-vendor-prefix': true,
		'selector-pseudo-class-disallowed-list': [],
		'selector-pseudo-class-allowed-list': null,
		'selector-pseudo-element-disallowed-list': [],
		'selector-pseudo-element-allowed-list': ['before', 'after', 'marker', 'v-deep'],

		// Media feature
		'media-feature-name-disallowed-list': [],
		'media-feature-name-no-vendor-prefix': true,
		'media-feature-name-value-allowed-list': null,
		'media-feature-name-allowed-list': null,

		// Custom media
		'custom-media-pattern': '',

		// At-rule
		'at-rule-disallowed-list': [],
		'at-rule-no-vendor-prefix': true,
		'at-rule-property-required-list': {},
		'at-rule-allowed-list': null,

		// Comment
		'comment-word-disallowed-list': [],

		// General / Sheet
		'max-nesting-depth': 12,
		'no-unknown-animations': null,

		// ---------------------------- Stylistic issues
		// Color
		'color-hex-case': 'lower',
		'color-hex-length': 'short',

		// Font family
		'font-family-name-quotes': 'always-unless-keyword',

		// Font weight
		'font-weight-notation': null,

		// Function
		'function-comma-newline-after': null,
		'function-comma-newline-before': 'always-multi-line',
		'function-comma-space-after': 'always',
		'function-comma-space-before': 'never',
		'function-max-empty-lines': 0,
		'function-name-case': [
			'lower',
			{
				ignoreFunctions: ['DXImageTransform.Microsoft.gradient'],
			},
		],
		'function-parentheses-newline-inside': 'never-multi-line',
		'function-parentheses-space-inside': 'never',
		'function-url-quotes': 'always',
		'function-whitespace-after': 'always',

		// Number
		'number-leading-zero': null,
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
		'value-list-comma-newline-after': null,
		'value-list-comma-newline-before': 'never-multi-line',
		'value-list-comma-space-after': 'always-single-line',
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
		'declaration-empty-line-before': [
			'always',
			{
				except: ['after-comment', 'after-declaration', 'first-nested'],
			},
		],

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
		'at-rule-empty-line-before': null,
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
		'max-empty-lines': 2,
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
		'scss/at-extend-no-missing-placeholder': null,

		// @-function
		'scss/at-function-named-arguments': null,
		'scss/at-function-parentheses-space-before': 'always',
		'scss/at-function-pattern': namePattern,

		// @-if
		'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
		'scss/at-if-closing-brace-space-after': 'always-intermediate',
		'scss/at-if-no-null': true,

		// @-import
		'scss/at-import-no-partial-leading-underscore': true,
		'scss/at-import-partial-extension': null,
		'scss/at-import-partial-extension-blacklist': null,
		'scss/at-import-partial-extension-whitelist': null,

		// @-mixin
		'scss/at-mixin-argumentless-call-parentheses': null,
		'scss/at-mixin-named-arguments': null,
		'scss/at-mixin-parentheses-space-before': 'never',
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
		'scss/comment-no-loud': null,

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
		'scss/partial-no-import': null,

		// Selector
		'scss/selector-nest-combinators': null,
		'scss/selector-no-redundant-nesting-selector': true,
		'scss/selector-no-union-class-name': null,

		// General / Sheet
		'scss/no-dollar-variables': null,
		'scss/no-duplicate-dollar-variables': true,
		'scss/no-duplicate-mixins': true,
		'scss/no-global-function-names': null,

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
				{
					type: 'at-rule',
					name: 'include',
					hasBlock: true,
				},
			],
		],
		'order/properties-order': [],
		'order/properties-alphabetical-order': {
			order: 'flexible',
		},
	},
};
