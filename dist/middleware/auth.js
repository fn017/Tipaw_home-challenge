"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = tslib_1.__importDefault(require("passport"));
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const ApiError_1 = tslib_1.__importDefault(require("../utils/ApiError"));
const roles_1 = require("../config/roles");
const verifyCallback = (req, resolve, reject, requiredRights) => (err, user, info) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (err || info || !user) {
        return reject(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;
    if (requiredRights.length) {
        const userRights = roles_1.roleRights.get(user.role);
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights && req.params.userId !== user.id) {
            return reject(new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden'));
        }
    }
    resolve();
});
const auth = (...requiredRights) => (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        passport_1.default.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
});
exports.default = auth;
