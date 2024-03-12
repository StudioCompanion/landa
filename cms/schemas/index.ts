import client from './documents/client'
import project from './documents/project'
import tag from './documents/tag'
import settings from './documents/settings'
import splashscreen from './documents/splashscreen'
import carouselModule from './modules/carouselModule'
import contentModule from './modules/contentModule'
import gridModule from './modules/gridModule'
import gridCarouselModule from './modules/gridCarouselModule'
import mediaModule from './modules/mediaModule'
import content from './object/content'
import media from './object/media'
import gridMedia from './object/gridMedia'
import about from './documents/about'
import homepage from './documents/homepage'
export const schemaTypes = [
  content,
  media,
  gridMedia,
  gridCarouselModule,
  carouselModule,
  contentModule,
  gridModule,
  mediaModule,
  homepage,
  project,
  tag,
  client,
  splashscreen,
  settings,
  about,
]
