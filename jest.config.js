module.exports = {
    transform: {
        "^.+\\.tsx?$": "babel-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)test)\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js"],
    globals: {
        "ts-jest": {
            diagnostics: {
                warnOnly: true
            }
        }
    },
    moduleNameMapper: {
        "^[./a-zA-Z0-9$_-]+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js",
        "^.+\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js"
    },
  
    testEnvironment: 'jsdom',
    // Setup Enzyme
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
  };