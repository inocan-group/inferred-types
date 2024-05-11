import type { 
  IfNever,
  Container,
  ObjectKey,
  UnionToTuple,
  NumericKeys,
  RemoveIndexKeys,
  IfTuple,
  IsVueRef,
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
      : IfNever<keyof T, ObjectKey[], never[]>
    : _Keys<T>;

type Process<
  TContainer extends Container
> = 
IfNever<
  TContainer, 
  never[],
  TContainer extends readonly unknown[]
    ? NumericKeys<TContainer>
    : TContainer extends object
      ? GetKeys<TContainer>
      : never[]
>;


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
  > = TContainer extends readonly unknown[]
  ? Process<TContainer> extends readonly number[]
    ? IfTuple<
        Process<TContainer>, 
        Process<TContainer>, 
        number[]
      > extends readonly (number & keyof TContainer)[]
        ? IfTuple<
            Process<TContainer>, 
            Process<TContainer>, 
            number[]
          >
      : never
    : never
  : TContainer extends object
    ? Process<TContainer> extends ObjectKey[]
      ? Process<TContainer> extends readonly (ObjectKey & keyof TContainer)[]
        ? Process<TContainer>
        : never
      : ObjectKey[]
    : never[]

