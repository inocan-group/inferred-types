import type { IMAGE_FORMAT_LOOKUP } from "inferred-types/constants";
import type { Filter, GetEach } from "inferred-types/types";

/**
 * **ImgFormat**
 *
 * a union of image formats named by their most typical file extension
 *
 * **Related:** `ImgFormatWeb`
 */
export type ImgFormat = GetEach<typeof IMAGE_FORMAT_LOOKUP, "ext">[number];

/**
 * **ImgFormatWeb**
 *
 * a union type of image formats typically found on the web.
 *
 * **Related:** `ImageFormat`
 */
export type ImgFormatWeb = GetEach<
    Filter<
        typeof IMAGE_FORMAT_LOOKUP,
        "objectKeyEquals",
        ["webFormat", true]
    >,
    "ext"
>[number]
