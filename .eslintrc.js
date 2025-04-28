module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  rules: {
    // Tüm ESLint uyarılarını kapatıyoruz
    '@typescript-eslint/no-unused-vars': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'off',
    // Diğer tüm kuralları da kapatıyoruz
    'no-unused-vars': 'off'
  },
  ignorePatterns: ['**/*']
}; 