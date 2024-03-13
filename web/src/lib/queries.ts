import groq from 'groq';
export const media = groq`{
    media_type,
    caption,
    "isInline": isInline,
    (media_type == "image") => {
      image {
        "aspect_ratio": asset->.metadata.dimensions.aspectRatio,
        asset
      },
    },
    (media_type == "video") => {
      video {
        "aspect_ratio": asset->data.aspect_ratio,
        "playback_id": asset->playbackId,
        "upload_id": asset->uploadId,
        "asset_id": asset->assetId,
      },
      video_thumbnail {
        "aspect_ratio": asset->.metadata.dimensions.aspectRatio,
        asset
      },
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
    tags[]-> {
        _id,
        name,
        "slug": slug.current
    },
    modules[] {
        _type,

        (_type == "carousel_module") => {
            caption,
            slides[] {
                _type,
                // Handle 'media' type slides
                (_type == "media") => ${media},
                // Handle 'grid_module' type slides
                _type == "grid_module" || _type == "grid_carousel_module" => {
                    columns,
                    caption,
                    maxHeight,
                    sizePreset,
                    items[] ${media}
                }
            },
        },
        (_type == "media_module") => {
            "caption": media.caption,
            media ${media}
        },
        (_type == "grid_module") => {
            columns,
            caption,
            maxHeight,
            sizePreset,
            items[] ${media}
        },
        (_type == 'content_module') => {
            content
        },
    }
}`;

export const tagQuery = groq`*[_type == "tag" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    "projects": *[_type == "project" && references(^._id)] {
      title,
      _id,
      featured_image,
      "slug": slug.current,
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
    addresses[],
    contact[],
    clients,
    biography,
    collaborators

}`


