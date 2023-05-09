const { Playlist } = require("../database/schemas/playlist");

exports.getAll = async (req, res) => {

    const user = req.oidc.user.sub;
    const playlists = await Playlist.find({user: user});

    res.send(playlists);

}

exports.getInfo =  async (req, res) => {

    const user = req.oidc.user.sub;
    const id = req.id;
    const playlist = await Playlist.find({user: user, id: id});

    res.send(playlist);

}

exports.create =  async (req, res) => {

}

exports.addSong =  async (req, res) => {

}

exports.deleteSong =  async (req, res) => {

}

exports.delete =  async (req, res) => {

}

exports.share =  async (req, res) => {

}