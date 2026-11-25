
const { CrudService, InjectDataSource } = require('../../common/crud.service');
const { Account } = require('../../entities/account.entity');

class AccountsService extends CrudService {
  constructor(dataSource) {
    super(dataSource, Account);
  }
}

InjectDataSource()(AccountsService, undefined, 0);

module.exports = { AccountsService };
