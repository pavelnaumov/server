import express from "express";
import passport from "passport";

const router = express.Router();

/**
 * Google Redirect Callback
 */
const googleRedirectCallback = (req, res) => {
  res.redirect("/api/users/profile");
}


/**
 * Logging the user out
 * after OAuth session
 */

const oAuthLogout = (req, res) => {
  req.logout();
  res.redirect('/api/users/login')
}

export default {googleRedirectCallback, oAuthLogout};
