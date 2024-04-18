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
exports.register = exports.validateToken = exports.logout = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpResponseMessages_1 = __importDefault(require("../constants/httpResponseMessages"));
const env_1 = require("../configurations/env");
const authentications_1 = require("../providers/authentications");
const authentications_2 = require("../constants/authentications");
const authentication_1 = require("../helpers/authentication");
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = request.body;
        let query = {
            email: loginUser.email,
        };
        const user = yield (0, authentications_1.fetchOne)(query);
        if (!user) {
            return response.status(401).json({
                success: false,
                message: httpResponseMessages_1.default.LOGIN_ERROR,
                data: loginUser,
            });
        }
        // compare passwords
        const match = bcrypt_1.default.compareSync(loginUser.password, user.password);
        if (!match) {
            return response.status(401).json({
                success: false,
                message: httpResponseMessages_1.default.LOGIN_ERROR,
                data: loginUser,
            });
        }
        // token issue with validation
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, env_1.ENV_VARIABLES.JWT_SECRET, {
            expiresIn: authentications_2.AUTH_CONSTANTS.expiresIn,
        });
        let updatedUser = yield (0, authentications_1.update)({ _id: user._id }, { $addToSet: { tokens: token } });
        updatedUser = (0, authentication_1.transformUserToReturnToClient)(updatedUser);
        return response.status(200).json({
            success: true,
            message: httpResponseMessages_1.default.LOGIN_SUCCESS,
            data: {
                user: updatedUser,
                token,
            },
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
exports.login = login;
const extractTokenFromHeader = (request) => {
    if (request.headers.authorization &&
        request.headers.authorization.split(" ")[0] === "Bearer") {
        return request.headers.authorization.split(" ")[1];
    }
    return undefined;
};
const logout = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = extractTokenFromHeader(request);
        if (!token) {
            return response.status(401).json({
                success: false,
                message: httpResponseMessages_1.default.LOGOUT_DENIED,
                error: null,
            });
        }
        token = token.replace(/\"/g, "");
        const { allDeviceLogout } = request.body || false;
        const user = request.user;
        const isValidToken = jsonwebtoken_1.default.verify(token, env_1.ENV_VARIABLES.JWT_SECRET);
        if (!isValidToken) {
            return response.status(401).json({
                success: false,
                message: httpResponseMessages_1.default.ACCESS_DENIED,
                error: null,
            });
        }
        let updatePayload = { $pull: { tokens: token } };
        if (allDeviceLogout) {
            updatePayload = { $set: { tokens: [] } };
        }
        yield (0, authentications_1.update)({ _id: user === null || user === void 0 ? void 0 : user._id }, updatePayload);
        return response.status(200).json({
            success: true,
            message: httpResponseMessages_1.default.LOGOUT_SUCCESS,
            data: {},
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
exports.logout = logout;
const validateToken = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = extractTokenFromHeader(request);
        if (!token) {
            return response.status(401).json({
                success: false,
                message: httpResponseMessages_1.default.ACCESS_DENIED,
                error: null,
            });
        }
        token = token.replace(/\"/g, "");
        const isValidToken = jsonwebtoken_1.default.verify(token, env_1.ENV_VARIABLES.JWT_SECRET);
        if (!isValidToken) {
            return response.status(401).json({
                success: false,
                message: httpResponseMessages_1.default.ACCESS_DENIED,
                error: null,
            });
        }
        const { userId } = isValidToken;
        let user = yield (0, authentications_1.fetchOne)({
            _id: userId,
            tokens: token,
        });
        if (!user) {
            return response.status(401).json({
                success: false,
                message: httpResponseMessages_1.default.ACCESS_DENIED,
                error: null,
            });
        }
        user = (0, authentication_1.transformUserToReturnToClient)(user);
        return response.status(200).json({
            success: true,
            message: httpResponseMessages_1.default.VALID_TOKEN,
            data: user,
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
exports.validateToken = validateToken;
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registerUser = request.body;
        //password check
        if (!authentications_2.AUTH_CONSTANTS.passwordRegex.test(registerUser.password)) {
            return response.status(401).json({
                success: false,
                message: httpResponseMessages_1.default.INVALID_PASSWORD_ERROR,
                error: registerUser,
            });
        }
        //user existence check
        const checkUser = yield (0, authentications_1.fetchOne)({ email: registerUser.email });
        if (checkUser) {
            return response.status(409).json({
                success: false,
                message: httpResponseMessages_1.default.USER_ALREADY_EXIST,
                error: registerUser,
            });
        }
        // user creation test
        const password = bcrypt_1.default.hashSync(registerUser.password, authentications_2.AUTH_CONSTANTS.saltRounds);
        registerUser.password = password;
        const user = yield (0, authentications_1.create)(registerUser);
        // token issue with validation
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, env_1.ENV_VARIABLES.JWT_SECRET, {
            expiresIn: authentications_2.AUTH_CONSTANTS.expiresIn,
        });
        // add token to user token mapping
        let updatedUser = yield (0, authentications_1.update)({ _id: user._id }, { $addToSet: { tokens: token } });
        updatedUser = (0, authentication_1.transformUserToReturnToClient)(updatedUser);
        return response.status(200).json({
            success: true,
            message: httpResponseMessages_1.default.USER_CREATED,
            data: { user: updatedUser, token },
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
exports.register = register;
exports.default = { login: exports.login, logout: exports.logout, validateToken: exports.validateToken, register: exports.register };
