const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    id_Val: mongoose.Schema.Types.ObjectId,

    user: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    tags:{
        type: [String],
        required: true
    },
    photo: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    delete: {
        type: Boolean,
        default: false
    },
    created: {
        type: Boolean,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postsSchema);