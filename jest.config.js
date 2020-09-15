module.exports = {
    testPathIgnorePatterns: ['/.next/', '/node_modules/', '/tests/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
    },
    transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleNameMapper: {
        '^@src(.*)$': '<rootDir>/src$1'
    }
};
