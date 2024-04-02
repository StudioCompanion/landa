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
      of: [{type: 'grid_media'}],
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
          {title: '1:1 (2 Col ✕ 1 Row)', value: 'oneone2c1r'},
          {title: '4:5 (2 Col ✕ 1 Row)', value: 'fourfive2c1r'},
          {title: '4:5 (3 Col ✕ 1 Row)', value: 'fourfive3c1r'},
          {title: '4:5 (4 Col ✕ 2 Row)', value: 'fourfive4c2r'},
          {title: '4:5 (5 Col ✕ 2 Row)', value: 'fourfive5c2r'},
          {title: '9:16 (2 Col ✕ 1 Row)', value: 'ninesixteen2c1r'},
          {title: '9:16 (3 Col ✕ 1 Row)', value: 'ninesixteen3c1r'},
          {title: '16:9 (2 Col ✕ 1 Row)', value: 'sixteennine2c1r'},
          {title: '16:9 (3 Col ✕ 3 Row)', value: 'threebythree'},
          {title: 'FrCov (2 Col ✕ 1 Row)', value: 'friezecovers2c1r'},
          {title: 'FrCov (3 Col ✕ 1 Row)', value: 'friezecovers3c1r'},
          {title: 'FrCam (3 Col ✕ 1 Row)', value: 'friezecampaigns3c1r'},
          {title: 'Gourmand (2 Col ✕ 1 Row)', value: 'gourmand2c1r'},
          {title: 'Gourmand (3 Col ✕ 1 Row)', value: 'gourmand3c1r'},
          {title: 'AD (2 Col ✕ 1 Row)', value: 'artdirection2c1r'},
          {title: 'PorCam (2 Col ✕ 1 Row)', value: 'portraitcampaigns2c1r'},
          {title: 'Sherman (2 Col ✕ 1 Row)', value: 'sherman2c2r'},
        ],
        layout: 'radio',
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
