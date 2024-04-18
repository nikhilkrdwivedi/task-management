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
const tasks_1 = require("../../constants/tasks");
exports.app = (0, server_1.default)();
describe.only(`Tasks CRUD API unit tests`, () => {
    const wrongTaskId = "wrongTaskId";
    let loggedInUserDetails;
    const createTaskPayload = {
        title: "My task test",
        description: "I am testing task",
    };
    let newlyCreatedTask;
    let newlyUpdatedTask;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
        const createUserPayload = {
            email: "nikhil@outlook.com",
            password: "Nikhil123.@",
            name: "Nikhil Kumar",
        };
        const loginCredentials = {
            email: "nikhil@outlook.com",
            password: "Nikhil123.@",
        };
        yield (0, supertest_1.default)(exports.app)
            .post("/api/v1/authentication/register")
            .send(createUserPayload);
        const { body: { data: { user, token }, }, } = yield (0, supertest_1.default)(exports.app)
            .post("/api/v1/authentication/login")
            .send(loginCredentials);
        loggedInUserDetails = {
            user,
            token,
        };
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    describe(`POST API CALL: WRITE OPERATIONS`, () => {
        it("should return list of tasks of logged in user", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode } = yield (0, supertest_1.default)(exports.app)
                .post("/api/v1/task")
                .send(createTaskPayload)
                .set("authorization", `Bearer ${loggedInUserDetails.token}`);
            expect(statusCode).toBe(200);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.TASK_CREATE_SUCCESS,
                data: {
                    title: 'My task test',
                    description: 'I am testing task',
                    status: 'PENDING',
                    isActive: true,
                }
            });
            expect(body.success).toBeTruthy();
            newlyCreatedTask = body.data;
        }));
    });
    describe(`GET API CALL: READ OPERATIONS`, () => {
        it("should return list of tasks of logged in user", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode } = yield (0, supertest_1.default)(exports.app)
                .get("/api/v1/task")
                .set("authorization", `Bearer ${loggedInUserDetails.token}`);
            expect(statusCode).toBe(200);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.TASK_FETCH_SUCCESS,
            });
            expect(body.success).toBeTruthy();
            expect(body.data.length).toBe(1);
        }));
        it("should return task of logged in user by taskId", () => __awaiter(void 0, void 0, void 0, function* () {
            const _id = newlyCreatedTask === null || newlyCreatedTask === void 0 ? void 0 : newlyCreatedTask._id;
            const { body, statusCode } = yield (0, supertest_1.default)(exports.app)
                .get(`/api/v1/task/${_id}`)
                .set("authorization", `Bearer ${loggedInUserDetails.token}`);
            expect(statusCode).toBe(200);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.TASK_FETCH_SUCCESS,
            });
            expect(body.success).toBeTruthy();
        }));
        it("shouldn't return task of logged in user by taskId because wrong taskId", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode } = yield (0, supertest_1.default)(exports.app)
                .get(`/api/v1/task/${wrongTaskId}`)
                .set("authorization", `Bearer ${loggedInUserDetails.token}`);
            expect(statusCode).toBe(400);
            expect(body).toMatchObject({
                message: 'TaskId length must be at least 24 characters long!',
            });
            expect(body.success).toBeFalsy();
        }));
        it("shouldn't return task of logged in user by taskId because taskId not exists in db", () => __awaiter(void 0, void 0, void 0, function* () {
            const dummyId = new mongoose_1.default.Types.ObjectId();
            const { body, statusCode } = yield (0, supertest_1.default)(exports.app)
                .get(`/api/v1/task/${dummyId}`)
                .set("authorization", `Bearer ${loggedInUserDetails.token}`);
            expect(statusCode).toBe(200);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.TASK_FETCH_SUCCESS,
            });
            expect(body.success).toBeTruthy();
            expect(body.data).toBeNull();
        }));
    });
    describe(`PUT API CALL: UPDATE OPERATIONS`, () => {
        it("should return updated task of logged in user", () => __awaiter(void 0, void 0, void 0, function* () {
            const _id = newlyCreatedTask === null || newlyCreatedTask === void 0 ? void 0 : newlyCreatedTask._id;
            const updateTask = {
                title: "My update task test",
                description: "I am testing task update",
            };
            const { body, body: { data }, statusCode, } = yield (0, supertest_1.default)(exports.app)
                .put(`/api/v1/task/${_id}`)
                .send(updateTask)
                .set("authorization", `Bearer ${loggedInUserDetails.token}`);
            expect(statusCode).toBe(200);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.TASK_UPDATE_SUCCESS,
            });
            expect(body.success).toBeTruthy();
            expect(data.title).toBe(updateTask.title);
            expect(data.description).toBe(updateTask.description);
        }));
    });
    describe(`PATCH API CALL: UPDATE STATUS`, () => {
        it(`should return updated status ${tasks_1.TASKS_STATUS.PENDING} -> ${tasks_1.TASKS_STATUS.COMPLETED} task of logged in user`, () => __awaiter(void 0, void 0, void 0, function* () {
            const _id = newlyCreatedTask === null || newlyCreatedTask === void 0 ? void 0 : newlyCreatedTask._id;
            const { body, body: { data }, statusCode, } = yield (0, supertest_1.default)(exports.app)
                .patch(`/api/v1/task/${_id}/status/${tasks_1.TASKS_STATUS.COMPLETED}`)
                .set("authorization", `Bearer ${loggedInUserDetails.token}`);
            expect(statusCode).toBe(200);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.TASK_UPDATE_SUCCESS,
            });
            expect(body.success).toBeTruthy();
            expect(data.status).toBe(tasks_1.TASKS_STATUS.COMPLETED);
            expect(data._id).toBe(_id);
        }));
        it(`should return updated status ${tasks_1.TASKS_STATUS.COMPLETED} -> ${tasks_1.TASKS_STATUS.PENDING} task of logged in user`, () => __awaiter(void 0, void 0, void 0, function* () {
            const _id = newlyCreatedTask === null || newlyCreatedTask === void 0 ? void 0 : newlyCreatedTask._id;
            const { body, body: { data }, statusCode, } = yield (0, supertest_1.default)(exports.app)
                .patch(`/api/v1/task/${_id}/status/${tasks_1.TASKS_STATUS.PENDING}`)
                .set("authorization", `Bearer ${loggedInUserDetails.token}`);
            expect(statusCode).toBe(200);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.TASK_UPDATE_SUCCESS,
            });
            expect(body.success).toBeTruthy();
            expect(data.status).toBe(tasks_1.TASKS_STATUS.PENDING);
            expect(data._id).toBe(_id);
        }));
    });
    describe(`DELETE API CALL: SOFT DELETE`, () => {
        it(`should delete task of logged in user`, () => __awaiter(void 0, void 0, void 0, function* () {
            const _id = newlyCreatedTask === null || newlyCreatedTask === void 0 ? void 0 : newlyCreatedTask._id;
            const { body, body: { data }, statusCode, } = yield (0, supertest_1.default)(exports.app)
                .delete(`/api/v1/task/${_id}`)
                .set("authorization", `Bearer ${loggedInUserDetails.token}`);
            expect(statusCode).toBe(200);
            expect(body).toMatchObject({
                message: httpResponseMessages_1.default.TASK_DELETED_SUCCESS,
            });
            expect(body.success).toBeTruthy();
            expect(data.status).toBe(tasks_1.TASKS_STATUS.PENDING);
            expect(data._id).toBe(_id);
            expect(data.isActive).toBe(false);
        }));
    });
});
