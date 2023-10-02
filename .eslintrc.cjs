/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 單引號
        semi: false, // 無分號
        printWidth: 80, // 每行寬度至多80字元
        trailingComma: 'none', // 不加物件|陣列最後逗號
        endOfLine: 'auto' // 分行符號號不限制（win mac 不一致）
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue元件名稱多單詞組成（忽略index.vue）
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 關閉 props 解構的校驗
    // 💡 添加未定義變數錯誤提示，create-vue@3.6.3 關閉，這裡加上是為了支援下一個章節演示。
    'no-undef': 'error'
  },
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly'
  }
}
