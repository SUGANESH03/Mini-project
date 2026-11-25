
const { createCrudController } = require('../../common/crud.controller');
const { ContactsService } = require('./contacts.service');

const ContactsController = createCrudController('contacts', ContactsService);

module.exports = { ContactsController };
