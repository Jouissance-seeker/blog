import { FlatCompat } from '@eslint/eslintrc';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import betterTailwind from 'eslint-plugin-better-tailwindcss';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import unusedImports from 'eslint-plugin-unused-imports';
import nextPlugin from '@next/eslint-plugin-next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@next/next/recommended',
  ),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: path.join(__dirname, './tsconfig.json'),
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'better-tailwindcss': {
        entryPoint: 'app/globals.css',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      prettier,
      'better-tailwindcss': betterTailwind,
      'unused-imports': unusedImports,
      '@next': nextPlugin,
    },
    rules: {
      // Tailwind
      'better-tailwindcss/no-unnecessary-whitespace': 'warn',
      'better-tailwindcss/no-duplicate-classes': 'warn',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'warn',
      'better-tailwindcss/no-unregistered-classes': 'warn',

      // Unused Variables and Imports
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'all',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // React Props
      'react/no-unused-prop-types': 'warn',

      // Imports
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: Infinity }],
      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'off',

      // Prettier
      'prettier/prettier': 'error',

      // React
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-key': 'error',

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',

      // A11y
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',

      // Shorthand
      'object-shorthand': 'off',
    },
  },
  {
    ignores: [
      '.next/',
      'node_modules/',
      'out/',
      'dist/',
      'build/',
      '*.log',
      '*.pid',
      '*.seed',
      '*.pid.lock',
      'coverage/',
      '*.lcov',
      '.nyc_output',
      '.cache/',
      '.parcel-cache/',
      '.rpt2_cache/',
      '.rts2_cache_cjs/',
      '.rts2_cache_es/',
      '.rts2_cache_umd/',
      '.vscode/',
      '.idea/',
      '*.swp',
      '*.swo',
      '*~',
      '.DS_Store',
      '.DS_Store?',
      '._*',
      '.Spotlight-V100',
      '.Trashes',
      'ehthumbs.db',
      'Thumbs.db',
    ],
  },
];
