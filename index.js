const dotenv = require(`dotenv`);
const express = require(`express`);
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);
//const routes = require(`./routes/routes.js`);
const db = require(`./models/db.js`);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//app.set(`view engine`, `hbs`);
//hbs.registerPartials(__dirname + `/views/partials`);


dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.set('models', __dirname + 'models/');
app.use(express.static('public')); //Load the static files
app.use(express.static(__dirname + '/'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

const router = require('./router/DiaryRouter');
app.use('/', router);
db.connect();

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + hostname + `:` + port);
});
