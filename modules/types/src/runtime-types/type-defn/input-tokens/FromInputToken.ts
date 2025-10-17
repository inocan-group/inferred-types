import type {
    DefineObject,
    DefineTuple,
    Err,
    FromDefineObject,
    FromDefineTuple,
    GetInputToken,
    InputToken,
    InputTokenSuggestions,
    IT_Token,
    MakeKeysOptional,
    Mutable,
    ObjectKey,
    OptionalKeys,
    UnionToTuple,
} from "inferred-types/types";

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
    T extends InputToken,
> = T extends string
    ? FromInputToken__String<T>
    : T extends readonly InputToken[]
        ? FromInputToken__Tuple<T>
        : T extends DefineObject
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
> = GetInputToken<TToken> extends Error
    ? GetInputToken<TToken>
    : GetInputToken<TToken> extends infer Success extends IT_Token
        ? Success["type"]
        : never;

/**
 * Takes a tuple of `InputTokens` to create a **Tuple** type.
 */
export type FromInputToken__Tuple<
    T extends readonly InputToken[]
> = {
    [K in keyof T]: T[K] extends InputTokenSuggestions
        ? FromInputToken__String<T[K]>
        : T[K] extends DefineObject
            ? FromDefineObject<T[K]>
            : T[K] extends DefineTuple
                ? FromDefineTuple<T[K]>
                : never
};

type _FromInputToken__Object_Props<
    T extends DefineObject,
> = {
    [K in keyof T]: T[K] extends string
        ? FromInputToken__String<T[K]>
        : T[K] extends DefineObject
            ? FromDefineObject<T[K]>
            : T[K] extends DefineTuple
                ? FromDefineTuple<T[K]>
                : never
};

// Helper to check if any property value is an Error
type _HasErrorProp<T> = {
    [K in keyof T]: T[K] extends Error ? K : never
}[keyof T];

// Extract and enhance the error with property and token context
type _ExtractErrorFromProps<T, TOriginal extends DefineObject> = _HasErrorProp<T> extends never
    ? T
    : _HasErrorProp<T> extends infer PropKey extends keyof T
        ? T[PropKey] extends infer OrigErr extends Error
            ? OrigErr extends { type: infer EType extends string; subType?: infer ESubType }
                ? ESubType extends string
                    ? Err<
                        `${EType}/${ESubType}`,
                        `Property "${PropKey & string}" has a malformed token`,
                        {
                            property: PropKey;
                            token: TOriginal;
                            originalError: OrigErr;
                        }
                    >
                    : Err<
                        EType,
                        `Property "${PropKey & string}" has a malformed token`,
                        {
                            property: PropKey;
                            token: TOriginal;
                            originalError: OrigErr;
                        }
                    >
                : OrigErr
            : T[PropKey]
        : never;

type _FromInputToken__Object<
    T extends DefineObject,
> = _ExtractErrorFromProps<_FromInputToken__Object_Props<T>, T>;

/**
 * Takes a tuple of `InputTokens` to create a **Tuple** type.
 */
export type FromInputToken__Object<
    T extends DefineObject
> = _FromInputToken__Object<Required<T>> extends infer Result
    ? Result extends Error
        ? Result
        : Mutable<MakeKeysOptional<
            Result,
            UnionToTuple<OptionalKeys<T>> extends readonly ObjectKey[]
                ? UnionToTuple<OptionalKeys<T>>
                : never
        >>
    : never;
