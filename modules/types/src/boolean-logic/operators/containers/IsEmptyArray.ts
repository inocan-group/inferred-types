import { GetNonVariadicLength } from "types/lists";

/**
 * Boolean operator which tests `T` for whether it is an array
 * with zero elements.
 *
 * - if `T` is a wide array it will return `boolean`
 */
export type IsEmptyArray<T> = T extends any[]
    ? number extends T["length"]
        ? GetNonVariadicLength<T> extends 0
            ? boolean
            : false
        : T["length"] extends 0
            ? true
            : false
    : false;


