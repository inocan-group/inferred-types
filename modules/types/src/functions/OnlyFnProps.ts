import type { AnyFunction, EmptyObject, FnMeta, TypedFunction } from "inferred-types/types";

/**
 * **OnlyFnProps**`<T>`
 *
 * Takes a function `T` and strips the function away leaving only
 * any key/values that were stored alongside it.
 */
export type OnlyFnProps<
    T extends AnyFunction,
> = T extends TypedFunction
    ? FnMeta<T>["props"]
    : EmptyObject;
