import type { MIME_TYPES } from "inferred-types/constants";
import type { RemoveIndexKeys, Suggest } from "inferred-types/types";

/**
 * A union of all of MIME types.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 */
export type MimeTypes = typeof MIME_TYPES[number];

/**
 * A collection of common HTTP headers and their most common values.
 * Any header not listed in this mapped type will fall back to
 * the string type through the Record<string, string> intersection.
 */
export type HttpHeaders = {
    Authorization?: Suggest<
        "Bearer adfasdfasdfasfd"
    >;
    /**
     * The "Accept" request HTTP header advertises which content types,
     * expressed as MIME types, the client is able to understand.
     *
     * @example "application/json"
     */
    "Accept"?: Suggest<[
        "application/json",
        "text/html",
        "text/plain",
        "text/xml",
        "application/xml",
        "image/jpeg",
        "image/avif",
        "image/png",
        "image/gif",
        "image/svg+xml",
        "multipart/form-data"
    ]>;

    /**
     * The "Accept-Encoding" request HTTP header advertises which content
     * encoding and compression mechanisms the client is able to understand.
     *
     * @example "gzip"
     */
    "Accept-Encoding"?: Suggest<[
        "gzip",
        "compress",
        "deflate",
        "br",
    ]>;

    /**
     * The "Accept-Language" request HTTP header advertises which languages
     * the client is able to understand.
     *
     * @example "en"
     */
    "Accept-Language"?: Suggest<[
        "en",
        "es",
        "fr",
        "de",
    ]>;

    /**
     * The "Connection" header allows the sender to specify options that
     * are desired for that particular connection.
     *
     * @example "keep-alive"
     */
    "Connection"?: Suggest<[
        "keep-alive",
        "close",
    ]>;

    /**
     * The "Content-Type" entity header is used to indicate the media type
     * of the resource.
     *
     * @example "application/json"
     */
    "Content-Type"?: Suggest<[
        "application/json",
        "text/html",
        "text/plain",
        "text/csv",
        "text/tsv",
        "application/csv",
        "text/markdown",
        "application/xml",
        "application/pdf",
        "video/mp4",
        "video/mpeg",
        "video/webm",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
    ]>;

    /**
     * The "Content-Encoding" entity header is used to compress the media-type.
     * When present, its value indicates what additional content encodings
     * have been applied to the entity body.
     *
     * @example "gzip"
     */
    "Content-Encoding"?: Suggest<[
        "gzip",
        "compress",
        "deflate",
        "br",
        "identity",
    ]>;

    /**
     * The "Cache-Control" header holds directives (instructions) for caching
     * in both requests and responses.
     *
     * @example "no-cache"
     */
    "Cache-Control"?: Suggest<[
        "no-cache",
        "no-store",
        "max-age",
        "must-revalidate",
    ]>;

    /**
     * The "Pragma" HTTP/1.0 general header is an implementation-specific
     * header that may have various effects along the request-response chain.
     *
     * @example "no-cache"
     */
    "Pragma"?: Suggest<[
        "no-cache",
    ]>;

    /**
     * The "Transfer-Encoding" header specifies the form of encoding used
     * to safely transfer the payload body to the user.
     *
     * @example "chunked"
     */
    "Transfer-Encoding"?: Suggest<[
        "chunked",
        "compress",
        "deflate",
        "gzip",
    ]>;

    /**
     * For all other headers that are either not common or have
     * many possible values, we default to a string. This intersection
     * allows additional keys as needed.
     */
} & Record<string, string>;

export type HttpHeadingKeys = Suggest<keyof RemoveIndexKeys<HttpHeaders>>;

/**
 * A singular key/value representing a HTTP Header key/value.
 */
export type HttpHeader<T extends keyof HttpHeaders> = [
  heading: Suggest<T>,
  value: Suggest<HttpHeaders[T]>,
];

/**
 * **HttpVerb**
 *
 * The available HTTP _verbs_.
 */
export type HttpVerb =
| "GET"
| "PUT"
| "POST"
| "PATCH"
| "HEAD"
| "CONNECT"
| "OPTIONS"
| "UPDATE"
| "DELETE";

/**
 * HTTP verbs which _have_ -- or at least _can have_ -- a `body` property
 */
export type HttpVerbsWithBody =
| "POST"
| "PUT"
| "DELETE"
| "UPDATE";

/**
 * HTTP verbs which do **not** have a `body` property
 */
export type HttpVerbsWithoutBody = Exclude<HttpVerb, HttpVerbsWithBody>;
