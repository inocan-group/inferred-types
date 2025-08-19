import type {
    Err,
    GetInputToken,
    IT_Token,
    Join,
    Last,
    Length,
    MakeKeysOptional,
    ObjectKey,
    OptionalKeys,
    ToStringArray,
    UnionToTuple,
} from "inferred-types/types";

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
    ? FromInputToken__String<T>
    : T extends readonly InputTokenLike[]
        ? FromInputToken__Tuple<T>
        : T extends Record<string, string>
            ? FromInputToken__Object<T>
            : never;

/**
 * **FromInputToken__String**`<TToken>`
 *
 * A type utility responsible for _receiving_ string-based input tokens and
 * converting them into the _type_ which the token represents.
 *
 * **Related:**
 * - `FromInputToken`
 * - `FromInputToken__Tuple`, `FromInputToken__Object`, `FromInputToken__Tuple`
 * - `GetInputToken`,
 */
export type FromInputToken__String<
    TToken extends string
> = GetInputToken<TToken> extends infer E extends Error
    ? E
    : GetInputToken<TToken> extends infer Success extends IT_Token
        ? Success["type"]
        : never;

/**
 * Takes a tuple of `InputTokens` to create a **Tuple** type.
 */
export type FromInputToken__Tuple<
    T extends readonly InputTokenLike[]
> = {
    [K in keyof T]: T[K] extends InputTokenSuggestions
        ? FromInputToken__String<T[K]>
        : never
};

type _FromInputToken__Object<
    T extends Record<string, InputTokenLike>,
> = {
    [K in keyof T]: T[K] extends string
        ? FromInputToken__String<T[K]>
        : T[K] extends InputTokenLike
            ? FromInputToken<T[K]>
            : never
};

/**
 * Takes a tuple of `InputTokens` to create a **Tuple** type.
 */
export type FromInputToken__Object<
    T extends Record<string, InputTokenLike>
> = MakeKeysOptional<
    _FromInputToken__Object<Required<T>>,
    UnionToTuple<OptionalKeys<T>> extends readonly ObjectKey[]
        ? UnionToTuple<OptionalKeys<T>>
        : never
>;
