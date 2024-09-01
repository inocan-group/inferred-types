import { AfterFirst, First } from "../lists";
import {
  SimpleType,
  SimpleTypeMap,
  SimpleTypeDict,
  SimpleTypeSet,
  SimpleTypeArray,
  SimpleTypeScalar,
  SimpleTypeUnion
} from "./SimpleType";
import {
  SimpleDictToken,
  SimpleMapToken,
  SimpleSetToken,
  SimpleArrayToken,
  SimpleScalarToken,
  SimpleToken,
  SimpleUnionToken,
  TypeToken
} from "./TypeToken";

type ProcessSimple<T extends SimpleToken | TypeToken> = T extends SimpleToken
  ? SimpleType<T>
  : never;

type Iterate<
  T extends readonly SimpleToken[],
  TResult = never
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
  >


/**
 * **AsType**`<T>`
 *
 * converts either a `SimpleToken` or a `TypeToken` into the
 * _type_ it represents.
 *
 * NOTE: only implemented for `SimpleToken` at the moment.
 */
export type AsType<
  T extends SimpleToken | readonly SimpleToken[] | TypeToken
> =  T extends readonly SimpleToken[]
? Iterate<T>
: T extends SimpleToken
? ProcessSimple<T>
: never;
