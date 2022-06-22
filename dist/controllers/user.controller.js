"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const catchAsync_1 = tslib_1.__importDefault(require("../utils/catchAsync"));
const createUser = (0, catchAsync_1.default)((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log("createUser, success", req);
    res.status(http_status_1.default.OK).send("createUser");
}));
const getUser = (0, catchAsync_1.default)((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log("getUser, success", req);
    res.status(http_status_1.default.OK).send("getUser");
}));
const getUsers = (0, catchAsync_1.default)((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log("getUsers, success", req);
    res.status(http_status_1.default.OK).send("getUsers");
}));
const updateUser = (0, catchAsync_1.default)((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log("updateUser, success", req);
    res.status(http_status_1.default.OK).send("updateUser");
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log("deleteUser, success", req);
    res.status(http_status_1.default.OK).send("deleteUser");
}));
exports.default = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
};
