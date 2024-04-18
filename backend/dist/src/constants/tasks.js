"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASKS_STATUS = exports.TASKS_BLACKLIST_KEYS_FOR_UPDATE = exports.TASKS_WHITELIST_KEYS_FOR_UPDATE = void 0;
exports.TASKS_WHITELIST_KEYS_FOR_UPDATE = [];
exports.TASKS_BLACKLIST_KEYS_FOR_UPDATE = [
    "_id",
    "__v",
    "status",
    "isActive",
    "author",
    "completionDate",
];
exports.TASKS_STATUS = {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
};
exports.default = {
    TASKS_WHITELIST_KEYS_FOR_UPDATE: exports.TASKS_WHITELIST_KEYS_FOR_UPDATE,
    TASKS_BLACKLIST_KEYS_FOR_UPDATE: exports.TASKS_BLACKLIST_KEYS_FOR_UPDATE,
    TASKS_STATUS: exports.TASKS_STATUS,
};
