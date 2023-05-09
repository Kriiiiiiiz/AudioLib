const mongoose = require('mongoose');

const Playlist = mongoose.model('playlists',

    new mongoose.Schema({
        id: { type: String, unique: true, require: true},
        user: {type:String, require: true},
        title: { type: String, required: true},
        songs: { type: Array, required: true },
        favorite: { type: Boolean }
    })
)

exports.Playlist = Playlist;