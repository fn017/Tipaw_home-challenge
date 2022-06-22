"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const pick_1 = tslib_1.__importDefault(require("./pick"));
const ApiError_1 = tslib_1.__importDefault(require("../utils/ApiError"));
const validate = (schema) => (req, _res, next) => {
    const validSchema = (0, pick_1.default)(schema, ['params', 'query', 'body']);
    const object = (0, pick_1.default)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError_1.default(http_status_1.default.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.default = validate;
