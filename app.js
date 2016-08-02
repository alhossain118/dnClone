'use strict';

require('dotenv').config();
const PORT            = process.env.PORT || 9090;
const MONGO_URL       = process.env.MONGO_URI || 'mongodb://localhost/mean';
//set and require modules
const http            = require('http'); // build into node
const morgan          = require('morgan')
const express         = require('express')
const bodyParser      = require('body-parser')
const path            = require('path')
// const favicon         = require('serve-favicon')
const cookieParser    = require('cookie-parser')
const mongoose        = require('mongoose')

let app               = express();
let server            = http.createServer(app)

//Mongoose listening on MONGO_URL
mongoose.connect(MONGO_URL, err => {
  console.log(err || `MongoD is running on ${MONGO_URL}`);
})
//Server listening on Server PORT
server.listen(PORT, err => {
  console.log(`\nServer listening on PORT ${PORT}`);
})
//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//place middleware to parse the browsers cookies
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {title: 'Fullstack Template'});
});

//ROUTES
app.use('/api', require('./routes/api'))

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});
