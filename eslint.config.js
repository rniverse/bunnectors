import parser from '@typescript-eslint/parser';
import plugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2025,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': plugin,
      import: importPlugin
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',

      // enforce single quotes
      'quotes': ['error', 'single', { 'avoidEscape': true }],

      // enforce trailing commas for multiline
      'comma-dangle': ['error', 'always-multiline'],

      // array / object formatting: allow up to 3 inline, otherwise break
      'array-element-newline': ['error', { minItems: 4 }],
      'array-bracket-newline': ['error', { multiline: true, minItems: 4 }],
      // arrays
      'array-element-newline': ['error', { minItems: 4 }],
      'array-bracket-newline': ['error', { multiline: true, minItems: 4 }],

      // objects
      'object-curly-newline': ['error', { multiline: true, minProperties: 4 }],
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],

      // imports
      'import/newline-after-import': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
        },
      ],
      // enforce spaces inside curly braces
      'object-curly-spacing': ['error', 'always'],

      // enforce spaces inside array brackets
      'array-bracket-spacing': ['error', 'always'],
      semi: ['error', 'always'],
    },
  },
];