import {
  As,
  GetYouTubePageType,
  YouTubePageType,
  YouTubeShareUrl,
  YouTubeUrl
} from "src/types/index";
import {
  getUrlPath,
  hasUrlQueryParameter,
  isYouTubeCreatorUrl,
  isYouTubeFeedUrl,
  isYouTubeShareUrl,
  isYouTubeUrl,
  isYouTubeVideoUrl,
  isYouTubeVideosInPlaylist,
  last
} from "src/runtime/index";
import { Never } from "src/constants/Never";


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
 * **getYouTubePageType**`(url)`
 *
 * Returns a `YouTubePageType` description based on the url passed in (assuming
 * that URL is for YouTube). Returns _never_ if not a YouTube URL.
 */
export const getYouTubePageType = <T extends string>(url: T) => {
  return (
    isYouTubeUrl(url)
    ? isYouTubeVideoUrl(url) && (hasUrlQueryParameter(url, "v") || isYouTubeShareUrl(url))
      ? hasUrlQueryParameter(url, "list")
        ? isYouTubeShareUrl(url)
          ? hasUrlQueryParameter(url, "t")
            ? `play::video::in-list::share-link::with-timestamp`
            : `play::video::in-list::share-link`
          : `play::video::in-list`
        : isYouTubeShareUrl(url)
          ? hasUrlQueryParameter(url, "t")
            ? `play::video::solo::share-link::with-timestamp`
            : `play::video::solo::share-link`
          :  `play::video::solo`
      : isYouTubeCreatorUrl(url)
        ? getUrlPath(url).includes("/videos")
          ? "creator::videos"
        : getUrlPath(url).includes("/playlists")
          ? "creator::playlists"
        : last(getUrlPath(url).split("/")).startsWith("@") ||
          getUrlPath(url).includes("/featured")
          ? "creator::featured"
        : "creator::other"
      : isYouTubeFeedUrl(url)
        ? isYouTubeFeedUrl(url, "history")
          ? "feed::history"
        : isYouTubeFeedUrl(url, "playlists")
          ? "feed::playlists"
        : isYouTubeFeedUrl(url, "liked")
          ? "feed::liked"
        : isYouTubeFeedUrl(url, "subscriptions")
          ? "feed::subscriptions"
        : isYouTubeFeedUrl(url, "trending")
          ? "feed::trending"
          : "feed::other"
      : isYouTubeVideosInPlaylist(url)
        ? "playlist::show"
        : "other"
    : Never
  ) as unknown as GetYouTubePageType<T>;
}


/**
 * **youtube**`(url)`
 *
 * Takes a YouTube URL and converts it to a meta-data object
 * that helps describe the intent of the URL.
 */
export const youtubeMeta = <T extends string>(url: T): YouTubeMeta<T> => {
  return (
    isYouTubeUrl(url)
    ? {
        url,
        isYouTubeUrl: true,
        isShareUrl: isYouTubeShareUrl(url),
        pageType: getYouTubePageType(url) as unknown as GetYouTubePageType<T>,
      }
    : {
        url,
        isYouTubeUrl: false
      }
    ) as unknown as YouTubeMeta<T>;
}

