const { default: mongoose } = require("mongoose");
const { Playlist } = require("../database/schemas/playlist");
const {v4: uuidv4} = require("uuid");
const { Song } = require("../database/schemas/song");

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

    const uuid = uuidv4();
    const {title} = req.body;
    const user = req.oidc.user.sub;
    
    const playlist = new Playlist({
        id: uuid,
        title: title,
        owner: user,
        users: [],
        songs: [],
        favorite: false,
    })

    playlist.save();

    res.status(201).send(playlist);

}

exports.addSong =  async (req, res) => {

    const {playlist, song} = req.body;
    const user = req.oidc.user.sub;
    
    if(!playlist || !song){
        res.status(400).send({error: `Faltan datos.`})
        return;
    }

    const playlistSearch = await Playlist.findOne({id: playlist});
    const songSearch = await Song.findOne({id: song});

    if(!playlistSearch || !songSearch){
        res.status(404).send({error: `No se ha encontrado la playlist o la canción.`});
        return;
    }

    if(playlistSearch.owner != user){
        res.status(403).send({error: `No puedes modificar esto.`});
        return;
    }
    
    Playlist.updateOne(
        { id: playlist },
        { $push: {songs: song}}
    )

    res.send();

}

exports.deleteSong =  async (req, res) => {

    const {playlist, song} = req.body;
    const user = req.oidc.user.sub;
    
    if(!playlist || !song){
        res.status(400).send({error: `Faltan datos.`})
        return;
    }

    const playlistSearch = await Playlist.findOne({id: playlist});
    const songSearch = await Song.findOne({id: song});

    if(!playlistSearch || !songSearch){
        res.status(404).send({error: `No se ha encontrado la playlist o la canción.`});
        return;
    }

    if(playlistSearch.owner != user){
        res.status(403).send({error: `No puedes modificar esto.`});
        return;
    }
    
    Playlist.updateOne(
        {id: playlist},
        { $pull: {songs: song}}
    )

    res.send();

}

exports.delete =  async (req, res) => {

    const {playlist} = req.body;
    const user = req.oidc.user.sub;
    
    if(!playlist){
        res.status(400).send({error: `Faltan datos.`})
        return;
    }

    const playlistSearch = await Playlist.findOne({id: playlist});

    if(!playlistSearch){
        res.status(404).send({error: `No se ha encontrado la playlist o la canción.`});
        return;
    }

    if(playlistSearch.owner != user){
        res.status(403).send({error: `No puedes modificar esto.`});
        return;
    }
    
    Playlist.deleteOne({id: playlist});

    res.send();

}

exports.share =  async (req, res) => {

    const {playlist, sharedUser} = req.body;
    const user = req.oidc.user.sub;
    
    if(!playlist || !song){
        res.status(400).send({error: `Faltan datos.`})
        return;
    }

    const playlistSearch = await Playlist.findOne({id: playlist});

    if(!playlistSearch){
        res.status(404).send({error: `No se ha encontrado la playlist.`});
        return;
    }

    if(playlistSearch.owner != user){
        res.status(403).send({error: `No puedes modificar esto.`});
        return;
    }

    if(!playlistSearch.users.includes(sharedUser)){
        res.status(404).send({error: `No se ha encontrado el usuario.`});
        return;
    }
    
    Playlist.updateOne(
        {id: playlist},
        { $push: {songs: song}}
    )

    res.send();

}

exports.unShare =  async (req, res) => {

    const {playlist, sharedUser} = req.body;
    const user = req.oidc.user.sub;
    
    if(!playlist || !users){
        res.status(400).send({error: `Faltan datos.`})
        return;
    }

    const playlistSearch = await Playlist.findOne({id: playlist});

    if(!playlistSearch || !playlistSearch.users.includes(sharedUser)){
        res.status(404).send({error: `No se ha encontrado la playlist o el usuario.`});
        return;
    }

    if(playlistSearch.owner != user){
        res.status(403).send({error: `No puedes modificar esto.`});
        return;
    }
    
    Playlist.updateOne(
        {id: playlist},
        { $pull: {users: users}}
    )

    res.send();

}