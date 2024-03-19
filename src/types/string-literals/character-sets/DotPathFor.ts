import { 
  IfOptionalScalar,
  Join,
  ScalarNotSymbol,
  AnyFunction,
  IfRef,
  AnyObject, 
} from "src/types/index";


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
 * **DotPathFor**`<T>`
 * 
 * Provides a union of all valid _dot paths_ for the container
 * `T`. 
 * 
 * - If `T` is _not_ a container then it will resolve to
 * `""` because `T` can not be dereferenced.
 * - If `T` is a _wide_ container than it will resolve to `string` as
 * nothing can be determined at design time
 */
export type DotPathFor<T> = 

T extends ScalarNotSymbol
  ? ""
  : T extends Record<PropertyKey, unknown> | readonly unknown[] // test for container
    ? Exclude<GetPaths<T>, number | AnyFunction | boolean | null | AnyObject> | ""
    : T extends AnyObject
      ? string
      : "";
