require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
const fetch = require("node-fetch");
const express = require("express");
const app = express();
const cors = require('cors');
const setRateLimit = require("express-rate-limit");
const http = require("http");
const url = require("url");


const rateLimitMiddleware = setRateLimit({
    windowMs: 60 * 1000,
    max: 1000000,
    message: "You have exceeded your 5 requests per minute limit.",
    headers: true,
});
app.use(cors());
// Middleware
app.use(express.json()); // parse json bodies in the request object
app.use(rateLimitMiddleware);

// Redirect requests to endpoint starting with /posts to postRoutes.js
// app.use("/posts", require("./routes/postRoutes"));
app.use("/users", require("./routes/userRoutes"));
let settings = { method: "Get" };
app.use("/post", async (req, res) => {
    let data;
    console.log("test");
    await fetch("https://jsonplaceholder.typicode.com/posts", settings)
        .then(res => res.json())
        .then((json) => {
            data = json;
        });

    res.status(200).json({
        data,
    });
})
// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something went rely wrong",
    });
});

// Listen on pc port
const PORT = 3002;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
