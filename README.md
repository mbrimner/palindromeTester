Implementation Architecture: <br/>
The REST service and UI are written as an express.js (with EJS templates) application on top of node.js.  The JSON REST 
service stores its data in Mongo DB.  The UI is styled with bootstrap and jQuery is used to interact with the REST 
service.  Automated tests are executed with mocha.  


Sequence diagram of the use cases' interactions:<br/>
1) Create new string<br/>
browser ---HTTP POST /palindromes {stringToTest: 'nurses run'} ---> node.js server ---save string---> mongo db<br/>
browser <---JSON object--- node.js server <---success--- mongo db<br/>
2) Get all strings details<br/>
browser ---HTTP GET /palindromes---> node.js server ---retrieve all strings---> mongo db<br/>
browser <---JSON array--- node.js server <--- all strings--- mongo db<br/>
3) Get specific string details<br/>
browser ---HTTP GET /palindromes/{id}---> node.js server ---retrieve string with id---> mongo db<br/>
browser <---JSON object--- node.js server <--- string matching id--- mongo db<br/>
4) Delete string<br/>
browser ---HTTP DELETE /palindromes/{id}---> node.js server ---retrieve string with id then delete---> mongo db<br/>
browser <---HTTP 204--- node.js server <--- success --- mongo db<br/>


How to build, deploy, and access the app:<br/>
Prerequisites:<br/>
- install node.js (v5.0.0), npm (3.3.6), mongodb (3.0.7)
- run mongod

- git clone https://github.com/mbrimner/palindromeTester.git
- cd palindromeTester
- npm install
- npm start
- access the application at: http://localhost:3000


AWS hosted instance:<br/>
- http://ec2-52-34-87-249.us-west-2.compute.amazonaws.com


Run Tests:<br/>
- From the palindromeTester directory: 
- export NODE_ENV=development
- npm install
- mocha test/test.js


REST API documentation:<br/>

Create a new string<br/>
HTTP Method: POST<br/>
Path: /palindromes<br/>

Example Request<br/>
curl http://ec2-52-34-87-249.us-west-2.compute.amazonaws.com/palindromes 
-d '{"stringToTest": "nurses run"}' 
-X POST -H "content-type: application/json"
<br/>

Example Response<br/>
201 Created<br/>
{<br/>
    "__v":0,<br/>
    "stringToTest":"nurses run",<br/>
    "isPalindrome":false,<br/>
    "_id":"565cf19f9cdcff1751346a59"<br/>
}<br/>

Other Responses:<br/>
409 Conflict - on duplicate string<br/>
500 Internal Server Error - database error, etc.<br/>


Retrieve all palindromes<br/>
HTTP Method: GET<br/>
Path: /palindromes<br/>

Example Request<br/>
curl http://ec2-52-34-87-249.us-west-2.compute.amazonaws.com/palindromes
<br/> 

Example Response<br/>
200 OK<br/>
[{<br/>
    "__v":0,<br/>
    "_id": "565cf19f9cdcff1751346a59",<br/>
    "stringToTest": "nurses run",<br/>
    "isPalindrome": true<br/>
}]<br/>

Other Responses:<br/>
500 Internal Server Error - database error, etc.<br/>


Retrieve a specific palindrome<br/>
HTTP Method: GET<br/>
Path: /palindromes/{id}<br/>

Example Request<br/>
curl http://ec2-52-34-87-249.us-west-2.compute.amazonaws.com/palindromes/565cf19f9cdcff1751346a59

Example Response<br/>
200 OK<br/>
{<br/>
    "__v":0,<br/>
    "_id": "565cf19f9cdcff1751346a59",<br/>
    "stringToTest": "nurses run",<br/>
    "isPalindrome": true<br/>
}<br/>

Other Responses:<br/>
404 Not Found - unknown string id<br/>
500 Internal Server Error - database error, etc.<br/>


Delete a specific palindrome<br/>
HTTP Method: DELETE<br/>
Path: /palindromes/{id}<br/>

Example Request<br/>
curl http://ec2-52-34-87-249.us-west-2.compute.amazonaws.com/palindromes/565cf19f9cdcff1751346a59 
-X DELETE
<br/>

Example Response<br/>
204 No Content<br/>

Other Responses:<br/>
404 Not Found - unknown string id<br/>
500 Internal Server Error - database error, etc.<br/>
