"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = exports.loginValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const response_1 = require("./response");
const loginRequestSchema = {
    email: joi_1.default.string().email().trim().required(),
    password: joi_1.default.string()
        .required()
};
const registerRequestSchema = {
    email: joi_1.default.string().email().trim().required(),
    password: joi_1.default.string()
        .min(6)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'\[\]])/)
        .required()
        .messages({
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),
    name: joi_1.default.string().trim().required(),
};
const loginValidation = (request, response, next) => {
    const requestBodySchema = joi_1.default.object(loginRequestSchema);
    const requestBodyValidation = requestBodySchema.validate(request.body);
    if (requestBodyValidation.error) {
        return (0, response_1.error)(requestBodyValidation.error, response);
    }
    else {
        next();
    }
};
exports.loginValidation = loginValidation;
const registerValidation = (request, response, next) => {
    const requestBodySchema = joi_1.default.object(registerRequestSchema);
    const requestBodyValidation = requestBodySchema.validate(request.body);
    if (requestBodyValidation.error) {
        return (0, response_1.error)(requestBodyValidation.error, response);
    }
    else {
        next();
    }
};
exports.registerValidation = registerValidation;
exports.default = {
    loginValidation: exports.loginValidation,
    registerValidation: exports.registerValidation,
};
