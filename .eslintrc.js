module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        // Prettier integration
        'prettier/prettier': 'error',

        // TypeScript specific rules (relaxed for SDK)
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/no-explicit-any': 'off', // Allow any in SDK code
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-var-requires': 'warn', // Allow require in test files
        '@typescript-eslint/ban-types': 'off', // Allow {} type for response objects

        // General ESLint rules
        'no-console': 'off', // Allow console in SDK and test files
        'no-debugger': 'error',
        'no-duplicate-imports': 'error',
        'no-unused-expressions': 'error',
        'prefer-const': 'off', // Let TypeScript handle this
        'no-var': 'error',

        // Code style rules (relaxed)
        'eol-last': 'error',
        'comma-dangle': 'off', // Disable for now due to auto-fix issues
        semi: ['error', 'always'],
        quotes: ['error', 'single', { avoidEscape: true }],
    },
    ignorePatterns: ['dist/', 'node_modules/', '*.js', '*.d.ts', 'doc/'],
    env: {
        node: true,
        es6: true,
    },
};
