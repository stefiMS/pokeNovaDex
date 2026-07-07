module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/*.test.(ts|tsx)'],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.ts',
    '!src/**/*.d.ts',
    '!src/types/**',
  ],
};
