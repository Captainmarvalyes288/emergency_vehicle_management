const { sendOtp, verifyOtp } = require("../controller/twilio");
const User = require("../models/user");
const router = require("express").Router();

// Define send-otp and verify-otp routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Other routes
router.get("/send-otp", (req, res) => {
  return res.render("twilio-signup");
});

router.get("/verify-otp", (req, res) => {
  return res.render("twilio-verify");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.get('/data', function(req, res) {
  // Fetch or create your data here
  let hospitals = [
    {
      id: 1,
      name: "Healthcare Hospital",
      address: "123 Health St, Wellness City, 45678",
      phone: "(123) 456-7890",
    },
    {
      id: 2,
      name: "Wellness Hospital",
      address: "456 Care Ave, Health City, 12345",
      phone: "(098) 765-4321",
    },
  ];

  let ambulances = [
    {
      id: 1,
      service_name: "Fast Response Ambulance",
      phone: "(111) 222-3333",
    },
    {
      id: 2,
      service_name: "Emergency Care Ambulance",
      phone: "(444) 555-6666",
    },
  ];

  let drug_companies = [
    {
      id: 1,
      name: "Healing Pharmaceuticals",
      address: "789 Medicine Blvd, Pharma Town, 65432",
      phone: "(777) 888-9999",
    },
    {
      id: 2,
      name: "Wellness Drugs Inc.",
      address: "321 Cure Ln, Remedy City, 98765",
      phone: "(000) 111-2222",
    },
  ];

  res.render('data', { hospitals: hospitals, ambulances: ambulances, drug_companies: drug_companies });
});


router.get("/map", (req, res) => {
  return res.render("map");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordandGenToken(email, password);
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      console.log("User found:", user.role); // Log the user object
      res.locals.user = user;
      if (user.role === "User-side") {
        return res.cookie("token", token).redirect("data");
      } else {
        return res.cookie("token", token).redirect("map");
      }
    }
  } catch (error) {
    console.log("Error:", error); // Log the error message
    return res.render("login", {
      error: "Invalid email or password",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { Fullname, email, password, phone, role } = req.body;
  try {
    const user = await User.create({ Fullname, email, password, phone, role });
    res.locals.user = user;
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
