'use strict';

var Datastore = require('nedb');
var db = {};
db.tasks = new Datastore('../REST-api/api/db/tasks.db');
db.tasks.loadDatabase();
//{"taskName":"sample1","status":"completed","taskDescription":"This is a sample 1 task description"}


exports.list_all_tasks = function(req, res) {
	db.tasks.find({}, function (err, docs) {
	if (err)
		  res.send(err);
		res.json(docs);
	});
	  
};


exports.create_a_task = function(req, res) {
  var new_task = req.body;
  db.tasks.insert(new_task, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
  if (err)
      res.send(err);
    res.json(newDoc);
  });
};

exports.read_a_task = function(req, res) {
  db.tasks.find({ taskName: req.params.taskName}, function (err, docs) {
  // docs is an array containing document Earth only
  if (err)
      res.send(err);
    res.json(docs);
  });
};

exports.update_a_task = function(req, res) {
   db.tasks.update({ taskName: req.params.taskName},{$set: req.body}, function (err, numReplaced) {
  // docs is an array containing document Earth only
  if (err)
      res.send(err);
    res.json(numReplaced);
  });
};
// Task.remove({}).exec(function(){});
exports.delete_a_task = function(req, res) {
 db.tasks.remove({ _id: req.params.taskName}, function (err, numRemoved) {
  // docs is an array containing document Earth only
  if (err)
      res.send(err);
    res.json(numRemoved);
  });
 
};
