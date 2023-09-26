module.exports = {
    modulePathIgnorePatterns: ['dist'],
    testMatch: ['**/*.test.ts'],
    "preset": "ts-jest",
    moduleNameMapper: {
      '^@tests/(.*)': '<rootDir>/tests/$1',
      '^@source/(.*)': '<rootDir>/$1',
    }
  };
