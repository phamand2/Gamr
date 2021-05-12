const express = require("express");
const { Game } = require("../models");
const router = express.Router();

//localhost:3000/games
router.get("/", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Please log back in" });
  }

  try {
    const games = await Game.findAll();
    res.render("games", {
      locals: {
        games,
        error: null,
      },
    });
  } catch (error) {
    res.json({ error: "No Games" });
  }
});


// Update the game difficulty in the database based on id
router.put("/game/:id", async (req, res) => {
  // Figure out a way to pass the user id in the params
  const { id } = req.params;
  // Get the new difficulty number from the input
  const { difficulty } = req.body;

  try {
    // Get the game by the id
    const game = await Game.findByPk(id)
    // Target the game column and assign it to the new value from the input
    game.difficulty = difficulty

    // save the database
    await game.save()

    // return a status and json message
    res.status(200).json({success: 'Game difficulty has been updated'})

  } catch (error) {
    res.status(404).json({error: error})
  }
});

module.exports = router;
