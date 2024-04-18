"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTaskUpdatePayload = void 0;
const tasks_1 = require("../constants/tasks");
const transformTaskUpdatePayload = (payload) => {
    tasks_1.TASKS_BLACKLIST_KEYS_FOR_UPDATE.forEach((key) => delete payload[key]);
    return payload;
};
exports.transformTaskUpdatePayload = transformTaskUpdatePayload;
exports.default = { transformTaskUpdatePayload: exports.transformTaskUpdatePayload };
