
const { createCrudController } = require('../../common/crud.controller');
const { TasksService } = require('./tasks.service');

const TasksController = createCrudController('tasks', TasksService);

module.exports = { TasksController };
