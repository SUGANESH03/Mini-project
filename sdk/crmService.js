
import { createDataSDK } from '@salesforce/platform-sdk/data'

import {
  MODULE_FIELDS,
  OBJECT_NAMES_EXPORT,
  buildListQuery,
  buildMutation,
} from './operations'

function assertResult(result) {
  if (!result) {
    throw new Error('GraphQL capability is unavailable.')
  }

  if (result.errors?.length) {
    throw new Error(
      result.errors.map((error) => error.message).join('; ')
    )
  }

  if (!result.data) {
    throw new Error('The server returned no GraphQL data.')
  }

  return result.data
}

function unwrap(value) {
  if (value && typeof value === 'object' && 'value' in value) {
    return value.value
  }

  return value ?? ''
}

function mapRecord(node, module) {
  const record = { Id: node.Id }

  for (const field of MODULE_FIELDS[module]) {
    record[field] = unwrap(node[field])
  }

  return record
}

async function getSDK() {
  const sdk = await createDataSDK()

  if (!sdk?.graphql) {
    throw new Error('Salesforce GraphQL SDK is unavailable.')
  }

  return sdk
}

export async function listRecords(module) {
  const object = OBJECT_NAMES_EXPORT[module]

  if (!object) {
    throw new Error(`Unsupported module: ${module}`)
  }

  const sdk = await getSDK()
  const result = await sdk.graphql.query({
    query: buildListQuery(module),
  })

  const data = assertResult(result)
  const connection = data.uiapi?.query?.[object]

  if (!connection) {
    throw new Error(`Missing ${object} connection in GraphQL response.`)
  }

  const records = (connection.edges || [])
    .filter((edge) => edge?.node)
    .map((edge) => mapRecord(edge.node, module))

  return {
    records,
    count: connection.totalCount ?? records.length,
  }
}

export async function createRecord(module, fields) {
  const sdk = await getSDK()

  const result = await sdk.graphql.mutate({
    query: buildMutation(module, 'create'),
    variables: {
      input: {
        [OBJECT_NAMES_EXPORT[module]]: fields,
      },
    },
  })

  const data = assertResult(result)
  const object = OBJECT_NAMES_EXPORT[module]
  const response = data[`${object}Create`]

  if (!response?.success) {
    throw new Error(`Unable to create ${object}.`)
  }

  return response.Record
    ? mapRecord(response.Record, module)
    : response
}

export async function updateRecord(module, id, fields) {
  const sdk = await getSDK()

  const result = await sdk.graphql.mutate({
    query: buildMutation(module, 'update'),
    variables: {
      input: {
        Id: id,
        [OBJECT_NAMES_EXPORT[module]]: fields,
      },
    },
  })

  const data = assertResult(result)
  const object = OBJECT_NAMES_EXPORT[module]
  const response = data[`${object}Update`]

  if (!response?.success) {
    throw new Error(`Unable to update ${object}.`)
  }

  return response.Record
    ? mapRecord(response.Record, module)
    : response
}

export async function deleteRecord(module, id) {
  const sdk = await getSDK()

  const result = await sdk.graphql.mutate({
    query: buildMutation(module, 'delete'),
    variables: {
      input: {
        Id: id,
      },
    },
  })

  const data = assertResult(result)
  const object = OBJECT_NAMES_EXPORT[module]
  const response = data[`${object}Delete`]

  if (!response?.success) {
    throw new Error(`Unable to delete ${object}.`)
  }

  return response
}
