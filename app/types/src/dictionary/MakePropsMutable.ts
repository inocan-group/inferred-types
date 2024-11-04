import { ExpandRecursively , AsArray, Mutable,  WithKeys, WithoutKeys , AnyObject, SimplifyObject, ObjectKey } from "@inferred-types/types";


/**
 * **MakePropsMutable**`<TObj,TMutProps>`
 *
 * Given a dictionary of type `<TObj>`, this utility function will
 * make the properties of `TMutProps` _mutable_. `TMutProps` can be
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
export type MakePropsMutable<
  TObj extends AnyObject,
  TMutProps extends ObjectKey[] | ObjectKey
> = SimplifyObject<Mutable<WithKeys<TObj, TMutProps>>
  & WithoutKeys<TObj, TMutProps>>;

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
  M extends readonly (keyof T & ObjectKey)[]
> = ExpandRecursively<
  Mutable<WithKeys<T,M>> & Readonly<WithoutKeys<T, AsArray<M>>>
>;
