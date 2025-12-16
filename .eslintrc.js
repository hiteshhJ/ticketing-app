module.exports = {
  root: true,
  plugins: ['sonarjs'],
  extends: [
    // Next.js recommended linting rules and plugins
    'next/core-web-vitals',
    // TypeScript ESLint strict rules, with type checking
    'plugin:@typescript-eslint/strict-type-checked',
    // Stricter linting from SonarSource
    'plugin:sonarjs/recommended-legacy',
    // Prettier rules and plugins. Must be included after other extends, to avoid conflict.
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // Only allow process.env in specific, centralised locations
    // The collects together all environment variable usage
    'no-process-env': 'error',

    // Console should not be used directly, to ensure our logging is done in a structured way
    'no-console': 'error',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
        allowBoolean: true,
        allowAny: false,
        allowNullish: false,
        allowRegExp: false,
        allowNever: false,
      },
    ],
    // this is needed to allow void-return promises as server-actions
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
};
