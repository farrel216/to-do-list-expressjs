var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require("connect-flash");
const session = require("express-session");

require("dotenv").config();
require("./utils/db");



var app = express();
const port = process.env.PORT;

app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));

var indexRouter = require('./routes/index');
const authRouter = require("./routes/auth");
var todoRouter = require('./routes/todo');

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});

const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);
app.use(methodOverride("_method"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("cats"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use(function(req, res, next) {
  if(req.session.username){
    next();
  }
  else{
    res.redirect("/");
  }
});
app.use('/todo', todoRouter);
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

module.exports = app;
