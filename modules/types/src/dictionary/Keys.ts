import type {
    AfterFirst,
    And,
    AnyMap,
    AnySet,
    AnyWeakMap,
    As,
    Container,
    Dictionary,
    ExplicitlyEmptyObject,
    Extends,
    First,
    IsTemplateLiteral,
    IsEqual,
    IsLiteralUnion,
    IsNever,
    IsNumericLiteral,
    IsObjectLiteral,
    IsStringLiteral,
    IsSymbol,
    IsUnion,
    IsWideUnion,
    NumericKeys,
    ObjectKey,
    RemoveIndexKeys,
    Some,
    TupleToUnion,
    UnionToTuple,
    Values,
    Filter,
    NotFilter,
    Narrowable,
} from "inferred-types/types";

type _Keys<
    T extends Dictionary,
> = UnionToTuple<keyof RemoveIndexKeys<T>>;

type GetKeys<
    T extends Dictionary,
> = _Keys<T> extends [symbol]
    ? ObjectKey[]
    : _Keys<T> extends []
        ? UnionToTuple<keyof T> extends [ObjectKey]
            ? (keyof T)[]
            : ObjectKey[]
        : _Keys<T>;

type ProcessObj<
    TContainer extends object,
> = GetKeys<TContainer>;

type ProcessTuple<
    TContainer extends readonly unknown[],
> = NumericKeys<TContainer> extends readonly number[]
    ? NumericKeys<TContainer>
    : never;

type ProcessObject<
    TContainer extends Dictionary,
> = IsEqual<ExplicitlyEmptyObject, TContainer> extends true
    ? []
    : [IsObjectLiteral<RemoveIndexKeys<TContainer>>] extends [true]
        ? ProcessObj<RemoveIndexKeys<TContainer>> extends readonly (keyof TContainer & ObjectKey)[]
            ? As<ProcessObj<RemoveIndexKeys<TContainer>>, readonly ObjectKey[]>
            : never
        : IsEqual<TContainer, ExplicitlyEmptyObject> extends true
            ? []
            : ObjectKey[];

/**
 * **Keys**`<TContainer>`
 *
 * Provides the _explicit keys_ of a container `TContainer` as an array of values.
 *
 * - if the container is wide then the keys will be a wide array type
 * - if the container is a narrow type then a tuple of literal keys will be returned
 *
 * ```ts
 * type Obj = { foo: 1, bar: 2, [key: string]: unknown };
 * type Arr = [1,2,3];
 * // readonly ["foo", "bar"]
 * type K1 = Keys<Obj>;
 * // readonly [0,1,2]
 * type K2 = Keys<Arr>;
 * // number[]
 * type Arr = Keys<string[]>;
 * // string[]
 * type Obj = Record<string,unknown>;
 * ```
 *
 * **Related:** `ValidKey`, `PublicKeys`, `PrivateKeys`
 */
export type Keys<
    TContainer extends readonly unknown[] | Dictionary,
> = TContainer extends readonly unknown[]
    ? ProcessTuple<TContainer>
    : As<
        TContainer extends Dictionary
            ?
            ProcessObject<TContainer> extends readonly (ObjectKey & keyof TContainer)[]
                ? ProcessObject<TContainer>
                : never
            : never,
        readonly ObjectKey[]
    >;

/**
 * **WithTemplateKeys**`<TLiteral,TTemplate>`
 *
 * Produces a tuple of keys where there a combination of
 * literal keys and then one or more _template_ keys
 */
export type WithTemplateKeys<
    TLiteral extends readonly unknown[],
    TTemplate extends readonly string[]
> =;


/**
 * handle union types which are not literal unions
 *
 * 1. if the keyof has 1 or more template keys then
 *      - extract the template keys and create a union of them
 *      - make them be of type `...U[]`
 * 2. if the keyof is `string | number` then we're dealing with
 * with an index key and we can only return ObjectKey[]
 */
type HandleUnion<
    T extends object
> = IsEqual<keyof T, string | number> extends true
? ObjectKey[]
: Some<UnionToTuple<keyof T>, "isTemplateLiteral", []> extends true
    ? UnionToTuple<keyof T> extends readonly Narrowable[]
        ? WithTemplateKeys<
            NotFilter<UnionToTuple<keyof T>, "isTemplateLiteral", []>,
            Filter<UnionToTuple<keyof T>, "isTemplateLiteral", []>
        >
        : never
    : ObjectKey[];

