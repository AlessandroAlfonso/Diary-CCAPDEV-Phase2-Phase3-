const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    wentto:{
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    livesin: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('About', aboutSchema);