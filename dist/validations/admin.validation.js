"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const cutsom_validation_1 = require("./cutsom.validation");
const loginWithId = {
    params: joi_1.default.object().keys({
        loginCodeId: joi_1.default.required().custom(cutsom_validation_1.objectId),
    }),
};
exports.default = {
    loginWithId
};
