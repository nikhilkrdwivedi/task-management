"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformUserToReturnToClient = void 0;
const authentications_1 = require("../constants/authentications");
const transformUserToReturnToClient = (payload) => {
    authentications_1.BLACKLIST_KEYS_FOR_RETURN_USER.forEach((key) => delete payload[key]);
    return payload;
};
exports.transformUserToReturnToClient = transformUserToReturnToClient;
exports.default = { transformUserToReturnToClient: exports.transformUserToReturnToClient };
