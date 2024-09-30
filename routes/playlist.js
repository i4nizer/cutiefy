const express = require('express')
const router = express.Router()
const playlistController = require('../controllers/playlist.controller')
const bodyParser = require('body-parser')



router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.json())

router.route('/')
    .get(playlistController.getAll)
    .post(playlistController.createPlaylist)
    .patch(playlistController.patchPlaylist)
    .delete(playlistController.deletePlaylist)

router.route('/:playlistId')
    .get(playlistController.getPlaylistSongs)
    .post(playlistController.addPlaylistSong)



module.exports = router