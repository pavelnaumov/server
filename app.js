import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import { home, createPost } from "./routes/posts";
import posts from './controllers/postController';

import models from "./models";

const app = express();

// Cookie Parser
app.use(cookieParser());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/posts", posts);


// Middleware for errors
// app.use((req, res) => {
//   res.status(404).json({
//     errors: {
//       global:
//         "Still working on it. Please try again later when we implement it."
//     }
//   });
// });

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
