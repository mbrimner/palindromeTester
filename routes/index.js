var express = require('express');
var router = express.Router();
var Palindrome = require('../lib/models/palindrome');

router.get('/', function(req, res, next) {
    Palindrome.find(function(err, palindromes) {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.render('pages/index', { palindromes: palindromes });
    });
});

module.exports = router;
