import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.post("/register", userController.registerUser);
router.get("/login", userController.login);
router.post("/login", userController.userLogin);
router.get("/usersIndex", userController.userIndex);
router.get("/profile", userController.authCheck, userController.profile);
router.get("/logout", userController.userLogout);

export default router;
