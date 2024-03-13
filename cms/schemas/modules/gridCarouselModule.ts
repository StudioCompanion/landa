// gridCarouselModules.ts
import {SchemaTypeDefinition} from 'sanity'
import { PiGridNineFill } from "react-icons/pi";

const gridCarouselModule: SchemaTypeDefinition = {
  title: 'Grid Carousel Module',
  name: 'grid_carousel_module',
  type: 'object',
  icon: PiGridNineFill,
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
      title: 'Size Preset',
      name: 'sizePreset',
      type: 'string',
      description: 'Select a preset size for the grid module. Each preset corresponds to specific max-width values at different breakpoints.',
      options: {
        list: [
          {title: '2 Portrait', value: 'twoup'},
          {title: '3 Portrait', value: 'threeup'},
          {title: '3 by 3 Landscape', value: 'threebythree'},
          {title: '2 Landscape', value: 'twolandscape'},
          {title: '4 Portrait 2 Rows', value: '4col2row'},
          {title: 'Default', value: 'default'}
        ],
        layout: 'radio' // This displays the options as radio buttons
      }
    },
  ],
  preview: {
    select: {
      title: 'caption'
    }
  }
}

export default gridCarouselModule
