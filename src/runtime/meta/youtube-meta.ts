import {
  As,
  GetYouTubePageType,
  YouTubePageType,
  YouTubeShareUrl,
  YouTubeUrl
} from "src/types/index";
import {
  isYouTubeShareUrl,
  isYouTubeUrl
} from "src/runtime/index";


/**
 * **YouTubeMeta**`<T>`
 *
 * Provides metadata about YouTube related URLs.
 */
export type YouTubeMeta<T extends string> = {
  /**
   * The URL passed in
   */
  url: T;
  /**
   * boolean flag indicating whether the URL is a valid
   * YouTube URL.
   */
  isYouTubeUrl: T extends YouTubeUrl ? true : false;

  /**
     * boolean flag indicating whether URL is part of YouTube's `https://youtu.be`
     * URL shortener used when _sharing_ videos.
     */
  isShareUrl: T extends YouTubeShareUrl ? true : false;

  pageType: As<
    GetYouTubePageType<T>,
    YouTubePageType
  >
};


/**
 * **youtube**`(url)`
 *
 * Takes a YouTube URL and converts it to a meta-data object
 * that helps describe the intent of the URL.
 */
export const youtube = <T extends string>(url: T): YouTubeMeta<T> => {
  return (
    isYouTubeUrl(url)
    ? {
        url,
        isYouTubeUrl: true,
        isShareUrl: isYouTubeShareUrl(url),

      }
    : {
        url,
        isYouTubeUrl: false
      }
    ) as unknown as YouTubeMeta<T>;
}

