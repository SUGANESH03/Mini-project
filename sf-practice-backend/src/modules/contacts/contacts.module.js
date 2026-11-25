
const { Module } = require('@nestjs/common');
const { ContactsController } = require('./contacts.controller');
const { ContactsService } = require('./contacts.service');

class ContactsModule {}

Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService]
})(ContactsModule);

module.exports = { ContactsModule };
