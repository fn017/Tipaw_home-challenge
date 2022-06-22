"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const express_mongo_sanitize_1 = tslib_1.__importDefault(require("express-mongo-sanitize"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const ApiError_1 = tslib_1.__importDefault(require("./utils/ApiError"));
const config_1 = tslib_1.__importDefault(require("./config/config"));
const cors_2 = tslib_1.__importDefault(require("./config/cors"));
const morgan_1 = tslib_1.__importDefault(require("./config/morgan"));
const middleware_1 = require("./middleware");
const error_1 = require("./middleware/error");
const index_1 = tslib_1.__importDefault(require("./routes/api/index"));
const app = (0, express_1.default)();
if (config_1.default.env !== "test") {
    app.use(morgan_1.default.successHandler);
    app.use(morgan_1.default.errorHandler);
}
// set security HTTP headers
app.use((0, helmet_1.default)());
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// sanitize request data
// app.use(xss()); FIXME xss-clean doesn't provide types
app.use((0, express_mongo_sanitize_1.default)());
// gzip compression
app.use((0, compression_1.default)());
// enable cors
app.use((0, cors_1.default)(cors_2.default));
// app.options('*', cors);
// limit repeated failed requests to auth endpoints
if (config_1.default.env === "production") {
    app.use("/v1/auth", middleware_1.authLimiter);
}
// // add io
// app.use('/', (req: RequestWithSocket , _res, next) => {
//     req.io = io;
//     next();
// });
// //
// app.use(fileUpload());
// app.use("/uploads", express.static("src/uploads"));
// v1 api routes
app.use("/api", index_1.default);
// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new ApiError_1.default(http_status_1.default.NOT_FOUND, "api Not found"));
});
// convert error to ApiError, if needed
app.use(error_1.errorConverter);
// handle error
app.use(error_1.errorHandler);
exports.default = app;
