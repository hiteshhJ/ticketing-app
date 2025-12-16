import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  resetMocks: true,
  resetModules: true,
  errorOnDeprecated: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  }
}

export default createJestConfig(config)
