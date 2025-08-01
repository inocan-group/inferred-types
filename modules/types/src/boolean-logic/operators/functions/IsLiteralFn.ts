import type {
    DefineModifiers,
    DropVariadic,
    HasModifier,
    HasVariadicTail,
    IsAny,
    IsNever,
    IsUnknown,
    TupleMeta,
    TypedFunction
} from "inferred-types/types";

export type LiteralFnModifiers = DefineModifiers<["allow-variadic-tail"]>;

type Params<T extends TypedFunction, U extends LiteralFnModifiers> = HasModifier<"allow-variadic-tail", U, LiteralFnModifiers> extends true
    ? number extends keyof DropVariadic<Parameters<T>>
        ? HasVariadicTail<Parameters<T>> extends true
            ? DropVariadic<Parameters<T>>
            : Parameters<T>
        : Parameters<T>
    : Parameters<T>;

/**
 * **IsLiteralFn**`<T>`
 *
 * A boolean operator which checks that `T` is a function with:
 *
 * - a fixed length of parameters
 *     - you can optionally allow a variadic tail to the parameters
 *     by setting `allow-variadic-tail`
 *     - if you do this then there must be at least one static parameter
 *     which is not variadic (aka, it can not be a wide array)
 * - parameter types can be any type _except for_ `any`, `unknown`, or `never`
 * - return type can be any type _except for_ `any`, `unknown`, or `never`
 *
 * **Related:**
 * - `IsFunction`, `IsWideFn`
 * - `IsStaticFn`, `IsNarrowingFn`
 */
export type IsLiteralFn<T, U extends LiteralFnModifiers = null> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : T extends TypedFunction
            ? TupleMeta<Params<T, U>>["isVariadic"] extends true
                ? false
                : IsUnknown<ReturnType<T>> extends true
                    ? false
                    : IsAny<ReturnType<T>> extends true
                        ? false
                        : IsNever<ReturnType<T>> extends true
                            ? false
                            : true
            : false;
