import models from "../models";
import bCrypt from "bcrypt-nodejs";
import passport from "passport";


/**
 * Registering users
 */
const registerUser = (req, res) => {
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
            models.User.create({ email, password })
              .then(user => {
                res.json({ success: true, user });
              })
              .catch(() => res.json({ err: res.body }));
          });
        });
      }
    });
  }
};

/**
 * Checking whether the user has already logged in
 */

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/api/users/login");
  } else {
    next();
  }
};

/**
 * Profile page
 */

const profile = (req, res) => {
  res.json({ user: req.user });
}

/**
 * Guardian page
 */

const login = (req, res) => {
  res.send({ message: "Need to login" });
};

/**
 * Getting all the users -- testing purposes
 */

const userIndex = (req, res) => {
  models.User.findAll().then(users => {
    res.send({ users });
  });
}

/**
 * Logging user with Passport
 */

const userLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/api/users/profile",
    failureRedirect: "/api/users/login"
  })(req, res, next);

}

/**
 * Logging the user out
 */

const userLogout = (req, res) => {
  req.logout();
  res.send({ message: "Successfully logged out" });
  res.redirect("/works");
}


export default { registerUser, authCheck, profile, userIndex, userLogin, login, userLogout };
