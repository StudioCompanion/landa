import { SchemaTypeDefinition } from 'sanity'

const quoteModule: SchemaTypeDefinition = {
  title: 'Quote Module',
  name: 'quote_module',
  type: 'object',
  fields: [
    {
      title: 'Quote',
      name: 'quote',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      title: 'Full Name',
      name: 'full_name',
      type: 'string',
    },
    {
      title: 'Job Title and Company',
      name: 'job_title',
      type: 'string',
    },
  ]
}

export default quoteModule
