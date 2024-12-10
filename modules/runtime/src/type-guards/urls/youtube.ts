import type {
  YouTubeCreatorUrl,
  YouTubeFeedType,
  YouTubeFeedUrl,
  YouTubePlaylistUrl,
  YouTubeShareUrl,
  YouTubeUrl,
  YouTubeVideosInPlaylist,
} from "inferred-types/types";
import { hasUrlQueryParameter, isString, isUndefined } from "inferred-types/runtime";

/**
 * **isYouTubeUrl**`(val)`
 *
 * Type guard which checks whether the passed in value is a valid
 * YouTube URL.
 */
export function isYouTubeUrl<T>(val: T): val is T & YouTubeUrl {
  return isString(val) && (
    val.startsWith("https://www.youtube.com")
    || val.startsWith("https://youtube.com")
    || val.startsWith("https://youtu.be")
  );
}

/**
 * **isYouTubeShareUrl**`(val)`
 *
 * Type guard which checks whether the passed in value is a URL
 * from YouTube's _URL shortening_ site `https://youtu.be`.
 */
export function isYouTubeShareUrl<T>(val: T): val is T & YouTubeShareUrl {
  return isString(val) && val.startsWith(`https://youtu.be`);
}

/**
 * **isYouTubeVideoUrl**`(val)`
 *
 * Type guard which checks whether the passed in value is a valid
 * YouTube URL _which plays video_.
 */
export function isYouTubeVideoUrl<T>(val: T): val is T & YouTubeUrl {
  return isString(val) && (
    val.startsWith("https://www.youtube.com")
    || val.startsWith("https://youtube.com")
    || val.startsWith("https://youtu.be")
  );
}

/**
 * **isYouTubePlaylistUrl**`(val)`
 *
 * Type guard which checks whether the passed in value is a valid
 * YouTube URL which points to a "playlist" on the platform.
 */
export function isYouTubePlaylistUrl<T>(val: T): val is T & YouTubePlaylistUrl {
  return isString(val) && (
    val === `https://www.youtube.com/feed/playlists`
    || val === `https://youtube.com/feed/playlists`
    || val === `https://www.youtube.com/channel/playlists`
    || val === `https://youtube.com/channel/playlists`
    || (val.startsWith(`https://www.youtube.com/@`) && val.endsWith(`/playlists`))
    || (val.startsWith(`https://youtube.com/@`) && val.endsWith(`/playlists`))
  );
}

/**
 * maps the "feed type" to a URL path
 */
function feed_map<T extends YouTubeFeedType | undefined>(type: T) {
  return isUndefined(type)
    ? `/feed`
    : type === "liked"
      ? `/playlist?list=LL`
      : ["history", "playlists", "trending", "subscriptions"].includes(type)
          ? `/feed/${type}`
          : `/feed/`;
}

/**
 * **isYouTubeFeedUrl**`(val,[kind])**
 *
 * Type guard which checks whether the passed in value is a valid
 * YouTube URL which responds with "feed" content. This is content
 * which is available to a logged in user and helps them see lists
 * of videos related to their settings.
 *
 * By default any "feed" URL is matched but you can narrow that down
 * to a specific feed type by specifying the `kind` variable.
 */
export function isYouTubeFeedUrl<
  T,
  U extends YouTubeFeedType = YouTubeFeedType,
>(val: T, type?: U): val is T & YouTubeFeedUrl<U> {
  return isString(val) && (
    val.startsWith(`https://www.youtube.com${feed_map(type)}`)
    || val.startsWith(`https://youtube.com${feed_map(type)}`)
  );
}

/**
 * **isYouTubeHistoryUrl**`(val,[kind])**
 *
 * Type guard which checks whether the passed in value is a valid
 * YouTube URL which responds with a user's history feed.
 */
export function isYouTubeFeedHistoryUrl<T>(val: T) {
  return isString(val) && (
    val.startsWith(`https://www.youtube.com/feed/history`)
    || val.startsWith(`https://youtube.com/feed/history`)
  );
}

/**
 * **isYouTubePlaylistsUrl**`(val,[kind])**
 *
 * Type guard which checks whether the passed in value is a valid
 * YouTube URL which responds with a user's own playlists page.
 */
export function isYouTubePlaylistsUrl<T>(val: T) {
  return isString(val) && (
    val.startsWith(`https://www.youtube.com/feed/playlists`)
    || val.startsWith(`https://youtube.com/feed/playlists`)
  );
}

/**
 * **isYouTubeTrendingUrl**`(val,[kind])**
 *
 * Type guard which checks whether the passed in value is a valid
 * YouTube URL which responds with a user's own history feed.
 */
export function isYouTubeTrendingUrl<T>(val: T) {
  return isString(val) && (
    val.startsWith(`https://www.youtube.com/feed/trending`)
    || val.startsWith(`https://youtube.com/feed/trending`)
  );
}

/**
 * **isYouTubeSubscriptionsUrl**`(val,[kind])**
 *
 * Type guard which checks whether the passed in value is a valid
 * YouTube URL which responds with a user's own subscriptions feed.
 */
export function isYouTubeSubscriptionsUrl<T>(val: T) {
  return isString(val) && (
    val.startsWith(`https://www.youtube.com/feed/subscriptions`)
    || val.startsWith(`https://youtube.com/feed/subscriptions`)
  );
}

export function isYouTubeCreatorUrl<T extends string>(url: T): url is T & YouTubeCreatorUrl {
  return isString(url) && (
    url.startsWith(`https://www.youtube.com/@`)
    || url.startsWith(`https://youtube.com/@`)
    || url.startsWith(`https://www.youtube.com/channel/`)
  );
}

export function isYouTubeVideosInPlaylist<T>(val: T): val is T & YouTubeVideosInPlaylist {
  return isString(val) && (
    val.startsWith(`https://www.youtube.com/playlist?`)
    || val.startsWith(`https://youtube.com/playlist?`)
  ) && hasUrlQueryParameter(val, "list");
}
