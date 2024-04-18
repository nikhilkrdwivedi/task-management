"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countDocuments = exports.deleteById = exports.fetchById = exports.fetch = exports.update = exports.create = void 0;
const tasks_1 = __importDefault(require("../models/tasks"));
const users_1 = require("../projection/users");
const create = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (payload = {}) {
    try {
        const result = yield tasks_1.default.create(payload);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.create = create;
const update = (...args_2) => __awaiter(void 0, [...args_2], void 0, function* (query = {}, payload = {}) {
    try {
        const result = yield tasks_1.default.findOneAndUpdate(query, payload, {
            new: true,
        }).lean();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.update = update;
const fetch = (query_1, ...args_3) => __awaiter(void 0, [query_1, ...args_3], void 0, function* (query, skip = 0, limit = 0, sort = { updatedAt: -1 }) {
    try {
        const result = yield tasks_1.default.find(query)
            .populate({
            path: "user",
            select: users_1.ALLOW_USER_FIELDS.join(" ") || "",
        }).sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.fetch = fetch;
const fetchById = (_id_1, ...args_4) => __awaiter(void 0, [_id_1, ...args_4], void 0, function* (_id, optional = {}) {
    try {
        const query = Object.assign({ _id }, optional);
        const result = yield tasks_1.default.findOne(query)
            .populate({
            path: "user",
            select: users_1.ALLOW_USER_FIELDS.join(" ") || "",
        })
            .lean();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.fetchById = fetchById;
const deleteById = (_id_2, ...args_5) => __awaiter(void 0, [_id_2, ...args_5], void 0, function* (_id, optional = {}) {
    try {
        const query = Object.assign({ _id }, optional);
        const result = yield tasks_1.default.findOneAndUpdate(query, {
            isActive: false,
        }, { new: true }).lean();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteById = deleteById;
const countDocuments = (...args_6) => __awaiter(void 0, [...args_6], void 0, function* (query = {}) {
    try {
        const result = yield tasks_1.default.countDocuments(query).lean();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.countDocuments = countDocuments;
