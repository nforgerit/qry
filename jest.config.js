/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    "ts-jest": {
      "tsconfig": "tsconfig.json",
      "diagnostics": true,
      "useESM": true,
      "extensionsToTreatAsEsm": [".ts", '.js'],
      "transformIgnorePatterns": ['/node_modules/(?!csv-parse)']
    }
  },
  moduleDirectories: [ 'node_modules', 'src' ],
  moduleFileExtensions: ['ts', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    // jest seems having issues with esm module imports containing '/'
    'csv-parse/sync': '<rootDir>/node_modules/csv-parse/dist/cjs/sync.cjs',
    // back to the roots with manual file mappings =/
    '../src/Service.js': '<rootDir>/src/Service.ts',
    './utils/CSVParser.js': '<rootDir>/src/utils/CSVParser.ts',
    './utils/ResMapper.js': '<rootDir>/src/utils/ResMapper.ts',
    './utils/Data.js': '<rootDir>/src/utils/Data.ts',
    './mocks/mockedFetch.js': '<rootDir>/test/mocks/mockedFetch.ts',
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};