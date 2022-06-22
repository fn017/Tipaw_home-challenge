"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const catchAsync_1 = tslib_1.__importDefault(require("../utils/catchAsync"));
const registerUser = (0, catchAsync_1.default)((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log("registerUser", req);
    res.status(http_status_1.default.OK).send("registerUser");
}));
const login = (0, catchAsync_1.default)((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log("login, success", req);
    res.status(http_status_1.default.OK).send("login");
}));
const loginWithId = (0, catchAsync_1.default)((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log("login with Id, success", req);
    res.status(http_status_1.default.OK).send("login with Id");
}));
exports.default = {
    registerUser,
    login,
    loginWithId,
};
