
const { createCrudController } = require('../../common/crud.controller');
const { OpportunitiesService } = require('./opportunities.service');

const OpportunitiesController = createCrudController('opportunities', OpportunitiesService);

module.exports = { OpportunitiesController };
