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
  preview: {
    select: {
      title: 'media.caption'
    }
  }
}

export default mediaModule
