const express = require('express');
const router = express.Router();

// Home_page GET
router.get('/', function(req, res, next) {
  res.render("Home_page"); //응답할 ejs
});
// Home_page post
router.post("/", async function(req,res,next){ //url
  res.redirect("/"); //응답할 url
});
module.exports = router;
