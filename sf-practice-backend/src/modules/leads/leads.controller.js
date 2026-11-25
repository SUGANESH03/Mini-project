
const { createCrudController } = require('../../common/crud.controller');
const { LeadsService } = require('./leads.service');

const LeadsController = createCrudController('leads', LeadsService);

module.exports = { LeadsController };
