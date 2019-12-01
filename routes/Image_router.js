var express = require('express')
var app = express();
var partials = require('express-partials');
var fs = require('fs');
app.use(partials());
// app.set('views', './views/image');

// '/image'
//위키로고 이미지 불러오기
app.get("/wikilogo", function(req, res){
    fs.readFile('wikilogo.png', function(err, data){
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(data);
    });
  });
//검색창 이미지 불러오기
app.get("/text_box2", function(req, res){
  fs.readFile('image/text_box2.png', function(err, data){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
  });
});
//검색버튼 이미지 불러오기
app.get("/search_button", function(req, res){
  fs.readFile('image/search_button.png', function(err, data){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
  });
});
//투표 프레임 불러오기
app.get("/frame01", function(req, res){
  fs.readFile('views/image/frame01.png', function(err, data){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
  });
});
//투표 프레임 불러오기
app.get("/frame02", function(req, res){
  fs.readFile('views/image/frame02.png', function(err, data){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
  });
});

module.exports = app;
