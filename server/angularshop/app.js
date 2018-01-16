var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var constants = require('./constants/constants');
var dbConnection = require('./constants/dbconnection');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var products = require('./routes/products'); 
var app = express();

app.all('/*', function(req, res, next) { 
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
 res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, content-type, Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
       res.sendStatus(200);
   }
   else {
       next();
   }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'mysectret',
                   resave: false,
                   saveUninitialized: false,
                   store: new MongoStore({ mongooseConnection: mongoose.connection }),
                   cookie: { maxAge: 180*60*1000  }
                    }));
app.use(express.static(path.join(__dirname, 'src/index.html')));

app.use('/', products);
app.get('/', function(req,res) {
	res.send("express")
}) 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) { 
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
