var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var palindromeSchema = new Schema({
    stringToTest: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
    },
    isPalindrome: Boolean
});

var Palindrome = mongoose.model('Palindrome', palindromeSchema);

module.exports = Palindrome;