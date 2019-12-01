const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');

var sessionId = null; //세션id 전역변수로 선언

//회원가입 GET
router.get('/Signup', function(req, res, next) {
  res.render("user/Signup_page"); //ejs
});

//회원가입 POST
router.post("/Signup", async function(req,res,next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  let result = models.user.create({
    id: body.userId,
    password: hashPassword,
    name: body.userName,
    university: body.userUniversity,
    major: body.userMajor,
    email: body.userEmail,
    salt: salt
  })
  res.redirect("/"); //url
})

// 로그인 GET
router.get('/Login', function(req, res, next) {
  console.log(req.session.id);
  if(req.session.id == sessionId){
    res.render("user/Mypage_page");
    console.log("로그인");
  }
  else{
    res.render("user/Login_page");
    console.log("로그인 안됨");
  }
});

// 로그인 POST
router.post("/Login", async function(req,res,next){
  let body = req.body;

  let result = await models.user.findOne({
    where: {
      id : body.userId
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    console.log("비밀번호 일치");
    // 세션 설정
    sessionId = body.userId;
    req.session.id = sessionId;
    res.redirect("/User/Mypage");
    console.log("로그인 POST 성공");
  }
  else{
    console.log("비밀번호 불일치");
    res.redirect("/User/Login");
  }
});

//로그아웃 GET
router.get('/Logout', function(req, res, next) {
    res.render("user/Logout_page");
    console.log("로그아웃 GET통과");
});

//로그아웃 POST
router.post("/Logout", async function(req,res,next){
  delete req.session;  // 세션 삭제
  res.clearCookie('sid'); // 세션 쿠키 삭제
  res.redirect("/");
  console.log("세션 삭제");
});

// 마이페이지 GET
router.get('/Mypage', function(req, res, next) {
  res.render("user/Mypage_page"); //응답할 페이지
});
// 마이페이지 POST
router.post("/Mypage", async function(req,res,next){
  res.redirect("/Mypage");
});


module.exports = router;
