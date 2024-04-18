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
exports.app = void 0;
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const server_1 = __importDefault(require("../../utils/server"));
const httpResponseMessages_1 = __importDefault(require("../../constants/httpResponseMessages"));
const removeKeyFromObject_1 = require("../../helpers/removeKeyFromObject");
exports.app = (0, server_1.default)();
describe(`Authentications CRUD API unit tests`, () => {
    const createUserPayload = {
        email: "nikhil@outlook.com",
        password: "Nikhil123.@",
        name: "Nikhil Kumar",
    };
    const loginCredentials = {
        email: "nikhil@outlook.com",
        password: "Nikhil123.@",
    };
    const loginWrongCredentials = {
        email: "nikhil@outlook.com",
        password: "Nikhil1234.@",
    };
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZhZmQyOWFiMjdmMjRkY2Y0MzMxZDkiLCJpYXQiOjE2NzczOTMxOTMsImV4cCI6MTY4NTE2OTE5M30.LgAufcK6PnhPtqpQTgkjIdlglP-f8L0eXLuWThAZuSQ";
    let loggedInUserDetails;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    describe(`CREATE USER POST CALL`, () => {
        it("should create user", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode, body: { data: { user, token }, }, } = yield (0, supertest_1.default)(exports.app)
                .post("/api/v1/authentication/register")
                .send(createUserPayload);
            expect(statusCode).toBe(200);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.USER_CREATED,
                success: true,
            });
            expect(user.name).toBe(createUserPayload.name);
            expect(user.email).toBe(createUserPayload.email);
            expect(token === null || token === void 0 ? void 0 : token.length).toBeGreaterThan(0);
        }));
        it("shouldn't create user, user is already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode } = yield (0, supertest_1.default)(exports.app)
                .post("/api/v1/authentication/register")
                .send(createUserPayload);
            expect(statusCode).toBe(409);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.USER_ALREADY_EXIST,
                success: false,
            });
        }));
        it("shouldn't create user, email didn't send in payload", () => __awaiter(void 0, void 0, void 0, function* () {
            let wrongPayload = (0, removeKeyFromObject_1.removeKeyFromObject)(["email"], Object.assign({}, createUserPayload));
            const { body, statusCode } = yield (0, supertest_1.default)(exports.app)
                .post("/api/v1/authentication/register")
                .send(wrongPayload);
            expect(statusCode).toBe(400);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.EMAIL_REQUIRED,
                success: false,
                error: httpResponseMessages_1.default.BAD_REQUEST,
            });
        }));
        it("shouldn't create user, name didn't send in payload", () => __awaiter(void 0, void 0, void 0, function* () {
            let wrongPayload = (0, removeKeyFromObject_1.removeKeyFromObject)(["name"], Object.assign({}, createUserPayload));
            const { body, statusCode } = yield (0, supertest_1.default)(exports.app)
                .post("/api/v1/authentication/register")
                .send(wrongPayload);
            expect(statusCode).toBe(400);
            expect(body).toMatchObject({
                error: httpResponseMessages_1.default.BAD_REQUEST,
                success: false,
                message: httpResponseMessages_1.default.NAME_REQUIRED,
            });
        }));
        it("shouldn't create user, password didn't send in payload", () => __awaiter(void 0, void 0, void 0, function* () {
            let wrongPayload = (0, removeKeyFromObject_1.removeKeyFromObject)(["password"], Object.assign({}, createUserPayload));
            const { body, statusCode } = yield (0, supertest_1.default)(exports.app)
                .post("/api/v1/authentication/register")
                .send(wrongPayload);
            expect(statusCode).toBe(400);
            expect(body).toMatchObject({
                error: httpResponseMessages_1.default.BAD_REQUEST,
                success: false,
                message: httpResponseMessages_1.default.PASSWORD_REQUIRED,
            });
        }));
    });
    describe(`LOGIN USER POST CALL`, () => {
        it("should allow to login user", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode, body: { data: { user, token }, }, } = yield (0, supertest_1.default)(exports.app)
                .post("/api/v1/authentication/login")
                .send(loginCredentials);
            expect(statusCode).toBe(200);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.LOGIN_SUCCESS,
                success: true,
            });
            expect(user.email).toBe(loginCredentials.email);
            expect(token === null || token === void 0 ? void 0 : token.length).toBeGreaterThan(0);
            loggedInUserDetails = { user, token };
        }));
        it("should not allow to login user, invalid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode, body: { data: { user, token }, }, } = yield (0, supertest_1.default)(exports.app)
                .post("/api/v1/authentication/login")
                .send(loginWrongCredentials);
            expect(statusCode).toBe(401);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.LOGIN_ERROR,
                success: false,
            });
        }));
    });
    describe(`VALIDATE USER AUTH TOKEN GET CALL`, () => {
        it("should validate user token : SUCCESS", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode, body: { data }, } = yield (0, supertest_1.default)(exports.app)
                .get("/api/v1/authentication/validate-token")
                .set("authorization", `Bearer ${(loggedInUserDetails === null || loggedInUserDetails === void 0 ? void 0 : loggedInUserDetails.token) || ""}`);
            expect(statusCode).toBe(200);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.VALID_TOKEN,
                success: true,
            });
            expect(data.email).toBe(loginCredentials.email);
        }));
        it("should validate user token : FAILURE", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode } = yield (0, supertest_1.default)(exports.app)
                .get("/api/v1/authentication/validate-token")
                .set("authorization", `Bearer ${invalidToken}`);
            expect(statusCode).toBe(500);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.INTERNAL_SERVER_ERROR,
                success: false,
                error: { name: "JsonWebTokenError", message: "invalid signature" },
            });
        }));
    });
});
