import {SchemaTypeDefinition} from 'sanity'

const media: SchemaTypeDefinition = {
  title: 'Media',
  name: 'media',
  type: 'object',
  fields: [
    {
      title: 'Media Type',
      name: 'media_type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
      },
      initialValue: 'image',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      hidden: (r) => r.parent?.media_type !== 'image',
    },
    {
      title: 'Video',
      name: 'video',
      type: 'mux.video',
      hidden: (r) => r.parent?.media_type !== 'video',
    },
    {
      title: 'Autoplay',
      name: 'autoplay',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Rounded corners',
      name: 'rounded',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
  ],
}

export default media
