var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/quiz', function (req, res, next) {

  if (req.body.questionNumber == 1) {

    res.status(200).json({
      question: {
        index: 1,
        statement: "This is first question?",
        answers: {
          a: "First",
          b: "Second",
          c: "Third",
          d: "forth"
        },
        correct: "a"
      }
    });
  
  } else {
    res.status(200).json({
      question: {
        index: 1,
        statement: "This is first question?",
        answers: {
          a: "First aa",
          b: "Second aa",
          c: "Third aa",
          d: "forth aa"
        },
        correct: "a"
      }
    });
  }


});

module.exports = router;
