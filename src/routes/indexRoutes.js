const express = require('express')
const Controller = require('../controllers/softControllers')
const router = express.Router()

router.get('/perfil', Controller.Profile)
router.post('/registrarse', Controller.register)
router.post('/login', Controller.loginUser)

module.exports = router