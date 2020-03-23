module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    // 强制使用单引号
    quotes: ['error', 'single'],
    // 强制不使用分号结尾
    semi: ['error', 'never']
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    '_': true
  }
}
