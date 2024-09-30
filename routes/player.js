const express = require('express')
const playerController = require('../controllers/player.controller')
const router = express.Router()



router.get('/', playerController.getRandomSong)
router.get('/:songId', playerController.getSong)
router.get('/:playlistId/:songId', playerController.getSong)
router.get('/prev/:playlistId/:songId', playerController.getPrevSong)
router.get('/next/:playlistId/:songId', playerController.getNextSong)



module.exports = router