const express = require('express');
const router = express();
const database = require('../models/db.js'); 
const controller = require('../controller/index.js');
const validation = require('../helper/validation.js');

const cookieParser = require('cookie-parser'); //COOKIES
const bodyParser = require('body-parser'); //BODY PARSING



router.get('/', controller.getLogIn);
router.get('/signup', controller.getSignUp);
router.post('/signup', controller.postSignUp);
router.post('/signin', controller.postLogIn);
router.get('/profile/:email', controller.getProfile);
router.post('/edit/editUpdate/:email', controller.updateEditProfile);
router.get('/edit/:email', controller.getEditProfile);
router.get('/timeline/:email', controller.getTimeline);
router.post('/timeline', controller.myTimeline);
router.post('/createPost', controller.createPost);
router.get('/edit/deleteAcc/:email', controller.deleteAcc);


// router.post('/timeline/:email', postUpload, controller.createPost);

module.exports = router;