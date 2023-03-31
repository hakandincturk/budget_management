module.exports = {
	'env': {
		node: true,
		commonjs: true
	},
	'root': true,
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'sourceType': 'module'
	},
	'plugins': [ '@typescript-eslint' ],
	'extends': [ 'eslint:recommended', 'plugin:@typescript-eslint/recommended' ],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-extra-semi': [
			'error'
		],
		'eqeqeq': [
			'error',
			'always'
		],
		'no-empty': [
			'error'
		],
		'no-multi-str': [
			'error'
		],
		'comma-spacing': [
			'error',
			{
				'before': false,
				'after': true
			}
		],
		'block-spacing': [
			'error'
		],
		'array-bracket-spacing': [
			'error',
			'always'
		],
		'multiline-comment-style': [
			'error',
			'starred-block'
		],
		'padded-blocks': [
			'error',
			{
				'classes': 'always'
			}
		],
		'semi-spacing': [
			'error',
			{
				'before': false,
				'after': false
			}
		],
		'key-spacing': [
			'error',
			{
				'beforeColon': false
			}
		],
		'for-direction': [
			'error'
		],
		'no-shadow': [
			'error'
		],
		'no-loop-func': [
			'error'
		],
		'camel_case': [
			'off'
		],
		'comma-dangle': [
			'error',
			'never'
		],
		'brace-style': [
			'error',
			'stroustrup'
		],
		'keyword-spacing': [
			'error',
			{
				'after': true
			}
		],
		'no-multiple-empty-lines': [
			'error',
			{
				'max': 1
			}
		],
		'no-lonely-if': [
			'error'
		],
		'no-plusplus': [
			'error'
		],
		'no-param-reassign': [
			'error'
		],
		'consistent-return': [
			'error'
		],
		'no-const-assign': [
			'error'
		],
		'max-len': [
			'error',
			{
				'code': 120
			}
		],
		'no-var': [
			'error'
		],
		'no-unused-vars': [
			'warn'
		],
		'no-dupe-keys': 0,
		'no-useless-catch': 0,
		'consistent-return': 0,
		'no-mixed-spaces-and-tabs': 0,
		'no-plusplus': 0
	}
};
