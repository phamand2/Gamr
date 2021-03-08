var express = require('express');
const router = express.Router();
const {User} = require('../models')

/* GET users listing. */
router.get('/', async function(req, res) {
  const users = await User.findAll()
  res.json(users)
});



//localhost:3000/users
router.post('/', async (req,res)=> {

  const{name, email, gamerTag} = req.body

  try {
    const user = await User.create({
      name,
      email,
      gamerTag
    })

    res.json(user)
    
  } catch (error) {
    res.status(404)
    res.json({errorMessage: 'Email or GamerTag already in use'})
  }
    
})

module.exports = router;
