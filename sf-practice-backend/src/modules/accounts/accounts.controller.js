
const { createCrudController } = require('../../common/crud.controller');
const { AccountsService } = require('./accounts.service');

const AccountsController = createCrudController('accounts', AccountsService);

module.exports = { AccountsController };
