
const { EntitySchema } = require('typeorm');

const Contact = new EntitySchema({
  name: 'Contact',
  tableName: 'contacts',

  columns: {
    Id: {
      type: 'varchar',
      length: 36,
      primary: true,
      generated: 'uuid'
    },
    FirstName: { type: 'varchar', length: 80, nullable: true },
    LastName: { type: 'varchar', length: 80 },
    Email: { type: 'varchar', length: 150, nullable: true },
    Phone: { type: 'varchar', length: 40, nullable: true },
    Title: { type: 'varchar', length: 100, nullable: true },
    AccountId: { type: 'varchar', length: 36, nullable: true },
    OwnerId: { type: 'varchar', length: 36, nullable: true },
    CreatedDate: { type: 'datetime', createDate: true },
    LastModifiedDate: { type: 'datetime', updateDate: true }
  },

  relations: {
    account: {
      type: 'many-to-one',
      target: 'Account',
      inverseSide: 'contacts',
      joinColumn: {
        name: 'AccountId',
        referencedColumnName: 'Id'
      },
      nullable: true,
      onDelete: 'SET NULL'
    },
    cases: {
      type: 'one-to-many',
      target: 'Case',
      inverseSide: 'contact'
    },
    tasks: {
      type: 'one-to-many',
      target: 'Task',
      inverseSide: 'contact'
    },
    convertedLeads: {
      type: 'one-to-many',
      target: 'Lead',
      inverseSide: 'convertedContact'
    }
  }
});

module.exports = { Contact };
