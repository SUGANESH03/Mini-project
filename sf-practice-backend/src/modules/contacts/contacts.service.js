
const { CrudService, InjectDataSource } = require('../../common/crud.service');
const { Contact } = require('../../entities/contact.entity');

class ContactsService extends CrudService {
  constructor(dataSource) {
    super(dataSource, Contact);
  }
}

InjectDataSource()(ContactsService, undefined, 0);

module.exports = { ContactsService };
