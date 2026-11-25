
const { CrudService, InjectDataSource } = require('../../common/crud.service');
const { Case } = require('../../entities/case.entity');

class CasesService extends CrudService {
  constructor(dataSource) {
    super(dataSource, Case);
  }
}

InjectDataSource()(CasesService, undefined, 0);

module.exports = { CasesService };
