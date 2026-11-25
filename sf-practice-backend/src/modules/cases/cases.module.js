const { Module } = require('@nestjs/common');
const { CasesController } = require('./cases.controller');
const { CasesService } = require('./cases.service');

class CasesModule {}

Module({
  controllers: [CasesController],
  providers: [CasesService],
  exports: [CasesService],
})(CasesModule);

module.exports = { CasesModule };