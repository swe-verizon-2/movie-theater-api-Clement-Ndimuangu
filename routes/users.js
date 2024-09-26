const express = require('express')
const router = express.Router()
const { User, Show} = require('../models/index')

router.get("/", async(req,res)=>{
    const users = await User.findAll({ include: { all: true, nested: true } })
    res.json(users)
})

router.get("/:id", async(req,res)=>{
    const id = req.params.id
    const user = await User.findByPk(id, { include: { all: true, nested: true } })
    res.json(user)
})

router.get("/shows/:id", async(req, res)=>{
    const id = req.params.id
    const user = await User.findByPk(id)
    const shows = await user.getShows()
    res.json(shows)
})

router.put("/shows/:id", async(req, res)=>{
    const body = req.body;
    const id = req.params.id;
    const user = await User.findByPk(id)
    await user.addShows(body)
    res.json(body)
})



module.exports = router;