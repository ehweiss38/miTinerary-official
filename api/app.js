var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var session=require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter=require('./routes/myTinerary/homeRouter');
var attractionsRouter=require('./routes/myTinerary/attractions')
var signInRouter=require('./routes/myTinerary/signIn')
var savedRouter=require('./routes/myTinerary/savedTrips')
var photosRouter=require('./routes/myTinerary/photos')

const mongoose=require('mongoose')

var app = express();

require('dotenv').config()

mongoose.connect('mongodb+srv://ethan:thisismypassword1234@mitineraryserver.hkrwc.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({ credentials: true, origin:['http://localhost:3000','https://mitinerary.netlify.app']}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/home',homeRouter);
app.use('/attractions',attractionsRouter);
app.use('/auth',signInRouter);
app.use('/saved',savedRouter)
app.use('photos',photosRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.use(session({
  resave:false,
  saveUnitialized:false.valueOf,
  secret:"sessions",
  cookie:{
    maxAge:1000*60*60,
    sameSite:'none',
    secure:true
  }
}))

app.listen(process.env.PORT || '7000',()=>{
  console.log('Connected!')
})

//app.get(req,res)

module.exports = app;
