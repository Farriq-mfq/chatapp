const express = require("express");
const router = express.Router();
const User = require("../models/AuthModel");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await User.findOne({
        email: req.body.email,
      })
        .then(async (result) => {
          const enc = await bcrypt.compare(req.body.password, result.password);
          if (enc) {
            const token = jwt.sign(
              {
                _id: result._id,
                name: result.name,
                status: result.status,
              },
              process.env.JWT_KEY
            );
            return res
              .status(200)
              .header("Authorization", `bearer ${token}`)
              .json({
                message: "ok",
                token: token,
              });
          }
          return res.status(401).json({
            message: "login gagal",
          });
        })
        .catch(() => {
          res.status(401).json({
            message: "login gagal",
          });
        });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);
router.post(
  "/register",
  body("name").isLength({ min: 6 }),
  body("email")
    .isLength({ min: 6 })
    .isEmail()
    .custom((value) => {
      return User.find({ email: value }).then((user) => {
        if (user.length) {
          return Promise.reject("Email sudah terdaftar");
        }
      });
    }),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newUSer = await new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    try {
      newUSer
        .save()
        .then(() => {
          res.status(200).json({
            message: "ok",
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "fail",
            error: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        message: "fail",
        error: err,
      });
    }
  }
);

module.exports = router;
