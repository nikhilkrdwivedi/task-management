"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeKeyFromObject = void 0;
const removeKeyFromObject = (keys, payload) => {
    keys.forEach((key) => delete payload[key]);
    return payload;
};
exports.removeKeyFromObject = removeKeyFromObject;
exports.default = { removeKeyFromObject: exports.removeKeyFromObject };
