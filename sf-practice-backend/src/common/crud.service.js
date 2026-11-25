
const {
  Injectable,
  NotFoundException,
  BadRequestException
} = require('@nestjs/common');

const {
  InjectDataSource
} = require('@nestjs/typeorm');

const { randomUUID } = require('crypto');

class CrudService {
  constructor(dataSource, entity) {
    this.dataSource = dataSource;
    this.entity = entity;
  }

  // Get repository for current entity
  getRepository() {
    return this.dataSource.getRepository(this.entity);
  }

  // Validate UUID
  validateId(id) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (typeof id !== 'string' || !uuidRegex.test(id)) {
      throw new BadRequestException('Invalid UUID');
    }
  }

  // Relationship configuration
  getRelations() {
    const relations = {
      Lead: {
        convertedAccount: true,
        convertedContact: true
      },

      Account: {
        contacts: true,
        opportunities: true,
        cases: true,
        tasks: true
      },

      Contact: {
        account: true,
        cases: true,
        tasks: true
      },

      Opportunity: {
        account: true,
        tasks: true
      },

      Case: {
        account: true,
        contact: true,
        tasks: true
      },

      Task: {
        account: true,
        contact: true,
        lead: true,
        opportunity: true,
        case: true
      }
    };

    const entityName = this.entity.options.name;

    return relations[entityName] || {};
  }

  // Find OwnerId column
  getOwnerColumn() {
    const repository = this.getRepository();

    return repository.metadata.columns.find(column =>
      column.propertyName.toLowerCase() === 'ownerid' ||
      column.databaseName.toLowerCase() === 'ownerid'
    );
  }

  // GET all records
  async findAll() {
    return this.getRepository().find({
      relations: this.getRelations(),
      order: {
        CreatedDate: 'DESC'
      }
    });
  }

  // GET record by UUID
  async findOne(id) {
    this.validateId(id);

    const record = await this.getRepository().findOne({
      where: {
        Id: id
      },
      relations: this.getRelations()
    });

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    return record;
  }

  // Filter valid database fields
  filterData(data) {
    if (
      !data ||
      typeof data !== 'object' ||
      Array.isArray(data)
    ) {
      throw new BadRequestException('Invalid request body');
    }

    const repository = this.getRepository();

    const allowedColumns = repository.metadata.columns.filter(
      column =>
        !column.isPrimary &&
        !column.isCreateDate &&
        !column.isUpdateDate
    );

    const filteredData = {};

    for (const column of allowedColumns) {
      const propertyName = column.propertyName;
      const databaseName = column.databaseName;

      if (
        Object.prototype.hasOwnProperty.call(data, propertyName)
      ) {
        filteredData[propertyName] = data[propertyName];
      } else if (
        Object.prototype.hasOwnProperty.call(data, databaseName)
      ) {
        filteredData[propertyName] = data[databaseName];
      }
    }

    return filteredData;
  }

  // POST - Create record with unique OwnerId
  async create(data) {
    const repository = this.getRepository();

    const filteredData = this.filterData(data);

    const ownerColumn = this.getOwnerColumn();

    if (!ownerColumn) {
      throw new BadRequestException(
        'OwnerId column is missing in this CRM entity'
      );
    }

    const ownerProperty = ownerColumn.propertyName;

    // Generate a unique OwnerId if not provided
    if (
      filteredData[ownerProperty] === undefined ||
      filteredData[ownerProperty] === null ||
      filteredData[ownerProperty] === ''
    ) {
      filteredData[ownerProperty] = randomUUID();
    }

    const record = repository.create(filteredData);

    const savedRecord = await repository.save(record);

    return this.findOne(savedRecord.Id);
  }

  // PATCH - Update record
  async update(id, data) {
    const repository = this.getRepository();

    const record = await this.findOne(id);

    const filteredData = this.filterData(data);

    repository.merge(record, filteredData);

    await repository.save(record);

    return this.findOne(id);
  }

  // DELETE - Remove record
  async remove(id) {
    const repository = this.getRepository();

    const record = await this.findOne(id);

    await repository.remove(record);

    return {
      message: 'Record deleted successfully',
      id
    };
  }
}

Injectable()(CrudService);

module.exports = {
  CrudService,
  InjectDataSource
};
