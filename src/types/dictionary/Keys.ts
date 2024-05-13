import type { 
  IfNever,
  Container,
  ObjectKey,
  UnionToTuple,
  NumericKeys,
  RemoveIndexKeys,
  IfTuple,
  IsVueRef,
  IsTuple,
  IsObjectLiteral,
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
 * **Related:** `ValidKey`
 */
export type Keys<
  TContainer extends Container
> = Process<TContainer>;
  