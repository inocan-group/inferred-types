import type {
    DefineModifiers,
    HasModifier,
    HasVariadicTail,
    IsAny,
    IsNever,
    IsTuple,
    IsUnknown,
    Not,
    TypedFunction
} from "inferred-types/types";

export type LiteralFnModifiers = DefineModifiers<["allow-variadic-tail"]>;

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
export type IsLiteralFn<T, U extends LiteralFnModifiers = null>
    = [IsAny<T>] extends [true]
        ? false
        : [IsNever<T>] extends [true]
            ? false
            : [IsUnknown<T>] extends [true]
                ? boolean
                : T extends TypedFunction
                    ? Not<IsTuple<Parameters<T>>> extends true
                        ? HasModifier<"allow-variadic-tail", U, LiteralFnModifiers> extends true
                            ? HasVariadicTail<Parameters<T>> extends true
                                ? true
                                : false
                            : false
                        : IsUnknown<ReturnType<T>> extends true
                            ? false
                            : IsAny<ReturnType<T>> extends true
                                ? false
                                : IsNever<ReturnType<T>> extends true
                                    ? false
                                    : true
                    : false;
