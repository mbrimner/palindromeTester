var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Palindrome = require('../lib/models/palindrome');

// GET all strings
router.get('/', function(req, res) {
    Palindrome.find(function(err, palindromes) {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.status(200).send(palindromes);
    });
});

// GET specific string
router.get('/:id', function(req, res, next) {
    Palindrome.findById(req.params.id, function(err, palindrome) {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (!palindrome) {
            return res.status(404).send();
        }

        res.status(200).send(palindrome);
    });
});

// CREATE new string
router.post('/', function(req, res, next) {
    // TODO - pull javascript into its own file
    var newPalindrome = new Palindrome({
        stringToTest: req.body.stringToTest,
        isPalindrome: _testForPalindrome(req.body.stringToTest)
    });

    newPalindrome.save(function(err) {
        if (err) {
            if (err.code === 11000) {
                return res.sendStatus(409);
            } else {
                console.error(err);
                return next(err);
            }
        }
        res.status(201).send(newPalindrome);
    });
});

// DELETE specific string
router.delete('/:id', function(req, res, next) {
    Palindrome.findById(req.params.id, function(err, palindrome) {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (!palindrome) {
            return res.status(404).send();
        }

        palindrome.remove(function(err) {
            if (err) {
                console.error(err);
                return next(err);
            }
            res.sendStatus(204);
        });

    });
});

function _testForPalindrome(stringToTest) {
    // TODO - assert input string
    // NOTE: cleaner to chain but wanted to be explicit on what I'm doing
    // remove white space inside stringToTest
    stringToTest = stringToTest.replace(/\s/g, '');
    // remove punctuation
    stringToTest = stringToTest.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    // normalize the input to lower case
    stringToTest = stringToTest.toLowerCase();
    var reversedString = _reverse(stringToTest);
    if (stringToTest === reversedString) {
        return true;
    }
    return false;
}

function _reverse(inputString) {
    // TODO - assert input string
//    assert(inputString);
    var reversedString = '';
    for (var i = inputString.length - 1; i >= 0; i--) {
        reversedString += inputString[i];
    }
    return reversedString;
}

module.exports = router;
