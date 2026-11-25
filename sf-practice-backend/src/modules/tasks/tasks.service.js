
const { CrudService, InjectDataSource } = require('../../common/crud.service');
const { Task } = require('../../entities/task.entity');

class TasksService extends CrudService {
  constructor(dataSource) {
    super(dataSource, Task);
  }
}

InjectDataSource()(TasksService, undefined, 0);

module.exports = { TasksService };
