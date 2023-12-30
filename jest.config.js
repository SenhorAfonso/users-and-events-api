"use strict";
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/tests/**/*.test.ts'],
    coverageDirectory: './coverage',
};
