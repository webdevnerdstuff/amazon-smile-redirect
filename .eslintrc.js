module.exports = {
	env: {
		browser: true,
		jquery: true,
		es6: true,
	},
	extends: 'airbnb-base',
	globals: {
		$: true,
		_validator: true,
		baseUrl: true,
		jQuery: true,
    moment: true,
    onDateRangeChange: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		parser: 'babel-eslint',
		sourceType: 'module',
	},
	plugins: ['import'],
	rules: {
		'arrow-parens': ['warn', 'as-needed'],
		'brace-style': [0, 'stroustrup'],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
			},
		],
		'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
		'default-case': [
			'error',
			{
				commentPattern: '^skip\\sdefault',
			},
		],
		'func-names': 0,
		'function-paren-newline': 0,
		'global-require': 0,
		'implicit-arrow-linebreak': ['warn', 'beside'],
		indent: 0,
		'linebreak-style': 0,
		'max-len': 0,
		'new-cap': 0,
    'import/newline-after-import': 0,
    'newline-per-chained-call': 0,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-continue': 0,
		'no-debugger': 1,
		'no-else-return': ['error', { allowElseIf: true }],
		'no-loop-func': 0,
		'no-mixed-operators': 0,
		'no-nested-ternary': 0,
		'no-new': 0,
		'no-param-reassign': [
			'error',
			{
				props: true,
				ignorePropertyModificationsFor: ['$', 'd', 'el', 'field', 'item', 'model'],
			},
    ],
    'no-restricted-globals': 0,
    'no-restricted-properties': 0,
    'no-template-curly-in-string': 0,
		'no-underscore-dangle': [
			'error',
			{
				allow: [
          '_countRemoveWrapper',
          '_d',
          '_data',
          '_fade',
          '_hoverState',
          '_iDisplayLength',
          '_restoreItemIfFading',
          '_setFadeTimer',
        ],
				allowAfterThis: true,
			},
    ],
    'no-unused-expressions': ["error", { "allowShortCircuit": true }],
		'no-unused-vars': 0,
		'no-use-before-define': 0,
		'no-undef': 0,
		'no-new': 0,
		'no-tabs': 0,
		'object-curly-newline': [
			'error',
			{
				ObjectPattern: { multiline: false },
			},
		],
		'operator-linebreak': ['error', 'after'],
		'prefer-arrow-callback': ['error'],
		'prefer-destructuring': [
			'error',
			{
				array: false,
				object: false,
			},
			{
				enforceForRenamedProperties: false,
			},
		],
		radix: 0,
		'space-before-function-paren': [1, 'never'],
		'vars-on-top': 0,
	},
	settings: {
		'import/resolver': {
			'babel-module': {},
		},
	},
};
