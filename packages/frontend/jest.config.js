module.exports = {
  roots: ['<rootDir>'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/__mocks__/setupTests.js'],
  moduleNameMapper: {
    '.(css|jpg|png)$': '<rootDir>/src/__mocks__/empty-module.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
};
