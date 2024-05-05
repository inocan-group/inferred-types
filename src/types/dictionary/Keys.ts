import { 
  IfNever,
  Container,
  ObjectKey,
  UnionToTuple,
  NumericKeys,
  RemoveIndexKeys,
  IsEqual,
  KV,
  EmptyObject,
  Filter,
  IfLength,
} from "src/types/index";

type HandleVueRefType<
  T extends readonly ObjectKey[]
> = IfLength<Filter<T,string>,1,["value"], T>

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
  > = IfNever<
  TContainer, 
  PropertyKey[],
  TContainer extends readonly unknown[]
      ? NumericKeys<TContainer>
      : TContainer extends object
        ? IsEqual<TContainer, KV> extends true
          ? ObjectKey[]
          : IsEqual<TContainer, EmptyObject> extends true
            ? ObjectKey[]
            : UnionToTuple<keyof RemoveIndexKeys<TContainer>> extends readonly ObjectKey[]
                ? HandleVueRefType<UnionToTuple<keyof RemoveIndexKeys<TContainer>>>
                : never
        : never // doesn't extend object
    >;

