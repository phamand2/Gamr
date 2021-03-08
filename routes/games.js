const express = require("express");
const {Game} = require("../models");
const router = express.Router();

//localhost:3000/games
router.get("/", async(req, res) => {
  try {
    const games = await Game.findAll()
    res.json(games) 
  } catch (error) {
    res.json({error: 'No Games'})
  }
});




module.exports = router;
