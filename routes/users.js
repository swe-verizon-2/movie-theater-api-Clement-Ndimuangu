const express = require('express')
const router = express.Router()
const { User, Show} = require('../models/index')
const {check, validationResult, body} = require('express-validator')

router.get("/", async(req,res)=>{
    const users = await User.findAll({ include: { all: true, nested: true } })
    res.json(users)
})

router.get("/:id", async(req,res)=>{
    const id = req.params.id
    const user = await User.findByPk(id, { include: { all: true, nested: true } })
    res.json(user)
})

router.get("/:id/shows", async(req, res)=>{
    const id = req.params.id
    const user = await User.findByPk(id)
    const shows = await user.getShows()
    res.json(shows)
})

router.put("/:userId/shows/:showId",async(req, res)=>{
    const userId = req.params.userId;
    const showId = req.params.showId;
    const user = await User.findByPk(userId)
    const show = await Show.findByPk(showId)
    await user.addShows(show)
    res.json(show)  
})

router.post('/', [check('username').isEmail()],async(req, res)=>{
    const errors = validationResult(req)
    const body = req.body
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const newUser = await User.create(body)
        res.json(newUser)
    }
})



module.exports = router;