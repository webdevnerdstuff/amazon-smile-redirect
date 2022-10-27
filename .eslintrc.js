module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'airbnb-base',
		'eslint:recommended',
	],
	globals: {
		chrome: true,
		location: true,
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 12,
		parser: '@babel/eslint-parser',
		requireConfigFile: false,
		sourceType: 'module',
	},
	plugins: [
		'import',
		'@babel',
	],
	settings: {
		'import/resolver': {
			'babel-module': {},
		},
	},
	rules: {
		'brace-style': ['error', 'stroustrup'],
		'default-case': [
			'error', {
				commentPattern: '^skip\\sdefault',
			},
		],
		'func-names': ['error', 'never'],
		'function-paren-newline': 0,
		'import/no-self-import': 0,
		'import/no-extraneous-dependencies': 0,
		'implicit-arrow-linebreak': ['warn', 'beside'],
		indent: [2, 'tab', { SwitchCase: 1 }],
		'no-tabs': [0, { allowIndentationTabs: true }],
		'linebreak-style': 0,
		'max-len': 0,
		'no-else-return': ['error', { allowElseIf: true }],
		'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
		'no-debugger': 0,
		'no-new': 0,
		'no-unused-vars': 1,
		'no-use-before-define': 0,
		'no-useless-escape': 0,
		'no-param-reassign': [
			'error', {
				props: true,
				ignorePropertyModificationsFor: ['field', 'model', 'el', 'item', 'state', 'Vue', 'vue'],
			},
		],
		'no-underscore-dangle': [
			'error', {
				allow: ['_data'],
				allowAfterThis: true,
			},
		],
		'no-plusplus': [
			'error', { allowForLoopAfterthoughts: true },
		],
		'object-curly-newline': ['error', {
			ObjectPattern: { multiline: false },
		}],
		'operator-linebreak': ['error', 'after'],
		'prefer-destructuring': [
			'error', {
				array: false,
				object: false,
			},
			{
				enforceForRenamedProperties: false,
			},
		],
		'space-before-function-paren': ['error', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'never',
		}],
		'vue/html-closing-bracket-newline': 0,
		'vue/html-indent': 0,
		'vue/html-self-closing': 0,
		'vue/max-attributes-per-line': 0,
		'vue/no-template-shadow': 0,
		'vue/no-v-html': 0,
		'vue/singleline-html-element-content-newline': 0,
	},
};
