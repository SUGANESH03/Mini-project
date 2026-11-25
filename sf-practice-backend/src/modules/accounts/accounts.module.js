
const { Module } = require('@nestjs/common');
const { AccountsController } = require('./accounts.controller');
const { AccountsService } = require('./accounts.service');

class AccountsModule {}

Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService]
})(AccountsModule);

module.exports = { AccountsModule };
