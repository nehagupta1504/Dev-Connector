const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middlewares/auth");

// @route GET api/auth
// @desc  Get auth user
// @access Protected
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, { password: 0 });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth
// @desc  Authenticate user & get token or Login
// @access Public
router.post(
  "/",
  [
    check("email", "Please Enter a valid email").isEmail(),
    check("password", "Please Enter Password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("Invalid Credentials");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Invalid Credentials");
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("SECRET_KEY"),
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.status(201).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
