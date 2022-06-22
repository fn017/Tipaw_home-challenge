"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const auth_route_1 = tslib_1.__importDefault(require("./auth.route"));
const user_route_1 = tslib_1.__importDefault(require("./user.route"));
// import {config} from '../../config'
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: "/auth",
        route: auth_route_1.default,
    },
    {
        path: "/user",
        route: user_route_1.default,
    },
];
//TODO using swagger
// const devRoutes = [
//     {
//         path: '/docs',
//         route: authRoutes
//         //TODO set auth routes
//     }
// ]
// TODO !
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
// if (config.env === 'development') {
//     devRoutes.forEach((route) => {
//       router.use(route.path, route.route);
//     });
// }
exports.default = router;
