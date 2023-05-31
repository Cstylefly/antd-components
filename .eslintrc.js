/** @format */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:prettier/recommended' // eslint-plugin-prettier  eslint-config-prettier 下载这两个插件解决prettier和eslint配置的覆盖的问题
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest'
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': 'warn', // 定义未使用的变量
    'no-console': 'off',
    eqeqeq: 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'no-useless-return': 'off',
    camelcase: [
      'warn',
      {
        allow: ['^UNSAFE_'],
        properties: 'never',
        ignoreGlobals: true,
        ignoreImports: true,
        ignoreDestructuring: true
      }
    ],
    'react/prop-types': 'off'
  }
};
