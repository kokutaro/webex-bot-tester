// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

/** @type {import('@jest/types/build/Config').InitialOptions} */
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  errorOnDeprecated: true,
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '\\.(c|le|sa|sc)ss$': 'identity-obj-proxy',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
