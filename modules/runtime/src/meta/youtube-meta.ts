import type {
    As,
    GetYouTubePageType,
    YouTubeEmbedUrl,
    YouTubePageType,
    YouTubeShareUrl,
    YouTubeUrl,
    YouTubeVideoUrl,
} from "inferred-types/types";
import { Never } from "inferred-types/constants";
import {
    getUrlPath,
    getUrlQueryParams,
    hasUrlQueryParameter,
    isYouTubeCreatorUrl,
    isYouTubeFeedUrl,
    isYouTubeShareUrl,
    isYouTubeUrl,
    isYouTubeVideosInPlaylist,
    isYouTubeVideoUrl,
    last,
} from "inferred-types/runtime";

/**
 * **YouTubeMeta**`<T>`
 *
 * Provides metadata about YouTube related URLs.
 */
export interface YouTubeMeta<T extends string> {
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
    >;
}

/**
 * **getYouTubePageType**`(url)`
 *
 * Returns a `YouTubePageType` description based on the url passed in (assuming
 * that URL is for YouTube). Returns _never_ if not a YouTube URL.
 */
export function getYouTubePageType<T extends string>(url: T) {
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
                        : `play::video::solo`
                : isYouTubeCreatorUrl(url)
                    ? getUrlPath(url).includes("/videos")
                        ? "creator::videos"
                        : getUrlPath(url).includes("/playlists")
                            ? "creator::playlists"
                            : last(getUrlPath(url).split("/")).startsWith("@")
                                || getUrlPath(url).includes("/featured")
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
 * **youtubeEmbed**`(url)`
 *
 * Takes a Video URL from YouTube and converts it to a "embed" URL
 * that can be put into an iframe.
 */
export function youtubeEmbed(url: YouTubeVideoUrl) {
    if (hasUrlQueryParameter(url, "v")) {
        const id = getUrlQueryParams(url, "v");
        return `https://www.youtube.com/embed/${id}` as YouTubeEmbedUrl;
    }
    else if (isYouTubeShareUrl(url)) {
        const id = url.split("/").pop() as string;
        if (id) {
            return `https://www.youtube.com/embed/${id}` as YouTubeEmbedUrl;
        }
        else {
            throw new Error(`Unexpected problem parsing share URL -- "${url}" -- into a YouTube embed URL`);
        }
    }
    else {
        throw new Error(`Unexpected URL structure; unable to convert "${url}" to a YouTube embed URL`);
    }
}

/**
 * **youtube**`(url)`
 *
 * Takes a YouTube URL and converts it to a meta-data object
 * that helps describe the intent of the URL.
 */
export function youtubeMeta<T extends string>(url: T): YouTubeMeta<T> {
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
                isYouTubeUrl: false,
            }
    ) as unknown as YouTubeMeta<T>;
}
