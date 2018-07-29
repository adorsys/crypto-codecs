module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.ts',
      '!test/**/*.test.ts',
      'test/**/*.ts',
    ],
    tests: [
      'test/**/*.test.ts',
    ],
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(),
    },
    env: {
      type: 'node',
    },
    testFramework: 'ava',
  }
}
