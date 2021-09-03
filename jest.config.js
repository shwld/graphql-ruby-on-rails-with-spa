module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/app/javascript'],
  setupFilesAfterEnv: ['<rootDir>/app/javascript/jest/setupTests.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/app/javascript/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // https://github.com/zeit/next.js/issues/8663#issue-490553899
  globals: {},
}
