const { sendOtp, verifyOtp } = require("../controller/twilio");
const User = require("../models/user");
const router = require("express").Router();

// Define send-otp and verify-otp routes
router.post("/api/send-otp", sendOtp);
router.post("/api/verify-otp", verifyOtp);

// Other routes
router.get("/send-otp", (req, res) => {
  return res.render("twilio-signup");
});

router.get("/verify-otp", (req, res) => {
  return res.render("twilio-verify");
});

router.get("/login", (req, res) => {
  return res.render("login")
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordandGenToken(email, password);
    const user = await User.findOne({ email });
    if (user) {
      res.locals.user = user;
    }
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }
});
router.post("/signup", async (req, res) => {
  const { Fullname, email, password, phone } = req.body;
  try {
    const user = await User.create({ Fullname, email, password, phone });
    res.locals.user = user;
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
