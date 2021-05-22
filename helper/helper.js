const sanitize = require('mongo-sanitize');
const fs = require('fs');
const Post = require('../models/PostsModel');
const Profile = require('../models/ProfileModel');
const Comment = require('../models/CommentsModel.js');
const db = require('../models/db.js');

const helper = {
    sanitize: function (query) {
        return sanitize(query);
    },

    updatePost: function(id, photo, res) {
        console.log("pls");
        console.log(id);
        let extension = photo.substring(photo.lastIndexOf("."));
        let filename = photo.split('.').slice(0, -1).join('.');

        db.updateOne(Post, {_id: id}, {photo, photo}, function(result){
            switch (extension) {
                case '.jpg':
                    fs.unlink('./public/posts/' + filename + '.png', (fds) => {});
                    fs.unlink('./public/posts/' + filename + '.jpeg', (fds) => {});
                    break;
                case '.png': 
                    fs.unlink('./public/posts/' + filename + '.jpg', (fds) => {});
                    fs.unlink('./public/posts/' + filename + '.jpeg', (fds) => {});
                    break;
                case '.jpeg':
                    fs.unlink('./public/posts/' + filename + '.png', (fds) => {});
                    fs.unlink('./public/posts/' + filename + '.jpg', (fds) => {});
                    break;
            }
        })
    },

    renameAvatar: function (req, newName) {
        var origName = req.file.origName;
        var extension = origName.substring(origName.lastIndexOf('.'));
        const newURL = req.file.destination + '/' + newName + extension;

        fs.renameSync(req.file.path, newURL);
        return newName + extension;
    },

    updateAvatar: function(id, avatar, res) {
        console.log("pls");
        console.log(id);
        let extension = avatar.substring(avatar.lastIndexOf("."));
        let filename = avatar.split('.').slice(0, -1).join('.');

        db.updateOne(Profile, {_id: id}, {avatar, avatar}, function(result){
            switch (extension) {
                case '.jpg':
                    fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
                    fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
                    break;
                case '.png': 
                    fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
                    fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
                    break;
                case '.jpeg':
                    fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
                    fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
                    break;
            }
        })
    },


};

module.exports = helper;