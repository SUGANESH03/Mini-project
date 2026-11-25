
const { EntitySchema } = require('typeorm');

const Opportunity = new EntitySchema({
  name: 'Opportunity',
  tableName: 'opportunities',

  columns: {
    Id: {
      type: 'varchar',
      length: 36,
      primary: true,
      generated: 'uuid'
    },
    Name: { type: 'varchar', length: 150 },
    AccountId: { type: 'varchar', length: 36, nullable: true },
    StageName: { type: 'varchar', length: 100 },
    Amount: {
      type: 'decimal',
      precision: 15,
      scale: 2,
      nullable: true
    },
    CloseDate: { type: 'date', nullable: true },
    Probability: { type: 'int', nullable: true },
    OwnerId: { type: 'varchar', length: 36, nullable: true },
    CreatedDate: { type: 'datetime', createDate: true },
    LastModifiedDate: { type: 'datetime', updateDate: true }
  },

  relations: {
    account: {
      type: 'many-to-one',
      target: 'Account',
      inverseSide: 'opportunities',
      joinColumn: {
        name: 'AccountId',
        referencedColumnName: 'Id'
      },
      nullable: true,
      onDelete: 'SET NULL'
    },
    tasks: {
      type: 'one-to-many',
      target: 'Task',
      inverseSide: 'opportunity'
    }
  }
});

module.exports = { Opportunity };
