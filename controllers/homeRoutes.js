const router = require('express').Router();
const { Client, Coach, Exercise } = require('../models');

// HOME PATH



router.get('/', (req, res) => {
    res.send('welcome this is the home page.')
})


// GET PUBLIC PATH

router.get('/public', (req, res) => {
    res.send('welcome to the public path you do not have to be logged in for this path')
})


// GET PROTECTED PATH


router.get('/protected', (req, res) => {
    res.send('This WILL be the protected path BUT NOT YET')
})


module.exports = router
