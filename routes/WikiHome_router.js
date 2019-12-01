const express = require('express');
const router = express.Router();
const models = require("../models");

//bodyParser가 대기하고 있다가 사용자 요청이 들어오면 동작하면서 POST를 사용할 수 있도록함
//https://m.blog.naver.com/PostView.nhn?blogId=jdub7138&logNo=221039834501&proxyReferer=https%3A%2F%2Fwww.google.com%2F
var bodyParser = require('body-parser')
var urlencodeParser = bodyParser.urlencoded({ extended : false});

// Home_page GET
router.get("/", function(req, res, next) {
  res.render("WikiHome_page"); //응답할 ejs
});
// Home_page post
router.post("/", async function(req,res,next){
  let body = req.body;
  res.redirect("/WikiHome"); //응답할 url
});

router.get('/Vote', function(req, res, next) {
  models.newfile.findAll({
    raw: true,
    attributes: ['index', 'writer','title', 'content', 'createdAt'],
    where: { onVote: 't' }
  }).then( results => {
    console.log(results);
    console.log('findAll 성공');
    res.render("Vote_page", { rows: results });
  }).catch( err => {
    console.log(err);
})
  // res.render("Vote_page");
});//get '/Vote'

router.get('/NewFileGuide', function(req, res, next){
  res.render("NewFileGuide_page");
})

// Edit_page GET
router.get('/Edit', function(req, res, next) {
  res.render("Edit_page"); //응답할 ejs
});
// Edit_page post - DB: newfile
router.post("/Edit",  urlencodeParser, async function(req,res,next){ //url
  
  let body = req.body;
  let test_id = "dayoung";
  let onVote = body.on_vote;

  // let result = models.newfile.create({
  //   // writer: req.session.id,
  //   writer: test_id,
  //   title: body.title_fild,
  //   content: body.editor,
  //   onVote: body.on_vote
  // })

  models.newfile.create({
    writer: test_id,
    title: body.title_fild,
    content: body.editor,
    onVote: body.on_vote
  })
  .then( result => {
    console.log("newfile 데이터 추가 완료");
  })
  .catch( err => {
    console.log('err::'+err);
    console.log("newfile 데이터 추가 실패");
  })

  // create_document(body.title_fild, body.editor, function(result){
  //   console.log(result);
  // })
  //여기다가 onVote가 1인 애들을 voting_file 테이블에 집어 넣을 생각이었다.

  // models.documents.create({
  //   // writer: req.session.id,
  //   writer: test_id,
  //   title: body.title_fild
  // })
  // .then( result => {
  //   console.log("documents 데이터 추가 완료");
  //   res.redirect("/WikiHome");
  // })
  // .catch( err => {
  //   console.log("documents 데이터 추가 실패");
  // })

  //document 테이블 생성하기
  // let result3 = models.documents.create({
  //   // writer: req.session.id,
  //   writer: test_id,
  //   title: body.title_fild
  // })

  // console.log(body);
  res.redirect("/WikiHome"); //url
});

// Tutorial_page GET
router.get('/Tutorial', function(req, res, next) {
  res.render("Tutorial_page"); //응답할 ejs
});
// Tutorial_page post
router.post("/Tutorial", async function(req,res,next){ //url
  res.redirect("/Tutorial"); //응답할 url
});

router.get("/Search", function(req,res, next){
  res.render("Search_page");
});
router.post("/Search", function(req, res, next){
  res.render("Search_page"); //응답할 url
});

router.get("/Detail/:idx", function(req, res, next){
  var idx = req.params.index;
  console.log("params: "+req.param);
  console.log("idx:"+idx);
  res.render("Detail_page");
});


module.exports = router;
