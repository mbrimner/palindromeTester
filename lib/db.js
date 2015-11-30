var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    console.log('connected to mongo db:', dbConnectionPath);
    require('./models/palindrome');
});
var dbConnectionPath = 'mongodb://localhost/';
if (process.env.MONGO_DB_NAME) {
    dbConnectionPath += process.env.MONGO_DB_NAME;
} else {
    dbConnectionPath += 'test';
}
mongoose.connect(dbConnectionPath);