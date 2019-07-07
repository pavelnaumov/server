import passportLocal from "passport-local";
import models from "../models";
import bCrypt from "bcrypt-nodejs";

const LocalStrategy = passportLocal.Strategy;

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        // Match User
        models.User.findOne({ where: { email } })

          .then(user => {
            console.log(`hit the Local Strategy, ${user.id}`);
            if (!user) {
              console.log("email not registered");
              return done(null, false, {
                message: "That email is not registered"
              });
            }

            bCrypt.compare(password, user.password, (err, isMatch) => {
              if (isMatch) {
                console.log("good password");
                return done(null, user);
              } else {
                console.log("bad password");

                return done(null, false, { message: "Incorrect password" });
              }
            });
          })
          .catch(err => {
            console.log(`Error: ${err}`);
            return done(null, false, { message: `Something went wrong` });
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log(`hit the serializing, ${user.id}`);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findOne({ where: { id } })
      .then(user => {
        console.log("deserializing user:", user);
        done(null, user);
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  });
};
