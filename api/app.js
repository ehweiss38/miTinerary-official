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


app.set('trust proxy',1)

app.use(cors({ credentials: true, origin:['http://localhost:3000','https://mitinerary.netlify.app']}));


app.use(logger('dev'));
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://mitinerary.netlify.app'); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave:false,
  saveUnitialized:false,
  secret:"session",
  name:'MitinerarySessionCookie',
  cookie:{
    sameSite:'none',
    secure:process.env.NODE_ENV==='production',
    httpOnly:false
  }
}))


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




app.listen(process.env.PORT || '7000',()=>{
  console.log('Connected!')
})

//app.get(req,res)

module.exports = app;
