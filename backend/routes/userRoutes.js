const userControllers = require("../controllers/userControllers");
const setRateLimit = require("express-rate-limit");
const express = require("express");
const app = express();
const router = express.Router();

const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "You have exceeded your 5 requests per minute limit.",
  headers: true,
});

app.use(rateLimitMiddleware);

app.get("/api/blog/post", rateLimitMiddleware, (req, res) => {
  console.log("test");
  res.send({
    success: true,
    author: "Mike Abdul",
    title: "Creating NodeJs Rate Limiter",
    post: "...",
  });
});

router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createNewUser);

app.listen(3000, () => {
  console.log("Server is running  http://localhost:3000/");
});

module.exports = router;
