const express = require('express')
const router = express.Router()
const {Show} = require('../models/index')
const {check, validationResult} = require('express-validator')

router.get('/', async(req,res)=>{
    const genre = req.query.genre;
    if(genre){
        const shows = await Show.findAll({where: {genre}, include: { all: true, nested: true }})
    res.json(shows)
    }else{
        const shows = await Show.findAll({ include: { all: true, nested: true } })
        res.json(shows)
    }
})

router.get('/:id', async(req, res)=>{
    const id = req.params.id
    const show = await Show.findByPk(id, { include: { all: true, nested: true } })
    res.json(show)
})

router.get('/:id/users', async(req, res)=>{
    const id = req.params.id
    const show = await Show.findByPk(id)
    const usersWatchShow = await show.getUsers()
    res.json(usersWatchShow)
})

router.put('/:id/available', [check('title').isLength({max:20})], async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const body = req.body
        const id = req.params.id
        const showToUpdate = await Show.findByPk(id)
        const updatedShow = await showToUpdate.update(body)
        res.json(updatedShow)
    }
})

router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    const showToDelete = await findByPk(id)
    const deletedShow = await showToDelete.destroy()
    res.json(deletedShow)
})


module.exports = router;