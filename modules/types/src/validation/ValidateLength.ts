import type { AsNumber, Err, IndexOf, IsGreaterThanOrEqual, IsLessThanOrEqual, IsWideArray, Length, ToStringLiteral__Array } from "inferred-types/types";

export type ValidateLengthOptions = {
    min: number;
} | {
    max: number;
} | {
    min: number;
    max: number;
};

export type ValidateMin<
    T extends number,
    O extends ValidateLengthOptions
> = "min" extends keyof O
    ? O["min"] extends infer Min extends number
        ? IsGreaterThanOrEqual<T, Min>
        : never
    : true;

export type ValidateMax<
    T extends number,
    O extends ValidateLengthOptions
> = "max" extends keyof O
    ? O["max"] extends infer Max extends number
        ? IsLessThanOrEqual<T, Max>
        : never
    : true;

type NotMatched<
    T extends string | number | readonly unknown[],
    O extends ValidateLengthOptions,
    Opt extends { min: number | undefined; max: number | undefined } = {
        min: IndexOf<O, "min", undefined>;
        max: IndexOf<O, "max", undefined>;
    }
> = ValidateMin<Length<T>, O> extends false
    ? Err<
        `invalid-length/min`,
        T extends string
            ? `The string '${T}' is required to have a minimum of ${Opt["min"]} characters but had a length of ${Length<T>}!`
            : T extends number
                ? `The number '${T}' is required to have a minimum of ${Opt["min"]} numeric digits (negative sign and decimal place marker are not counted) but had a length of ${Length<T>}!`
                : T extends readonly unknown[]
                    ? `The array '${ToStringLiteral__Array<T>}' is required to have a minimum of ${Opt["min"]} elements but had a length of ${Length<T>}!`
                    : never,
        { content: T; options: Opt; length: Length<T>; min: Opt["min"] }
    >
    : ValidateMax<Length<T>, O> extends false
        ? Err<
            `invalid-length/max`,
            T extends string
                ? `The string '${T}' is required to have a maximum of ${Opt["max"]} characters but had a length of ${Length<T>}!`
                : T extends number
                    ? `The number '${T}' is required to have a maximum of ${Opt["max"]} numeric digits (negative sign and decimal place marker are not counted) but had a length of ${Length<T>}!`
                    : T extends readonly unknown[]
                        ? `The array '${ToStringLiteral__Array<T>}' is required to have a maximum of ${Opt["max"]} elements but had a length of ${Length<T>}!`
                        : never,
            { content: T; options: Opt; length: Length<T>; max: Opt["max"] }
        >
        : never;

type Test<
    T extends string | number | readonly unknown[],
    N extends number,
    O extends ValidateLengthOptions
> = [ValidateMin<N, O>] extends [true]
    ? [ValidateMax<N, O>] extends [true]
        ? T
        : NotMatched<T, O>
    : NotMatched<T, O>;

/**
 * **ValidateLength**`<T, O>`
 *
 * Tests whether the content in `T` has a length that matches the
 * constraints of `O`. The `O` generic:
 *
 * - provides a `min` property to set a minimum length
 * - provides a `max` property to set a maximum length
 *
 * If `T` does not match the constraints imposed by `O` then
 * a `Err<invalid-length>` error will be returned.
 *
 * **Note:** the length of a number passed in refers to the number of
 * _numeric digits_. This means that characters like `-` or `.` which
 * might be present in a negative or floating point number are NOT counted.
 *
 * ```ts
 * // "foobar"
 * type Foobar = ValidateLength<"foobar", { max: 10 }>;
 * // Err<"invalid-type/max">
 * type NotFoobar = Validate<"foobar", { min: 3; max: 4 }>;
 * ```
 */
export type ValidateLength<
    T extends string | number | readonly unknown[],
    O extends ValidateLengthOptions
> = T extends readonly unknown[]
    ? [IsWideArray<T>] extends [true]
        ? T | Err<`invalid-length/${"min" | "max"}`>
        : Test<T, T["length"], O>

    : T extends string
        ? string extends T
            ? T | Err<`invalid-length/${"min" | "max"}`>
            : Test<T, Length<T>, O>
        : T extends number
            ? ValidateLength<`${T}`, O> extends `${number}`
                ? AsNumber<ValidateLength<`${T}`, O>>
                : ValidateLength<`${T}`, O>
            : never;
