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
  var results = models.newfile.findAll({
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

// Edit_Detail GET
router.get('/Edit_Detail',urlencodeParser, function(req, res, next) {
  var title = req.query.title;
  console.log("title:::"+title);

  models.document.findAll({
    raw: true,
    attributes: ['title', 'content'],
    where: {
      title: req.query.title
    }
  }).then( result => {
    console.log(result)
    res.render('Edit_Detail_page', {rows: result})
  }).catch(err => {console.log(err)});
}) // get '/Edit_Detail'

//Edit_Detail POST
router.post('/Edit_Detail',urlencodeParser, function(req, res, next) {
  let body = req.body;
  let test_id = "dayoung";
  let onVote = body.on_vote;

  function creating_newfile() {
    return new Promise(function(resolve, reject){
      resolve(models.newfile.create({
          writer: test_id,
          title: body.title_fild,
          content: body.editor,
          onVote: body.on_vote
        }));
      reject(new Error("newfile : Request is failed"));
    });
  }
  function updating_document() {
    return new Promise(function(resolve, reject){
      resolve(models.document.update({content: body.editor},
        {where: {title: body.title_fild}, returning: true}));
      reject(new Error("document : Request is failed"));
    });
  }

  creating_newfile().then(function(){
    console.log('creating_newfile 성공');
    updating_document().then(function(){
      console.log('updating_document 성공');
    }).catch(function(err){
      console.log(err);
    })
  }).catch(function(err){
    console.log(err);
  })

  res.redirect("/WikiHome"); //url
})//Edit_Detail POST end

//Edit_page get
router.get('/Edit', function(req, res, next){
  res.render("Edit_page");
})

// Edit_page post - DB: newfile
router.post("/Edit",  urlencodeParser, async function(req,res,next){ //url
  
  let body = req.body;
  let test_id = "dayoung";
  let on_vote = body.on_vote;
  console.log(body);
  var inx = 0;

  function creating_newfile() {
    return new Promise(function(resolve, reject){
      resolve(models.newfile.create({
          writer: test_id,
          title: body.title_fild,
          content: body.editor,
          onVote: on_vote
        }));
      reject(new Error("newfile : Request is failed"));
    });
  }//creating_newfile() end
  function creating_document() {
    return new Promise(function(resolve, reject){
      resolve(models.document.create({
          // writer: req.session.id,
          title: body.title_fild,
          content: body.editor
        }));
      reject(new Error("document : Request is failed"));
    });
  }//creating_document() end

  // function search_index() {
  //   return new Promise(function(resolve, reject){
  //     resolve(
  //       models.newfile.findAll({
  //         raw: true,
  //         // attributes: ['index'],
  //         where: {
  //           title: body.title_fild,
  //           content: body.editor
  //         }
  //        }).then(result => {
  //         console.log("result::::::::"+result)
  //     }))
  //     reject(new Error("search_index in newfile: Request is failed"))
  //   })
  // }// search_index() end
  
  function creating_voting_file() {
    return new Promise(function(resolve, reject){
      resolve(models.voting_file.create({
          voting_index: key
        }));
      reject(new Error("voting_file : Request is failed"));
    });
  }//creating_voting_file() end

  creating_newfile().then(function(){
    console.log('creating_newfile 성공');
    creating_document().then(function(){
      console.log('creating_document 성공');
      if (on_vote == 't'){
        
      }else{
        console.log('투표 선택을 하지 않았다')
      }
    }).catch(function(err){
      console.log(err);
    })
  }).catch(function(err){
    console.log(err);
  })

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

//Search page
router.get("/Search/", function(req,res, next){
  console.log("param :", req.param);
  var keyword = req.param('keyword');
  console.log("-------------------");
  console.log("keyword:" + keyword);
  models.document.findAll({
    raw: true,
    attributes: ['title'],
    where: { title: keyword }
  }).then( results => {
    console.log(results);
    console.log('Search성공');
    res.render("Search_page", { rows: results });
  }).catch( err => {
    console.log(err);
  })
});
router.post("/Search", function(req, res, next){
  res.render("Search_page"); //응답할 url
});

//Detail page
router.get('/Detail/:keyword',urlencodeParser, function(req, res, next){
  var keyword = req.params.keyword;
  console.log("keyword:"+keyword);

  models.document.findAll({
    raw: true,
    attributes: ['title', 'content'],
    where: { title: keyword }
  }).then( results => {
    console.log(results);
    console.log('Detail_findAll 성공');
    res.render("Detail_page", { rows: results });
  }).catch( err => {
    console.log(err);
  })

  // res.render("Detail_page");
});


module.exports = router;
