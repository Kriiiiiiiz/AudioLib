const mongoose = require('mongoose');

const User = mongoose.model('users',

    new mongoose.Schema({
        id: { type: String, unique: true, require: true},
        username: { type: String, required: true },
        email: { type: String, unique: true, required: true},
        picture: { type: String }
    })
)

exports.User = User;