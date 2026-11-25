
const { Module } = require('@nestjs/common');
const { OpportunitiesController } = require('./opportunities.controller');
const { OpportunitiesService } = require('./opportunities.service');

class OpportunitiesModule {}

Module({
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService],
  exports: [OpportunitiesService]
})(OpportunitiesModule);

module.exports = { OpportunitiesModule };
