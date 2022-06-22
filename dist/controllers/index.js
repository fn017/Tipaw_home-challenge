"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.authController = void 0;
var auth_controller_1 = require("./auth.controller");
Object.defineProperty(exports, "authController", { enumerable: true, get: function () { return __importDefault(auth_controller_1).default; } });
var user_controller_1 = require("./user.controller");
Object.defineProperty(exports, "userController", { enumerable: true, get: function () { return __importDefault(user_controller_1).default; } });
