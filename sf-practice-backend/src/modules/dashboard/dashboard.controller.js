
const {
  Controller,
  Get,
  Inject
} = require('@nestjs/common');

const { DashboardService } = require('./dashboard.service');

class DashboardController {
  constructor(dashboardService) {
    this.dashboardService = dashboardService;
  }

  getSummary() {
    return this.dashboardService.getSummary();
  }
}

Controller('dashboard')(DashboardController);
Inject(DashboardService)(DashboardController, undefined, 0);

Get('summary')(
  DashboardController.prototype,
  'getSummary',
  Object.getOwnPropertyDescriptor(
    DashboardController.prototype,
    'getSummary'
  )
);

module.exports = { DashboardController };
