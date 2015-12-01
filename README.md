Implementation Architecture:
The REST service and UI are written as an express.js (with EJS templates) application on top of node.js.  The JSON REST 
service stores its data in Mongo DB.  The UI is styled with bootstrap and jQuery is used to interact with the REST 
service.  Automated tests are executed with mocha.  


Sequence diagram of the use cases' interactions:
1) Create new string
browser ---HTTP POST /palindromes {stringToTest: 'nurses run'} ---> node.js server ---save string---> mongo db
browser <---JSON object--- node.js server <---success--- mongo db
2) Get all strings details
browser ---HTTP GET /palindromes---> node.js server ---retrieve all strings---> mongo db
browser <---JSON array--- node.js server <--- all strings--- mongo db
3) Get specific string details
browser ---HTTP GET /palindromes/{id}---> node.js server ---retrieve string with id---> mongo db
browser <---JSON object--- node.js server <--- string matching id--- mongo db
4) Delete string
browser ---HTTP DELETE /palindromes/{id}---> node.js server ---retrieve string with id then delete---> mongo db
browser <---HTTP 204--- node.js server <--- success --- mongo db


How to build, deploy, and access the app:
Prerequisites:
- install node.js (v5.0.0), npm (3.3.6), mongodb (3.0.7)
- run mongod

git clone https://github.com/mbrimner/palindromeTester.git
cd palindromeTester
npm install
npm start
access the application at: http://localhost:3000


AWS hosted instance:
http://ec2-52-34-87-249.us-west-2.compute.amazonaws.com


Run Tests:
From the palindromeTester directory:
mocha test/test.js


REST API documentation:

Create a new string
HTTP Method: POST
Path: /palindromes

Example Request
curl http://ec2-52-34-87-249.us-west-2.compute.amazonaws.com/palindromes \
-d '{"stringToTest": "nurses run"}' \
-X POST

Example Response
201 Created
{
    "_id": "187273718",
    "stringToTest": "nurses run",
    "isPalindrome": true
}

Other Responses:
409 Conflict - on duplicate string
500 Internal Server Error - database error, etc.


Retrieve all palindromes
HTTP Method: GET
Path: /palindromes

Example Request
curl http://ec2-52-34-87-249.us-west-2.compute.amazonaws.com/palindromes 

Example Response
200 OK
[{
    "_id": "187273718",
    "stringToTest": "nurses run",
    "isPalindrome": true
}]

Other Responses:
500 Internal Server Error - database error, etc.


Retrieve a specific palindrome
HTTP Method: GET
Path: /palindromes/{id}

Example Request
curl http://ec2-52-34-87-249.us-west-2.compute.amazonaws.com/palindromes/187273718

Example Response
200 Created
{
    "_id": "187273718",
    "stringToTest": "nurses run",
    "isPalindrome": true
}

Other Responses:
404 Not Found - unknown string id
500 Internal Server Error - database error, etc.


Delete a specific palindrome
HTTP Method: DELETE
Path: /palindromes/{id}

Example Request
curl http://ec2-52-34-87-249.us-west-2.compute.amazonaws.com/palindromes/187273718 \
-X DELETE

Example Response
204 No Content

Other Responses:
404 Not Found - unknown string id
500 Internal Server Error - database error, etc.
