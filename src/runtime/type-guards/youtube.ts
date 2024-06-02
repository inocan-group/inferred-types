import { YouTubeFeedType, YouTubeFeedUrl, YouTubePlaylistUrl, YouTubeShareUrl, YouTubeUrl } from "src/types/index";
import { isString } from "./isString";
import { isUndefined } from "./isUndefined";

/**
 * **isYouTubeUrl**`(val)`
 *
 * Type guard which checks whether the passed in value is a valid
 * YouTube URL.
 */
export const isYouTubeUrl = <T>(val: T): val is T & YouTubeUrl => {
  return isString(val) && (
    val.startsWith("https://www.youtube.com") ||
    val.startsWith("https://youtube.com") ||
    val.startsWith("https://youtu.be")
  )
}

/**
 * **isYouTubeShareUrl**`(val)`
 *
 * Type guard which checks whether the passed in value is a URL
 * from YouTube's _URL shortening_ site `https://youtu.be`.
 */
export const isYouTubeShareUrl = <T>(val:T): val is T & YouTubeShareUrl => {
  return isString(val) && val.startsWith(`https://youtu.be`);
}

/**
 * **isYouTubeVideoUrl**`(val)`
 *
 * Type guard which checks whether the passed in value is a valid
 * YouTube URL _which plays video_.
 */
export const isYouTubeVideoUrl = <T>(val: T): val is T & YouTubeUrl => {
  return isString(val) && (
    val.startsWith("https://www.youtube.com") ||
    val.startsWith("https://youtube.com") ||
    val.startsWith("https://youtu.be")
  )
}

/**
 * **isYouTubePlaylistUrl**`(val)`
 *
 * Type guard which checks whether the passed in value is a valid
 * YouTube URL which points to a "playlist" on the platform.
 */
export const isYouTubePlaylistUrl = <T>(val: T): val is T & YouTubePlaylistUrl => {
  return isString(val) && (
    val === `https://www.youtube.com/feed/playlists` ||
    val === `https://youtube.com/feed/playlists` ||
    val === `https://www.youtube.com/channel/playlists` ||
    val === `https://youtube.com/channel/playlists` ||
    ( val.startsWith(`https://www.youtube.com/@`) && val.endsWith(`/playlists`)) ||
    ( val.startsWith(`https://youtube.com/@`) && val.endsWith(`/playlists`))
  )
}

/**
 * maps the "feed type" to a URL path
 */
const feed_map = <T extends YouTubeFeedType | undefined>(type: T) => {
  return isUndefined(type)
    ? `/feed`
    : type === "liked"
    ? `/playlist?list=LL`
    : ["history","playlists","trending","subscriptions"].includes(type)
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
export const isYouTubeFeedUrl = <
  T,
  U extends YouTubeFeedType = YouTubeFeedType
>(
  val:T,
  kind?: U
): val is T & YouTubeFeedUrl<U> => {
  return isString(val) && (
    val.startsWith(`https://www.youtube.com/${feed_map(kind)}`) ||
    val.startsWith(`https://youtube.com/feed${feed_map(kind)}`)
  )
}