/**
 * **ObjectKeys**`<TObj>`
 *
 * Provides the keys of a given object. If a _wide_ representation of
 * an object is sent in -- in most cases -- the value returned will with
 * a _wide_ array. The one exception is if the keys can still be determined
 * even in the wide format (for instance, `Record<"foo" | "bar", any>` we know
 * the keys must be `["foo", "bar"])
 */
export type ObjectKeys<
    TObj extends object
> = [IsNever<keyof TObj>] extends [true]
? [TObj] extends [AnyMap]
    ? any[]
    : [TObj] extends [AnyWeakMap]
        ? any[]
    : [TObj] extends [AnySet]
        ? any[]
    : PropertyKey[]
: [IsLiteralUnion<keyof TObj>] extends [true]
    ? UnionToTuple<keyof TObj>

    : [IsUnion<keyof TObj>] extends [true]
        ? [IsEqual<keyof TObj, string | symbol>] extends [true]
            ? ObjectKey[]
        : [IsEqual<keyof TObj, symbol | string | symbol>] extends [true]
            ? PropertyKey[]
        : [And<[
            Extends<TObj, Dictionary>,
            IsEqual<Values<TObj>,[]>
        ]>] extends [true]
            ? []
        : TObj extends Dictionary
            ? HandleUnion<TObj>
            : "union"

    : [IsStringLiteral<keyof TObj>] extends [true]
        ? [IsTemplateLiteral<keyof TObj>] extends [true]
            ? (keyof TObj)[]
            : [keyof TObj]
    : [IsNumericLiteral<keyof TObj>] extends [true]
        ? [keyof TObj]
    : [IsSymbol<keyof TObj>] extends [true]
        ? [keyof TObj]
    : (keyof TObj)[];



type _Public<
    TInput extends readonly PropertyKey[],
    TOutput extends readonly PropertyKey[] = [],
> = [] extends TInput
    ? TOutput
    : _Public<
        AfterFirst<TInput>,
        First<TInput> extends `_${string}`
            ? TOutput
            : [...TOutput, First<TInput>]
    >;

/**
 * **PublicKeys**`<TContainer>`
 *
 * Provides a tuple of _keys_ for `TContainer` but unlike `Keys<T>` it removes any
 * keys which start with an underscore character.
 */
export type PublicKeys<TContainer extends Container> = _Public<Keys<TContainer>>;

/**
 * **PrivateKey**
 *
 * A `PrivateKey` is an object key that is preceded with a `_` character to indicate
 * that it is a _private_ property.
 */
export type PrivateKey = `_${string}`;

/**
 * **PrivateKeys**`<T>`
 *
 * Keys on an object which have a `_` character as first part of the
 * name are considered private and this utility will create a union
 * of all the keys in this category.
 *
 * **Related:** `PublicKeys`, `Keys`, `PrivateKeyOf`
 */
export type PrivateKeys<T extends Dictionary> = {
    [K in keyof T]: K extends `_${string}` ? K : never;
}[keyof T];

type _KeyOf<TContainer extends Container> =
  TupleToUnion<Keys<TContainer>> extends PropertyKey
      ? TupleToUnion<Keys<TContainer>> extends keyof TContainer
          ? TupleToUnion<Keys<TContainer>>
          : never
      : never;

/**
 * **KeyOf**`<TContainer>`
 *
 * Provides a **union type** of keys for the passed in container.
 *
 * **Related:** `Keys`,`PublicKeys`,`PublicKeyOf`
 */
export type KeyOf<TContainer extends Container> = IsWideUnion<_KeyOf<TContainer>> extends true
    ? ""
    : As<_KeyOf<TContainer>, string | symbol>;

/**
 * **PublicKeyOf**`<TContainer>`
 *
 * Provides a **union type** of _public_ keys (aka, keys not starting with
 * underscore character) for the passed in container.
 *
 * **Related:** `Keys`,`PublicKeys`,`KeyOf`
 */
export type PublicKeyOf<TContainer extends Container> = TupleToUnion<PublicKeys<TContainer>> extends PropertyKey
    ? TupleToUnion<PublicKeys<TContainer>> extends keyof TContainer
        ? TupleToUnion<PublicKeys<TContainer>>
        : never
    : never;

/**
 * **PrivateKeyOf**`<TContainer>`
 *
 * Provides a **union type** of _private_ keys (aka, keys starting with
 * underscore character) for the passed in container.
 *
 * **Related:** `Keys`,`PrivateKeys`,`KeyOf`
 */
export type PrivateKeyOf<TContainer extends Container> = TupleToUnion<PrivateKeys<TContainer>> extends PropertyKey
    ? TupleToUnion<PublicKeys<TContainer>> extends keyof TContainer
        ? TupleToUnion<PublicKeys<TContainer>>
        : never
    : never;
