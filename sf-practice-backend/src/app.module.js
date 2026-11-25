
const { Module } = require('@nestjs/common');

const {
  ConfigModule,
  ConfigService
} = require('@nestjs/config');

const { TypeOrmModule } = require('@nestjs/typeorm');

// CRM Entities
const { Lead } = require('./entities/lead.entity');
const { Account } = require('./entities/account.entity');
const { Contact } = require('./entities/contact.entity');
const { Opportunity } = require('./entities/opportunity.entity');
const { Case } = require('./entities/case.entity');
const { Task } = require('./entities/task.entity');

// Main Controller and Service
const { AppController } = require('./app.controller');
const { AppService } = require('./app.service');

// CRM Modules
const { LeadsModule } = require('./modules/leads/leads.module');
const { AccountsModule } = require('./modules/accounts/accounts.module');
const { ContactsModule } = require('./modules/contacts/contacts.module');
const { OpportunitiesModule } = require('./modules/opportunities/opportunities.module');
const { CasesModule } = require('./modules/cases/cases.module');
const { TasksModule } = require('./modules/tasks/tasks.module');

// Dashboard Module
const { DashboardModule } = require('./modules/dashboard/dashboard.module');

class AppModule {}

Module({
  imports: [

    // Environment Configuration
    ConfigModule.forRoot({
      isGlobal: true
    }),

    // MySQL Database Connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config) => ({
        type: 'mysql',

        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),

        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),

        database: config.get('DB_DATABASE'),

        entities: [
          Lead,
          Account,
          Contact,
          Opportunity,
          Case,
          Task
        ],

        synchronize: true,
        logging: true
      })
    }),

    // CRM Modules
    LeadsModule,
    AccountsModule,
    ContactsModule,
    OpportunitiesModule,
    CasesModule,
    TasksModule,

    // Dashboard
    DashboardModule
  ],

  controllers: [
    AppController
  ],

  providers: [
    AppService
  ]

})(AppModule);

module.exports = {
  AppModule
};
