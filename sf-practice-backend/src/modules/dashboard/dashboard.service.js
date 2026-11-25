
const { Injectable } = require('@nestjs/common');
const { InjectDataSource } = require('@nestjs/typeorm');

const { Lead } = require('../../entities/lead.entity');
const { Account } = require('../../entities/account.entity');
const { Contact } = require('../../entities/contact.entity');
const { Opportunity } = require('../../entities/opportunity.entity');
const { Case } = require('../../entities/case.entity');
const { Task } = require('../../entities/task.entity');

class DashboardService {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async getSummary() {
    const [
      leads,
      accounts,
      contacts,
      opportunities,
      cases,
      tasks
    ] = await Promise.all([
      this.dataSource.getRepository(Lead).count(),
      this.dataSource.getRepository(Account).count(),
      this.dataSource.getRepository(Contact).count(),
      this.dataSource.getRepository(Opportunity).count(),
      this.dataSource.getRepository(Case).count(),
      this.dataSource.getRepository(Task).count()
    ]);

    return {
      totalLeads: leads,
      totalAccounts: accounts,
      totalContacts: contacts,
      totalOpportunities: opportunities,
      totalCases: cases,
      totalTasks: tasks,
      totalRecords:
        leads + accounts + contacts +
        opportunities + cases + tasks
    };
  }
}

Injectable()(DashboardService);
InjectDataSource()(DashboardService, undefined, 0);

module.exports = { DashboardService };
