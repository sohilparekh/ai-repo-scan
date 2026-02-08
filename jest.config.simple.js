const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
})

module.exports = createJestConfig
