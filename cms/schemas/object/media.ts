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
      title: 'Alt text',
      name: 'alt',
      type: 'string',
      hidden: (r) => r.parent?.media_type !== 'image',
    },
    {
      title: 'Video',
      name: 'video',
      type: 'mux.video',
      hidden: (r) => r.parent?.media_type !== 'video',
    },
    {
      title: 'Video thumbnail',
      name: 'video_thumbnail',
      type: 'image',
      hidden: (r) => r.parent?.media_type !== 'video',
    },
    {
      title: 'Autoplay',
      name: 'autoplay',
      type: 'boolean',
      initialValue: false,
      hidden: (r) => r.parent?.media_type !== 'video',
    },
    {
      title: 'Muted',
      name: 'muted',
      type: 'boolean',
      initialValue: true,
      hidden: (r) => r.parent?.media_type !== 'video',
    },
    {
      title: 'Video controls',
      name: 'video_controls',
      type: 'boolean',
      initialValue: false,
      hidden: (r) => r.parent?.media_type !== 'video',
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
  ],
}

export default media
