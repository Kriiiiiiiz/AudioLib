const { default: mongoose } = require("mongoose");
const { User } = require("../database/schemas/user");

exports.getUser = (req, res) => {
    const { sub, email, picture, name } = req.oidc.users
}

exports.getAuth = async (req, res) => {

    if (!req.oidc.user){ //si no funciona esta linea puede ser el fallo.
        res.status(403).send();
        return;
    }

    const savedUser = await User.findOne({
        id: req.oidc.user.sub,
    })

    if (!savedUser) {

        const userScheme = {
            id: req.oidc.user.sub,
            username: req.oidc.user.name,
            email: req.oidc.user.email,
        }

        const user = new User(userScheme)

        await user.save();
        
    }

    res.send({username: req.oidc.user.name})

}

exports.modifyUser = (req, res) => {
    
}