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
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentications_1 = require("../providers/authentications");
const env_1 = require("../configurations/env");
const httpResponseMessages_1 = __importDefault(require("../constants/httpResponseMessages"));
const extractTokenFromHeader = (request) => {
    if (request.headers.authorization &&
        request.headers.authorization.split(" ")[0] === "Bearer") {
        return request.headers.authorization.split(" ")[1];
    }
    return undefined;
};
const validateToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = extractTokenFromHeader(request);
    if (!token) {
        return response.status(401).json({
            success: false,
            message: httpResponseMessages_1.default.ACCESS_DENIED,
            error: null,
        });
    }
    token = token.replace(/\"/g, "");
    try {
        const userToken = jsonwebtoken_1.default.verify(token, env_1.ENV_VARIABLES.JWT_SECRET);
        if (!userToken) {
            return response.status(401).json({
                success: false,
                message: httpResponseMessages_1.default.ACCESS_DENIED,
                error: null,
            });
        }
        const user = yield (0, authentications_1.fetchOne)({
            _id: userToken.userId,
            tokens: token,
        });
        if (!user) {
            return response.status(401).json({
                success: false,
                message: httpResponseMessages_1.default.ACCESS_DENIED,
                error: null,
            });
        }
        request.user = user;
        next();
    }
    catch (error) {
        return response.status(401).json({
            success: false,
            message: httpResponseMessages_1.default.ACCESS_DENIED,
            error: null,
        });
    }
});
exports.validateToken = validateToken;
exports.default = exports.validateToken;
