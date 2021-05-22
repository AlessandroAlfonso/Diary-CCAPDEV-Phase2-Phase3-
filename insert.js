const db = require('./models/db.js');

const Post = require('./models/PostsModel.js');
const Comment = require('./models/CommentsModel.js');

db.connect();

// Samples needed to be imported for the post database
var post = [
    {
       user: 'Magrish Nomi',
       body: 'Nako po! pagod na pagod na talaga ako!',
       tags: '#ayokona',
       photo: '/feed/Margish Nomi.jpg'
    },

    {
        user: 'Upin Ipin',
        body: 'Why am I so HAPPY today, I dont get it!',
        tags: '#happymuch',
        photo: '/feed/Upin Ipin.jpg'
     },

     {
        user: 'Alaws Ivana',
        body: 'Nako po! pagod na pagod na talaga ako!',
        tags: '#ayokona',
        photo: '/feed/Alaws Ivana.jpg'
     },

     {
        user: 'Suman Siopao',
        body: 'Nako po! pagod na pagod na talaga ako!',
        tags: '#ayokona',
        photo: '/feed/Suman Siopao.jpg'
     },

     {
        user: 'Pa Mine',
        body: 'Nako po! pagod na pagod na talaga ako!',
        tags: '#ayokona',
        photo: '/feed/Pa Mine.jpg'
     }
];

db.insertMany(Post, post);

// Comments

// db.insertMany(Review, reviews);