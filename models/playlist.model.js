const database = require('../config/database')

const playlistModel = {

    insert: (values, callback) => {
        const query = 'insert into playlists(title) values(?)'
        return database.query(query, values, callback)
    },

    insertPlaylistSong: (values, callback) => {
        const query = 'insert into playlist_songs(playlist_id, song_id) values(?, ?)'
        return database.query(query, values, callback)
    },

    selectAll: (callback) => {
        const query = 'select * from playlists limit 100'
        return database.query(query, callback)
    },

    selectPlaylistById: (id, callback) => {
        const query = 'select * from playlists where id = ?'
        return database.query(query, [id], callback)
    },

    selectPlaylistSongs: (id, callback) => {
        const query = `
            select songs.*, playlists.title as playlist_title from playlist_songs
            inner join playlists on playlists.id = playlist_songs.playlist_id
            inner join songs on songs.id = playlist_songs.song_id
            where playlist_songs.playlist_id = ?    
        `
        return database.query(query, [id], callback)
    },

    updatePlaylistTitle: (id, title, callback) => {
        const query = `update playlists set title = ? where id = ?`
        return database.query(query, [title, id], callback)
    },

    deletePlaylist: (id, callback) => {
        const query = `delete from playlists where id = ?`
        return database.query(query, [id], callback)
    }

}



module.exports = playlistModel