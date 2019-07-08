import express from "express";
import models from "../models";
import bCrypt from "bcrypt-nodejs";
import passport from "passport";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth works");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get("/logout", (req, res) => {
  res.send("logout with Google");
});

router.get("/google/redirect", passport.authenticate('google'), (req, res) => {
  res.send({ message: "Successfully Logged In with Google" });
});

export default router;
