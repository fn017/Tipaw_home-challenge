"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// http://larouemusicale.com
const options = {
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:3000",
    preflightContinue: false,
};
exports.default = options;
