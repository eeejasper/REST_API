'use strict';

exports.list_all_tasks = function(req, res) {
 
    res.json({"name":"list"});

};


exports.create_a_task = function(req, res) {
  res.json({"name":"create"});
};

exports.read_a_task = function(req, res) {
  res.json({"name":"read"});
};

exports.update_a_task = function(req, res) {
  res.json({"name":"update"});
};
// Task.remove({}).exec(function(){});
exports.delete_a_task = function(req, res) {

  res.json({"name":"delete"});
};
