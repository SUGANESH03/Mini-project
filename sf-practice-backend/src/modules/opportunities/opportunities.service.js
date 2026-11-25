
const { CrudService, InjectDataSource } = require('../../common/crud.service');
const { Opportunity } = require('../../entities/opportunity.entity');

class OpportunitiesService extends CrudService {
  constructor(dataSource) {
    super(dataSource, Opportunity);
  }
}

InjectDataSource()(OpportunitiesService, undefined, 0);

module.exports = { OpportunitiesService };
