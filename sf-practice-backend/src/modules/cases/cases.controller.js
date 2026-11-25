
const { createCrudController } = require('../../common/crud.controller');
const { CasesService } = require('./cases.service');

const CasesController = createCrudController('cases', CasesService);

module.exports = { CasesController };
