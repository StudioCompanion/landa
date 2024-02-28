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
      title: 'Video thumbnail',
      name: 'video_thumbnail',
      type: 'image',
      hidden: (r) => r.parent?.media_type !== 'video',
    },
    {
      title: 'Inline Video',
      name: 'isInline',
      type: 'boolean',
      description: 'Toggle on for an inline video (autoplaying, muted, no controls). Toggle off for a full video (with controls, sound, and no autoplay).',
      initialValue: false,
      hidden: ({ parent }) => parent?.media_type !== 'video',
    },
    {
      title: 'Asset Caption',
      name: 'caption',
      type: 'string',
    },
  ],
}

export default media
