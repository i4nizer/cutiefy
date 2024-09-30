const songModel = require('../models/song.model')
const fs = require('fs')
const path = require('path')


const songController = {

    addSong: (req, res) => {
        if (!req.isFileSaved) return res.status(403).send('File not saved, format unrecognized.')
        
        // save song details
        const songName = req.files['song'][0].originalname
        const thumbnailName = req.files['thumbnail'][0].originalname
        const values = [songName, `/songs/${songName}`, `/thumbnails/${thumbnailName}`]

        // go to some route and make a message then back to uploads
        return songModel.insert(values, (err, result) => res.redirect('/songs'))
    },

    addFavourite: (req, res) => {
        if (!req.body?.songId) return res.status(404).send('No song id provided')
        
        return songModel.insertFavourite([req.body.songId], (err, results) => {
            if (err) return res.status(500).send(err)
            
            return res.redirect('/songs/favourites')
        })
    },

    searchSong: (req, res) => {
        const param = req.params.search
        return songModel.searchSongByTitle(param, (err, results) => {
            if (err) return res.status(500).json({ error: err })
            
            return res.json(results)
        })
    },

    getAllSongs: (req, res) => {
        return songModel.selectAll((err, results) => {
            if (err) return res.status(500).send(results)
            return res.render('index', { songs: results })
        })
    },

    getLatestSongs: (req, res) => {
        // retrieve latest uploads only
        return songModel.selectLatestUploads((err, results) => {
            if (err) return res.status(500).send(results)
            
            // send data to uploads view
            return res.render('uploads', { songs: results })
        })
    },

    getFavouriteSongs: (req, res) => {
        return songModel.selectFavouriteSongs((err, results) => {
            if (err) return res.status(500).send(err)
            
            return res.render('favourites', { songs: results })
        })
    },

    updateSong: (req, res) => {
        // get song title from db using songId
        return songModel.selectSongById(req.body.id, (err, results) => {
            if (err) return res.status(500).send(err)
            else if (results.length == 0) return res.status(404).send('Song not found')
                    
            // define & default changes
            const song = results[0]
            const values = [
                req.body.title == undefined ? song.title : req.body.title,
                req.body.url == undefined ? song.url : req.body.url,
                req.body.thumbnailUrl == undefined ? song.thumbnail_url : req.body.thumbnailUrl
            ]

            // rename file
            const oldFilename = './public/songs/' + song.title
            const newFilename = './public/songs/' + path.basename(values[0], path.extname(values[0])) + path.extname(song.title)
            
            let isRenamed = true
            fs.rename(oldFilename, newFilename, (err) => {
                if (err) console.log(err)
                isRenamed = !(Boolean)(err)
            })
            if (!isRenamed) return res.status(500).send('Failed to rename file.')
            
            // change url too based on title
            values[1] = `/songs/${newFilename}`
            
            // update db then respond
            return songModel.updateSongById(song.id, values, (err, results) => {
                if (err) return res.status(500).send(err)
                return res.send(results)
            })
        })
    },


    deleteSong: (req, res) => {
        return songModel.deleteSongById(req.body.id, (err, results) => {
            if (err) return res.status(500).send(err)
            
            return res.send(results)
        })
    },

    removeFavourite: (req, res) => {
        return songModel.deleteFavourite(req.body.id, (err, results) => {
            if (err) return res.status(500).send(err)
            
            return res.send(results)
        })
    }

}



module.exports = songController