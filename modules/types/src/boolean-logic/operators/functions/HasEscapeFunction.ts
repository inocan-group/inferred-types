import type { Api, Dictionary, GetEscapeFunction, TypedFunction } from "inferred-types/types";

/**
 * **HasEscapeFunction**`<T>`
 *
 * Checks whether the API surface passed in has an escape function defined.
 */
export type HasEscapeFunction<
    T extends Dictionary | TypedFunction | Api,
> = GetEscapeFunction<T> extends Error
    ? false
    : true;
