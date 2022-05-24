module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended', // 支持 import/export
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    // 自动检查 react 版本
    react: {
      version: 'detect',
    },
    // 配置路径别名
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      },
    },
  },
  rules: {
    'no-console': 'off',
    eqeqeq: 'off', // 禁用 == 等号
    'jsx-a11y/click-events-have-key-events': 'off',
    'class-methods-use-this': 'off',
    'react/no-danger': 'off', // dangerousSetInnerHTML
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, optionalDependencies: true, peerDependencies: true },
    ], // dev 依赖
    // '@typescript-eslint/no-unused-vars': 'off',
    // 'linebreak-style': 'off', // 换行符
  },
};
