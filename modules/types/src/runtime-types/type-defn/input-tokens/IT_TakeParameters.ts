import type {
    As,
    Err,
    Find,
    FromInputToken__String,
    IT_Generics,
    IT_Parameter,
    IT_TakeTokenGenerics,
    NestedSplit,
    RetainAfter,
    RetainUntil,
    Trim
} from "inferred-types/types";
import type { GenericParam } from "types/generics";

type DetermineType<
    /** the string token for the parameter type */
    T extends string,
    U extends readonly GenericParam[]
> = Find<
    U,
    "objectKeyEquals",
    ["name", T]
> extends infer Generic extends GenericParam
    ? {
        token: Generic["token"];
        type: Generic["type"];
        fromGeneric: Generic["name"];
    }

    : FromInputToken__String<Trim<T>> extends Error
        ? Err<
            `malformed-token`,
            `The parameter token's boundaries were established but while iterating over the parameter definitions we found the parameter token: '${Trim<T>}'`,
            { parameter: Trim<T>; generics: U }
        >
        : {
            token: Trim<T>;
            type: FromInputToken__String<Trim<T>>;
            fromGeneric: false;
        }

;

type AsParameters<
    TParams extends readonly string[],
    TGenerics extends readonly GenericParam[],
    TResult extends readonly IT_Parameter[] = []
> = TParams extends [infer Head extends string, ...infer Rest extends readonly string[]]

    ? Head extends `${infer Name extends string}:${infer Type extends string}`
        ? DetermineType<Trim<Type>, TGenerics> extends
        infer Info extends { type: any; fromGeneric: false | string; token: string }

            ? AsParameters<
                Rest,
                TGenerics,
                [
                    ...TResult,
                    As<{
                        name: Trim<Name>;
                        token: Info["token"];
                        fromGeneric: Info["fromGeneric"];
                        type: Info["type"];
                    }, GenericParam>
                ]
            >
            : never

        : Err<
            `malformed-token`,
            `The parameter token '' can not be parsed to find any type information!`,
            { result: TResult }
        >
    : TResult extends readonly IT_Parameter[]
        ? TResult
        : Err<
            `malformed-token`,
            `Failed while trying to parse the parameters of a function`,
            { results: TResult; params: TParams }
        >;

type TakeParameters<
    /** the token string after generics have been taken */
    T extends string,
    /** the list of available parameters */
    P extends readonly GenericParam[]
> = T extends `(${infer Rest extends string}`
    ? [
        RetainUntil<Rest, ")">,
        Trim<RetainAfter<Rest, ")">>
    ] extends [
        infer Block extends string,
        infer Rest extends string
    ]
        ? NestedSplit<Block, ","> extends infer KV extends readonly string[]
            ? {
                parameters: AsParameters<KV, P>;
                generics: P;
                rest: Rest;
            }
            : Err<
                "malformed-token",
            `The function's parameter block -- ${Block} -- was not able to be parsed!`,
            { token: T; block: Block; rest: Rest; generics: P }
            >
        : Err<
            "malformed-token",
        `The opening parenthesis indicated a parameter block should follow but was unable to find the closing parenthesis in: ${Rest}`,
        { token: T; rest: Rest; generics: P }
        >
    : Err<
        `wrong-handler`,
        `parameter blocks expect the leading character to be an open parenthesis`,
        { token: T; generics: P }
    >;

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
export type IT_TakeParameters<T extends string> = IT_TakeTokenGenerics<T> extends Err<"invalid-token">
    ? IT_TakeTokenGenerics<T>
    : IT_TakeTokenGenerics<T> extends IT_Generics
        ? TakeParameters<IT_TakeTokenGenerics<T>["rest"], IT_TakeTokenGenerics<T>["generics"]>
        : TakeParameters<T, []>;
