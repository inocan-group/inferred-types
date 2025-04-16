import type {
    SAFE_ENCODING__BRACKETS,
    SAFE_ENCODING__QUOTES,
    SAFE_ENCODING__WHITESPACE,
} from "inferred-types/constants";
import type {
    AfterFirst,
    AsFromTo,
    BackTick,
    Concat,
    First,
    FromTo,
    Mutable,
    ReverseLookup,
    SafeEncodingGroup,
    Values,
} from "inferred-types/types";

type SafeEncoding__Quotes = Mutable<typeof SAFE_ENCODING__QUOTES>;
type SafeEncoding__Whitespace = Mutable<typeof SAFE_ENCODING__WHITESPACE>;
type SafeEncoding__Brackets = Mutable<typeof SAFE_ENCODING__BRACKETS>;

export type SafeEncodingKey__Quotes = keyof SafeEncoding__Quotes;
export type SafeEncodingKey__Whitespace = keyof SafeEncoding__Whitespace;
export type SafeEncodingKey__Brackets = keyof SafeEncoding__Brackets;

export type SafeDecodingKey__Quotes = Values<SafeEncoding__Quotes>[number];
export type SafeDecodingKey__Whitespace = Values<SafeEncoding__Whitespace>[number];
export type SafeDecodingKey__Brackets = Values<SafeEncoding__Brackets>[number];

export type SafeEncodingConversion<
    T extends readonly SafeEncodingGroup[],
    R extends readonly FromTo[] = [],
> = [] extends T
    ? R
    : SafeEncodingConversion<
        AfterFirst<T>,
        [
            ...R,
            ...(
                First<T> extends "quotes"
                    ? AsFromTo<SafeEncoding__Quotes>
                    : First<T> extends "brackets"
                        ? AsFromTo<SafeEncoding__Brackets>
                        : First<T> extends "whitespace"
                            ? AsFromTo<SafeEncoding__Whitespace>
                            : []
            ),
        ]
    >;

type Esc<T extends readonly FromTo[]> = {
    [K in keyof T]: {
        from: Concat<[ BackTick, T[K]["from"]]>;
        to: T[K]["to"];
    }
};

export type EscapedSafeEncodingConversion<
    T extends readonly SafeEncodingGroup[],
    R extends readonly FromTo[] = [],
> = [] extends T
    ? R
    : SafeEncodingConversion<
        AfterFirst<T>,
        [
            ...R,
            ...(
                First<T> extends "quotes"
                    ? Esc<AsFromTo<SafeEncoding__Quotes>>
                    : First<T> extends "brackets"
                        ? Esc<AsFromTo<SafeEncoding__Brackets>>
                        : First<T> extends "whitespace"
                            ? Esc<AsFromTo<SafeEncoding__Whitespace>>
                            : []
            ),
        ]
    >;

type X = Esc<AsFromTo<SafeEncoding__Brackets>>;

export type SafeDecodingConversion<
    T extends readonly SafeEncodingGroup[],
    R extends readonly FromTo[] = [],
> = [] extends T
    ? R
    : SafeDecodingConversion<
        AfterFirst<T>,
        [
            ...R,
            ...(
                First<T> extends "quotes"
                    ? AsFromTo<ReverseLookup<SafeEncoding__Quotes>>
                    : First<T> extends "brackets"
                        ? AsFromTo<ReverseLookup<SafeEncoding__Brackets>>
                        : First<T> extends "whitespace"
                            ? AsFromTo<ReverseLookup<SafeEncoding__Whitespace>>
                            : []
            ),
        ]
    >;
