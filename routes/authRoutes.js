import express from "express";
import passport from "passport";
import authController from "../controllers/authController";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google"),
  authController.googleRedirectCallback
);
router.get("/logout", authController.googleRedirectCallback);

export default router;
