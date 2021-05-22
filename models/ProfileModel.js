const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    avatar:{
        data: Buffer,
        contentType: String
    },
    bio:{
        type: String
    }
})

module.exports = mongoose.model('Profile', profileSchema);

