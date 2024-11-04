import { YouTubeVideoUrl, YouTubeUrl, IsStringLiteral, GetUrlQueryParams, YouTubePlaylistUrl } from "@inferred-types/types";

type VideoUrlKind ="single-video" | "video-in-playlist" | "both";

/**
 * **IsYouTubeUrl**`<T>`
 *
 * Boolean operator which returns _true_ when the string is a
 * possible YouTube URL.
 */
export type IsYouTubeUrl<T> = [T] extends [string]
? [IsStringLiteral<T>] extends [true]
  ? [T] extends [YouTubeUrl]
    ? true
    : false
  : boolean
: false;

type _VideoKind<
  TQueryParams extends string,
  TKind extends VideoUrlKind
> = TQueryParams extends `${string}list=${string}`
? TKind extends "single-video"
  ? false
  : true
: TKind extends "video-in-playlist"
  ? false
  : true;


/**
 * **IsYouTubeVideoUrl**`<TTest,[TKind]>`
 *
 * Boolean operator which returns _true_ when the string is a
 * possible YouTube URL which is for playing a video.
 *
 * **Note:** by default any URL which plays a video is allowed but
 * you can change `TKind` to "single-video" or "video-in-playlist"
 * to isolate to just one of the play styles.
 *
 * **Related:** `IsYouTubeUrl`, `YouTubeVideoUrl`
 */
export type IsYouTubeVideoUrl<
  TTest,
  TKind extends VideoUrlKind = "both"
> = [TTest] extends [string]
? [IsStringLiteral<TTest>] extends [true]
  ? [TTest] extends [YouTubeVideoUrl]
    ? _VideoKind<GetUrlQueryParams<TTest>, TKind>
    : false
  : boolean
: false;


/**
 * **IsYouTubeUrl**`<T>`
 *
 * Boolean operator which returns _true_ when the string is a
 * possible YouTube URL.
 */
export type IsYouTubePlaylist<T> = [T] extends [string]
? [IsStringLiteral<T>] extends [true]
  ? [T] extends [YouTubePlaylistUrl]
    ? true
    : false
  : boolean
: false;

