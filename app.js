var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");

require("dotenv").config();
require("./utils/db");



var app = express();
const port = process.env.PORT || 5000;

// app.use(session({resave: true, saveUninitialized: true }));

var indexRouter = require('./routes/index');
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use(cors({origin:'http://localhost:3000', credentials: true}));
const methodOverride = require("method-override");

app.use(methodOverride("_method"));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

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
