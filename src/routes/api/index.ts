import express from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";

import { ROUTE_TYPES } from "../../types";
// import {config} from '../../config'

const router = express.Router();

const defaultRoutes: ROUTE_TYPES.defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
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

export default router;
