module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true, 
  collectCoverage: true,
  collectCoverageFrom: [
    "domain/usecase/**/*.ts",
    "!domain/usecase/**/*.test.ts",
    "presentation/**/*.ts",
    "!presentation/**/*.test.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"]
};
