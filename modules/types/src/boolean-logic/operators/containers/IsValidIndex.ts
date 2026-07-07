import type {
    Container,
    Dictionary,
    ExplicitlyEmptyObject,
    IsEqual,
    IsLiteralLikeObject,
    IsStringLiteral,
    IsTuple,
    Tuple,
} from "inferred-types/types";

type HasPositiveIndex<
    TContainer extends readonly unknown[],
    TKey extends number,
    TDepth extends readonly unknown[] = [],
> = TDepth["length"] extends TKey
    ? TContainer extends readonly [unknown, ...readonly unknown[]]
        ? true
        : false
    : TContainer extends readonly [unknown, ...infer Rest]
        ? HasPositiveIndex<Rest, TKey, [...TDepth, unknown]>
        : false;

type HasNegativeIndex<
    TContainer extends readonly unknown[],
    TKey extends number,
    TDepth extends readonly unknown[] = [unknown],
> = TDepth["length"] extends TKey
    ? TContainer extends readonly [unknown, ...readonly unknown[]]
        ? true
        : false
    : TContainer extends readonly [unknown, ...infer Rest]
        ? HasNegativeIndex<Rest, TKey, [...TDepth, unknown]>
        : false;

type PositiveIndexOf<T extends number> = `${T}` extends `-${infer N extends number}`
    ? N
    : never;

/**
 * **IsValidIndex**`<TContainer,TKey>`
 *
 * Provides a boolean check on whether `TKey` is a valid key for `TContainer`.
 *
 * - valid responses are `true` or `false` if literal types found; otherwise `boolean`
 * - negative indexes are allowed when `TContainer` is a tuple
 */
export type IsValidIndex<
    TContainer extends Container,
    TKey extends PropertyKey,
> = TContainer extends Tuple
    ? IsTuple<TContainer> extends true
        ? TKey extends number
            ? number extends TKey
                ? boolean
                : `${TKey}` extends `-${string}`
                    ? PositiveIndexOf<TKey> extends infer Positive extends number
                        ? Positive extends 0
                            ? false
                            : HasNegativeIndex<TContainer, Positive>
                        : false
                    : HasPositiveIndex<TContainer, TKey>
            : false
        : boolean // not a tuple literal

    : TContainer extends Dictionary
        ? IsEqual<TContainer, ExplicitlyEmptyObject> extends true
            ? false
            : [IsLiteralLikeObject<TContainer>] extends [true]
                    ? [IsStringLiteral<TKey>] extends [true]
                            ? [TKey] extends [keyof TContainer]
                                    ? true
                                    : false
                            : [TKey] extends [symbol]
                                    ? [TKey] extends [keyof TContainer]
                                            ? true
                                            : false
                                    : false
                    : boolean
        : false;
