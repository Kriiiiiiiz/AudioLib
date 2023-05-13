const mongoose = require('mongoose');

const Playlist = mongoose.model('playlists',

    new mongoose.Schema({
        id: { type: String, unique: true, require: true},
        owner: {type:String, require: true},
        users: {type: Array, require: true},
        title: { type: String, required: true},
        songs: { type: Array, required: true },
        favorite: { type: Boolean }
    })
)

exports.Playlist = Playlist;