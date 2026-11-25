
const { EntitySchema } = require('typeorm');

const Task = new EntitySchema({
  name: 'Task',
  tableName: 'tasks',

  columns: {
    Id: {
      type: 'varchar',
      length: 36,
      primary: true,
      generated: 'uuid'
    },
    Subject: { type: 'varchar', length: 200 },
    ActivityDate: { type: 'date', nullable: true },
    Status: { type: 'varchar', length: 40, default: 'Not Started' },
    Priority: { type: 'varchar', length: 20, default: 'Normal' },
    AccountId: { type: 'varchar', length: 36, nullable: true },
    ContactId: { type: 'varchar', length: 36, nullable: true },
    LeadId: { type: 'varchar', length: 36, nullable: true },
    OpportunityId: { type: 'varchar', length: 36, nullable: true },
    CaseId: { type: 'varchar', length: 36, nullable: true },
    OwnerId: { type: 'varchar', length: 36, nullable: true },
    CreatedDate: { type: 'datetime', createDate: true },
    LastModifiedDate: { type: 'datetime', updateDate: true }
  },

  relations: {
    account: {
      type: 'many-to-one',
      target: 'Account',
      inverseSide: 'tasks',
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
      inverseSide: 'tasks',
      joinColumn: {
        name: 'ContactId',
        referencedColumnName: 'Id'
      },
      nullable: true,
      onDelete: 'SET NULL'
    },
    lead: {
      type: 'many-to-one',
      target: 'Lead',
      inverseSide: 'tasks',
      joinColumn: {
        name: 'LeadId',
        referencedColumnName: 'Id'
      },
      nullable: true,
      onDelete: 'SET NULL'
    },
    opportunity: {
      type: 'many-to-one',
      target: 'Opportunity',
      inverseSide: 'tasks',
      joinColumn: {
        name: 'OpportunityId',
        referencedColumnName: 'Id'
      },
      nullable: true,
      onDelete: 'SET NULL'
    },
    case: {
      type: 'many-to-one',
      target: 'Case',
      inverseSide: 'tasks',
      joinColumn: {
        name: 'CaseId',
        referencedColumnName: 'Id'
      },
      nullable: true,
      onDelete: 'SET NULL'
    }
  }
});

module.exports = { Task };
