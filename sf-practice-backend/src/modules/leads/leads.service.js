
const { CrudService, InjectDataSource } = require('../../common/crud.service');
const { Lead } = require('../../entities/lead.entity');

class LeadsService extends CrudService {
  constructor(dataSource) {
    super(dataSource, Lead);
  }
}

InjectDataSource()(LeadsService, undefined, 0);

module.exports = { LeadsService };
