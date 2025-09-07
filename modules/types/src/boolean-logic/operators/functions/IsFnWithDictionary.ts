import type {
    AnyFunction,
    FnMeta,
    IsAny,
    IsNever,
    IsUnknown,
    TypedFunction
} from "inferred-types/types";

/**
 * **IsFnWithDictionary**`<TFn, [TParamMatch]>`
 *
 * Checks whether `T` is a function which also includes
 * key/value dictionary sitting alongside the function.
 */
export type IsFnWithDictionary<
    T,
> = [IsAny<T>] extends [true]
    ? false
: [IsNever<T>] extends [true]
    ? false
: [IsUnknown<T>] extends [true]
    ? boolean
: T extends AnyFunction
    ? T extends TypedFunction
        ? FnMeta<T>["hasProps"]
        : boolean
: false;
