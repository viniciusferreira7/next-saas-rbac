/** @type {import('eslint').Linter.Config} */
module.config = {
  extends: ['@rocketseat/eslint-config/node'],
  plugins: ['eslint-plugin-simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error'
  }
}