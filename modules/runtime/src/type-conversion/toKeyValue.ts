import type {
  AnyObject,
  Dictionary,
  HandleDoneFn,
  KeyValue,
  Narrowable,
  NarrowObject,
  StringKeys,
  ToKv,
} from "inferred-types/types";
import { handleDoneFn } from "inferred-types/runtime";

type PushTop<
  TNatural extends readonly string[],
  TTop extends readonly string[],
> = [
    ...TTop,
    ...{
      [K in keyof Exclude<TNatural, TTop[number]>]: Exclude<TNatural, TTop[number]>[K]
    },
  ];

type PushBottom<
  TNatural extends readonly string[],
  TBot extends readonly string[],
> = [
    ...{
      [K in keyof Exclude<TNatural, TBot[number]>]: Exclude<TNatural, TBot[number]>[K]
    },
    ...TBot,
  ];

type Always<O> = O extends readonly string[]
  ? readonly (O[number] & string)[]
  : never;

interface SortApi<
  O extends readonly string[],
> {
  order: O;
  toTop: <TTop extends Always<O>>(
    ...keys: TTop
  ) => SortApi<PushTop<O, TTop>>;
  toBottom: <TBot extends readonly string[]>(
    ...keys: TBot
  ) => SortApi<PushBottom<O, TBot>>;
  done: () => O;
}

/**
 * A callback function which allows a user to express the
 * keys which they want to shift to the top or bottom of the
 * stack.
 */
export type ToKeyValueSort<O extends readonly string[]> = <
  TCb extends SortApi<O>,
>(cb: TCb
) => unknown;


function sortKeyApi<T extends readonly string[]>(order: T): SortApi<T> {
  return {
    order,
    toTop: <TTop extends readonly (string & T[number])[]>(...keys: TTop) => sortKeyApi(
      [
        ...keys,
        ...order.filter(i => !keys.includes(i)),
      ]
    ) as unknown as SortApi<PushTop<T, TTop>>,
    toBottom: <TBot extends readonly (string & T[number])[]>(...keys: TBot) => sortKeyApi(
      [
        ...order.filter(i => !keys.includes(i)),
        ...keys,
      ],
    ) as unknown as SortApi<PushBottom<T, TBot>>,
    done: () => order,
  };
}

/**
 * **toKeyValue**`(obj)` -> tuple
 *
 * Converts an object into a tuple of `KeyValue` objects.
 *
 * - a Tuple representation benefits from two main things:
 *    - ensured **order**
 *    - it is an **iterable** structure
 * - narrow types are preserved wherever possible
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
  T extends NarrowObject<N> | AnyObject,
  N extends Narrowable,
  TSort extends ToKeyValueSort<StringKeys<T>> = ToKeyValueSort<StringKeys<T>>
>(
  obj: T,
  sort: TSort = (s => s) as TSort,
) {
  const natural = Object.keys(obj);
  const sorted = Array.isArray(sortKeyApi(natural))
    ? sortKeyApi(natural)
    : handleDoneFn(sortKeyApi(natural));
  const tuple: KeyValue[] = [];

  for (const k of sorted) {
    tuple.push({ key: k, value: obj[k as keyof typeof obj] });
  }

  return tuple as unknown as ToKv<T>;
}
