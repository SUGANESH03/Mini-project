
const { Module } = require('@nestjs/common');
const { TasksController } = require('./tasks.controller');
const { TasksService } = require('./tasks.service');

class TasksModule {}

Module({
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})(TasksModule);

module.exports = { TasksModule };
