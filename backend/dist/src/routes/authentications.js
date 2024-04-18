"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentications_1 = __importDefault(require("../controllers/authentications"));
const authentications_2 = __importDefault(require("../middlewares/requestValidators/authentications"));
const authenticationRouter = (0, express_1.Router)();
authenticationRouter.post("/register", authentications_2.default.registerValidation, authentications_1.default.register);
authenticationRouter.post("/login", authentications_2.default.loginValidation, authentications_1.default.login);
authenticationRouter.post("/logout", authentications_1.default.logout);
authenticationRouter.get("/validate-token", authentications_1.default.validateToken);
exports.default = authenticationRouter;
