"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const taskSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        trim: true,
        required: true,
        enum: ["PENDING", "COMPLETED"],
        default: "PENDING"
    },
    user: { type: Schema.ObjectId, ref: 'users' },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.default = model(`tasks`, taskSchema, `tasks`);
