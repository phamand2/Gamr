const express = require("express");
const {Game} = require("../models");
const router = express.Router();

//localhost:3000/games
router.get("/", async(req, res) => {
  
  if(!req.session.user){
    return res.status(401).json({errorMessage: 'Not Logged In'})
  }


  try {
    const games = await Game.findAll()
    res.json(games) 
  } catch (error) {
    res.json({error: 'No Games'})
  }
});




module.exports = router;
