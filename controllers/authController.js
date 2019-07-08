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
    scope: ["profile", "email"]
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect('/api/users/login')
});

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/api/users/profile");
});


export default router;
