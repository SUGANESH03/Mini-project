
const { EntitySchema } = require('typeorm');

const Lead = new EntitySchema({
  name: 'Lead',
  tableName: 'leads',

  columns: {
    Id: {
      type: 'varchar',
      length: 36,
      primary: true,
      generated: 'uuid'
    },
    FirstName: { type: 'varchar', length: 80, nullable: true },
    LastName: { type: 'varchar', length: 80 },
    Company: { type: 'varchar', length: 150 },
    Email: { type: 'varchar', length: 150, nullable: true },
    Phone: { type: 'varchar', length: 40, nullable: true },
    Status: { type: 'varchar', length: 50, default: 'New' },
    Rating: { type: 'varchar', length: 30, nullable: true },
    LeadSource: { type: 'varchar', length: 40, nullable: true },
    Industry: { type: 'varchar', length: 100, nullable: true },
    OwnerId: { type: 'varchar', length: 36, nullable: true },
    ConvertedAccountId: { type: 'varchar', length: 36, nullable: true },
    ConvertedContactId: { type: 'varchar', length: 36, nullable: true },
    CreatedDate: { type: 'datetime', createDate: true },
    LastModifiedDate: { type: 'datetime', updateDate: true }
  },

  relations: {
    convertedAccount: {
      type: 'many-to-one',
      target: 'Account',
      inverseSide: 'convertedLeads',
      joinColumn: {
        name: 'ConvertedAccountId',
        referencedColumnName: 'Id'
      },
      nullable: true,
      onDelete: 'SET NULL'
    },
    convertedContact: {
      type: 'many-to-one',
      target: 'Contact',
      inverseSide: 'convertedLeads',
      joinColumn: {
        name: 'ConvertedContactId',
        referencedColumnName: 'Id'
      },
      nullable: true,
      onDelete: 'SET NULL'
    },
    tasks: {
      type: 'one-to-many',
      target: 'Task',
      inverseSide: 'lead'
    }
  }
});

module.exports = { Lead };
