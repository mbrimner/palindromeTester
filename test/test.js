var chai = require('chai');
var assert = chai.assert;
var mongoose = require('mongoose');
var request = null;

describe('palindrome REST api', function() {

    before(function(done) {
        this.timeout(10000);
        mongoose.connect('mongodb://localhost/mocha-test-db', function(){
            mongoose.connection.db.dropDatabase(function() {
                process.env.MONGO_DB_NAME="mocha-test-db";
                var palindromeTesterApp = require('../app.js');
                request = require('supertest')(palindromeTesterApp);
                done();
            });
        });
    });

    it('returns empty array of palindrome objects', function(done) {
        request
            .get('/palindromes')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.length === 0);
                done();
            });
    });

    it('create a new string that is not a palindrome', function(done) {
        var data = {
            stringToTest: "abc"
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.stringToTest === data.stringToTest);
                assert(res.body.isPalindrome === false);
                done();
            });
    });

    it('create a duplicate string that is not a palindrome', function(done) {
        var data = {
            stringToTest: "abc"
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(409, done);
    });

    it('returns array of length 1', function(done) {
        request
            .get('/palindromes')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.length === 1);
                done();
            });
    });

    it('create a new string that is a palindrome', function(done) {
        var data = {
            stringToTest: "abcba"
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.stringToTest === data.stringToTest);
                assert(res.body.isPalindrome === true);
                done();
            });
    });

    it('create a duplicate string that is a palindrome', function(done) {
        var data = {
            stringToTest: "abcba"
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(409, done);
    });

    it('create another string that is a palindrome', function(done) {
        var data = {
            stringToTest: "nursesrun"
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.stringToTest === data.stringToTest);
                assert(res.body.isPalindrome === true);
                done();
            });
    });

    it('create another string that is a not palindrome', function(done) {
        var data = {
            stringToTest: "thisisnotapalindrome"
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.stringToTest === data.stringToTest);
                assert(res.body.isPalindrome === false);
                done();
            });
    });

    var fourPalindromes = null;

    it('returns array of length 4', function(done) {
        request
            .get('/palindromes')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.length === 4);
                fourPalindromes = res.body;
                done();
            });
    });

    it('retrieve specific palindrome', function(done) {
        request
            .get('/palindromes/' + fourPalindromes[0]._id)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body._id === fourPalindromes[0]._id);
                assert(res.body.stringToTest === fourPalindromes[0].stringToTest);
                assert(res.body.isPalindrome === fourPalindromes[0].isPalindrome);
                done();
            });
    });

    it('retrieve non-existent palindrome', function(done) {
        request
            .get('/palindromes/abcbbcea244ec907a40be77d')
            .expect(404, done)
    });

    var deletedId = null;

    it('deletes a specific palindrome', function(done) {
        deletedId = fourPalindromes[0]._id;
        request
            .delete('/palindromes/' + deletedId)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('retrieve deleted palindrome', function(done) {
        request
            .delete('/palindromes/' + deletedId)
//            .expect(404)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                console.log(res.statusCode);
                console.log(res.body);
                done();
            });
//            .expect(404, done);
    });

    it('deletes a non-existent palindrome', function(done) {
        request
            .delete('/palindromes/abcbbcea244ec907a40be77d')
            .expect(404, done)
    });

    it('returns array of length 3', function(done) {
        request
            .get('/palindromes')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.length === 3);
                done();
            });
    });

    it('re-create a deleted string that is not a palindrome', function(done) {
        var data = {
            stringToTest: "abc"
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.stringToTest === data.stringToTest);
                assert(res.body.isPalindrome === false);
                done();
            });
    });

    it('create another string (with one space) that is a palindrome ', function(done) {
        var data = {
            stringToTest: "nurses run"
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.stringToTest === data.stringToTest);
                assert(res.body.isPalindrome === true);
                done();
            });
    });

    it('create another string (multiple spaces) that is a palindrome ', function(done) {
        var data = {
            stringToTest: "a santa at nasa"
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.stringToTest === data.stringToTest);
                assert(res.body.isPalindrome === true);
                done();
            });
    });

    it('create another string (spaces and capital letters) that is a palindrome ', function(done) {
        var data = {
            stringToTest: "A Man a Plan a Cat a HaM a Yak a Yam a Hat a Canal Panama"
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.stringToTest === data.stringToTest.toLowerCase());
                assert(res.body.isPalindrome === true);
                done();
            });
    });

    it('create another string (with punctuation) that is a palindrome ', function(done) {
        var data = {
            stringToTest: "A car, a man, a maraca."
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.stringToTest === data.stringToTest.toLowerCase());
                assert(res.body.isPalindrome === true);
                done();
            });
    });

    it('create another string (with punctuation, spaces, and capital letters    ) that is a palindrome ', function(done) {
        var data = {
            stringToTest: "A Toyota! Race fast, safe car! A Toyota!"
        };
        request
            .post('/palindromes')
            .send(data)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.stringToTest === data.stringToTest.toLowerCase());
                assert(res.body.isPalindrome === true);
                done();
            });
    });

    it('returns array of length 9', function(done) {
        request
            .get('/palindromes')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.length === 9);
                done();
            });
    });

});
