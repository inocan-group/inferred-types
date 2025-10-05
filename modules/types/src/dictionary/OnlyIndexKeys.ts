import type {
    Dictionary,
    EmptyObject,
    ExpandDictionary,
    IsTemplateLiteral,
    ObjectKey,
    UnionToTuple
} from "inferred-types/types";

type ExtractIndexKeysFromObj<T> = {
    [K in keyof T as string extends K
        ? K
        : number extends K
            ? K
            : symbol extends K
                ? K
                : never]: T[K]
};

type GetTemplateLiteralIndexes<
    TObj extends Dictionary,
    TKeys extends readonly unknown[],
    TResult extends Dictionary = EmptyObject
> = TKeys extends [infer Head extends ObjectKey, ...infer Rest extends readonly ObjectKey[]]
    ? IsTemplateLiteral<Head> extends true
        ? GetTemplateLiteralIndexes<TObj, Rest, TResult & Record<Head, TObj[Head]>>
        : GetTemplateLiteralIndexes<TObj, Rest, TResult>
    : ExpandDictionary<TResult>;

/**
 * **OnlyIndexKeys**<`T`>
 *
 * Returns a dictionary with all fixed keys removed and only _index_
 * signatures remaining.
 *
 * - index can be wide-type indexes such as `{ [x: string]: string }`
 * - but they can also be _template literal_ indexes like `{ [x: `_${string}`]: string }`
 *
 * **Related: `GetIndexKeys`
 */
export type OnlyIndexKeys<T extends Dictionary> = ExpandDictionary<
    ExtractIndexKeysFromObj<T> & GetTemplateLiteralIndexes<T, UnionToTuple<keyof T>>
>;
