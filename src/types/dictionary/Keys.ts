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
  StartsWith,
  First,
  TupleToUnion,
} from "src/types/index";

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
  ? ProcessTuple<TContainer>
  : number[]
: TContainer extends object
  ? [IsObjectLiteral<RemoveIndexKeys<TContainer>>] extends [true]
    ? ProcessObj<RemoveIndexKeys<TContainer>> extends readonly (keyof TContainer)[]
      ? ProcessObj<RemoveIndexKeys<TContainer>>
      : ProcessObj<RemoveIndexKeys<TContainer>>
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
> = Process<TContainer> extends readonly PropertyKey[]
? Process<TContainer>
: never;


type _Public<
  TInput extends readonly PropertyKey[],
  TOutput extends readonly PropertyKey[] = []
> = [] extends TInput
? TOutput
: _Public<
    AfterFirst<TInput>,
    First<TInput> extends string
    ? StartsWith<First<TInput>, "_"> extends true
      ? TOutput
      : [...TOutput, First<TInput>]
    : TOutput
  >;

/**
 * **PublicKeys**`<TContainer>`
 *
 * Provides a tuple of _keys_ for `TContainer` but unlike `Keys<T>` it removes any
 * keys which start with an underscore character.
 */
export type PublicKeys<TContainer extends Container> = _Public<Keys<TContainer>>;


/**
 * **KeyOf**`<TContainer>`
 *
 * Provides a **union type** of keys for the passed in container.
 *
 * **Related:** `Keys`,`PublicKeys`,`PublicKeyOf`
 */
export type KeyOf<TContainer extends Container> = TupleToUnion<Keys<TContainer>> extends PropertyKey
  ? TupleToUnion<Keys<TContainer>> extends keyof TContainer
    ? TupleToUnion<Keys<TContainer>>
    : never
  : never;

/**
 * **PublicKeyOf**`<TContainer>`
 *
 * Provides a **union type** of _public_ keys (aka, keys not starting with
 * underscore character) for the passed in container.
 *
 * **Related:** `Keys`,`PublicKeys`,`PublicKeyOf`
 */
export type PublicKeyOf<TContainer extends Container> = TupleToUnion<PublicKeys<TContainer>> extends PropertyKey
  ? TupleToUnion<PublicKeys<TContainer>> extends keyof TContainer
    ? TupleToUnion<PublicKeys<TContainer>>
    : never
  : never;
