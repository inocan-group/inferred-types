import type {
    As,
    Err,
    ErrType,
    Find,
    FromInputToken__String,
    IT_Parameter,
    NestedSplit,
    RetainUntil,
    SplitOnWhitespace,
    StripUntil,
    Trim
} from "inferred-types/types";
import { GenericParam } from "types/generics";

/**
 * extracts a generic name/value
 */
type Generic<T extends string> = SplitOnWhitespace<T> extends [
    infer Name extends string,
    "extends",
    infer Type extends string
]
    ? {
        kind: "generic";
        name: Name;
        typeToken: Type;
        type: FromInputToken__String<Trim<Type>>
    }
    : {
        kind: "generic";
        name: Trim<T>;
        typeToken: "unknown";
        type: unknown;
    }
;

type TakeGenerics<
    T extends string
> = T extends `<${infer Rest extends string}`
    ? NestedSplit<Rest, ">"> extends [
        infer Block extends string,
        infer Rest extends readonly string[]
    ]
        ? NestedSplit<Block, ","> extends infer Parts extends readonly string[]
            ? {
                [K in keyof Parts]: Generic<Parts[K]>
            }
            : never
    : Err<"malformed-token">
: Err<"wrong-handler">;

type DetermineType<
    /** the string token for the parameter type */
    T extends string,
    U extends readonly GenericParam[]
> = Find<
        U,
        "objectKeyEquals",
        ["name", T]
    > extends infer Generic extends GenericParam
        ? Generic["type"]
    : FromInputToken__String<Trim<T>> extends Error
        ? Err<
            `malformed-token`,
            `The parameter token's boundaries were established but while iterating over the parameter definitions we found the parameter token: '${Trim<T>}'`,
            { parameter: Trim<T>, generics: U, }
        >

;


type AsParameters<
    TParams extends readonly string[],
    TGenerics extends readonly GenericParam[],
    TResult extends readonly IT_Parameter[] = []
> = TParams extends [infer Head extends string, ...infer Rest extends readonly string[]]

    ? Rest extends `${infer Name extends string}:${infer Type extends string}`
        ? AsParameters<
            Rest,
            TGenerics,
            [
                ...TResult,
                As<{
                    name: Trim<Name>;
                    token: Type;
                    type: DetermineType<Trim<Type>, TGenerics>;
                    desc: undefined; // TODO: extract description if present
                }, GenericParam>
            ]
        >

        : Err<
            `malformed-token`,
            `The parameter token '' can not be parsed to find any type information!`
        >;

type TakeParameters<
    /** the token string after generics have been taken */
    T extends string,
    /** the list of available parameters */
    P extends readonly GenericParam[]
> = T extends `(${infer Rest extends string}`
    ? [
        RetainUntil<Rest, ")">,
        StripUntil<Rest, ")">
    ] extends [
        infer Block extends string,
        infer Rest extends string
    ]
        ? NestedSplit<Block, ","> extends infer KV extends readonly string[]
            ? AsParameters<KV, P>
            : unknown
        : Err<`malformed-token`>
: Err<`wrong-handler`>;

/**
 * **IT_TakeParameters**`<T>`
 *
 * A reusable utility for both _functions_ and _generators_ which takes:
 *
 * - **generics** _when found_
 * - **parameters** _when found_
 *
 * Like other **take** utilities, this utility returns:
 *   - a `Err<wrong-handler>` when parameters could not be found at the
 * head of the token string.
 *   - a `Err<malformed-handler>` when either the generics block (`<${string}>`) or
 * parameters block (`(${string})`) is _established_ but can not be parsed.
 *
 * On successful parsing of a parameter block it will return `IT_Parameters` type
 * which can be used to help complete the `IT_Token<"fn">` or `IT_Token<"generator">`
 * blocks required by the utilities `IT_TakeFunction` and `IT_TakeGenerator`.
 */
export type IT_TakeParameters<T extends string> = TakeGenerics<T> extends readonly GenericParam[]
    ? TakeParameters<T, TakeGenerics<T>>
: TakeGenerics<T> extends ErrType<"malformed-handler">
    ? TakeGenerics<T> // return Error
: TakeParameters<T,[]>;
