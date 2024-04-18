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
exports.updateTaskStatus = exports.deleteTask = exports.updateTask = exports.addTask = exports.getTask = exports.getTasks = void 0;
const pagination_1 = require("../helpers/pagination");
const tasks_1 = require("../providers/tasks");
const httpResponseMessages_1 = __importDefault(require("../constants/httpResponseMessages"));
const tasks_2 = require("../helpers/tasks");
const getTasks = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const query = { user: (_a = request === null || request === void 0 ? void 0 : request.user) === null || _a === void 0 ? void 0 : _a._id, isActive: true };
        const { status } = request.query;
        if (status) {
            query['status'] = status;
        }
        const { skip, limit, currentPage } = (0, pagination_1.getPaginationQueryData)(request.query);
        const [data, total] = yield Promise.all([
            (0, tasks_1.fetch)(query, skip, limit),
            (0, tasks_1.countDocuments)(query),
        ]);
        const pagination = (0, pagination_1.getPaginationInfo)(total, limit, currentPage);
        return response.status(200).json({
            success: true,
            message: httpResponseMessages_1.default.TASK_FETCH_SUCCESS,
            pagination,
            data,
        });
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: httpResponseMessages_1.default.INTERNAL_SERVER_ERROR,
            error,
        });
    }
});
exports.getTasks = getTasks;
const getTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { taskId } = request.params;
        const optionalQuery = { user: (_b = request === null || request === void 0 ? void 0 : request.user) === null || _b === void 0 ? void 0 : _b._id, isActive: true };
        const data = yield (0, tasks_1.fetchById)(taskId, optionalQuery);
        return response.status(200).json({
            success: true,
            message: httpResponseMessages_1.default.TASK_FETCH_SUCCESS,
            data,
        });
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: httpResponseMessages_1.default.INTERNAL_SERVER_ERROR,
            error,
        });
    }
});
exports.getTask = getTask;
const addTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        let requestPayload = request.body;
        requestPayload = Object.assign(Object.assign({}, requestPayload), { user: (_c = request === null || request === void 0 ? void 0 : request.user) === null || _c === void 0 ? void 0 : _c._id });
        const data = yield (0, tasks_1.create)(requestPayload);
        return response.status(200).json({
            success: true,
            message: httpResponseMessages_1.default.TASK_CREATE_SUCCESS,
            data,
        });
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: httpResponseMessages_1.default.INTERNAL_SERVER_ERROR,
            error,
        });
    }
});
exports.addTask = addTask;
const updateTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        let requestPayload = request.body;
        requestPayload = (0, tasks_2.transformTaskUpdatePayload)(requestPayload);
        const { taskId } = request.params;
        const query = { _id: taskId, user: (_d = request === null || request === void 0 ? void 0 : request.user) === null || _d === void 0 ? void 0 : _d._id };
        const data = yield (0, tasks_1.update)(query, requestPayload);
        return response.status(200).json({
            success: true,
            message: httpResponseMessages_1.default.TASK_UPDATE_SUCCESS,
            data,
        });
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: httpResponseMessages_1.default.INTERNAL_SERVER_ERROR,
            error,
        });
    }
});
exports.updateTask = updateTask;
const deleteTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const { taskId } = request.params;
        const optionalQuery = { user: (_e = request === null || request === void 0 ? void 0 : request.user) === null || _e === void 0 ? void 0 : _e._id };
        const data = yield (0, tasks_1.deleteById)(taskId, optionalQuery);
        return response.status(200).json({
            success: true,
            message: httpResponseMessages_1.default.TASK_DELETED_SUCCESS,
            data,
        });
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: httpResponseMessages_1.default.INTERNAL_SERVER_ERROR,
            error,
        });
    }
});
exports.deleteTask = deleteTask;
const updateTaskStatus = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        let { taskId, status } = request.params;
        if (!status) {
            return response.status(200).json({
                success: true,
                message: httpResponseMessages_1.default.STATUS_MISSING,
                data: null,
            });
        }
        const query = { _id: taskId, user: (_f = request === null || request === void 0 ? void 0 : request.user) === null || _f === void 0 ? void 0 : _f._id };
        status = status === null || status === void 0 ? void 0 : status.toUpperCase();
        const payload = {
            status
        };
        const data = yield (0, tasks_1.update)(query, payload);
        return response.status(200).json({
            success: true,
            message: httpResponseMessages_1.default.TASK_UPDATE_SUCCESS,
            data,
        });
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: httpResponseMessages_1.default.INTERNAL_SERVER_ERROR,
            error,
        });
    }
});
exports.updateTaskStatus = updateTaskStatus;
exports.default = {
    getTasks: exports.getTasks,
    getTask: exports.getTask,
    addTask: exports.addTask,
    updateTask: exports.updateTask,
    deleteTask: exports.deleteTask,
    updateTaskStatus: exports.updateTaskStatus,
};
