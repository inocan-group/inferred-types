import { 
  IfOptionalScalar,
  Tuple,
  Join,
  ScalarNotSymbol,
  AnyFunction,
  IfRef, 
} from "src/types";


type GetPaths<
  TSource,
  TOffset extends readonly unknown[] = []
> = IfOptionalScalar<
  TOffset,
  TSource,
  {
    [K in keyof TSource]: TSource[K] extends ScalarNotSymbol
      ? Join<[
        ...TOffset, 
        K,
      ], ".">
        : IfRef<
            TSource[K],
            "value" extends keyof TSource[K]
              ? GetPaths<
                  TSource[K]["value"], 
                  [...TOffset, K, "value"]
                >
              : never,
            GetPaths<
              TSource[K], 
              [...TOffset, K]
            >
          >

          
  }[keyof TSource]
>;


/**
 * **DotPathsFor**`<T>`
 * 
 * Provides a union of valid _dot paths_ for the container
 * `T`. If `T` is not a container then it will resolve to
 * `""` because `T` can not be dereferenced.
 */
export type DotPathFor<T> = T extends ScalarNotSymbol
  ? ""
  : T extends Record<PropertyKey, unknown> | Tuple
  ? Exclude<GetPaths<T>, number | AnyFunction | boolean | null> | ""
  : "";


