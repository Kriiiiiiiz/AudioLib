const mongoose = require('mongoose');

const Song = mongoose.model('songs',

    new mongoose.Schema({
        id: { type: String, unique: true, require: true},
        title: { type: String, required: true},
        icon: { type: String, required: true },
        views: {type: Number, require: true}
    })
)

exports.Song = Song;