"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const router = (0, express_1.Router)();
router.route("/").get(controllers_1.userController.getUsers).post(controllers_1.userController.createUser);
router
    .route("/:userId")
    .get(controllers_1.userController.getUser)
    .patch(controllers_1.userController.updateUser)
    .delete(controllers_1.userController.deleteUser);
exports.default = router;
