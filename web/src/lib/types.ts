import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type Image = {
	media_type: 'image';
	image: SanityImageSource & {
		aspect_ratio: number;
	};
	autoplay: boolean;
	rounded: boolean;
  caption: string | null;
};

export type Video = {
	media_type: 'video';
	video: {
		aspect_ratio: string;
		playback_id: string;
		upload_id: string;
		asset_id: string;
	};
	autoplay: boolean;
  muted: boolean;
	rounded: boolean;
  video_controls: boolean;
  video_thumbnail: SanityImageSource & {
    aspect_ratio: number;
  };
};

export type Media = Video | Image;
