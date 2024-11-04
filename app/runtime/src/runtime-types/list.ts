/* eslint-disable no-use-before-define */
import {
  TupleToUnion,
  WidenUnion,
  List,
  IsUnion,
  Tuple,
  IsTuple,
  ObjectKey,
  IsEqual,
  First,
  IsStringLiteral,
  IsNumericLiteral,
  AfterFirst,
  Chars,
  Narrowable,
  UnionToTuple,
  AsString,
  IsNever,
} from "@inferred-types/types"

import { isArray } from "src/runtime/index";

type ListWideType<
  T extends readonly unknown[]
> = IsNever<WidenUnion<TupleToUnion<T>>> extends true
? unknown
: WidenUnion<TupleToUnion<T>>;


type Describe<T> = IsUnion<T> extends true
  ? `9${AsString<UnionToTuple<T>["length"]>}`
  : T extends string
  ? "1"
  : T extends number
  ? "2"
  : T extends boolean
  ? "3"
  : T extends Tuple
    ? IsTuple<T> extends true
      ? "tuple"
      : "array"
  : T extends Record<ObjectKey, infer V>
    ? `0x${Describe<V>}>`
  : T extends Map<unknown, infer V>
    ? `1x${Describe<V>}>`
  : IsEqual<T, unknown> extends true
    ? `4`
  : IsEqual<T, null> extends true
    ? `5`
  : `6`;


type Lit<T> = T extends string
    ? IsStringLiteral<T> extends true
      ? First<Chars<T>>
      : ""
    : T extends number
      ? IsNumericLiteral<T> extends true
        ? `${T}`
        : ""
      : "";

type DescribeLit<
  T extends readonly unknown[],
  TResult extends string = ""
> = [] extends T
? TResult
: DescribeLit<
    AfterFirst<T>,
    `${TResult}${Lit<First<T>>}`
  >;


type ListHash<
  T extends readonly unknown[]
> = [IsEqual<T["length"], number>] extends [true]
? `0${Describe<ListWideType<T>>}`
: `${T["length"]}${Describe<ListWideType<T>>}${DescribeLit<T>}`

export type AsList<
  T extends readonly unknown[]
> = List<
  ListWideType<T>,
  ListHash<T>
>;

const createProxy = <
  TArr extends readonly unknown[],
>(...initialize: TArr) => {
  const state = initialize as unknown as List<ListWideType<TArr>, ListHash<TArr>>;
  state.id = null as unknown as ListHash<TArr>;

  const proxy = new Proxy(state, {}) as List<
    ListWideType<TArr>,
    ListHash<TArr>
  >;
  Object.defineProperty(proxy, "id", {
    enumerable: false
  })

  return proxy;
}


/**
 * **list**([init])
 *
 * Creates a `List` container which aims to behave _exactly_ like a
 * [Javascript Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
 * but with the exception that when declared as a variable (aka, `let` or `var`,
 * not `const`), the variable can't be replaced with another raw array declaration.
 *
 * ```ts
 * // List<number>
 * let a = list([1,2,3]);
 * // mutate the list
 * a.push(4);
 * // NOT allowed
 * a = [4,5,6];
 * // pass into fn as a reference
 * const fn = (v: List<number>) => { v.push(4); return v; }
 * // List<number> with values [1,2,3,4]
 * fn(list([1,2,3]));
 * ```
 */
export const list = <
  TList extends readonly N[] | readonly [ readonly N[] ],
  N extends Narrowable,
>(...init: TList) => {

  return (
    init.length === 1 && isArray(init[0])
      ? createProxy(...init[0])
      : createProxy(...init)
  ) as unknown as TList extends readonly [ readonly N[] ]
    ? List<ListWideType<TList[0]>, ListHash<TList[0]>>
    : TList extends readonly N[]
    ? List<ListWideType<TList>, ListHash<TList>>
    : never;
}
