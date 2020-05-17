module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint',],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 10, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': [0, { packageDir: '.' }],
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/prefer-default-export': [0, { packageDir: '.' }],
    'import/named': 0,
    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'no-unused-expressions': [
      2,
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],

    // // Allow only special identifiers
    // // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': 'off',
    'global-require': 'off',

    // Prefer destructuring from arrays and objects
    // http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-param-reassign': 'off',
    'compat/compat': 2,
    'prettier/prettier': [2, { 'singleQuote': true, 'trailingComma': 'es5' }],

    // typescript
    "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/interface-name-prefix' : [0],
    '@typescript-eslint/camelcase': [0],
    '@typescript-eslint/no-explicit-any': [0]
  },
};
