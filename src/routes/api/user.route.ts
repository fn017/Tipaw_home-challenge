import { Router } from "express";
import { auth, validate } from "../../middleware";
import { userController } from "../../controllers";
import { userValidation } from "../../validations";
const router = Router();

router.route("/").get(userController.getUsers).post(userController.createUser);

router
  .route("/:userId")
  .get(auth(), validate(userValidation.getUser), userController.getUser)
  .patch(auth(), validate(userValidation.updateUser), userController.updateUser)
  .delete(
    auth(),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

export default router;
