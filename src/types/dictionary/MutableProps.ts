import { ExpandRecursively } from "src/types/literals";
import { AfterFirst , AsArray, First } from "src/types/lists";
import { UnionToTuple, Mutable } from "src/types/type-conversion";
import { Key, WithKeys, WithoutKeys } from "src/types/dictionary";
import { AnyObject } from "src/types/base-types";

type MutablePropAcc<
  T extends AnyObject,
  MutableKeys extends readonly (keyof T & string)[],
  Processed extends Readonly<AnyObject> = Readonly<AnyObject>
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
  T extends AnyObject, 
  M extends readonly (keyof T & Key)[] | (keyof T & Key)
> = ExpandRecursively<
WithoutKeys<T, AsArray<M>> & MutablePropAcc<
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
  T extends AnyObject, 
  M extends (keyof T & Key) | readonly (keyof T & Key)[]
> = ExpandRecursively<
  Mutable<WithKeys<T,M>> & Readonly<WithoutKeys<T, AsArray<M>>>
>;
