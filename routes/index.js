var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = req.query;
  var word = query.word;
  var context = {};
  if (word == undefined || word == null || word.length == "") {
    console.log(word == undefined);
    console.log(word == null);
    context.error = "Invalid word length";
  }
  else if (isPalindrome(word)) {
    context.result = "yes";
  }
  else {
    context.result  = "no"; 
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
      console.log('left: ' + leftCursor);
      console.log('right: ' + rightCursor);
    }
    while (!isValidCharacter(word[rightCursor]) && rightCursor > leftCursor) {
      rightCursor--;
      console.log('right: ' + rightCursor);
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
  console.log("ERROR");
  var value = character.match(/[A-Za-z]/);
  if (value != null) {
    console.log(character);
    return value.length >= 1;
  }
  return false;
};

module.exports = router;
