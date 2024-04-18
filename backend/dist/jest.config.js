"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: ["**/spec/**/*.spec.ts"],
    testEnvironment: "node",
    verbose: true,
    forceExit: true,
    // clearMocks: true,
};
exports.default = exports.config;
