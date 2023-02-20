import { AnyObject } from "src/types/base-types";
import { WithoutValue, SimplifyObject, Keys } from "src/types/dictionary";
import { IfLength } from "src/types/boolean-logic";

type Shared<
  A extends AnyObject,
  B extends AnyObject,
> = Keys<WithoutValue<SimplifyObject<{
  [K in keyof A]: K extends keyof B ? K : never
}>, never>>;

/**
 * **SharedKeys**`<A,B>`
 * 
 * Given two objects `A` and `B`, this type utility will provide the 
 * _keys_ which both objects contain.
 * ```ts
 * type O1 = { foo: 1; bar: 2; baz: 88 };
 * type O2 = { bar: 5; baz: 3; nada: true };
 * // readonly ["bar", "baz"] & readonly ("bar" | "baz")[]
 * type X = SharedKeys<O1,O2>;
 * ```
 * 
 * **Note:** intersecting with the union type allows the 
 * criteria of extending _keyof A_ and _keyof B_.
 */
export type SharedKeys<
  A extends AnyObject,
  B extends AnyObject
> = IfLength<
  Shared<Keys<A>,Keys<B>>, 0,
  readonly [],
  Shared<A,B>
>;
