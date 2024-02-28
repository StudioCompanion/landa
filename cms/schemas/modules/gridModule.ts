// gridModules.ts
import {SchemaTypeDefinition} from 'sanity'
import { BsFillGrid3X3GapFill } from "react-icons/bs";


const gridModule: SchemaTypeDefinition = {
  title: 'Grid Module',
  name: 'grid_module',
  type: 'object',
  icon: BsFillGrid3X3GapFill,
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
      of: [{type: 'grid_media'}], // Use GridMedia here
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'caption'
    }
  }
}

export default gridModule
