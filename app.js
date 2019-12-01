var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const models = require("./models/index.js");

// var indexRouter = require('./routers/index');
// var userRouter = require('./routes/user');
// var homeRouter = require('./routes/Home_page');
// var wikihomeRouter = require('./routes/WikiHome_page');

var app = express();

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
});

//세션
app.use(session({
  key: 'sid', //세션의 키값
  secret: 'secret', //세션의 비밀 키
  resave: false, //세션을 항상 저장할 지
  saveUninitialized: true, //세션이 저장되기 전에 uninitialize 상태로 만들어 저장
  cookie: { //쿠키설정
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/index", require("./routes/index.js"));

app.use("/", require("./routes/Home_router.js"));
app.use("/User", require("./routes/User_router.js"));
app.use("/WikiHome", require("./routes/WikiHome_router.js"));
// app.use("/image", require("./routes/Image_router.js"));

// app.use('/', indexRouter);
// app.use('/user', userRouter);
// app.use('/Home_page', homeRouter);
// app.use('/WikiHome_page', wikihomeRouter);

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
