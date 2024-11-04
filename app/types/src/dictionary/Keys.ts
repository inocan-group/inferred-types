import type {
  Container,
  ObjectKey,
  UnionToTuple,
  NumericKeys,
  RemoveIndexKeys,
  IsVueRef,
  IsTuple,
  IsObjectLiteral,
  AfterFirst,
  First,
  TupleToUnion,
  As,
  Tuple,
  IsWideUnion,
} from "@inferred-types/types";

type _Keys<
T extends object
> = UnionToTuple<keyof RemoveIndexKeys<T>>;


type GetKeys<
  T extends object
> = IsVueRef<T> extends true
? ["value"]
: _Keys<T> extends [symbol]
  ? ObjectKey[]
  : _Keys<T> extends []
    ? UnionToTuple<keyof T> extends [ObjectKey]
      ? (keyof T)[]
      : ObjectKey[]
    : _Keys<T>;

type ProcessObj<
  TContainer extends object
> = GetKeys<TContainer>

type ProcessTuple<
  TContainer extends readonly unknown[]
> = NumericKeys<TContainer> extends readonly number[]
? NumericKeys<TContainer>
: never;

type Process<
TContainer extends Container
> = TContainer extends readonly unknown[]
? IsTuple<TContainer> extends true
  ? ProcessTuple<TContainer> extends readonly number[]
    ? ProcessTuple<TContainer>
    : never
  : number[]
: TContainer extends object
  ? [IsObjectLiteral<RemoveIndexKeys<TContainer>>] extends [true]
    ? ProcessObj<RemoveIndexKeys<TContainer>> extends readonly (keyof TContainer & ObjectKey)[]
      ? As<ProcessObj<RemoveIndexKeys<TContainer>>, readonly ObjectKey[]>
      : never
    : ObjectKey[]
  : never[];

/**
 * **Keys**`<TContainer>`
 *
 * Provides the _explicit keys_ of a container `TContainer` as an array of values.
 *
 * ```ts
 * type Obj = { foo: 1, bar: 2, [key: string]: unknown };
 * type Arr = [1,2,3];
 * // readonly ["foo", "bar"]
 * type K1 = Keys<Obj>;
 * // readonly [0,1,2]
 * type K2 = Keys<Arr>;
 * ```
 *
 * **Related:** `ValidKey`, `PublicKeys`
 */
export type Keys<
  TContainer extends Container
> = TContainer extends Tuple
? As<Process<TContainer>, readonly number[]>
: As<Process<TContainer>, readonly ObjectKey[]>;


type _Public<
  TInput extends readonly PropertyKey[],
  TOutput extends readonly PropertyKey[] = []
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
export type PrivateKeys<T extends object> = {
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
