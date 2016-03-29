var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = req.query;
  var word = query.word;
  var context = {};
  context.word = word;
  if (word != undefined && word != null) {
    if (word.length == "") {
      context.error = "Invalid word length";
    }
    else {
      context.result  = isPalindrome(word);
    }
  }
  res.render('index', context);
});

function isPalindrome(word) {
  var done = false;
  var leftCursor = 0;
  var rightCursor = word.length -1;
  while (!done) {
    while (!isValidCharacter(word[leftCursor]) && leftCursor < rightCursor) {
      leftCursor++;
    }
    while (!isValidCharacter(word[rightCursor]) && rightCursor > leftCursor) {
      rightCursor--;
    }
    if (word[leftCursor].toLowerCase() != word[rightCursor].toLowerCase()) {
      return false;
    }
    else {
       if (leftCursor >= rightCursor) {
         done = true;
       }
       else {
         leftCursor++;
         rightCursor--;
       }
    }
  }
  return true;
};

function isValidCharacter(character) {
  var value = character.match(/[A-Za-z]/);
  if (value != null) {
    return value.length >= 1;
  }
  return false;
};

module.exports = router;
