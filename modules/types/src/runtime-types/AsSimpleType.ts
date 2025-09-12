import type { AfterFirst, First, TypeToken } from "inferred-types/types";
import type {
    SimpleArrayToken,
    SimpleDictToken,
    SimpleMapToken,
    SimpleScalarToken,
    SimpleSetToken,
    SimpleToken,
    SimpleUnionToken,
} from "./SimpleToken";
import type {
    SimpleType,
    SimpleTypeArray,
    SimpleTypeDict,
    SimpleTypeMap,
    SimpleTypeScalar,
    SimpleTypeSet,
    SimpleTypeUnion,
} from "./SimpleType";

type ProcessSimple<T extends SimpleToken | TypeToken> = T extends SimpleToken
    ? SimpleType<T>
    : never;

type Iterate<
    T extends readonly SimpleToken[],
    TResult = never,
> = [] extends T
    ? TResult
    : Iterate<
        AfterFirst<T>,
        TResult & (
      First<T> extends SimpleScalarToken
          ? SimpleTypeScalar<First<T>>
          : First<T> extends SimpleDictToken
              ? SimpleTypeDict<First<T>>
              : First<T> extends SimpleMapToken
                  ? SimpleTypeMap<First<T>>
                  : First<T> extends SimpleSetToken
                      ? SimpleTypeSet<First<T>>
                      : First<T> extends SimpleArrayToken
                          ? SimpleTypeArray<First<T>>
                          : First<T> extends SimpleUnionToken
                              ? SimpleTypeUnion<First<T>>
                              : never
    )
    >;

/**
 * **AsSimpleType**`<T>`
 *
 * converts either a `SimpleToken` or a `TypeToken` into the
 * _type_ it represents.
 *
 * NOTE: only implemented for `SimpleToken` at the moment.
 */
export type AsSimpleType<
    T extends SimpleToken | readonly SimpleToken[] | TypeToken,
> = T extends readonly SimpleToken[]
    ? Iterate<T>
    : T extends SimpleToken
        ? ProcessSimple<T>
        : never;
