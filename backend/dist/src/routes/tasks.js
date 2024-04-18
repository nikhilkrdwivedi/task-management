"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_1 = __importDefault(require("../controllers/tasks"));
const tasks_2 = __importDefault(require("../middlewares/requestValidators/tasks"));
const validateToken_1 = require("../middlewares/validateToken");
const TaskRouter = (0, express_1.Router)();
TaskRouter.get("/", validateToken_1.validateToken, tasks_1.default.getTasks);
TaskRouter.get("/:taskId", validateToken_1.validateToken, tasks_2.default.validateParams, tasks_1.default.getTask);
TaskRouter.post("/", validateToken_1.validateToken, tasks_2.default.addTaskValidation, tasks_1.default.addTask);
TaskRouter.patch("/:taskId/status/:status", validateToken_1.validateToken, tasks_2.default.validateParams, tasks_1.default.updateTaskStatus);
TaskRouter.put("/:taskId", validateToken_1.validateToken, tasks_2.default.validateParams, tasks_2.default.updateTaskValidation, tasks_1.default.updateTask);
TaskRouter.delete("/:taskId", validateToken_1.validateToken, tasks_2.default.validateParams, tasks_1.default.deleteTask);
exports.default = TaskRouter;
