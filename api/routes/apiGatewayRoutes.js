'use strict';

module.exports = function(app) {
	var todoList = require('../controllers/todoListController.js'),
	interfaceHandlers = require('../controllers/ifaceController.js'),
	userHandlers = require('../controllers/userController.js');

	// todoList Routes
	//.post(userHandlers.loginRequired, todoList.create_a_task);
	app.route('/tasks')
		.get(todoList.list_all_tasks)
		.post(userHandlers.loginRequired,todoList.create_a_task);

	app.route('/tasks/:taskName')
		.get(todoList.read_a_task)
		.put(userHandlers.loginRequired,todoList.update_a_task)
		.delete(userHandlers.loginRequired,todoList.delete_a_task);

	app.route('/auth/register')
		.post(userHandlers.register);

	app.route('/auth/sign_in')
		.post(userHandlers.sign_in);
		
	app.route('/iface')
		.get(interfaceHandlers.list_all_iface)
		.post(interfaceHandlers.create_a_iface);
	
	app.route('/iface/:ifaceName')
		.get(interfaceHandlers.read_a_iface)
		.put(interfaceHandlers.update_a_iface)
		.delete(interfaceHandlers.delete_a_iface);
};
