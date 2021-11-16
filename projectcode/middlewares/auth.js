const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("SECRET_KEY"));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "token not valid" });
  }
};
