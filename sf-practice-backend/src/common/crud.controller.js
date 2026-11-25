
const {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Inject
} = require('@nestjs/common');

function createCrudController(resource, ServiceClass) {

  class ResourceController {
    constructor(service) {
      this.service = service;
    }

    findAll() {
      return this.service.findAll();
    }

    findOne(id) {
      return this.service.findOne(id);
    }

    create(data) {
      return this.service.create(data);
    }

    update(id, data) {
      return this.service.update(id, data);
    }

    remove(id) {
      return this.service.remove(id);
    }
  }

  Controller(resource)(ResourceController);

  Inject(ServiceClass)(
    ResourceController,
    undefined,
    0
  );

  const prototype = ResourceController.prototype;

  Get()(
    prototype,
    'findAll',
    Object.getOwnPropertyDescriptor(prototype, 'findAll')
  );

  Get(':id')(
    prototype,
    'findOne',
    Object.getOwnPropertyDescriptor(prototype, 'findOne')
  );

  Param('id')(prototype, 'findOne', 0);

  Post()(
    prototype,
    'create',
    Object.getOwnPropertyDescriptor(prototype, 'create')
  );

  Body()(prototype, 'create', 0);

  Patch(':id')(
    prototype,
    'update',
    Object.getOwnPropertyDescriptor(prototype, 'update')
  );

  Param('id')(prototype, 'update', 0);
  Body()(prototype, 'update', 1);

  Delete(':id')(
    prototype,
    'remove',
    Object.getOwnPropertyDescriptor(prototype, 'remove')
  );

  Param('id')(prototype, 'remove', 0);

  return ResourceController;
}

module.exports = { createCrudController };
