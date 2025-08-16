import type {
    AnyQueryParams,
    Contains,
    GetUrlPath,
    HasQueryParameter,
    IsEqual,
    Last,
    Opt,
    Split,
    UrlsFrom,
} from "inferred-types/types";

/**
 * **YouTubePageType**
 *
 * A union type enumeration of the _types_ of pages on YouTube.
 */
export type YouTubePageType
    = | "home"
    | "play::video::solo"
    | "play::video::solo::share-link"
    | "play::video::solo::share-link::with-timestamp"
    | "play::video::in-list"
    | "play::video::in-list::share-link"
    | "play::video::in-list::share-link::with-timestamp"
    | "playlist::show"
    | "creator::featured"
    | "creator::videos"
    | "creator::playlists"
    | "creator::other"
    | "feed::history"
    | "feed::playlists"
    | "feed::liked"
    | "feed::subscriptions"
    | "feed::trending"
    | "feed::other"
    | "other";

export type YouTubeFeedType = "history" | "playlists" | "liked" | "subscriptions" | "trending" | "other";

/**
 * **YouTubeUrl**
 *
 * A type which should match all URL's pointing to YouTube
 */
export type YouTubeUrl = UrlsFrom<["www.youtube.com", "youtube.com", "youtu.be"]>;

/**
 * **YouTubeHome**
 *
 * The URLs representing the home page of YouTube
 */
export type YouTubeHome = `https://www.youtube.com${AnyQueryParams}` | `https://youtube.com${AnyQueryParams}`;

/**
 * **YouTubeShareUrl**
 *
 * a URL which comes from YouTube's _URL shortened_ `https://youtu.be` site.
 */
export type YouTubeShareUrl = UrlsFrom<"youtu.be">;

/**
 * **YouTubeVideo**
 *
 * Type pattern which will match all URL's which relate to
 * a YouTubeVideo.
 *
 * **Note:** there can be some _false positives_ when the query parameters
 * may state that this is a video to watch in a list of videos. You can avoid
 * this ambiguity with the `IsYouTubeVideo` and `IsYouTubeList` operators.
 */
export type YouTubeVideoUrl
    = `https://www.youtube.com/watch?${string}v=${string}` | `https://youtube.com/watch?${string}v=${string}`
    | YouTubeShareUrl;

/**
 * **YouTubeCreatorUrl**
 *
 * Pages associated with a YouTube creator. This can include your own
 * pages even if you don't consider yourself a full creator (yet).
 */
export type YouTubeCreatorUrl = UrlsFrom<[
  `www.youtube.com/channel/${string}`,
  `youtube.com/channel/${string}`,
]> | `https://www.youtube.com/@${string}${Opt<"/featured" | "/videos" | "/playlists">}`;

export type YouTubeEmbedUrl<TVideo extends string = string> = UrlsFrom<[
  `www.youtube.com/embed/${TVideo}`,
  `youtube.com/embed/${TVideo}`,
]>;

/**
 * **YouTubePlaylistUrl**
 *
 * A URL pattern which should match all playlist URL's on YouTube.
 * That includes both the logged in user's as well as other peoples.
 *
 * **Related:** `YouTubeUsersPlaylistUrl`
 */
export type YouTubePlaylistUrl = UrlsFrom<[
    `www.youtube.com/channel/playlists`,
  `www.youtube.com/@${string}/playlists`,
  `youtube.com/channel/playlists`,
  `youtube.com/@${string}/playlists`,
]> | YouTubeUsersPlaylistUrl;

type _FeedMap<T extends YouTubeFeedType> = IsEqual<T, YouTubeFeedType> extends true
    ? `feed`
    : T extends "liked"
        ? `playlist?list=LL`
        : Contains<["history", "playlists", "trending", "subscriptions"], T> extends true
            ? `feed/${T}`
            : `feed/${string}`;

