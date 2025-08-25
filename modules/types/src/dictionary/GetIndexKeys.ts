import { Dictionary, EmptyObject, ExpandDictionary, IsNever, IsTemplateLiteral, IsUnion,  ObjectKey,  RemoveNever, UnionToTuple } from "inferred-types/types";


/**
 * **GetIndexKeys**`<T>`
 *
 * Extracts index signature keys from a type.
 *
 * Note: This utility can extract regular index signatures (string, number, symbol)
 * but cannot extract template literal index signatures due to TypeScript limitations.
 * Template literal patterns like `[x: \`_${string}\`]: string` are not exposed
 * in a way that allows extraction at the type level.
 */

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
        ? GetTemplateLiteralIndexes<TObj,Rest, TResult & Record<Head, TObj[Head]>>
        : GetTemplateLiteralIndexes<TObj,Rest,TResult>
: ExpandDictionary<TResult>;





/**
 * **DictionaryWithIndexKeys**<`T`>
 *
 * Returns a dictionary with all fixed keys removed and only _index_
 * signatures remaining.
 *
 * - index can be wide-type indexes such as `{ [x: string]: string }`
 * - but they can also be _template literal_ indexes like `{ [x: `_${string}`]: string }`
 *
 * **Related: `GetIndexKeys`
 */
export type DictionaryWithIndexKeys<T extends Dictionary> =
ExtractIndexKeysFromObj<T> extends infer Extraction
    ? IsNever<keyof Extraction> extends true
        ? IsUnion<keyof T> extends true
            ? GetTemplateLiteralIndexes<T, UnionToTuple<keyof T>>
            : never
        : Extraction
: never;


/**
 * **GetIndexKeys`<T>`
 *
 * Returns a union type of all the _index_ types found in `T`.
 *
 * - an index can be wide-type indexes such as `{ [x: string]: string }`
 * - but they can also be _template literal_ indexes like `{ [x: `_${string}`]: string }`
 *
 * **Related: `DictionaryWithIndexKeys`
 */
export type GetIndexKeys<T extends Dictionary> = keyof DictionaryWithIndexKeys<T> & string;

