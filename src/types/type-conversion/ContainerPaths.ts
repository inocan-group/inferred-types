import { 
  IfOptionalScalar,   
  RetainStrings,   
  Tuple,
  Join,
  UnionToTuple,
  ScalarNotSymbol, 
} from "src/types";


type GetPaths<
  TSource extends Record<PropertyKey, unknown> | Tuple,
  TOffset extends readonly unknown[] = []
> = IfOptionalScalar<
  TOffset,
  TSource,
  {
    [K in keyof TSource]: TSource[K] extends unknown[]
      ? GetPaths<
          TSource[K], 
          [...TOffset, K]
        >
      : TSource[K] extends Record<PropertyKey, unknown>
        ? GetPaths<
            TSource[K], 
            [...TOffset, K]
          >

        : // NON-CONTAINER
          Join<[
            ...TOffset, 
            K,
          ], ".">
  }[keyof TSource]
>;


/**
 * **ContainerPaths**`<T>`
 * 
 * Provides an array of valid _dot paths_ which point to the leaf
 * nodes of `T`.
 */
export type ContainerPaths<T> = T extends ScalarNotSymbol
  ? ["", null]
  : T extends Record<PropertyKey, unknown> | Tuple
  ? RetainStrings<UnionToTuple<GetPaths<T>>> extends string[]
    ? ["", null, ...RetainStrings<UnionToTuple<GetPaths<T>>>]
    : ["", null]
  : ["", null];


