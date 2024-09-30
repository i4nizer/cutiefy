const express = require('express')
const app = express()
const songRoutes = require('./routes/song')
const playlistRoutes = require('./routes/playlist')
const playerRoutes = require('./routes/player')
const playlistController = require('./controllers/playlist.controller')



app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', playlistController.getAllPlaylistsAndSongs)
app.use('/songs', songRoutes)
app.use('/playlists', playlistRoutes)
app.use('/player', playerRoutes)



const PORT = 3000
app.listen(PORT, _ => console.log(`Server running on http://localhost:${PORT}`))