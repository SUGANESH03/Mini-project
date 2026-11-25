
const { Controller, Get, Inject } = require('@nestjs/common');
const { AppService } = require('./app.service');

class AppController {
  constructor(appService) {
    this.appService = appService;
  }

  getHealth() {
    return this.appService.getHello();
  }
}

Controller()(AppController);

Inject(AppService)(AppController, undefined, 0);

Get('health')(
  AppController.prototype,
  'getHealth',
  Object.getOwnPropertyDescriptor(AppController.prototype, 'getHealth')
);

module.exports = { AppController };
