import {SchemaTypeDefinition} from 'sanity'

const settings: SchemaTypeDefinition = {
  title: 'Settings',
  name: 'settings',
  type: 'document',
  groups: [{title: 'SEO', name: 'seo', default: true}],
  fields: [
    {
      title: 'SEO Title',
      name: 'seo_title',
      type: 'string',
      description: 'Title used for search engines and opengraph',
      group: 'seo',
    },
    {
      title: 'SEO Description',
      name: 'seo_description',
      type: 'text',
      description: 'Description used for search engines and opengraph. (max length 400 characters)',
      group: 'seo',
    },
    {
      title: 'SEO Image',
      name: 'seo_image',
      type: 'image',
      description: 'Upload image here if you wish SEO image to be different to project image',
      group: 'seo',
    },
    {
      title: 'Canonical URL',
      name: 'canonical_url',
      type: 'url',
      group: 'seo',
    },
  ],
}

export default settings
