const { User } = require("../database/schemas/user");

exports.getUser = (req, res) => {
    const { sub, email, picture, name } = req.oidc.users
}

User.schema