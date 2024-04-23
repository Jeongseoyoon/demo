module.exports = {
  extends: [
    'react-app',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js', 'declarations.d.ts', 'plopfile.mjs', 'postcss.config.js', 'tailwind.config.js'],
  rules: {
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
    'react/react-in-jsx-scope': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-no-bind': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-uses-react': 'off',
    'react/button-has-type': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': 'off',
    'import/no-anonymous-default-export': 'off',
    'prettier/prettier': 'off',
    'no-param-reassign': 'off',
    'no-alert': 'off',
    'no-unused-vars': 'warn',
    'func-names': 'off',
    'lines-between-class-members': 'off',
    'linebreak-style': 'off',
    'no-useless-return': 'off',
    'prefer-template': 'warn',
    'arrow-body-style': 'off',
    semi: ['warn', 'always'],
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'no-unused-expressions': ['warn'],
    'prefer-const': ['warn'],
    'prefer-destructuring': ['warn', { object: true, array: false }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.js?(x)'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2015
      }
    }
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
};
