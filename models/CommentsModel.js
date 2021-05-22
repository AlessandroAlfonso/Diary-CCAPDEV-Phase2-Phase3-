const mongoose = require('mongoose');


const commentsSchema = mongoose.Schema({
    id_Val: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: String,
        required: true
    },
    created: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Comment', commentsSchema);