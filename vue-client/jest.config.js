module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/tests/unit/matchers',
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/api/**',
    '!src/main.js',
    '!src/app.vue',
    '!src/utils/request.js',
    '!src/router/**',
    '!src/assets/**',
    '!src/lang/**',
    '!src/state/index.js',
    '!src/state/getters.js',
    '!src/components/_globals.js'
  ],
  collectCoverage: true
};
