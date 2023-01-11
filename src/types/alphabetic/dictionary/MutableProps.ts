import { ExpandRecursively } from "../../ExpandRecursively";
import { Keys } from "../../Keys";
import { AfterFirst } from "../../lists";
import { First } from "../../lists/First";

import {  TupleToUnion, UnionToTuple } from "../../type-conversion";
import { Mutable } from "../../type-conversion/Mutable";
import {  WithKeys, WithoutKeys } from "./WithKeys";

type MutablePropAcc<
  T extends {},
  MutableKeys extends readonly (keyof T & string)[],
  Processed extends Readonly<{}> = Readonly<{}>
> = [] extends MutableKeys
  ?  ExpandRecursively<Processed>
  : MutablePropAcc<
      T, 
      AfterFirst<MutableKeys>, 
      Processed & Mutable<Pick<T, First<MutableKeys>>>
    >;

/**
 * **MutableProps**`<T,M>`
 * 
 * Given a dictionary of type `<T>`, this utility function will
 * make the properties represented by `M` _mutable_. `M` can be
 * a union type (as shown below) or a union.
 *
 * ```ts
 * // { foo: string, bar?: number, readonly baz: number }
 * type Example = MutableProps<{
 *    readonly foo: string,
 *    bar?: number,
 *    readonly baz: number
 * }, "foo" | "bar">;
 * ```
 * 
 * **Related:** `MutablePropsExclusive`
 */
export type MutableProps<
  T extends {}, 
  M extends readonly (keyof T & string)[] | (keyof T & string)
> = ExpandRecursively<
WithoutKeys<T, M> & MutablePropAcc<
  T, 
  M extends readonly (keyof T & string)[]
    ? M  
    : M extends (keyof T & string) 
      ? UnionToTuple<M> extends readonly (keyof T & string)[]
        ? UnionToTuple<M>
        : never
      : never
  >
>;

/**
 * **MutablePropsExclusive**`<T,M>`
 * 
 * Given a dictionary of type `<T>`, this utility function will
 * make the properties represented by `M` _mutable_ and all others
 * immutable.
 *
 * ```ts
 * // { foo: string, readonly bar: number, readonly baz: number }
 * type Example = MutableProps<{
 *    readonly foo: string,
 *    bar?: number,
 *    readonly baz: number
 * }, "foo">;
 * ```
 * 
 * **Related:** `MutableProps`
 */
export type MutablePropsExclusive<
  T extends {}, 
  M extends (keyof T & string) | readonly (keyof T & string)[]
> = ExpandRecursively<
  Mutable<WithKeys<T,M>> & Readonly<WithoutKeys<T, M>>
>;
