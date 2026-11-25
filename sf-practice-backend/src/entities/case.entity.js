
const { EntitySchema } = require('typeorm');

const Case = new EntitySchema({
  name: 'Case',
  tableName: 'cases',

  columns: {
    Id: {
      type: 'varchar',
      length: 36,
      primary: true,
      generated: 'uuid'
    },
    CaseNumber: {
      type: 'varchar',
      length: 36,
      nullable: true,
      unique: true
    },
    Subject: { type: 'varchar', length: 200 },
    Description: { type: 'text', nullable: true },
    AccountId: { type: 'varchar', length: 36, nullable: true },
    ContactId: { type: 'varchar', length: 36, nullable: true },
    Status: { type: 'varchar', length: 40, default: 'New' },
    Priority: { type: 'varchar', length: 20, default: 'Medium' },
    Origin: { type: 'varchar', length: 50, nullable: true },
    OwnerId: { type: 'varchar', length: 36, nullable: true },
    CreatedDate: { type: 'datetime', createDate: true },
    LastModifiedDate: { type: 'datetime', updateDate: true }
  },

  relations: {
    account: {
      type: 'many-to-one',
      target: 'Account',
      inverseSide: 'cases',
      joinColumn: {
        name: 'AccountId',
        referencedColumnName: 'Id'
      },
      nullable: true,
      onDelete: 'SET NULL'
    },
    contact: {
      type: 'many-to-one',
      target: 'Contact',
      inverseSide: 'cases',
      joinColumn: {
        name: 'ContactId',
        referencedColumnName: 'Id'
      },
      nullable: true,
      onDelete: 'SET NULL'
    },
    tasks: {
      type: 'one-to-many',
      target: 'Task',
      inverseSide: 'case'
    }
  }
});

module.exports = { Case };