/**
 * **YouTubeFeedUrl**`<[T]>`
 *
 * A URL pattern which matches all "feeds" on YouTube where
 * "feeds" are pages that organize videos/content for a logged
 * in user based on their configuration.
 *
 * By default, all feed URLs are matched but you can narrow
 * this matching down by choosing a value for `T` in the
 * `YouTubeFeedType` union.
 */
export type YouTubeFeedUrl<
    T extends YouTubeFeedType = YouTubeFeedType,
>
    = | `https://www.youtube.com/feed/${T}${string}`
    | `https://youtube.com/feed/${T}${string}`;

/**
 * **YouTubeUsersPlaylistUrl**
 *
 * The URL which brings a logged in user to their own playlists.
 *
 * **Related:** `YouTubePlaylistUrl`
 */
export type YouTubeUsersPlaylistUrl = `https://www.youtube.com/feed/playlists${AnyQueryParams}`;

/**
 * **YouTubeLikedPlaylistUrl**
 *
 * The URL which brings a logged in user to a playlist of their _liked_
 * videos.
 */
export type YouTubeLikedPlaylistUrl = `https://www.youtube.com/playlist?${string}list=LL${string}`;

/**
 * **YouTubeVideosInPlaylist**
 *
 * A URL which shows all the videos in a given playlist
 */
export type YouTubeVideosInPlaylist = `https://www.youtube.com/playlist?${string}list=${string}`;

/**
 * **YouTubeHistoryUrl**
 *
 * The URL which brings a logged in user to a list of their previously watched
 * videos.
 */
export type YouTubeHistoryUrl = `https://www.youtube.com/feed/history${AnyQueryParams}`;

/**
 * **YouTubeSubscriptionsUrl**
 *
 * The URL which brings a logged in user to their list of subscriptions.
 */
export type YouTubeSubscriptionsUrl = `https://www.youtube.com/feed/subscriptions${AnyQueryParams}`;

/**
 * **GetYouTubePageType**`<T>`
 *
 * Given a URL passed into `T`, this utility will give you an indication
 * of what type of YouTube content you'll find at this location (or return
 * _never_ if it's not a YouTube URL).
 */
export type GetYouTubePageType<T> = T extends YouTubeUrl
    ? T extends YouTubeHome
        ? "home"
        : T extends YouTubeVideoUrl
            ? HasQueryParameter<T, "list"> extends true
                ? T extends YouTubeShareUrl
                    ? HasQueryParameter<T, "t"> extends true
                        ? "play::video::in-list::share-link::with-timestamp"
                        : "play::video::in-list::share-link"
                    : "play::video::in-list"
                : T extends YouTubeShareUrl
                    ? HasQueryParameter<T, "t"> extends true
                        ? "play::video::solo::share-link::with-timestamp"
                        : "play::video::solo::share-link"
                    : "play::video::solo"
            : T extends YouTubeCreatorUrl
                ? GetUrlPath<T> extends `${string}/videos`
                    ? "creator::videos"
                    : GetUrlPath<T> extends `${string}/playlists`
                        ? "creator::playlists"
                        : Last<Split<GetUrlPath<T>, "/">> extends `@${string}`
                            ? "creator::featured"
                            : GetUrlPath<T> extends `${string}/featured`
                                ? "creator::featured"
                                : "creator::other"
                : T extends YouTubeFeedUrl
                    ? T extends YouTubeFeedUrl<"history">
                        ? "feed::history"
                        : T extends YouTubeFeedUrl<"playlists">
                            ? "feed::playlists"
                            : T extends YouTubeFeedUrl<"liked">
                                ? "feed::liked"
                                : T extends YouTubeFeedUrl<"subscriptions">
                                    ? "feed::subscriptions"
                                    : T extends YouTubeFeedUrl<"trending">
                                        ? "feed::trending"
                                        : "feed::other"
                    : T extends YouTubeVideosInPlaylist
                        ? "playlist::show"
                        : "other"
    : never;
