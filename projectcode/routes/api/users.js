const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route POST api/users
// @desc  Register user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "
    )
      .isLength({ min: 8 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const { name, email, password } = req.body;
    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });
      // Encrypt Password
      const saltRounds = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, saltRounds);
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id, //can use id inplace of _id if using mongoose
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
