require('dotenv').config()

const { auth, requiresAuth } = require('express-openid-connect');
const routerUser = require("./src/router/user");
const routerPlaylist = require("./src/router/playlist");
const routerSong = require("./src/router/song");
const express = require('express')
const path = require('path');
const app = express()
const port = 3000

const db = require('./src/database/db.js');

db.connect();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router

app.use("/api/user", routerUser);
app.use("/api/playlist", routerPlaylist);
app.use("/api/song", routerSong);

app.use(express.static(path.join(__dirname, "../frontend/build/")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})