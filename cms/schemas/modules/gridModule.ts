// gridModules.ts
import {SchemaTypeDefinition} from 'sanity'
import { PiGridFourFill } from "react-icons/pi";

const gridModule: SchemaTypeDefinition = {
  title: 'Grid Module',
  name: 'grid_module',
  type: 'object',
  icon: PiGridFourFill,
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
    {
      title: 'Maximum Height',
      name: 'maxHeight',
      type: 'number',
      description: 'Set the maximum height for the grid container (in pixels)',
    },
  ],
  preview: {
    select: {
      title: 'caption'
    }
  }
}

export default gridModule
