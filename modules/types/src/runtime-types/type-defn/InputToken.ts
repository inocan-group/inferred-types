import type {
    AfterFirst,
    Dictionary,
    EmptyObject,
    Err,
    ExpandDictionary,
    First,
    FirstSet,
    InputTokenLike,
    Join,
    Last,
    Length,
    StringKeys,
    ToJson,
    ToStringArray,
    Trim,
} from "inferred-types/types";

import type {
    FnReturns,
    InputTokenSuggestions,
    IT_ContainerType,
    InputToken__Object,
    IT_TakeArray,
    IT_TakeAtomic,
    IT_TakeFunction,
    IT_TakeGenerator,
    IT_TakeLiteral,
    IT_TakeMap,
    IT_TakeObject,
    IT_TakeRecord,
    IT_TakeSet,
    IT_TakeTerminalDelimiter,
    IT_TakeTuple,
    IT_TakeUnionDelimiter,
    IT_TakeWeakMap
} from "./input-tokens/index";

export type {
    InputTokenLike,
    InputTokenSuggestions,
    IT_ArrToken,
    IT_AtomicToken,
    IT_BooleanLiteralToken,
    IT_ContainerToken,
    IT_LiteralToken,
    IT_MapToken,
    InputToken__Object as IT_ObjectLiteralDefinition,
    IT_SetToken,
    IT_WeakMapToken
} from "./input-tokens/index";

export type AsType<T extends InputTokenLike> = T extends string
    ? T
    : T extends ((...args: unknown[]) => string | [token: string, props: Dictionary])
        ? `(...args: any[]) => ${FnReturns<T>}`
        : T extends InputToken__Object
            ? `Object<${ToJson<T>}>`
            : "";

type UnwrapContainers<
    T extends readonly unknown[],
    C extends readonly IT_ContainerType[]
> = Last<C> extends "Union"
    ? T[number]
    : Last<C> extends "Tuple"
        ? T
        : Last<C> extends "Array"
            ? T["length"] extends 1
                ? Array<T[0]>
                : T["length"] extends 0
                    ? unknown[]
                    : Err<`invalid-token/array`, `An array token expects only a singular value for the array type but multiple types were found`, { types: T }>
            : never;

/**
 * Finalizes the type for a given level and unwraps
 * all containers.
 */
type FinalizeInputToken<
    TTypes extends readonly unknown[],
    TContainers extends readonly IT_ContainerType[]
> = Length<TContainers> extends 0
    ? Length<TTypes> extends 1
        ? TTypes[0]
        : Err<`invalid-token/unparsed-types`, `no container nesting found to combine types tuple [${TTypes["length"]}]!`, {
            types: Join<ToStringArray<TTypes>, ", ">;
            containers: TContainers;
        }>
    : UnwrapContainers<TTypes, TContainers>;

type InvalidTokenSegment<
    TToken extends string,
    TTypes extends readonly unknown[],
    TContainers extends readonly IT_ContainerType[]
> = Err<
    `invalid-token/unknown`,
`The token "${TToken}" is not recognized!`,
{
    types: TTypes;
    containers: TContainers;
}
>;

/**
 * **FromInputToken**`<TToken, [TInner], [TContainers]>`
 *
 * Converts an input token to a type, or produces an error with type
 * of `invalid-token` and a "subType" of whichever type structure caught
 * the error.
 *
 * InputToken's consist primarily as _string_ tokens of one of the following
 * variants:
 *
 * - an _atomic_ token (e.g., true, null, undefined, boolean, etc.)
 * - a _literal_ token (e.g., String(v), Number(v), Boolean(v), Record(k,v))
 * - an _object_ token (e.g., `{ ... }`)
 * - a _tuple_ token (e.g., `[ ... ]`)
 * - a _function_ token (e.g., `fn(...) => token` _or_ `async fn() => token )
 * - a _generator_ token (e.g., `gen(...) => token`)
 *
 * **Related:** `FromStringInputToken`
 */
export type FromInputToken<
    T extends InputTokenLike | readonly InputTokenLike[],
> = T extends string
    ? FromStringInputToken<T>
    : T extends readonly InputTokenLike[]
        ? FromTupleInputToken<T>
        : T extends Record<string, string>
            ? FromDictionaryInputToken<T>
            : never;

export type FromStringInputToken<
    TToken extends string,
    TInner extends readonly unknown[] = [],
    TContainers extends readonly IT_ContainerType[] = [],
> = Trim<TToken> extends ""
    ? FinalizeInputToken<TInner, TContainers>
    : FirstSet<[
        IT_TakeAtomic<TToken, TInner, TContainers>,
        IT_TakeLiteral<TToken, TInner, TContainers>,
        IT_TakeRecord<TToken, TInner, TContainers>,
        IT_TakeArray<TToken, TInner, TContainers>,
        IT_TakeMap<TToken, TInner, TContainers>,
        IT_TakeWeakMap<TToken, TInner, TContainers>,
        IT_TakeSet<TToken, TInner, TContainers>,
        IT_TakeObject<TToken, TInner, TContainers>,
        IT_TakeTuple<TToken, TInner, TContainers>,
        IT_TakeFunction<TToken, TInner, TContainers>,
        IT_TakeGenerator<TToken, TInner, TContainers>,

        IT_TakeTerminalDelimiter<TToken, TInner, TContainers>,
        IT_TakeUnionDelimiter<TToken, TInner, TContainers>,

        InvalidTokenSegment<TToken, TInner, TContainers>
    ]>;

type Convert<
    T extends InputTokenLike,
    K extends string,
    I extends string | number,
> = T extends string
    ? FromStringInputToken<T>
    : T extends Record<string, InputTokenLike>
        ? FromDictionaryInputToken<T>
        : T extends readonly InputTokenLike[]
            ? FromTupleInputToken<T>
            : Err<`invalid-token/${K}`, `The key "${I}" from a ${K} definition was invalid`, {
                container: T;
            }>;

/**
 * Takes a tuple of `InputTokens` to create a **Tuple** type.
 */
export type FromTupleInputToken<
    T extends readonly InputTokenLike[]
> = {
    [K in keyof T]: T[K] extends InputTokenSuggestions
        ? FromStringInputToken<T[K]>
        : never
};

type _FromInputTokenDictionary<
    T extends Record<string, InputTokenLike>,
    K extends readonly (string & keyof T)[],
    R extends Record<string, unknown> = EmptyObject
> = [] extends K
    ? ExpandDictionary<R>
    : _FromInputTokenDictionary<
        T,
        AfterFirst<K>,
    R & Record<
        First<K>,
        Convert<
            T[First<K>],
            "dictionary",
            First<K>
        >
    >
    >;

/**
 * Takes a tuple of `InputTokens` to create a **Tuple** type.
 */
export type FromDictionaryInputToken<
    T extends Record<string, InputTokenLike>
> = _FromInputTokenDictionary<T, StringKeys<T>>;
