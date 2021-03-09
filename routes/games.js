const express = require("express");
const {Game} = require("../models");
const router = express.Router();

//localhost:3000/games
router.get("/", async(req, res) => {

  if(!req.session.user){
    return res.status(401).json({error: 'Please log back in'})
  }


  try {
    const games = await Game.findAll()
    res.render('games',{
      locals: {
        games,
        error: null
      }
    }) 
  } catch (error) {
    res.json({error: 'No Games'})
  }
});




module.exports = router;
