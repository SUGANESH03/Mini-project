
const { Module } = require('@nestjs/common');
const { LeadsController } = require('./leads.controller');
const { LeadsService } = require('./leads.service');

class LeadsModule {}

Module({
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService]
})(LeadsModule);

module.exports = { LeadsModule };
