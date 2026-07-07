import type { Api, Dictionary, GetEscapeFunction, IsAny, IsNever, TypedFunction } from "inferred-types/types";

/**
 * **HasEscapeFunction**`<T>`
 *
 * Checks whether the API surface passed in has an escape function defined.
 */
export type HasEscapeFunction<
    T extends Dictionary | TypedFunction | Api,
> = IsAny<T> extends true
    ? false
    : IsNever<T> extends true
        ? false
        : GetEscapeFunction<T> extends Error
            ? false
            : true;
