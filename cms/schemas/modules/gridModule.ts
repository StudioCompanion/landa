import {SchemaTypeDefinition} from 'sanity'

const gridModule: SchemaTypeDefinition = {
  title: 'Grid Module',
  name: 'grid_module',
  type: 'object',
  fields: [
    {
      title: 'Number of Columns',
      name: 'columns',
      type: 'number',
      initialValue: 3,
    },
    {
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [{type: 'media'}],
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
    {
      title: 'Background Color',
      name: 'background_color',
      type: 'color',
    },
  ],
  preview: {
    select: {
      title: 'caption'
    }
  }
}

export default gridModule
