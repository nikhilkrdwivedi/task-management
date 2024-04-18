"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const httpResponseMessages_1 = __importDefault(require("../../constants/httpResponseMessages"));
const error = function error(error, response) {
    let errorMsg;
    if (typeof error === "string") {
        errorMsg = error;
    }
    else if (error.details[0].type === "string.regex.base") {
        const errorId = error.details[0].message.split(" ");
        errorMsg = `Invalid ${errorId[0]} ${error.details[0].context.value}`;
    }
    else if (error.details[0].path.length > 1) {
        errorMsg = `${error.details[0].path[0]} ${error.details[0].message}`;
    }
    else {
        errorMsg = error.details[0].message.replace(/\"/g, "").trim() + "!";
        errorMsg = errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1);
    }
    return response.status(error.status || 400).json({
        success: false,
        message: errorMsg,
        error: httpResponseMessages_1.default.BAD_REQUEST,
    });
};
exports.error = error;
exports.default = {
    error: exports.error,
};
