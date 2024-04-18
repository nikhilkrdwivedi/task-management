"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const httpResponseMessages_1 = __importDefault(require("../constants/httpResponseMessages"));
const authentications_1 = __importDefault(require("../routes/authentications"));
const tasks_1 = __importDefault(require("../routes/tasks"));
const morgan_1 = __importDefault(require("morgan"));
function createServer() {
    const app = (0, express_1.default)();
    let corsOptions = {
        origin: "*",
        optionsSuccessStatus: 200,
    };
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)("dev"));
    // Route endpoints
    app.use("/api/v1/task/", tasks_1.default);
    app.use("/api/v1/authentication/", authentications_1.default);
    app.get("/", (request, response) => {
        return response.status(200).json({
            success: true,
            message: httpResponseMessages_1.default.SERVER_UP_AND_RUNNING,
            data: new Date(),
        });
    });
    return app;
}
exports.createServer = createServer;
exports.default = createServer;
