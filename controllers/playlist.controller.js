const playlistModel = require('../models/playlist.model')
const songModel = require('../models/song.model')

const playlistController = {

    createPlaylist: (req, res) => {
        return playlistModel.insert([req.body.title], (err, results) => {
            if (err) return res.status(500).send(err)
            
            return res.redirect('/playlists')
        })
    },

    addPlaylistSong: (req, res) => {
        const playlistId = req.params.playlistId
        const songId = req.body.songId

        return playlistModel.insertPlaylistSong([playlistId, songId], (err, results) => {
            if (err) return res.status(500).send(err)
            
            return res.redirect(`/playlists/${playlistId}`)
        })
    },

    getPlaylistSongs: (req, res) => {
        const id = req.params.playlistId

        return playlistModel.selectPlaylistById(id, (err, playlist) => {
            if (err) return res.status(500).send(err)
            
            return playlistModel.selectPlaylistSongs(id, (err, songs) => {
                if (err) return res.status(500).send(err)
                
                return res.render('playlist', { playlist: playlist[0], songs: songs })
            })
        })
    },

    // i hate nesting
    getAllPlaylistsAndSongs: (req, res) => {
        return playlistModel.selectAll((err, playlists) => {
            if (err) return res.status(500).send(err)
            
            return songModel.selectAll((err, songs) => {
                if (err) return res.status(500).send(err)
                
                return res.render('index', { playlists: playlists, songs: songs });
            })
        })
    },

    getAll: (req, res) => {
        return playlistModel.selectAll((err, playlists) => {
            if (err) return res.status(500).send(err)
            
            return res.render('playlists', { playlists: playlists });
        })
    },

    patchPlaylist: (req, res) => {
        const id = req.body.id
        const title = req.body.title

        return playlistModel.updatePlaylistTitle(id, title, (err, results) => {
            if (err) return res.status(500).send(err)
            
            return res.send(results)
        })
    },

    deletePlaylist: (req, res) => {
        return playlistModel.deletePlaylist(req.body.id, (err, results) => {
            if (err) return res.status(500).send(err)
            
            return res.send(results)
        })
    },

}



module.exports = playlistController