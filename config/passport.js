import passportLocal from "passport-local";
import passportGoogle from "passport-google-oauth20";
import models from "../models";
import bCrypt from "bcrypt-nodejs";
import secret from "./secret";

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

module.exports = passport => {
  // Local Strategy

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        // Match User
        models.User.findOne({ where: { email } })
          .then(user => {
            console.log(`hit the Local Strategy, ${user.id}`);
            if (!user) {
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

  // Google Strategy

  passport.use(
    new GoogleStrategy(
      {
        callbackURL: "/api/auth/google/redirect",
        clientID: secret.googleAuth.clientID,
        clientSecret: secret.googleAuth.clientSecret
      },
      (accessToken, refreshToken, profile, done) => {
        models.User.findOne({ where: { googleID: profile.id } }).then(user => {
          if (user) {
            console.log(`USER EXISTS. It is : ${user}`);
            done(null, user);
          } else {
            const { givenName, familyName } = profile.name;
            models.User.create({
              firstName: givenName,
              lastName: familyName,
              googleID: profile.id
            })
              .then(user => {
                console.log(user);
                done(null, user);
              })
              .catch(err => console.log(err));
            done(null, user);
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findOne({ where: { id } })
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  });
};
