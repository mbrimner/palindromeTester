Implementation Architecture:
- JSON REST service
- UI uses jQuery
- UI styles with bootstrap

Sequence diagram of the use cases' interactions.
browser ---> node.js server ---> mongo db

How to build, deploy, and access the app:
git clone https://github.com/mbrimner/palindromeTester.git
cd qlik_audition
npm install
mongo
- mkdir -p /data/db
- mongod

Run Tests"
mocha test/test.js

• REST API documentation.
GET /palindromes
Retrieve all palindromes
curl

GET /palindromes/:id
Retrieve a specific palindrome
curl

POST
create a new string to test

DELETE /palindromes/:id
Retrieve a specific palindrome
curl

ec2-52-34-87-249.us-west-2.compute.amazonaws.com

TODO
- submit code to github
- write this documentation
- get amazon server running mongo
- deploy code to amazon
- automate deployment
