'use strict';


  var jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt');


exports.register = function(req, res) {
  res.json({"name":"register"});
};

exports.sign_in = function(req, res) {

  console.log(req.body.email);
  console.log(req.body.password );
    if (!req.body.email || !req.body.password ) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ token: jwt.sign({ email: req.body.email, fullName: req.body.fullName, _id: req.body._id }, 'RESTFULAPIs') });
 
};

exports.loginRequired = function(req, res, next) {
  if (req.body.email) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
