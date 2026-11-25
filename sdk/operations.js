
export const MODULE_FIELDS = {
  leads: [
    'FirstName',
    'LastName',
    'Company',
    'Email',
    'Phone',
    'Status',
    'LeadSource',
    'Rating',
    'Industry',
  ],

  accounts: [
    'Name',
    'Industry',
    'Website',
    'Phone',
    'AnnualRevenue',
    'BillingCity',
  ],

  contacts: [
    'FirstName',
    'LastName',
    'Email',
    'Phone',
    'Title',
    'AccountId',
  ],

  opportunities: [
    'Name',
    'AccountId',
    'StageName',
    'Amount',
    'CloseDate',
    'Probability',
  ],

  cases: [
    'Subject',
    'Description',
    'AccountId',
    'ContactId',
    'Status',
    'Priority',
    'Origin',
  ],

  tasks: [
    'Subject',
    'Status',
    'Priority',
    'ActivityDate',
    'RelatedToId',
  ],
}

const OBJECT_NAMES = {
  leads: 'Lead',
  accounts: 'Account',
  contacts: 'Contact',
  opportunities: 'Opportunity',
  cases: 'Case',
  tasks: 'Task',
}

export function buildListQuery(module) {
  const object = OBJECT_NAMES[module]
  const fields = MODULE_FIELDS[module]

  if (!object || !fields) {
    throw new Error(`Unsupported CRM module: ${module}`)
  }

  const selections = [
    'Id',
    ...fields.map((field) => `${field} { value }`),
  ].join('\n')

  return `
    query ListRecords {
      uiapi {
        query {
          ${object}(first: 200) {
            totalCount
            edges {
              node {
                ${selections}
              }
            }
          }
        }
      }
    }
  `
}

export function buildMutation(module, action) {
  const object = OBJECT_NAMES[module]
  const fields = MODULE_FIELDS[module]

  const actions = {
    create: 'Create',
    update: 'Update',
    delete: 'Delete',
  }

  const mutationAction = actions[action]

  if (!object || !fields || !mutationAction) {
    throw new Error(`Unsupported mutation: ${module} ${action}`)
  }

  const mutationName = `${object}${mutationAction}`

  if (action === 'delete') {
    return `
      mutation DeleteRecord($input: ${object}DeleteInput!) {
        ${mutationName}(input: $input) {
          success
          deletedId
        }
      }
    `
  }

  const selections = [
    'Id',
    ...fields.map((field) => `${field} { value }`),
  ].join('\n')

  return `
    mutation SaveRecord($input: ${object}${mutationAction}Input!) {
      ${mutationName}(input: $input) {
        success
        Record {
          ${selections}
        }
      }
    }
  `
}

export const OBJECT_NAMES_EXPORT = OBJECT_NAMES
