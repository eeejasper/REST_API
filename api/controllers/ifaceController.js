'use strict';

var Datastore = require('nedb');
var db = {};
db.iface = new Datastore('../REST-api/api/db/iface.db');
db.iface.loadDatabase();
//{"ifaceName":"sample1","versions":"e10,e11","countries":"IN,MY","uploads":"yes","downloads":"No"}


exports.list_all_iface = function(req, res) {
	db.iface.find({}, function (err, docs) {
	if (err)
		  res.send(err);
		res.json(docs);
	});
	  
};


exports.create_a_iface = function(req, res) {
  var new_iface = req.body;
  console.log(req.body);
  db.iface.insert(new_iface, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
  if (err)
      res.send(err);
    res.json(newDoc);
  });
};

exports.read_a_iface = function(req, res) {
  db.iface.find({ ifaceName: req.params.ifaceName}, function (err, docs) {
  // docs is an array containing document Earth only
  if (err)
      res.send(err);
    res.json(docs);
  });
};

exports.update_a_iface = function(req, res) {
   db.iface.update({ ifaceName: req.params.ifaceName},{$set: req.body}, function (err, numReplaced) {
  // docs is an array containing document Earth only
  if (err)
      res.send(err);
    res.json(numReplaced);
  });
};
// Task.remove({}).exec(function(){});
exports.delete_a_iface = function(req, res) {
 db.iface.remove({ _id: req.params.ifaceName}, function (err, numRemoved) {
  // docs is an array containing document Earth only
  if (err)
      res.send(err);
    res.json(numRemoved);
  });
 
};
