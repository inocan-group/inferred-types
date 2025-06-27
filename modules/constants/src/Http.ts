/**
 * A constant array containing a comprehensive list of common MIME (Multipurpose Internet Mail Extensions) types.
 * This array is marked as `const` to enable TypeScript to infer literal types for each element.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 */
export const MIME_TYPES = [
    // Application MIME Types
    "application/json",
    "application/xml",
    "application/javascript",
    "application/pdf",
    "application/ld+json",
    "application/octet-stream",
    "application/x-www-form-urlencoded",
    "application/vnd.api+json",
    "application/msword",
    "application/grpc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    // Text MIME Types
    "text/plain",
    "text/html",
    "text/css",
    "text/csv",
    "text/javascript",
    "text/markdown",

    // Image MIME Types
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
    "image/tiff",

    // Audio MIME Types
    "audio/mpeg",
    "audio/ogg",
    "audio/wav",
    "audio/webm",
    "audio/flac",

    // Video MIME Types
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/webm",
    "video/quicktime",

    // Multipart MIME Types
    "multipart/form-data",
    "multipart/mixed",
    "multipart/alternative",
    "multipart/related",

    // Font MIME Types
    "font/woff",
    "font/woff2",
    "font/ttf",
    "font/otf",

    // Other Common MIME Types
    "application/rss+xml",
    "application/atom+xml",
    "application/x-pkcs12",
    "application/x-shockwave-flash",
    "application/x-www-form-urlencoded",
    "application/x-font-ttf",
    "application/x-font-opentype",
    "application/x-font-woff",
    "application/x-font-woff2",
    "application/vnd.rar",
    "application/zip",
    "application/x-7z-compressed",
] as const;
