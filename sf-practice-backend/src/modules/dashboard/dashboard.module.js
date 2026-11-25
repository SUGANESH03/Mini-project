
const { Module } = require('@nestjs/common');

const { DashboardController } = require('./dashboard.controller');
const { DashboardService } = require('./dashboard.service');

class DashboardModule {}

Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService]
})(DashboardModule);

module.exports = { DashboardModule };
