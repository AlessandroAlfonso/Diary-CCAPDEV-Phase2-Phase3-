const mongoose = require('mongoose');
const db = require('../models/db.js');
const Profile = require('../models/ProfileModel');
const Post = require('../models/PostsModel');
const bcrypt = require('bcrypt');
const About = require('../models/AboutModel');
const helper = require('../helper/helper.js');
const {validationResult, body} = require('express-validator');
const e = require('express');
const { post } = require('../router/DiaryRouter.js');
const saltRounds = 10;
const rendFunctions = {
    
    getLogIn: function (req,res) {    
            res.render('signin');
    },

    postLogIn: function(req, res){
        var email = helper.sanitize(req.body.email);
        var password = helper.sanitize(req.body.password);
        
        if (email.trim() == '' || password == '') {
            res.render('signin', {
                input: req.body,
                loginErrorMessage: 'Please input your email and password',
            });
        } else {
            db.findOne(Profile, {email: email}, "",function (user) {
                if (user) {
                    bcrypt.compare(password, user.password, function (err,equal){
                         if(!equal) {
                            res.render('signin', {
                                input: req.body,
                                loginErrorMessage: 'Invalid email or password',
                            });
                        }
                        if(equal){
                            res.redirect('timeline/' + req.body.email);
                        }
                    });
                } else {
                    res.render('signin', {
                        input: req.body,
                        loginErrorMessage: 'Invalid email or password',
                    });
                }
            });
        }
    },


    getAbout: function(req, res){
        res.render('about');
        console.log("Test getAbout");
    },
    myAbout: function(req, res){
        var wentto = req.body.wentto;
        var hobby = req.body.hobby;
        var work = req.body.work;
        var livesin = req.body.livesin;
        var from = req.body.from;
        var bio = req.body.bio;

        var about = {
            _id: new mongoose.Types.ObjectId(),
            wentto: wentto,
            hobby: hobby,
            work: work,
            livesin: livesin,
            from: from,
            bio: bio
        };
        
        db.insertOne(About, about,function (flag) {
            if (flag) {
                req.session.user = profile._id;
            }
        });
        res.redirect('/profile');
    },

    getSignUp: function (req, res){
        res.render('signup');
        console.log('testing getSignUp')
    },

    postSignUp: function(req,res){
        
        var email = helper.sanitize(req.body.email);
        var password = helper.sanitize(req.body.password);
        var fName = helper.sanitize(req.body.fName);
        var lName = helper.sanitize(req.body.lName);
        var password = helper.sanitize(req.body.password);
        var bio = helper.sanitize(req.body.bio);
        

        db.findOne(Profile,{email:email},'', function(user){
            if(user || password != req.body.confirm){
                console.log('ERROR FOUND' + user.email + ' = ' + email);
                res.render('signup', {
                input: req.body,
                loginErrorMessage: user.email + 'already exists',
                });
            }
            else{
                console.log('Insert ' + email);
                bcrypt.hash(password,saltRounds, function (err,hash){
                    var user = {
                        _id: new mongoose.Types.ObjectId(),
                        email: email,
                        password: hash,
                        fName: fName,
                        lName: lName,
                        bio: bio,
                    } ;
                    db.insertOne(Profile,user,function (flag) {
                        if (flag) {
                            req.session.user = user._id;
                        }
                    });
                    res.redirect('/');
                })
            }
        });
    },

    getProfile: function(req, res){
        var email = req.params.email;
        var details = {};

        db.findOne(Profile, {email: email}, '', function(result){
            if(result != null){
                details.fName = result.fName,
                details.lName = result.lName,
                details.bio = result.bio
                details.email = result.email
                res.render('profile', details);
            }
        });
    },

    getEditProfile: function (req, res) {
        
        var email = req.params.email;
        var details = {}
        db.findOne(Profile, {email: email}, '', function(result) {
            if (result) {
                details.fName = result.fName,
                details.lName = result.lName,
                details.bio = result.bio,
                details.email = result.email
                res.render('edit', details)
                console.log(details.fName)
            }
            else {
                res.render('error');
            }
        });
    },

    updateEditProfile: function(req,res){
        const file = req.file;
        var email = req.params.email;

        var user = {
            password: req.body.password,
            fName: req.body.fName,
            lName: req.body.lName,
            bio: req.body.bio,
            email: req.body.email
        };

        console.log("1 "+ user.fName + " "+user.lName + " "+ user.bio + " " + email + " "+ user.password + " 0");
        bcrypt.hash(user.password,saltRounds, function (err,hash){
            user = {
                password: hash,
                fName: user.fName,
                lName: user.lName,
                bio: user.bio,
                email: user.email
            };
        db.updateOne(Profile, {email: req.params.email},{password: hash, fName: user.fName, lName: user.lName, bio: user.bio, email: user.email}, function(result){
            if(result){
                req.params.email = user.email;
                email = req.params.email;
                res.redirect('/');
            }
        });
    });
        //console.log("1 "+fName + lName + bio + email+ " 0");
        //res.redirect('/profile/' + email);
    },
    // getEdit: function (req, res){
    //     res.render('edit');          
    // },
    deleteAcc: function(req,res){
        console.log(req.params.email);
        db.deleteOne(Profile,{email:req.params.email}, function(result){
             if(result){
                res.redirect('/');
                console.log('SUCCESS');
            }
        });
    },

    getTimeline: function(req, res){
        var email = req.params.email;
        details = {};
        db.findOne(Profile, {email: email}, '', function(result){
            if(result != null){
                details.fName = result.fName,
                details.lName = result.lName,
                details.bio = result.bio
                res.render('timeline', {
                    details,
                    email
                });
            }
        });
        console.log("Test getTimeline");
    },
    myTimeline: function(req, res){
        var email = req.params.email;
        res.redirect('/timeline/'+ email);
    },


    //Not Running//
    createPost: function (req, res){
        var body = helper.sanitize(req.body.body);
        var tags = helper.sanitize(req.body.tags);


                const post = new Post({
                    _id: new mongoose.Types.ObjectId(),
                    body: body,
                    tags: tags,
                });
                post.save();
                res.redirect('/timeline');
                    
    } 


}

module.exports = rendFunctions;