import type {
    If,
    IsArray,
    IsEqual,
    IsFalse,
    IsTrue,
    IsTuple,
    Or,
    Throw,
    ToNumericArray,
} from "inferred-types/types";

/**
 * **ToNumber**`<T>`
 *
 * - Converts `T` into a numeric type:
 *    - if `T` is a Scalar/Object it's converted to a number where possible
 *    - if `T` is an array then each element will be converted to a number where possible
 *    - any non-numeric content which can not be converted to a number will be convert to `never`
 *    - a number or a numeric array will be proxied through "as is"
 */
export type ToNumber<TValue> = IsTuple<TValue> extends true

    ? TValue extends readonly unknown[]
        ? ToNumericArray<TValue> extends readonly (number | never)[]
            ? ToNumericArray<TValue>
            : Throw<
                "can-not-convert",
                `Attempt to convert a tuple into a numeric tuple failed!`,
                "ToNumber",
                { library: "inferred-types/constants"; value: TValue }
            >
        : never
    : TValue extends number
        ? TValue
        : TValue extends `${infer Num extends number}`
            ? Num
            : If<
                Or<[ IsTrue<TValue>, IsEqual<TValue, "true"> ]>,
                1,
                If<
                    Or<[ IsFalse<TValue>, IsEqual<TValue, "false"> ]>,
                    0,
                    If<
                        IsArray<TValue>,
                        readonly (number | never)[],
                        never
                    >
                >
            >;
