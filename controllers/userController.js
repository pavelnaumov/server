import express from "express";
import models from "../models";
import bCrypt from "bcrypt-nodejs";
import passport from "passport";

const router = express.Router();

// Login

router.get("/bad", (req, res) => {
  res.json({ message: "FUCKING" });
});

// Register Page

router.get("/works", (req, res) => {
  res.json({ message: "WORKS" });
});

// Register Logic
router.post("/register", (req, res) => {
  let { email, password, passwordConfirm } = req.body;
  let errors = [];

  //    required fields
  if (!email || !password || !passwordConfirm) {
    errors.push({ message: "Please fill in all the fields" });
    res.json({ message: "Please fill in all the fields" });
  }

  // passwords should be matching
  else if (password !== passwordConfirm) {
    errors.push({ message: "The passwords should match" });
    res.json({ message: "The passwords should match" });
  }

  // password of 6 char min
  else if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
    res.json({ message: "Password should be at least 6 characters" });
  } else {
    models.User.findOne({ where: { email } }).then(user => {
      if (user) {
        res.status(400).send({ message: "The user already exists" });
      } else {
        bCrypt.genSalt(10, (err, salt) => {
          bCrypt.hash(password, salt, null, (err, hash) => {
            password = hash;
            models.User.create({ email, password }).then(user => {
              res
                .json({ success: true, user })
                .catch(err => res.json({ err: res.body }));
            });
          });
        });
      }
    });
  }
});

router.get("/usersIndex", (req, res) => {
  models.User.findAll().then(users => {
    res.send({ users });
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/api/users/works",
    failureRedirect: "/api/users/bad"
  })(req, res, next);
  console.log("I am being executed");
});

// Logout

router.get("/logout", (req, res) => {
  req.logout();
  res.send({ message: "Successfully logged out" });
  res.redirect("/works");
});

export default router;
