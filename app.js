import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";

import posts from "./controllers/postController";
import users from "./controllers/userController";
import auth from "./controllers/authController";
import secret from "./config/secret";
import models from "./models";

const app = express();

// Passport Config

require("./config/passport")(passport);

// Cookie Parser
app.use(cookieParser());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express Session
app.use(
  session({ secret: secret.jwtSecret, resave: true, saveUninitialized: true })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Sync database with Models
models.sequelize
  .sync()
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      console.log("Database connected!");
    }
  })
  .catch(err => {
    console.error(err, "Something went wrong, database is not connected!");
  });

if (process.env.NODE_ENV == "test")
  app.listen(5000, () => console.log(`Tests listening to 5000.`));
else app.listen(3000, () => console.log(`Node.JS listening to 3000.`));

module.exports = app;
