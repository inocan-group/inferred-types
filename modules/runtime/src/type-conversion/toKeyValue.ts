import {
  AnyObject,
  Filter,
  Narrowable,
  Reverse,
  ToKv,
  SKeys,
  HandleDoneFn
} from "inferred-types/types";
import { handleDoneFn, keysOf } from "inferred-types/runtime";



type PushTop<
  TNatural extends readonly string[],
  TTop extends readonly string[]
> = [
  ...Reverse<TTop>,
  ...Filter<TNatural, TTop[number]>
]

type PushBottom<
  TNatural extends readonly string[],
  TBot extends readonly string[]
> = [
  ...Filter<TNatural, TBot[number]>,
  ...TBot,
]

export type SortApi<
  O extends readonly string[]
> = {
  order: O;
  toTop: <TTop extends readonly (O[number] & string)[]>(
    ...keys: TTop
  ) => SortApi<PushTop<O,TTop>>;
  toBottom: <TBot extends readonly (O[number] & string)[]>(
    ...keys: TBot
  ) => SortApi<PushBottom<O,TBot>>;
  done(): O
};


export type ToKeyValueSort<O extends readonly string[]> = <
  TCb extends SortApi<O>
>(cb: TCb) => unknown;


type Returns<
  T extends AnyObject,
  S extends ToKeyValueSort<SKeys<T>> | undefined
> = S extends undefined
? ToKv<T>
: S extends ToKeyValueSort<SKeys<T>>
  ?  HandleDoneFn<ReturnType<S>> extends readonly (keyof T & string)[]
    ? ToKv<T, HandleDoneFn<ReturnType<S>>>
    : never
  : never;

const sortKeyApi = <O extends readonly string[]>(order: O): SortApi<O> => ({
  order,
  toTop: <T extends readonly (O[number] & string)[]>(...keys: T) => sortKeyApi(
    [
      ...keys.toReversed(),
      ...order.filter(i => !keys.includes(i))
    ]
  ) as SortApi<PushTop<O,T>>,
  toBottom: <T extends readonly (O[number] & string)[]>(...keys: T) => sortKeyApi(
    [
      ...order.filter(i => !keys.includes(i)),
      ...keys
    ]
  ) as SortApi<PushBottom<O,T>>,
  done: () => order
})


/**
 * **toKeyValue**`(obj)` -> tuple
 *
 * Converts an object into a tuple of `KeyValue` objects.
 *
 * - a Tuple representation benefits from two main things:
 *    - ensured **order**
 *    - it is an **iterable** structure
 * - narrow types are preserved whereever possible
 * - you may optionally position certain key's at the "top"
 * or "bottom" of the stack by using the sort callback.
 *
 * ```ts
 * // [
 * //   { key: "id", value: 123},
 * //   { key: "foo", value: 1 },
 * //   { key: "bar", value: 2 },
 * // ]
 * const rec = toKeyValue({foo: 1, bar: 2, id: 123 }, o => o.toTop("id"));
 * ```
 */
export function toKeyValue<
  T extends {[key: string]: N}, N extends Narrowable,
  S extends ToKeyValueSort<SKeys<T>> | undefined
>(
  obj: T,
  sort?: S
): Returns<T,S> {
  let keys = keysOf(obj) as readonly string[];
  const tuple: any[] = [];

  if(sort) {
    keys = handleDoneFn(sort(sortKeyApi(keys as any)))
  }

  for (const k of keys) {
    tuple.push({ key: k, value: obj[k]})
  }


  return tuple as Returns<T,S>
}

const abc = toKeyValue({foo: 1, bar: "hi", id: 123}, o => o.toTop("id"));
