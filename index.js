const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const otpRouter = require("./routes/user.js");
const userRoute = require('./routes/user.js');
const { checkForAuthCookie } = require('./middleware/auth.js');

const PORT = 3000;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/My-PBL-WebApp")
  .then(() => console.log("mongodb connected"))
  .catch(err => console.error("Error connecting to mongodb", err));

// Set the view engine to ejs
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.resolve("./views"));

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());

// Custom authentication middleware
app.use(checkForAuthCookie('token'));

// Middleware to serve static files
app.use(express.static(path.resolve("./public")));

// CORS middleware
app.use(cors());

// Body parsing middleware
const jsonparser = bodyParser.json();
app.use(jsonparser);

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/api", otpRouter);
app.use("/user", userRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
