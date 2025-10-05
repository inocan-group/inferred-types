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
    Trim,
    TrimEach,
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

    // Handle Array<...> where interior may reference generics
    : Trim<T> extends `Array<${infer Inner extends string}>`
        ? DetermineType<Trim<Inner>, U> extends infer InnerInfo extends { type: unknown }
            ? {
                token: Trim<T>;
                type: Array<InnerInfo["type"]>;
                fromGeneric: false;
            }
            : Err<
                `malformed-token`,
                `While parsing an Array parameter, the interior token '${Trim<Inner>}' was not parsable to a type!`,
                { parameter: Trim<T>; generics: U }
            >

    // Handle postfix arrays: T[][] and T[]
        : Trim<T> extends `${infer InnerA extends string}[][]`
            ? DetermineType<Trim<InnerA>, U> extends infer AInfo extends { type: unknown }
                ? {
                    token: Trim<T>;
                    type: AInfo["type"][][];
                    fromGeneric: false;
                }
                : Err<
                    `malformed-token`,
                `While parsing a two-dimensional array parameter, the interior token '${Trim<InnerA>}' was not parsable to a type!`,
                { parameter: Trim<T>; generics: U }
                >
            : Trim<T> extends `${infer InnerB extends string}[]`
                ? DetermineType<Trim<InnerB>, U> extends infer BInfo extends { type: unknown }
                    ? {
                        token: Trim<T>;
                        type: BInfo["type"][];
                        fromGeneric: false;
                    }
                    : Err<
                        `malformed-token`,
                    `While parsing an array parameter, the interior token '${Trim<InnerB>}' was not parsable to a type!`,
                    { parameter: Trim<T>; generics: U }
                    >

            // Handle Set<...>
                : Trim<T> extends `Set<${infer InnerS extends string}`
                    ? NestedSplit<InnerS, ">"> extends [infer Block extends string, ...infer _R extends readonly string[]]
                        ? DetermineType<Trim<Block>, U> extends infer SInfo extends { type: unknown }
                            ? {
                                token: `Set<${Trim<Block>}>`;
                                type: Set<SInfo["type"]>;
                                fromGeneric: false;
                            }
                            : Err<
                                `malformed-token`,
                    `While parsing a Set parameter, the interior token '${Trim<Block>}' was not parsable to a type!`,
                    { parameter: Trim<T>; generics: U }
                            >
                        : Err<
                            `malformed-token`,
                `The Set<...> token '${Trim<T>}' is missing a terminating '>' character!`,
                { parameter: Trim<T>; generics: U }
                        >

                // Handle Promise<...>
                    : Trim<T> extends `Promise<${infer InnerP extends string}`
                        ? NestedSplit<InnerP, ">"> extends [infer Block extends string, ...infer _R extends readonly string[]]
                            ? DetermineType<Trim<Block>, U> extends infer PInfo extends { type: unknown }
                                ? {
                                    token: `Promise<${Trim<Block>}>`;
                                    type: Promise<PInfo["type"]>;
                                    fromGeneric: false;
                                }
                                : Err<
                                    `malformed-token`,
                    `While parsing a Promise parameter, the interior token '${Trim<Block>}' was not parsable to a type!`,
                    { parameter: Trim<T>; generics: U }
                                >
                            : Err<
                                `malformed-token`,
                `The Promise<...> token '${Trim<T>}' is missing a terminating '>' character!`,
                { parameter: Trim<T>; generics: U }
                            >

                    // Handle Map<K,V>
                        : Trim<T> extends `Map<${infer RestM extends string}`
                            ? NestedSplit<RestM, ">"> extends [infer Block extends string, ...infer _R extends readonly string[]]
                                ? TrimEach<As<NestedSplit<Block, ",">, readonly string[]>> extends [
                                    infer KTok extends string,
                                    infer VTok extends string,
                                    ...infer _Extra extends readonly string[]
                                ]
                                    ? DetermineType<KTok, U> extends infer KInfo extends { type: unknown }
                                        ? DetermineType<VTok, U> extends infer VInfo extends { type: unknown }
                                            ? {
                                                token: `Map<${KTok}, ${VTok}>`;
                                                type: Map<KInfo["type"], VInfo["type"]>;
                                                fromGeneric: false;
                                            }
                                            : Err<
                                                `malformed-token`,
                            `While parsing a Map parameter, the value token '${VTok}' was not parsable to a type!`,
                            { parameter: Trim<T>; generics: U }
                                            >
                                        : Err<
                                            `malformed-token`,
                        `While parsing a Map parameter, the key token '${KTok}' was not parsable to a type!`,
                        { parameter: Trim<T>; generics: U }
                                        >
                                    : Err<
                                        `malformed-token`,
                    `The Map<...> parameter interior '${Block}' did not contain a valid 'key, value' pair!`,
                    { parameter: Trim<T>; generics: U }
                                    >
                                : Err<
                                    `malformed-token`,
                `The Map<...> token '${Trim<T>}' is missing a terminating '>' character!`,
                { parameter: Trim<T>; generics: U }
                                >

                        // Handle WeakMap<K,V>
                            : Trim<T> extends `WeakMap<${infer RestW extends string}`
                                ? NestedSplit<RestW, ">"> extends [infer Block extends string, ...infer _R extends readonly string[]]
                                    ? TrimEach<As<NestedSplit<Block, ",">, readonly string[]>> extends [
                                        infer KTok extends string,
                                        infer VTok extends string,
                                        ...infer _Extra extends readonly string[]
                                    ]
                                        ? DetermineType<KTok, U> extends infer KInfo extends { type: unknown }
                                            ? DetermineType<VTok, U> extends infer VInfo extends { type: unknown }
                                                ? {
                                                    token: `WeakMap<${KTok}, ${VTok}>`;
                                                    type: WeakMap<KInfo["type"], VInfo["type"]>;
                                                    fromGeneric: false;
                                                }
                                                : Err<
                                                    `malformed-token`,
                            `While parsing a WeakMap parameter, the value token '${VTok}' was not parsable to a type!`,
                            { parameter: Trim<T>; generics: U }
                                                >
                                            : Err<
                                                `malformed-token`,
                        `While parsing a WeakMap parameter, the key token '${KTok}' was not parsable to a type!`,
                        { parameter: Trim<T>; generics: U }
                                            >
                                        : Err<
                                            `malformed-token`,
                    `The WeakMap<...> parameter interior '${Block}' did not contain a valid 'key, value' pair!`,
                    { parameter: Trim<T>; generics: U }
                                        >
                                    : Err<
                                        `malformed-token`,
                `The WeakMap<...> token '${Trim<T>}' is missing a terminating '>' character!`,
                { parameter: Trim<T>; generics: U }
                                    >

                            // Handle Record<K,V>
                                : Trim<T> extends `Record<${infer RestR extends string}`
                                    ? NestedSplit<RestR, ">"> extends [infer Block extends string, ...infer _R extends readonly string[]]
                                        ? TrimEach<As<NestedSplit<Block, ",">, readonly string[]>> extends [
                                            infer KTok extends string,
                                            infer VTok extends string,
                                            ...infer _Extra extends readonly string[]
                                        ]
                                            ? DetermineType<KTok, U> extends infer KInfo extends { type: unknown }
                                                ? DetermineType<VTok, U> extends infer VInfo extends { type: unknown }
                                                    ? {
                                                        token: `Record<${KTok}, ${VTok}>`;
                                                        type: Record<KInfo["type"], VInfo["type"]>;
                                                        fromGeneric: false;
                                                    }
                                                    : Err<
                                                        `malformed-token`,
                            `While parsing a Record parameter, the value token '${VTok}' was not parsable to a type!`,
                            { parameter: Trim<T>; generics: U }
                                                    >
                                                : Err<
                                                    `malformed-token`,
                        `While parsing a Record parameter, the key token '${KTok}' was not parsable to a type!`,
                        { parameter: Trim<T>; generics: U }
                                                >
                                            : Err<
                                                `malformed-token`,
                    `The Record<...> parameter interior '${Block}' did not contain a valid 'key, value' pair!`,
                    { parameter: Trim<T>; generics: U }
                                            >
                                        : Err<
                                            `malformed-token`,
                `The Record<...> token '${Trim<T>}' is missing a terminating '>' character!`,
                { parameter: Trim<T>; generics: U }
                                        >

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
                                        };

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
            : Err<
                `malformed-token`,
                `function parsing failed in call to DetermineType<...>`,
                { parameters: TParams; generics: TGenerics; result: TResult; determineType: DetermineType<Trim<Type>, TGenerics> }
            >

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
        ? Trim<Block> extends ""
            ? {
                parameters: [];
                generics: P;
                rest: Rest;
            }
            : NestedSplit<Block, ","> extends infer KV extends readonly string[]
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
