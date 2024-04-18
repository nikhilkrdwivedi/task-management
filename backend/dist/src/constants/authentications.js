"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLACKLIST_KEYS_FOR_RETURN_USER = exports.AUTH_CONSTANTS = void 0;
exports.AUTH_CONSTANTS = {
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/,
    expiresIn: "90d",
    saltRounds: 10,
};
exports.BLACKLIST_KEYS_FOR_RETURN_USER = ["tokens", "password"];
exports.default = {
    AUTH_CONSTANTS: exports.AUTH_CONSTANTS,
    BLACKLIST_KEYS_FOR_RETURN_USER: exports.BLACKLIST_KEYS_FOR_RETURN_USER,
};
