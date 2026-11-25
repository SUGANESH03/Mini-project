
const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
  name: 'User',
  tableName: 'users',

  columns: {
    Id: {
      type: 'varchar',
      length: 36,
      primary: true,
      generated: 'uuid'
    },

    Name: {
      type: 'varchar',
      length: 120
    },

    Email: {
      type: 'varchar',
      length: 190,
      unique: true
    },

    PasswordHash: {
      type: 'varchar',
      length: 255,
      select: false
    },

    Role: {
      type: 'varchar',
      length: 20,
      default: 'USER'
    },

    IsActive: {
      type: 'boolean',
      default: true
    },

    CreatedDate: {
      type: 'datetime',
      createDate: true
    },

    LastModifiedDate: {
      type: 'datetime',
      updateDate: true
    }
  }
});

module.exports = { User };
