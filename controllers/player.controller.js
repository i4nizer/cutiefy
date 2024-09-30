const colorThief = require('colorthief')
const songModel = require('../models/song.model')



const player = {

    getRandomSong: (req, res) => {
        songModel.selectRandom(async (err, results) => {
            if (err || results == []) return res.redirect('/player')

            await colorThief.getPalette('./public/' + results[0].thumbnail_url, 2)
                .then(palette => res.render('player', { prevLink: `/player`, nextLink: `/player`, song: results[0], palette: palette }))
                .catch(err => res.render('player', { prevLink: `/player`, nextLink: `/player`, song: results[0], palette: [[20, 117, 137], [20, 117, 137]] }))
        })
    },

    getSong: (req, res) => {
        const songId = req.params.songId
        let playlistId = req.params.playlistId 
        
        const hasPlaylistId = playlistId != undefined && playlistId != null
        let prevLink = `/player` + (hasPlaylistId ? `/prev/${playlistId}/${songId}` : ``)
        let nextLink = `/player` + (hasPlaylistId ? `/next/${playlistId}/${songId}` : ``)

        songModel.selectSongById(songId, async (err, results) => {
            if (err || results == []) return res.redirect('/player')

            await colorThief.getPalette('./public/' + results[0].thumbnail_url, 2)
                .then(palette => res.render('player', { prevLink: prevLink, nextLink: nextLink, song: results[0], palette: palette }))
                .catch(err => res.render('player', { prevLink: prevLink, nextLink: nextLink, song: results[0], palette: [[20, 117, 137], [20, 117, 137]] }))
        })
    },

    getPrevSong: (req, res) => {
        const playlistId = req.params.playlistId
        const songId = req.params.songId

        songModel.selectPrevSong(playlistId, songId, (err, results) => {
            if (err) return res.redirect('/player')

            const id = results[0]?.id ?? songId
            res.redirect(`/player/${playlistId}/${id}`)
        })
    },
    
    getNextSong: (req, res) => {
        const playlistId = req.params.playlistId
        const songId = req.params.songId

        songModel.selectNextSong(playlistId, songId, (err, results) => {
            if (err) return res.redirect('/player')

            const id = results[0]?.id ?? songId
            res.redirect(`/player/${playlistId}/${id}`)
        })
    },

}



module.exports = player