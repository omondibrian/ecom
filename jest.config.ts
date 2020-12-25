export default {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules"],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 100,
      lines: 100,
      statements: 90,
    },
  },
};
