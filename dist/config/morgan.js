"use strict";
const tslib_1 = require("tslib");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const config_1 = tslib_1.__importDefault(require("./config"));
const logger_1 = tslib_1.__importDefault(require("./logger"));
morgan_1.default.token('message', (_req, res) => res.locals.errorMessage || '');
const getIpFormat = () => (config_1.default.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;
const successHandler = (0, morgan_1.default)(successResponseFormat, {
    skip: (_req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger_1.default.info(message.trim()) },
});
const errorHandler = (0, morgan_1.default)(errorResponseFormat, {
    skip: (_req, res) => res.statusCode < 400,
    stream: { write: (message) => logger_1.default.error(message.trim()) },
});
module.exports = {
    successHandler,
    errorHandler,
};
