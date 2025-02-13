import type {
  IsEmptyArray,
  IsEmptyObject,
  IsEmptyString,
  IsWideType,
} from "inferred-types/types";

/**
 * Boolean operator which returns `true` when `T` is:
 *
 * - `null` or `undefined`
 * - and empty array
 * - an empty object
 * - an empty string (aka, `""`)
 *
 * If `T` is a _wide_ type this will always return `boolean`
 */
export type IsEmpty<T> = T extends undefined
  ? true
  : T extends null
    ? true
    : IsWideType<T> extends true
      ? boolean
      : IsEmptyObject<T> extends true
        ? true
        : IsEmptyArray<T> extends true
          ? true
          : IsEmptyString<T> extends true
            ? true
            : false;
