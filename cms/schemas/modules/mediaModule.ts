import {SchemaTypeDefinition} from 'sanity'

const mediaModule: SchemaTypeDefinition = {
  title: 'Media Module',
  name: 'media_module',
  type: 'object',
  fields: [
    {
      title: 'Media',
      name: 'media',
      type: 'media',
    },
  ],
}

export default mediaModule
