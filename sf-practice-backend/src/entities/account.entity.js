
const { EntitySchema } = require('typeorm');

const Account = new EntitySchema({
  name: 'Account',
  tableName: 'accounts',

  columns: {
    Id: {
      type: 'varchar',
      length: 36,
      primary: true,
      generated: 'uuid'
    },
    Name: { type: 'varchar', length: 150 },
    Industry: { type: 'varchar', length: 100, nullable: true },
    Website: { type: 'varchar', length: 255, nullable: true },
    Phone: { type: 'varchar', length: 30, nullable: true },
    AnnualRevenue: {
      type: 'decimal',
      precision: 15,
      scale: 2,
      nullable: true
    },
    BillingCity: { type: 'varchar', length: 100, nullable: true },
    OwnerId: { type: 'varchar', length: 36, nullable: true },
    CreatedDate: { type: 'datetime', createDate: true },
    LastModifiedDate: { type: 'datetime', updateDate: true }
  },

  relations: {
    contacts: {
      type: 'one-to-many',
      target: 'Contact',
      inverseSide: 'account'
    },
    opportunities: {
      type: 'one-to-many',
      target: 'Opportunity',
      inverseSide: 'account'
    },
    cases: {
      type: 'one-to-many',
      target: 'Case',
      inverseSide: 'account'
    },
    tasks: {
      type: 'one-to-many',
      target: 'Task',
      inverseSide: 'account'
    },
    convertedLeads: {
      type: 'one-to-many',
      target: 'Lead',
      inverseSide: 'convertedAccount'
    }
  }
});

module.exports = { Account };
