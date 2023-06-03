/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "@/(.*.png)$": "<rootDir>/public/$1",
    "@/(.*)": "<rootDir>/src/$1",
  },
  setupFiles: [
      "<rootDir>/src/tests/env.ts",
  ],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json',
        isolatedModules: true,
      },
    ],
    '.+\\.(scss|png)$': '<rootDir>/src/tests/styleMock.js',
  },
};
