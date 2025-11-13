import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.js'],
    exclude: [
      'node_modules/**',
      '.git/**',
      'test/index.js',
      'test/utils/commonFalsePositives.js',
      'test/utils/testUtils.js'
    ],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['rules/**/*.js', 'index.js'],
      exclude: [
        'node_modules/**',
        'test/**',
        'scripts/**',
        'coverage/**'
      ]
    },
    // Keep compatibility with the existing test structure
    testTimeout: 10000
  }
});
