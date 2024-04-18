"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.updateTaskValidation = exports.addTaskValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const response_1 = require("./response");
const addTaskRequestSchema = {
    title: joi_1.default.string().trim().required(),
    description: joi_1.default.string().trim().optional(),
    status: joi_1.default
        .string()
        .allow("PENDING", "COMPLETED")
        .trim()
        .optional(),
};
const updateTaskRequestSchema = {
    title: joi_1.default.string().trim().optional(),
    description: joi_1.default.string().trim().optional(),
    status: joi_1.default
        .string()
        .allow("PENDING", "COMPLETED")
        .trim()
        .optional(),
    user: joi_1.default.string().optional(),
    isActive: joi_1.default.boolean().optional(),
    createdAt: joi_1.default.date().optional(),
    updatedAt: joi_1.default.date().optional(),
    __v: joi_1.default.number().optional(),
};
const paramsRequestSchema = {
    taskId: joi_1.default.string().min(24).trim().required(),
    status: joi_1.default
        .string()
        .allow("PENDING", "COMPLETED")
        .trim()
        .optional(),
};
const addTaskValidation = (request, response, next) => {
    const requestBodySchema = joi_1.default.object(addTaskRequestSchema);
    const requestBodyValidation = requestBodySchema.validate(request.body);
    if (requestBodyValidation.error) {
        return (0, response_1.error)(requestBodyValidation.error, response);
    }
    else {
        next();
    }
};
exports.addTaskValidation = addTaskValidation;
const updateTaskValidation = (request, response, next) => {
    const requestBodySchema = joi_1.default.object(updateTaskRequestSchema);
    const requestBodyValidation = requestBodySchema.validate(request.body);
    if (requestBodyValidation.error) {
        return (0, response_1.error)(requestBodyValidation.error, response);
    }
    next();
};
exports.updateTaskValidation = updateTaskValidation;
const validateParams = (request, response, next) => {
    const requestParamsSchema = joi_1.default.object(paramsRequestSchema);
    const requestParamsValidation = requestParamsSchema.validate(request.params);
    if (requestParamsValidation.error) {
        return (0, response_1.error)(requestParamsValidation.error, response);
    }
    else {
        next();
    }
};
exports.validateParams = validateParams;
exports.default = {
    addTaskValidation: exports.addTaskValidation,
    updateTaskValidation: exports.updateTaskValidation,
    validateParams: exports.validateParams,
};
