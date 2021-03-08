var express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", async function (req, res) {
  const users = await User.findAll();
  res.json(users);
});

//localhost:3000/users
router.post("/", async (req, res) => {
  const { name, email, gamerTag } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      gamerTag,
    });

    res.json(user);
  } catch (error) {
    res.status(404);
    res.json({ errorMessage: "Email or GamerTag already in use" });
  }
});

//localhost:3000/users/register
router.post("/register", async (req, res) => {
  const { name, email, gamerTag, password } = req.body;

  const user = await User.findAll({
    where: {
      email,
    },
  });

  if (user.length) {
    res.json({ errorMessage: "Email already exist" });
    return;
  }

  if (name || email || gamerTag || password) {
    bcrypt.hash(password, 10, async (err, hash) => {
      try {
        const user = await User.create({
          name,
          email,
          gamerTag,
          password: hash,
        });

        res.json(user);
      } catch (error) {
        res.status(404);
        res.json({ errorMessage: "Please enter all fields" });
      }
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ messageError: "Please include all required fields" });
  }

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({ messageError: "Could not find user with that email" });
  }

  const match = await bcrypt.compare(password, user.password)
  
  if(!match){
    res.json({errorMessage: 'Incorrect Password'})
  }

  res.json({success: 'Logged In'})

});

module.exports = router;
