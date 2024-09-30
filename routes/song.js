const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const songController = require('../controllers/song.controller')
const bodyParser = require('body-parser')


router.use(bodyParser.urlencoded({extended: true}))
router.use(express.json())

router.route('/')
    .get(songController.getLatestSongs)
    .post(upload.fields([{name: 'song', maxCount: 1}, {name: 'thumbnail', maxCount: 1}]), songController.addSong)
    .patch(songController.updateSong)
    .delete(songController.deleteSong)

router.route('/favourites')
    .get(songController.getFavouriteSongs)
    .post(songController.addFavourite)
    .patch(songController.updateSong)
    .delete(songController.removeFavourite)

router.get('/search/:search', songController.searchSong)



module.exports = router