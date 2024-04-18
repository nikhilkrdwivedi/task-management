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
exports.countDocuments = exports.deleteById = exports.fetchById = exports.fetchOne = exports.fetch = exports.update = exports.create = void 0;
const users_1 = __importDefault(require("../models/users"));
const create = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (payload = {}) {
    try {
        const result = yield users_1.default.create(payload);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.create = create;
const update = (...args_2) => __awaiter(void 0, [...args_2], void 0, function* (query = {}, payload = {}) {
    try {
        const result = yield users_1.default.findOneAndUpdate(query, payload, {
            new: true,
        });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.update = update;
const fetch = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_1.default.find(query).lean();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.fetch = fetch;
const fetchOne = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_1.default.findOne(query).lean();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.fetchOne = fetchOne;
const fetchById = (_id_1, ...args_3) => __awaiter(void 0, [_id_1, ...args_3], void 0, function* (_id, optional = {}) {
    try {
        const query = Object.assign({ _id }, optional);
        const result = yield users_1.default.findOne(query).lean();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.fetchById = fetchById;
const deleteById = (_id_2, ...args_4) => __awaiter(void 0, [_id_2, ...args_4], void 0, function* (_id, optional = {}) {
    try {
        const query = Object.assign({ _id }, optional);
        const result = yield users_1.default.findOneAndUpdate(query, {
            isActive: false,
        }, { new: true }).lean();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteById = deleteById;
const countDocuments = (...args_5) => __awaiter(void 0, [...args_5], void 0, function* (query = {}) {
    try {
        const result = yield users_1.default.countDocuments(query).lean();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.countDocuments = countDocuments;
