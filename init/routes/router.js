var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Express' });
});

router.get('/bar', function(req, res, next) {
  res.render('bar', { title: 'Express' });
});

router.get('/radar', function(req, res, next) {
  res.render('radar', { title: 'Express' });
});

router.get('/getInternetList', function (req, res, next) {
  res.send({
     questionId: "asd",
     answerId: "string",
     answerQuestionTitle: "string",
     feeling: "string",
     author: "string",
     content: "string",
     updatedTime: "string"
  });
});

//
// router.post('/getInternetComments', function (req, res, next) {
//   var questionId = req.body.questionId;
//   "data":[{
//    "id": string, // id
//    "title": string,	//问题
//    "author": string,	//回答者名
//    "length": string,	//答案长度，如果不方便就算了
//  }]
// });

module.exports = router;
