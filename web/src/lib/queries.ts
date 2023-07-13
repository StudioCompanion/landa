import groq from 'groq';
export const media = groq`{
media_type,
(media_type == "image") => {
    image {
      "aspect_ratio": asset->.metadata.dimensions.aspectRatio,
        asset   
    }
  },
  (media_type == "video") => {
    video {
        "aspect_ratio": asset->data.aspect_ratio,
        "playback_id": asset->playbackId,
          "upload_id": asset->uploadId,
          "asset_id": asset->assetId, 
        },
        autoplay,
        rounded
  }
}`;

export const homepageQuery = groq`*[_type == "homepage"][0] { 
    bio
}`;

export const splashscreen = groq`*[_type == "splashscreen"][0] {
    images
}`;

export const projectsQuery = groq`*[_type == 'project']|order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    caption,
    featured_image
}`;

export const projectsHomepageQuery = groq`*[_type == 'project' && show_homepage == true]|order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    caption,
    featured_image
}`;

export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    theme,
    "slug": slug.current,
    featured_image,
    description,
    credits,
    hero ${media},
    modules[] {
        _type,
        
        (_type == "carousel_module") => {
            full_width,
            autoplay,
            caption,
            slides[] {
                _type,
                (_type == "media") => ${media},
                (_type == "block_slide") => {
                    items[] ${media}
                }
            }
        },
        (_type == "media_module") => {
            "caption": media.caption,
            media ${media}
        },
        (_type == "grid_module") => {
            columns,
            caption,
            items[] ${media}
        },
        (_type == 'content_module') => {
            content
        }
    }
}`;

export const settingsQuery = groq`*[_type == "settings"][0] {
    seo_title,
    seo_description,
    seo_image,
    canonical_url
}`;


export const aboutQuery = groq`*[_type == "about"][0] {
    description,
    services[],
    logos[],
    addresses[],
    contact[],
    clients_title,
    biography,
    collaborators

}`


