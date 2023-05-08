const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect(process.env.DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    
    .then(() => console.log('Conexión a base de datos establecida !'))
    .catch(err => console.log(err));

};