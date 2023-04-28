require('dotenv').config()

const { auth, requiresAuth } = require('express-openid-connect');
const routerApi = require("./src/router/routes");
const express = require('express')
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
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.use("/api", routerApi);

app.get('/profile', requiresAuth(), (req, res) => {
  console.log(JSON.stringify(req.oidc.user.sub));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})