import {SchemaTypeDefinition} from 'sanity'
import {orderRankField} from '@sanity/orderable-document-list'
const project: SchemaTypeDefinition = {
  title: 'Project',
  name: 'project',
  type: 'document',
  groups: [
    {name: 'general', title: 'General'},
    {name: 'modules', title: 'Modules'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      group: 'general',
    },
    {
      title: 'Caption',
      name: 'caption',
      description: 'This is displayed on the homepage',
      type: 'content',
      group: 'general',
    },
    {
      title: 'Slug',
      name: 'slug',
      description: 'This is how you access it in the url under /work/slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      group: 'general',
    },
    {
      title: 'Client',
      name: 'client',
      type: 'reference',
      to: [{type: 'client'}],
      group: 'general',
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
      group: 'general',
    },
    {
      title: 'Overview Image',
      name: 'featured_image',
      description: 'This is used in the /work page',
      type: 'image',
      group: 'general',
    },
    {
      name: "image_stack",
      title: "Image Stack",
      type: 'array',
      of: [{type: 'image'}],
      validation: (Rule) =>
        Rule.custom((field, context) =>
          context.document.image_flicker === undefined && field === undefined
            ? "Either Image Stack or Homepage Image must have a value"
            : true
        ),
    },
    {
      name: "image_flicker",
      title: "Homepage Image",
      type: 'image',
      group: 'general',
      validation: (Rule) =>
        Rule.custom((field, context) =>
          context.document.image_stack === undefined && field === undefined
            ? "Either Image Stack or Homepage Image must have a value"
            : true
        ),
    },
    {
      title: 'Show on homepage',
      name: 'show_homepage',
      description: 'Should this project feature on the homepage?',
      type: 'boolean',
      initialValue: false,
      group: 'general',
    },
    {
      title: 'Description',
      description: 'Project description',
      name: 'description',
      type: 'content',
      group: 'modules',
    },
    {
      title: 'Modules',
      name: 'modules',
      type: 'array',
      group: 'modules',
      of: [
        {type: 'carousel_module'},
        {type: 'content_module'},
        {type: 'grid_module'},
        {type: 'media_module'},
      ],
    },
    {
      title: 'Credits',
      name: 'credits',
      type: 'content',
      group: 'modules',
    },
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
    orderRankField({type: 'string'}),
  ],
  preview: {
    select: {
      show_homepage: 'show_homepage',
      title: 'title',
      featured_image: 'featured_image',
      client: 'client.title',
    },
    prepare: (v) => {
      return {
        title: `${v.title} ${v.show_homepage ? '☗' : ''}`,
        subtitle: `${v.caption ? `${v.caption}${v.client ? ', ' : ''}` : ''}${
          v.client ? v.client : ''
        }`,
        media: v.featured_image,
      }
    },
  },
}

export default project
