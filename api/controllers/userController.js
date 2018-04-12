'use strict';
// project for in memory db is from https://github.com/louischatriot/nedb
var jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt');
  
  var Datastore = require('nedb');
var db = {};
db.users = new Datastore('../REST-api/api/db/users.db');
db.users.loadDatabase();
//{"loginid":"1560623","password":"xxxxxx","name":"asdfadfs","role":"user","email":"ererer@asdfsd.com"}

exports.register = function(req, res) {
  
  
  if(req.body.loginid && req.body.password && req.body.name && req.body.role && req.body.email){
		  db.users.findOne({ loginid: req.body.loginid}, function (err, doc) {
		  // docs is an array containing document Earth only
		  if (err)
			   res.send(err);
			   
				if(doc){
					console.log("already present");
					return res.json("Login id Already Registered");
				}else{
					var encoded = bcrypt.hashSync(req.body.password, 10);	
					req.body.password = encoded;
					
					 db.users.insert(req.body, function (err, newDoc) {   // Callback is optional
					  // newDoc is the newly inserted document, including its _id
					  // newDoc has no key called notToBeSaved since its value was undefined
					  console.log("aa");
					  if (err)
						  res.send(err);
						   console.log("user registered successfully");
						 res.send(newDoc);
					  });
				}
			 
		  });
		 																								
		  }else{
		  console.log("missing");
			    res.json( "Required fields missing");
		  }
};

exports.sign_in = function(req, res) {
  

if(req.body.loginid && req.body.password ){
		  db.users.findOne({ loginid: req.body.loginid}, function (err, doc) {

				if (err)
			  res.send(err);
			  if(doc){

			  console.log(doc.password);
			  if( bcrypt.compareSync(req.body.password, doc.password)){
				return res.json({ token: jwt.sign({ loginid: doc.loginid, email: doc.email, fullName: doc.name, _id: doc._id }, 'RESTFULAPIs',{expiresIn: 1000}) });
			  } else {
				return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
			  }
				}	else{ return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });}
		  });																							
		  }else{
			  return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
		  }
};

exports.loginRequired = function(req, res, next) {
console.log(req.user);
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
