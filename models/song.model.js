const database = require('../config/database')



const songModel = {

    /// INSERT
    
    insert: (values, callback) => {
        const query = 'insert into songs(title, url, thumbnail_url) values(?, ?, ?)'        
        return database.query(query, values, callback)
    },

    insertFavourite: (values, callback) => {
        const query = 'insert into favourites(song_id) values(?)'
        return database.query(query, values, callback)
    },


    /// SELECT

    selectAll: (callback) => {
        const query = 'select * from songs limit 100'
        return database.query(query, callback)
    },

    selectLatestUploads: (callback) => {
        const query = 'select * from songs order by updated_at desc limit 20'
        return database.query(query, callback)
    },

    selectSongById: (id, callback) => {
        const query = 'select * from songs where id = ?'
        return database.query(query, [id], callback)
    },

    selectRandom: (callback) => {
        const query = 'select * from songs order by rand() limit 1'
        return database.query(query, callback)
    },

    searchSongByTitle: (param, callback) => {
        const query = `select * from songs where title like ? limit 10`
        return database.query(query, [`${param}%`], callback)
    },

    selectFavouriteSongs: (callback) => {
        const query = `select songs.* from songs inner join favourites on favourites.song_id = songs.id`
        return database.query(query, callback)
    },

    selectPrevSong: (playlistId, songId, callback) => {
        const query = `select songs.* from songs
                        inner join playlist_songs on songs.id = playlist_songs.song_id
                        where playlist_songs.playlist_id = ? and songs.id < ? limit 1`
        return database.query(query, [playlistId, songId], callback)
    },
    
    selectNextSong: (playlistId, songId, callback) => {
        const query = `select songs.* from songs
                        inner join playlist_songs on songs.id = playlist_songs.song_id
                        where playlist_songs.playlist_id = ? and songs.id > ? limit 1`
        return database.query(query, [playlistId, songId], callback)
    },


    /// UPDATE
    
    updateSongById: (id, values, callback) => {
        const query = 'update songs set title = ?, url = ?, thumbnail_url = ? where id = ?'
        return database.query(query, [...values, id], callback)
    },
    
    
    // DELETE

    deleteSongById: (id, callback) => {
        const query = 'delete from songs where id = ?'
        return database.query(query, [id], callback)
    },

    deleteFavourite: (id, callback) => {
        const query = 'delete from favourites where id = ?'
        return database.query(query, [id], callback)
    }


}



module.exports = songModel